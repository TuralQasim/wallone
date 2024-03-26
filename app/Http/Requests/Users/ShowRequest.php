<?php

namespace App\Http\Requests\Users;

use App\Http\Requests\BaseRequest;
use App\Models\User;

class ShowRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "id" => ["required", "int", "max:30", "exists:" . app(User::class)->getTable() . ",id"],
        ];
    }
}
