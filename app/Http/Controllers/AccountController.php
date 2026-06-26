<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class AccountController extends Controller
{
    public function gestioneAccount()
    {

        if (Session::has('user_id')) {

            $auth = true;

            $paeseUtente = session('paese');

            return view('account', ['auth' => $auth, 'nome' => session('nome'), 'paese' => $paeseUtente]);
        }

    }

    public function ottieniAccount()
    {

        if (Session::has('user_id')) {

            $utente = User::find(session('user_id'));

            return $utente;

        }

    }

    public function aggiornaAccount(Request $request)
    {
        if (Session::has('user_id')) {

            $utente = User::find(session('user_id'));

            if (session('email') !== $request->email) {
                $utente->email = $request->email;
                session(['email' => $request->email]);
            }

            $utente->data_nascita = $request->data_nascita;

            if (session('paese') !== $request->paese) {
                $utente->paese = $request->paese;
                session(['paese' => $request->paese]);
            }

            if (! empty($request->password)) {
                $utente->password = bcrypt($request->password);
            }

            if (! empty($request->telefono)) {
                $utente->telefono = $request->telefono;
            }

            $utente->save();

            return redirect('gestione_account/account');
        }

    }

    public function eliminaAccount()
    {
        if (Session::has('user_id')) {
            $utente = User::find(session('user_id'));
            $utente->favourite()->delete();

            $utente->delete();

            session()->flush();

            return redirect('home');

        }

    }
}
