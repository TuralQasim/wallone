<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Front\AuthController;

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

Route::get('/', function () {
    return Inertia::render('Home', [
        'title' => "Tural",
    ]);
});
Route::group(['middleware' => ['check_user_not_auth']], function () {
    Route::get('/login', function () {
        $data = session('redirectData', []);
        session()->forget('redirectData');
        return Inertia::render('Login', $data);
    })->name('login');

    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register', function () {
        $data = session('redirectData', []);
        session()->forget('redirectData');
        return Inertia::render('Register', $data);
    })->name('register');

    Route::post('register', [AuthController::class, 'register']);
    Route::get('/verify-email', function () {
        $data = session('redirectData', []);
        session()->forget('redirectData');
        return Inertia::render('VerifyEmail', $data);
    })->name('verify-email');

    Route::post('/verify-email', [AuthController::class, 'verifyEmail'])->name('verification.verify');
    Route::get('/register/find-from', function () {
        $data = session('redirectData', []);
        session()->forget('redirectData');
        return Inertia::render('FindFrom', $data);
    })->name('register/find-from');

    Route::post('/register/find-from', [AuthController::class, 'findFrom']);
    Route::get('/register/add-skills', function () {
        $data["redirectData"]= session('redirectData', []);
        session()->forget('redirectData');
        $data["skillsData"] = session('skillsData', []);
        session()->forget('skillsData');
        return Inertia::render('AddSkills', $data);
    })->name('register/add-skills');

    Route::post('register/add-skills', [AuthController::class, 'addSkills']);
    Route::get('/register/add-image', function () {
        $data= session('redirectData', []);
        session()->forget('redirectData');
        return Inertia::render('AddImage', $data);
    })->name('register/add-image');

    Route::post('register/add-image', [AuthController::class, 'upload']);

});

Route::group(['middleware' => ['check_user_auth']], function () {
    Route::post('logout', [AuthController::class, 'logout']);
});


// Route::get('skills/list', [SkillsController::class, 'list']);

// Route::get('get-csrf-token', function () {
//     return response()->json(['csrf_token' => csrf_token()]);
// });



// Route::post('reset-password/send-code', [AuthController::class, 'sendResetCode']);
// Route::post('reset-password/check-code', [AuthController::class, 'checkResetCode']);
// Route::post('reset-password/change-password', [AuthController::class, 'changePassword']);


// Route::resource('users', UsersController::class);


