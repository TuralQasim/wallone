<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use App\Http\Requests\BaseRequest;

class CheckResetCodeRequest extends BaseRequest
{
    public function rules()
    {
        return [
            'reset_password_code' => ["required", "string", "exists:Users,reset_password_code"],
        ];
    }

    public function message()
    {
        return [
            'reset_password_code.exists' => __('User not found.'),
        ];
    }
}
