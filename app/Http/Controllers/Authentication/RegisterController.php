<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function registrazione()
    {
        if (! session('email')) {
            return redirect('authentication/login');
        } else {
            return view('authentication.registrazione');
        }
    }

    public function checkRegistrazione(Request $request)
    {
        $errori = false;

        $nomeUtente = $request->nome;
        $cognomeUtente = $request->cognome;
        $passwordUtente = $request->password;
        $preferenzaUtente = $request->preferenza;
        $giornoUtente = $request->giorno;
        $meseUtente = $request->mese;
        $annoUtente = $request->anno;

        if (! isset($nomeUtente) || strlen($nomeUtente) === 0) {
            $errori = true;
        }

        if (! isset($cognomeUtente) || strlen($cognomeUtente) === 0) {
            $errori = true;
        }

        if (! isset($passwordUtente) || strlen($passwordUtente) < 8) {
            $errori = true;
        }

        if (! isset($preferenzaUtente)) {
            $errori = true;
        }

        if (! isset($giornoUtente) || $giornoUtente < 1 || $giornoUtente > 31 ||
            ! isset($meseUtente) || $meseUtente < 1 || $meseUtente > 12 ||
            ! isset($annoUtente) || $annoUtente < 1900 || $annoUtente > date('Y')) {
            $errori = true;
        }

        if ($errori === true) {
            return redirect('authentication/registrazione')
                ->withInput()
                ->withErrors(['errori' => 'Qualcosa è andato storto, riprova.']);
        }

        $dataNascita = $annoUtente.'-'.$meseUtente.'-'.$giornoUtente;

        $nuovoUtente = new User;
        $nuovoUtente->nome = $nomeUtente;
        $nuovoUtente->cognome = $cognomeUtente;
        $nuovoUtente->email = session('email');
        $nuovoUtente->password = bcrypt($passwordUtente);
        $nuovoUtente->p_acquisto = $preferenzaUtente;
        $nuovoUtente->data_nascita = $dataNascita;
        $nuovoUtente->save();

        session(['nome' => $nomeUtente, 'user_id' => $nuovoUtente->id]);

        return redirect('home');

    }
}
