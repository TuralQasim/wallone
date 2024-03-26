<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use App\Http\Requests\BaseRequest;

class EmailVerificationRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'verification_code' => ["required", "string", "exists:" . app(User::class)->getTable() . ",verification_code"],
        ];
    }

    public function message()
    {
        return [
            'verification_code.exists' => __('User not found.'),
        ];
    }
}
