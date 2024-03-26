<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait VerifiesEmail
{
    /**
     * Boot the trait.
     *
     * @return void
     */
    public static function bootVerifiesEmail()
    {
        static::creating(function ($model) {
            $model->verification_code = Str::random(6);
        });
    }

    /**
     * Activate the user account.
     *
     * @return void
     */
    public function activate()
    {
        $this->update(['status' => true]);
    }
}
