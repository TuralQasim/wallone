<?php

namespace App\Http\Services;

class RouterService
{
    /**
     * Здесь ваще массив использовать, либо коллекцию, но мне лень
     * @param string $page
     * @return string|void
     */
    public static function get(string $page)
    {
        /**
         * Меняется здесь, меняется везде :D
         */
        return match ($page) {
            "login" => "/login",
            "register" => "/register",
            "verify-email" => "/verify-email",
            "step1" => "/steps/1",
            "step2" => "/steps/2",
            "step3" => "/steps/3",

            "index" => "/",

            default => "/",
        };
    }
}
