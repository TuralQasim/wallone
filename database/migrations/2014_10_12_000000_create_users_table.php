<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique()->comment('Имя пользователя');
            $table->text('url')->unique()->comment('адресная строка');
            $table->string('description')->nullable()->comment('Описание');
            $table->string('email')->unique()->comment('Email');
            $table->timestamp('email_verified_at')->nullable()->comment('Когда подтвердилась почта');
            $table->string('password')->comment('пароль');
            $table->string('find_from')->nullable()->default('Откуда переход');
            $table->string('verification_code')->nullable()->unique();
            $table->string('reset_password_code')->nullable()->unique();
            $table->tinyInteger('status')->default(0)->comment('0: Inactive, 1: Active, 2: Blocked');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
