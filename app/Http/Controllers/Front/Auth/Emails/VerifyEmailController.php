<?php

namespace App\Http\Controllers\Front\Auth\Emails;

use App\Http\Controllers\Front\Auth\Base\AuthController;
use App\Http\Requests\Auth\EmailVerificationRequest;
use App\Http\Services\RouterService;
use App\Models\Skill;
use App\Models\User;
use App\Repositories\PicklistRepository;
use App\Repositories\UserRepository;
use Inertia\Inertia;

class VerifyEmailController extends AuthController
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

    public function index()
    {
        $data = session('redirectData', []);
        session()->forget('redirectData');

        return Inertia::render('VerifyEmail', $data);
    }
    public function store(EmailVerificationRequest $request)
    {
        try {
            $user = $this->userModel::where("verification_code", $request->verification_code)->first();
            $result = $user->update([
                "status" => 1
            ]);

            if ($result) {

                session(['redirectData' => $this->userRepository->show($user->id ?? null)]);

                return redirect()->route(RouterService::get('step1'));
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
}
