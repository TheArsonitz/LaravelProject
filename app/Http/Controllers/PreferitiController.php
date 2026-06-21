<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class PreferitiController extends Controller
{
    public function preferiti()
    {
        $auth = Session::has('user_id');

        if ($auth) {

            $paeseUtente = session('paese');

            return view('preferiti', ['auth' => $auth, 'nome' => session('nome'), 'paese' => $paeseUtente]);
        }

        return view('preferiti', ['auth' => $auth, 'nome' => null, 'paese' => null]);

    }

    public function ottieniPreferiti()
    {
        $auth = Session::has('user_id');

        $response = [];

        if ($auth) {

            $utente = User::find(session('user_id'));
            $preferiti = $utente->favourite;

            foreach ($preferiti as $preferito) {
                $response[] = $preferito->prodotto_id;
            }

        }

        return $response;

    }

    public function gestisciPreferiti(Request $request)
    {
        $auth = Session::has('user_id');

        if ($auth) {

            if (($request->azione) == 1) {
                $nuovoPreferito = new Favourite;
                $nuovoPreferito->user_id = session('user_id');
                $nuovoPreferito->prodotto_id = $request->prodotto_id;
                $nuovoPreferito->save();
            } elseif ($request->azione == 0) {
                $utente = User::find(session('user_id'));
                $PreferitoDaEliminare = $utente->favourite()
                    ->where('prodotto_id', $request->prodotto_id);
                $PreferitoDaEliminare->delete();
            }

            return ['status' => 'successo'];
        }

        return ['status' => 'errore_autenticazione_utente'];

    }
}
