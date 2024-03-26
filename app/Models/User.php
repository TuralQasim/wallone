<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Traits\VerifiesEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, VerifiesEmail;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'fullname',
        'username',
        'email',
        'find_from',
        'image',
        'password',
        'verification_code',
        'reset_password_code',
        'status'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getImageAttribute($value)
    {
        return asset($value);
    }

    public function userSkills()
    {
        return $this->hasMany(UserSkill::class, 'user_id', 'id');
    }

    public function skills()
    {
        return $this->hasManyThrough(
            Skill::class,
            UserSkill::class,
            'user_id', // UserSkills tablosundaki user_id sütunu
            'id', // Skill tablosundaki id sütunu
            'id', // User tablosundaki id sütunu
            'skill_id' // UserSkills tablosundaki skill_id sütunu
        );
    }
}
