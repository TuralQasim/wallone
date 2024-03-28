<?php

namespace App\Http\Controllers\Front\Pages\Home;

use App\Http\Controllers\Front\Pages\Base\BaseController;
use Inertia\Inertia;

class HomeController extends BaseController
{

    public function index()
    {
        return Inertia::render('Home', [
            'title' => "Wallone",
            'description' => ""
        ]);
    }
}
