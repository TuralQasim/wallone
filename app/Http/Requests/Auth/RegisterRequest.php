<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;
use Illuminate\Support\Arr;
use App\Models\User;

class RegisterRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "username" => ["required", "string", "max:30", "unique:users,username"],
            "email" => ["required", "email", "unique:users,email"],
            "password" => ["required", "string"],
            "repeated_password" => ["required", "same:password"]
        ];
    }

    public function validatedData()
    {
        $validated = $this->validated();
        $fillable = (new User())->getFillable();

        return Arr::only($validated, $fillable);
    }

    public function messages()
    {
        return [
            'repeated_password.same' => __('Parola ve tekrarlanan parola eşleşmiyor.'),
        ];
    }
}
