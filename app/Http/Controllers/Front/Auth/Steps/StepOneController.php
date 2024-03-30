<?php

namespace App\Http\Controllers\Front\Auth\Steps;

use App\Http\Controllers\Front\Auth\Steps\Base\StepController;
use App\Http\Requests\Auth\FindFromRequest;
use App\Http\Services\RouterService;
use App\Models\Skill;
use App\Models\User;
use App\Repositories\PicklistRepository;
use App\Repositories\UserRepository;
use Inertia\Inertia;

class StepOneController extends StepController
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

        return Inertia::render('FindFrom', $data);
    }
    public function store(FindFromRequest $request)
    {
        try {
            $requestData = $request->all();
            $result = $this->userRepository->update($request->id, $requestData);

            if ($result) {
                session([
                    'redirectData' => $this->userRepository->show($request->id ?? null) ?? null,
                    
                ]);
                return redirect()->route("add-skills.index");
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
}
