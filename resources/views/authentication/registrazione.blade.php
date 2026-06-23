@extends('layouts.auth')

@section('titolo_pagina')
    <title>Ti diamo il benvenuto in Nike - Accedi</title>
@endsection

@section('css_href')
    <link rel="stylesheet" href="{{ url('Css/authentication/registrazione.css') }}" />
@endsection

@section('js_src')
    <script src="{{ url('JavaScript/authentication/registrazione.js') }}" defer></script>
@endsection

@section('titolo_h1', 'Ora ti faremo diventare Member Nike.')

@section('dati')
    <div id="dati_registrazione">

        <span id="email">
            {{ session('email') }}
        </span>

        <a id="modifica" href="{{ url('authentication/login') }}">
            Modifica
        </a>

    </div>
@endsection



@section('form')

    @if ($errors->any())
        <div class="errore">
            <span> Qualcosa è andato storto, riprova. </span>
        </div>
    @endif

    <form id="form" name='registrazione_form' action='{{ url('authentication/registrazione') }}' method='post'>

        @csrf

        <div id="container_nomcogn">

            <input type="text" name="nome" placeholder="Nome*" id="form_nome" class="campo_form"
                value="{{ old('nome') }}">

            <input type="text" name="cognome" placeholder="Cognome*" id="form_cognome" class="campo_form"
                value="{{ old('cognome') }}">

        </div>

        <input type="password" name="password" placeholder="Password*" id="form_password" class="campo_form">

        <p id="reg1" class="regole">× Almeno 8 caratteri</p>

        <p id="reg2" class="regole">× Lettere maiuscole, minuscole e un numero</p>

        <div id="pref_acqu" class="campo_form"><span id="testo_pref">Preferenza di acquisto*</span><img
                src="{{ url('Images/arrow-down.png') }}"></div>

        <p id="data">Data di nascita</p>

        <div id="container_data">

            <input type="text" name="giorno" placeholder="Giorno*" id="form_giorno" class="campo_form" data-errore="0"
                value="{{ old('giorno') }}">

            <input type="text" name="mese" placeholder="Mese*" id="form_mese" class="campo_form" data-errore="0"
                value="{{ old('mese') }}">

            <input type="text" name="anno" placeholder="Anno*" id="form_anno" class="campo_form" data-errore="0"
                value="{{ old('anno') }}">

        </div>

        <label class="container_checkbox">
            <input id="fac_check" type='checkbox' name='condizioni[]' value='0'>
            <div id="facoltativo">Iscriviti per ricevere e-mail e aggiornamenti da Nike su prodotti, offerte e vantaggi per
                i member.</div>
        </label>

        <label class="container_checkbox">
            <input id="nec_check" type='checkbox' name='condizioni[]' value='1'>
            <div id="necessario">Accetto le <a href="{{ url('condizioniUso') }}">condizioni d'uso</a> di Nike e
                confermo di aver letto <a href="#">l'informativa sulla privacy</a>
                di Nike.</div>
        </label>

        <input type="submit" value="Crea Account" id="registrazione_button">
    </form>
@endsection
