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

        $nomeUtente = $request->nome;
        $cognomeUtente = $request->cognome;
        $passwordUtente = $request->password;
        $preferenzaUtente = $request->preferenza;
        $giornoUtente = $request->giorno;
        $meseUtente = $request->mese;
        $annoUtente = $request->anno;

        if (($nomeUtente !== null) && ($cognomeUtente !== null) &&
            ($passwordUtente !== null) && ($preferenzaUtente !== null) &&
            ($giornoUtente !== null) && ($meseUtente !== null) &&
            ($annoUtente !== null) && (session('email') !== null)) {

            $dataNascita = $annoUtente.'-'.$meseUtente.'-'.$giornoUtente;

            $nuovoUtente = new User;
            $nuovoUtente->nome = $nomeUtente;
            $nuovoUtente->cognome = $cognomeUtente;
            $nuovoUtente->password = bcrypt($passwordUtente);
            $nuovoUtente->p_acquisto = $preferenzaUtente;
            $nuovoUtente->email = session('email');
            $nuovoUtente->data_nascita = $dataNascita;
            $nuovoUtente->save();

            $nuovoUtente = User::where('email', session('email'))->first();
            $idUtente = $nuovoUtente->id;

            if ($idUtente === null) {
                return redirect('authentication/registrazione?errore=erroreForm');
            }

            session(['nome' => $nomeUtente,
                'user_id' => $idUtente]);

            return redirect('home');

        }

        return redirect('authentication/registrazione?errore=erroreForm');
    }
}
