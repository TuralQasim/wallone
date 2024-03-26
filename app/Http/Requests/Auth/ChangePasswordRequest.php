<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ChangePasswordRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "id" => ["required", "int", "exists:" . app(User::class)->getTable() . ",id"],
            "password" => ["required", "string", "max:30", function ($attribute, $value, $fail) {
                $user = User::findOrFail($this->id); // ID'ye göre kullanıcıyı bul

                // Eğer girilen parola, kullanıcının mevcut parolasıyla eşleşiyorsa
                if (Hash::check($value, $user->password)) {
                    $fail(__("Yeni parola, mevcut parola ile aynı olamaz."));
                }
            }],
            "repeated_password" => ["required", "same:password"]
        ];
    }

    public function messages()
    {
        return [
            'repeated_password.same' => __('Parola ve tekrarlanan parola eşleşmiyor.'),
        ];
    }
}
