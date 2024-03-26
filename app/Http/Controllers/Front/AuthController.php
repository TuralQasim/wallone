<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Http\Services\TokenService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\FindFromRequest;
use App\Http\Requests\Auth\AddSkillsRequest;
use App\Http\Requests\Auth\AddImageRequest;
use App\Http\Requests\Auth\EmailVerificationRequest;
use App\Http\Requests\Auth\EmailForResetPasswordRequest;
use App\Http\Requests\Auth\CheckResetCodeRequest;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerificationMail;
use App\Models\User;
use Inertia\Inertia;
use App\Repositories\PicklistRepository;
use App\Models\Skill;


class AuthController extends Controller
{
    protected $userRepository;
    protected $userModel;
    protected $skillsRepository;

    public function __construct(UserRepository $userRepository, User $userModel)
    {
        $this->userRepository = $userRepository;
        $this->userModel = $userModel;
        $this->skillsRepository = new PicklistRepository(new Skill());
    }

    public function login(LoginRequest $request)
    {
        try {
            $credentials = $request->only('email', 'password');
            $remember = $request->boolean('remember_me');

            if (Auth::attempt($credentials, $remember)) {

                //Многоразовое использование.
                //Главное правило => Меняем один блок, меняется везде.
                $token = TokenService::getToken($request->email);

                Inertia::render('Home',[
                    'message' => __("SuccessfullyLogin"),
                    'data' => ['token' => $token],
                ]);

                return redirect('/')->with('message', __("SuccessfullyLoggedOut"));
            } else {

                return Inertia::render('Login',[
                    'error' => __("InvalidCredentials"),
                ]);
            }
        } catch (\Exception $e) {
            return Inertia::render('Login',[
                'error' => __("An error occurred while processing the request"),
                'details' => $e->getMessage(),
            ]);
        }
    }



    public function logout(Request $request)
    {

        try {
            Auth::logout();
            return redirect('login')->with('message', __("SuccessfullyLoggedOut"));
        } catch (\Exception $e) {
            return Inertia::render('Login',[
                'error' => __("An error occurred while processing the request"),
                'details' => $e->getMessage(),
            ]);
        }
    }


    public function register(RegisterRequest $request)
    {
        try {
            $requestData = $request->validatedData();
            $user = $this->userRepository->create($requestData);
            // Mail::to($user->email)->send(new EmailVerificationMail($user->verification_code, $user->email));
            session(['redirectData' => $user]);
            return redirect()->route('verify-email');
        }  catch (\Illuminate\Validation\ValidationException $e) {

            // При ошибке валидации, редирект обратно с добавлением ошибок в сессию.
            return back()->withErrors($e->validator)->withInput();
        } catch (\Exception $e) {

            // Для других исключений, возвращаем ответ через Inertia с общим сообщением об ошибке.
            return Inertia::render('Register', [
                'error' => __("An error occurred while processing the request"),
                'errorDetails' => $e->getMessage(),
            ])->toResponse($request)->setStatusCode(500); // Используем код статуса 500 для общих ошибок сервера.
        }
    }
    public function verifyEmail(EmailVerificationRequest $request)
    {
        try {
            $user = $this->userModel::where("verification_code", $request->verification_code)->first();
            $result = $user->update([
                "status" => 1
            ]);

            if ($result) {

                session(['redirectData' => $this->userRepository->show($user->id ?? null) ?? null]);
                return redirect()->route('register/find-from');
            } else {
                return Inertia::render('VerifyEmail',[
                    'error' => __("An error occurred while processing the request"),
                    'details' => __("Server Error"),
                ]);
            }
        } catch (\Exception $e) {
            return Inertia::render('VerifyEmail',[
                'error' => __("An error occurred while processing the request"),
                'details' => $e->getMessage(),
            ]);
        }
    }
    public function findFrom(FindFromRequest $request)
    {
        try {
            $requestData = $request->all();
            $result = $this->userRepository->update($request->id, $requestData);

            if ($result) {
                session([
                    'redirectData' => $this->userRepository->show($request->id ?? null) ?? null,
                    "skillsData" =>  $this->skillsRepository->list()
                ]);
                return redirect()->route('register/add-skills');
            } else {
                return Inertia::render('FindFrom',[
                    'error' => __("An error occurred while processing the request"),
                    'details' => __("Server Error"),
                ]);
            }
        } catch (\Exception $e) {
            return Inertia::render('FindFrom',[
                'error' => __("An error occurred while processing the request"),
                'details' => $e->getMessage(),
            ]);
        }
    }

    public function addSkills(AddSkillsRequest $request)
    {
        try {
            $user = $this->userRepository->show($request->user_id);
            $result = $user->userSkills()->createMany($request->validatedSkillsData());

            if ($result) {
                session(['redirectData' => $this->userRepository->show($request->user_id ?? null) ?? null]);
                return redirect()->route('register/add-image');
            } else {
                return Inertia::render('AddSkills',[
                    'error' => __("Skills haven't been added"),
                    'details' => __("Server Error"),
                ]);
            }
        } catch (\Exception $e) {
            return Inertia::render('AddSkills',[
                'error' => __("An error occurred while processing the request"),
                'details' => $e->getMessage(),
            ]);
        }
    }

    public function upload(AddImageRequest $request)
    {
        try {
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/users'), $imageName);

                $result = $this->userRepository->update($request->id, ["image" => 'uploads/users/' . $imageName]);

                if ($result) {
                    session(['redirectData' => $this->userRepository->show($request->id ?? null) ?? null]);
                    return redirect()->route('register/add-image');
                } else {
                    return Inertia::render('AddImage',[
                        'error' => __("No image uploaded"),
                        'details' => __("Server Error"),
                    ]);
                }
            } else {
                return Inertia::render('AddImage',[
                    'error' => __("Image not found"),
                    'details' => __("Server Error"),
                ]);
            }
        } catch (\Exception $e) {
            return Inertia::render('AddImage',[
                'error' => __("An error occurred while processing the request"),
                'details' => $e->getMessage(),
            ]);
        }
    }



    // public function sendResetCode(EmailForResetPasswordRequest $request)
    // {
    //     try {
    //         $user = $this->userModel::where("email", $request->email)->first();
    //         $result = $user->update([
    //             "reset_password_code" => Str::random(6)
    //         ]);

    //         if ($result) {
    //             return response()->json([
    //                 'message' => __("A password reset code has been sent to your email"),
    //                 'data' => $this->userRepository->show($user->id ?? null) ?? null,
    //             ], Response::HTTP_OK);
    //         } else {
    //             return response()->json([
    //                 'error' => __("An error occurred while processing the request"),
    //                 'details' => __("Server Error"),
    //             ], Response::HTTP_INTERNAL_SERVER_ERROR);
    //         }
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'error' => __("An error occurred while processing the request"),
    //             'details' => $e->getMessage(),
    //         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }

    // public function checkResetCode(CheckResetCodeRequest $request)
    // {
    //     try {
    //         $user = $this->userModel::where("reset_password_code", $request->reset_password_code)->first();

    //         if ($user) {
    //             return response()->json([
    //                 'message' => __("User found. Choose your new password"),
    //                 'data' => $user,
    //             ], Response::HTTP_OK);
    //         } else {
    //             return response()->json([
    //                 'error' => __("User not found"),
    //                 'details' => __("Server Error"),
    //             ], Response::HTTP_INTERNAL_SERVER_ERROR);
    //         }
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'error' => __("An error occurred while processing the request"),
    //             'details' => $e->getMessage(),
    //         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }

    // public function changePassword(ChangePasswordRequest $request)
    // {
    //     try {
    //         $user = $this->userRepository->show($request->id);

    //         $result = $user->update([
    //             "password" => $request->password
    //         ]);

    //         if ($result) {
    //             return response()->json([
    //                 'message' => __("Password has been updated"),
    //                 'data' => $this->userRepository->show($user->id ?? null) ?? null,
    //             ], Response::HTTP_OK);
    //         } else {
    //             return response()->json([
    //                 'error' => __("An error occurred while processing the request"),
    //                 'details' => __("Server Error"),
    //             ], Response::HTTP_INTERNAL_SERVER_ERROR);
    //         }
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'error' => __("An error occurred while processing the request"),
    //             'details' => $e->getMessage(),
    //         ], Response::HTTP_INTERNAL_SERVER_ERROR);
    //     }
    // }
}
