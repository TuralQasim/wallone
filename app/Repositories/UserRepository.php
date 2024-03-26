<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Collection;

class UserRepository
{
    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function all(): Collection
    {
        return $this->model::all();
    }

    public function create(array $data): User
    {
        return $this->model::create($data);
    }

    public function show(int $id)
    {
        return $this->model->with("skills")->find($id);
    }

    public function update(int $id, array $data): bool
    {
        return $this->model::where("id", $id)->update($data);
    }

    public function delete(int $id): bool
    {
        $user = $this->model->find($id);

        if (!$user) {
            return false;
        }

        return $user->delete();
    }
}
