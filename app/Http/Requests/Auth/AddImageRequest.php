<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;
use App\Models\User;

class AddImageRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "id" => ["required", "int", "exists:Users,id"],
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,gif,webp', 'max:2048'], // image parametresinin belirtilmesi ve geçerli bir resim dosyası olması gerekiyor
        ];
    }
}
