<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function registrazione()
    {
        return view('authentication.registrazione');
    }

    public function checkRegistrazione(Request $request)
    {
        $errori = [];

        $nomeUtente = $request->nome;
        $cognomeUtente = $request->cognome;
        $passwordUtente = $request->password;
        $preferenzaUtente = $request->preferenza;
        $giornoUtente = $request->giorno;
        $meseUtente = $request->mese;
        $annoUtente = $request->anno;

        // Avrei potuto fare un $errore = false
        // dato che nel blade faccio apparire un messaggio generico

        if (! isset($nomeUtente) || strlen($nomeUtente) === 0) {
            $errori[] = 'Il nome è obbligatorio';
        }

        if (! isset($cognomeUtente) || strlen($cognomeUtente) === 0) {
            $errori['cognome'] = 'Il cognome è obbligatorio';
        }

        if (! isset($passwordUtente) || strlen($passwordUtente) < 8) {
            $errori['password'] = 'La password deve contenere almeno 8 caratteri';
        }

        if (! isset($preferenzaUtente)) {
            $errori['preferenza'] = 'La preferenza è obbligatoria';
        }

        if (! isset($giornoUtente) || $giornoUtente < 1 || $giornoUtente > 31 ||
            ! isset($meseUtente) || $meseUtente < 1 || $meseUtente > 12 ||
            ! isset($annoUtente) || $annoUtente < 1900 || $annoUtente > date('Y')) {
            $errori['data_nascita'] = 'La data di nascita non è valida';
        }

        if (count($errori) > 0) {
            return redirect('authentication/registrazione')
                ->withInput()
                ->withErrors($errori);
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
