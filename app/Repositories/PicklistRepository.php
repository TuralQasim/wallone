<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class PicklistRepository
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all(): Collection
    {
        return $this->model::all();
    }

    public function list(): Collection
    {
        return $this->model::where("status", 1)->get();
    }

    public function create(array $data): Model
    {
        return $this->model::create($data);
    }

    public function show(int $id)
    {
        return $this->model->find($id);
    }

    public function update(int $id, array $data): bool
    {
        return $this->model::where("id", $id)->update($data);
    }

    public function delete(int $id): bool
    {
        $entity = $this->model->find($id);

        if (!$entity) {
            return false;
        }

        return $entity->delete();
    }
}
