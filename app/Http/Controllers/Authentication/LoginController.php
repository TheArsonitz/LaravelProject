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
        $errori = [];

        if (! isset($email_utente) || ! filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            $errori['email'] = 'Inserisci un indirizzo email valido';
        }

        if (count($errori) > 0) {
            return redirect('authentication/login')
                ->withErrors($errori);
        }

        session(['email' => $email_utente]);

        $utente = User::where('email', $email_utente)->first();

        if ($utente !== null) {
            return redirect('authentication/login_password');
        } else {
            return redirect('authentication/registrazione');
        }

    }

    public function accediPassword()
    {
        return view('authentication.login_password');
    }

    public function checkPassword(Request $request)
    {

        $errori = [];

        if (! isset($request->password) || strlen($request->password) === 0) {
            $errori['password'] = 'La password è obbligatoria';
        } elseif (strlen($request->password) < 8) {
            $errori['password'] = 'La password deve contenere almeno 8 caratteri';
        }

        if (count($errori) > 0) {
            return redirect('authentication/login_password')
                ->withErrors($errori);
        }

        $emailUtente = session('email');

        $utente = User::where('email', $emailUtente)->first();

        $passwordUtente = $utente->password;

        if (password_verify($request->password, $passwordUtente)) {
            session(['user_id' => $utente->id,
                'nome' => $utente->nome,
                'paese' => $utente->paese]);

            return redirect('home');
        } else {
            return redirect('authentication/login_password')
                ->withErrors(['password' => 'Password errata']);
        }

    }
}
