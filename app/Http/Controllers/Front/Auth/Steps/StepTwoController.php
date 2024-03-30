<?php

namespace App\Http\Controllers\Front\Auth\Steps;

use App\Http\Controllers\Front\Auth\Steps\Base\StepController;
use App\Http\Requests\Auth\AddSkillsRequest;
use App\Http\Services\RouterService;
use App\Models\Skill;
use App\Models\User;
use App\Repositories\PicklistRepository;
use App\Repositories\UserRepository;
use Inertia\Inertia;

class StepTwoController extends StepController
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
        $data["redirectData"] = session('redirectData', []);
        $data["skillsData"] = $this->skillsRepository->list();
                    

        session()->forget('redirectData');
        session()->forget('skillsData');

        return Inertia::render('AddSkills', $data);
    }
    public function store(AddSkillsRequest $request)
    {
        try {
            $user = $this->userRepository->show($request->user_id);
            $result = $user->userSkills()->createMany($request->validatedSkillsData());

            if ($result) {
                session(['redirectData' => $this->userRepository->show($request->user_id ?? null) ?? null]);
                return redirect()->route('add-image.index');
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
}
