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

        return redirect('authentication/login');

    }

    public function ottieniAccount()
    {

        if (Session::has('user_id')) {

            $utente = User::find(session('user_id'));

            return $utente;

        }

        return redirect('authentication/login');

    }

    public function aggiornaAccount(Request $request)
    {
        if (Session::has('user_id')) {

            $utente = User::find(session('user_id'));

            if (session('email') !== $request->email && filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
                $utente->email = $request->email;
                session(['email' => $request->email]);
            }

            if ($utente->data_nascita !== $request->data_nascita && strlen($request->data_nascita) === 10) {

                $stringaAnno = substr($request->data_nascita, 0, 4);
                $stringaMese = substr($request->data_nascita, 5, 2);
                $stringaGiorno = substr($request->data_nascita, 8, 2);

                if ((strcmp($stringaAnno, '1900') >= 0 && strcmp($stringaAnno, date('Y')) <= 0) &&
                    (strcmp($stringaMese, '01') >= 0 && strcmp($stringaMese, 12) <= 0) &&
                    (strcmp($stringaGiorno, '01') >= 0 && strcmp($stringaGiorno, '31') <= 0)) {
                    $utente->data_nascita = $request->data_nascita;
                }
            }

            if (session('paese') !== $request->paese) {
                $utente->paese = $request->paese;
                session(['paese' => $request->paese]);
            }

            if (! empty($request->password) && strlen($request->password) >= 8) {
                $utente->password = bcrypt($request->password);
            }

            if (! empty($request->telefono) && strlen($request->telefono) === 10) {
                $utente->telefono = $request->telefono;
            }

            $utente->save();

            return redirect('gestione_account/account');
        }

        return redirect('authentication/login');

    }

    public function eliminaAccount()
    {
        if (Session::has('user_id')) {
            $utente = User::find(session('user_id'));
            $utente->favourites()->delete();

            $utente->delete();

            session()->flush();

            return redirect('home');

        }

        return redirect('authentication/login');

    }
}
