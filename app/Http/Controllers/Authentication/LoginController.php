<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function accedi()
    {
        return view('authentication.login');
    }

    public function checkEmail(Request $request)
    {

        $email_utente = $request->email;

        if ($email_utente !== null) {

            session(['email' => $email_utente]);

            $utente = User::where('email', $email_utente)->first();

            if ($utente !== null) {
                return redirect('authentication/login_password');
            } else {
                return redirect('authentication/registrazione');
            }

        }

        return redirect('authentication/login');

    }

    public function accediPassword()
    {
        return view('authentication.login_password');
    }

    public function checkPassword(Request $request)
    {

        if ($request->password != null) {
            $emailUtente = session('email');

            $utente = User::where('email', $emailUtente)->first();

            $passwordUtente = $utente->password;

            if (password_verify($request->password, $passwordUtente)) {
                session(['user_id' => $utente->id,
                    'nome' => $utente->nome,
                    'paese' => $utente->paese]);

                return redirect('home');
            } else {
                return redirect('authentication/login_password?errore=password_errata');
            }

        } else {
            return redirect('authentication/login_password');
        }

    }
}
