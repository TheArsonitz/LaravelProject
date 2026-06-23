@extends('layouts.auth')

@section('titolo_pagina')
    <title>Ti diamo il benvenuto in Nike - Accedi</title>
@endsection

@section('css_href')
    <link rel="stylesheet" href="{{ url('Css/authentication/login.css') }}" />
@endsection

@section('js_src')
    <script src="{{ url('JavaScript/authentication/login.js') }}" defer></script>
@endsection

@section('titolo_h1', 'Inserisci la tua e-mail per unirti a noi o accedi')

@section('dati')
    <div id="nazionalità">

        <span id="nazione">
            Italia
        </span>

        <span id="modifica">
            Modifica
        </span>

    </div>
@endsection

@section('form')

    @if ($errors->any())
        <div id = "errore_php">
            @foreach ($errors->all() as $errore)
                <img src="{{ url('Images/exclamation.png') }}">
                <span> {{ $errore }} </span>
            @endforeach
        </div>
    @endif

    <form id="form" name='login_form' action='{{ url('authentication/check_email') }}' method='post'>
        @csrf
        <input type="text" name="email" placeholder="E-mail*" id="form_email">

        <p id="condizioni_uso">
            Continuando, accetti le <a href="{{ url('condizioniUso') }}">condizioni d'uso</a>
            di Nike
            e confermi di aver letto <a href="#">l'informativa sulla privacy</a>
            di Nike
        </p>

        <div id="container_button"><input type="submit" value="Continua" id="login_button"></div>
    </form>
@endsection
