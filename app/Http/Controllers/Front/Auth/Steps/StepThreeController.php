<?php

namespace App\Http\Controllers\Front\Auth\Steps;

use App\Http\Controllers\Front\Auth\Steps\Base\StepController;
use App\Http\Requests\Auth\AddImageRequest;
use App\Http\Requests\Auth\AddSkillsRequest;
use App\Http\Services\RouterService;
use App\Models\Skill;
use App\Models\User;
use App\Repositories\PicklistRepository;
use App\Repositories\UserRepository;
use Inertia\Inertia;

class StepThreeController extends StepController
{
    protected $userRepository;
    protected $userModel;

    public function __construct(UserRepository $userRepository, User $userModel)
    {
        $this->userRepository = $userRepository;
        $this->userModel = $userModel;
    }

    public function index()
    {
        $data= session('redirectData', []);

        session()->forget('redirectData');

        return Inertia::render('AddImage', $data);
    }

    public function store(AddImageRequest $request)
    {
        try {
            if ($request->hasFile('image')) {

                /// Под службу, многоразовое использование?
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/users'), $imageName);

                $result = $this->userRepository->update($request->id, ["image" => 'uploads/users/' . $imageName]);

                if ($result) {

                    session(['redirectData' => $this->userRepository->show($request->id ?? null) ?? null]);

                    return redirect()->route(RouterService::get("index"));

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
}
