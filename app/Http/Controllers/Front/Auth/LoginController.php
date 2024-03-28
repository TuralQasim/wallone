<?php

namespace App\Http\Controllers\Front\Auth;

use App\Http\Controllers\Front\Auth\Base\AuthController;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Services\TokenService;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class LoginController extends AuthController
{
    public function index(): \Inertia\Response
    {
        $data = session('redirectData', []);
        session()->forget('redirectData');

        return Inertia::render('Login', $data);
    }
    public function store(LoginRequest $request)
    {
        try{
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
}
