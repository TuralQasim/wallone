<?php

namespace App\Http\Controllers\Front\Auth;

use App\Http\Controllers\Front\Auth\Base\AuthController;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Services\RouterService;
use App\Models\User;
use App\Repositories\UserRepository;
use Inertia\Inertia;

class RegisterController extends AuthController
{
    protected $userRepository;
    protected $userModel;

    public function __construct(UserRepository $userRepository, User $userModel)
    {
        $this->userRepository = $userRepository;
        $this->userModel = $userModel;
    }

    public function index() : \Inertia\Response
    {
        $data = session('redirectData', []);
        session()->forget('redirectData');

        return Inertia::render('Register', $data);
    }
    public function store(RegisterRequest $request)
    {
        try {
            $requestData = $request->validatedData();
            $user = $this->userRepository->create($requestData);

            // Mail::to($user->email)->send(new EmailVerificationMail($user->verification_code, $user->email));

            session(['redirectData' => $user]);

            return redirect()->route(RouterService::get('verify-email'));
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
}
