<?php

namespace App\Http\Controllers\Front\Auth;

use App\Http\Controllers\Front\Auth\Base\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LogoutController extends AuthController
{
    public function index()
    {
        // TODO: Implement index() method.
    }
    public function store(Request $request): \Illuminate\Foundation\Application|\Illuminate\Routing\Redirector|\Inertia\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Contracts\Foundation\Application
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
}
