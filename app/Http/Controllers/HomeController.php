<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;

class HomeController extends Controller
{
    public function index()
    {
        if (Session::has('user_id')) {
            $auth = true;

            $paeseUtente = session('paese');

            return view('home', ['auth' => $auth, 'nome' => session('nome'), 'paese' => $paeseUtente]);
        }

        $auth = false;

        return view('home', ['auth' => $auth]);

    }
}
