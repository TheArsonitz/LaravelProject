@extends('layouts.auth')

@section('titolo_pagina')
    <title>Ti diamo il benvenuto in Nike - Accedi</title>
@endsection

@section('css_href')
    <link rel="stylesheet" href="{{ url('Css/authentication/approved.css') }}" />
@endsection

@section('js_src')
    <script src="{{ url('JavaScript/authentication/approved.js') }}" defer></script>
@endsection

@section('titolo_h1', 'Qual è la tua password?')

@section('dati')
    <div id="dati_accesso">

        <span id="email">
            {{ session('email') }}
        </span>

        <a id="modifica" href="{{ url('authentication/login') }}">
            Modifica
        </a>

    </div>
@endsection

@section('form')

    @if (request('errore') === 'password_errata')
        <div id = 'pass_sbagl'>
            <img src='../Images/exclamation.png'>
            <span>Le credenziali non sono valide </span>
        </div>
    @endif

    <form id="form" name='login_form' action='{{ url('authentication/password_check') }}' method='post'>
        @csrf

        <input type="password" name="password" placeholder="Password*" id="form_password">

        <p id="forgotten">
            <a href="#"> Hai dimenticato la password? </a>
        </p>

        <input type="submit" value="Accedi" id="login_button">
    </form>
@endsection
