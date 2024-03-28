<?php

namespace App\Http\Controllers\Api\v1\Steps;

use App\Models\Skill;
use App\Repositories\PicklistRepository;
use Illuminate\Http\Response;

class SkillsController
{
    protected $repository;
    protected $model;

    public function __construct(Skill $model)
    {
        $this->repository = new PicklistRepository(new Skill());
        $this->model = $model;
    }


    public function index()
    {
        try {
            $list = $this->repository->list();

            // Ну здесь тоже мой говнокод, можно в json бахнуть норм проверку
            if($list)
            {
                //Если что-то есть, отличное сообщение
                return response()->json([
                    'message' => __("SuccessfullyCreated"),
                    'data' => $list,
                ]);
            }
            //TODO: Если ничего не получилось, надо сделать так, чтобы вышла какая-та заглушка?
            return [
                'message' => __("MyBadMessage"),
                'data' => null,
            ];

        } catch (\Exception $e) {
            return response()->json([
                'error' => __("An error occurred while processing the request"),
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
