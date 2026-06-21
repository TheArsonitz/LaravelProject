<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;

class LogoutController extends Controller
{
    public function logout()
    {
        session()->flush();

        return redirect('home');
    }
}
