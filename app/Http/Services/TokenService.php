<?php

namespace App\Http\Services;

use App\Models\User;

/**
 * Некая модель токена, содержащая основную информацию о модели.
 */
class Token
{
    public string $key = "token";
}

/**
 * Сервис, отвечающий за основную работу с токеном
 */
class TokenService
{
    /**
     * Получить ключ токена
     * @return string
     */
    public static function getKey()
    {
        return (new Token())->key;
    }

    /**
     * Получить токен по Email
     * @param string $email
     * @return mixed
     */
    public static function getToken(string $email) : mixed
    {
        $user = User::whereEmail($email)->first();

        if($user)
        {
            // JWT token oluştur
            return $user->createToken(self::getKey())->plainTextToken;
        }
        return false;
    }
}
