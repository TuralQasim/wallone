<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;
use Illuminate\Support\Arr;
use App\Models\User;

class LoginRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "email" => ["required", "email", "exists:Users,email"],
            'password' => ["required", "string"],
            'remember_me' => ["nullable", "boolean"], // "Remember Me" seçeneği opsiyonel ve boolean olmalı
        ];
    }
}
