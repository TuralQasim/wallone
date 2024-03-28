<?php

use App\Http\Controllers\Front\Auth\Emails\VerifyEmailController;
use App\Http\Controllers\Front\Auth\LoginController;
use App\Http\Controllers\Front\Auth\LogoutController;
use App\Http\Controllers\Front\Auth\RegisterController;
use App\Http\Controllers\Front\Auth\Steps\StepOneController;
use App\Http\Controllers\Front\Auth\Steps\StepThreeController;
use App\Http\Controllers\Front\Auth\Steps\StepTwoController;
use App\Http\Controllers\Front\Pages\Home\HomeController;
use App\Http\Services\RouterService;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Главная
Route::get(RouterService::get('index'), [HomeController::class, 'index'])->name('home.index');

Route::group(['middleware' => ['check_user_not_auth']], function () {

    // Логин
    Route::get(RouterService::get('login'), [LoginController::class, 'index'])->name('login.index');
    Route::post(RouterService::get('login'), [LoginController::class, 'login.store']);

    //Регистрация
    Route::get(RouterService::get('register'), [RegisterController::class, 'index'])->name('register.index');
    Route::post(RouterService::get('register'), [RegisterController::class, 'store'])->name('register.store');

    //TODO: Я не имею право перейти на другую страницу, пока не пройду поэтапно!!!!

    // Подтверждение почты
    Route::get(RouterService::get('verify-email'), [VerifyEmailController::class, 'index'])->name('verify-email.index');
    Route::post(RouterService::get('verify-email'), [VerifyEmailController::class, 'store'])->name('verification.verify');

    //Далее шаги

    //Как ты нас нашел?
    Route::get(RouterService::get('step1'), [StepOneController::class, 'index'])->name('find-from.index');
    Route::post(RouterService::get('step1'), [StepOneController::class, 'store'])->name('find-from.store');

    //Творческие навыки
    Route::get(RouterService::get('step2'), [StepTwoController::class, 'index'])->name('add-skills.index');
    Route::post(RouterService::get('step2'), [StepTwoController::class, 'store'])->name('add-skills.store');

    //Аватарка
    Route::get(RouterService::get('step3'), [StepThreeController::class, 'index'])->name('add-image.index');
    Route::post(RouterService::get('step3'), [StepThreeController::class, 'upload'])->name('add-image.store');

});

Route::group(['middleware' => ['check_user_auth']], function () {
    Route::post('/logout', [LogoutController::class, 'store'])->name('logout.store');
});


// Route::get('skills/list', [SkillsController::class, 'list']);

// Route::get('get-csrf-token', function () {
//     return response()->json(['csrf_token' => csrf_token()]);
// });



// Route::post('reset-password/send-code', [AuthController::class, 'sendResetCode']);
// Route::post('reset-password/check-code', [AuthController::class, 'checkResetCode']);
// Route::post('reset-password/change-password', [AuthController::class, 'changePassword']);


// Route::resource('users', UsersController::class);


