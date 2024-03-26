<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Repositories\PicklistRepository;
use App\Models\Skill;

class SkillsController extends Controller
{
    protected $repository;
    protected $model;

    public function __construct(Skill $model)
    {
        $this->repository = new PicklistRepository(new Skill());
        $this->model = $model;
    }


    public function list()
    {
        try {
            $list = $this->repository->list();

            return response()->json([
                'message' => __("SuccessfullyCreated"),
                'data' => $list ?? null,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'error' => __("An error occurred while processing the request"),
                'details' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
