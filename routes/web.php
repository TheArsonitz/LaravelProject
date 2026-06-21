<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PreferitiController;
use App\Http\Controllers\WeatherAPIController;
use App\Http\Controllers\StoreAPIController;
use App\Http\Controllers\Authentication\LoginController;
use App\Http\Controllers\Authentication\LogoutController;
use App\Http\Controllers\Authentication\RegisterController;
use App\Http\Controllers\AccountController;

//Home
Route::get('/', [HomeController::class, 'index']);
Route::get('home', [HomeController::class, 'index']);

//Api
Route::get('api/weatherapi', [WeatherAPIController::class, 'weatherReport']);
Route::get('api/storeapi', [StoreAPIController::class, 'storeResearch']);

//Preferiti
Route::get('preferiti', [PreferitiController::class, 'preferiti']);
Route::get('preferiti/ottieni_preferiti', [PreferitiController::class, 'ottieniPreferiti']);
Route::post('preferiti/gestione_preferiti', [PreferitiController::class, 'gestisciPreferiti']);

//Autenticazione
Route::get('authentication/login', [LoginController::class, 'accedi']);
Route::post('authentication/check_email', [LoginController::class, 'checkEmail']);
Route::get('condizioniUso', function() {
    return view('authentication.condizioniUso.condizioniUso');
});
Route::get('authentication/registrazione', [RegisterController::class, 'registrazione']);
Route::post('authentication/registrazione', [RegisterController::class, 'checkRegistrazione']);
Route::get('authentication/login_password', [LoginController::class, 'accediPassword']);
Route::post('authentication/password_check', [LoginController::class, 'checkPassword']);
Route::get('authentication/logout', [LogoutController::class, 'logout']);

//Gestione Account
Route::get('gestione_account/account', [AccountController::class, 'gestioneAccount']);
Route::get('gestione_account/ottieni_account', [AccountController::class, 'ottieniAccount']);
Route::post('gestione_account/aggiorna_account', [AccountController::class, 'aggiornaAccount']);
Route::post('gestione_account/elimina_account', [AccountController::class, 'eliminaAccount']);