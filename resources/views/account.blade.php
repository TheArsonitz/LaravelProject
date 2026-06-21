@extends('layouts.app')

@section('titolo_pagina')
    <title>Impostazioni account Nike.com</title>
@endsection

@section('css_href')
    <link rel="stylesheet" href= "{{ url('Css/gestione_account/account.css') }}" />
@endsection

@section('js_src')
    <script src="{{ url('JavaScript/gestione_account/account.js') }}" defer></script>
@endsection

@section('contenuto_informativo')
    <section id="sezione-gestione-account">

        <h3>Impostazioni</h3>

        <div id="container_impostazioni">
            <div class="impostazioni"><img src="{{ url('Images/user.png') }}"><a>Dettagli account</a></div>
            <div class="impostazioni"><img src="{{ url('Images/metodi_pagamento.png') }}"><a>Metodi di pagamento</a></div>
            <div class="impostazioni"><img src="{{ url('Images/indirizzo_consegna.png') }}"><a>Indirizzi di consegna</a></div>
            <div class="impostazioni"><img src="{{ url('Images/preferenze_acquisto.png') }}"><a>Preferenze di acquisto</a>
            </div>
            <div class="impostazioni"><img src="{{ url('Images/preferenza_comunicazioni.png') }}"><a>Preferenze sulle
                    comunicazioni</a></div>
            <div class="impostazioni"><img src="{{ url('Images/visibilità_profilo.png') }}"><a>Visibilità del profilo</a>
            </div>
            <div class="impostazioni"><img src="{{ url('Images/account_collegati.png') }}"><a>Account legati</a></div>
            <div class="impostazioni"><img src="{{ url('Images/privacy.png') }}"><a>Privacy</a></div>
        </div>

        <div id="container_forms">

            <h3>Dettagli account</h3>

            <form name='form_informazioni_utente' action='{{ url('gestione_account/aggiorna_account') }}' method='POST'
                id="form_utente">

                @csrf

                <div class="informazioni_utente">
                    <label for="field_email">E-mail</label>
                    <input type="text" name="email" id="field_email">
                </div>

                <div class="informazioni_utente">
                    <label for="field_password">Password</label>
                    <input type="password" name="password" placeholder="Inserisci per modificare" id="field_password">
                </div>

                <div class="informazioni_utente">
                    <label for="field_telefono">Telefono</label>
                    <input type="text" name="telefono" id="field_telefono">
                </div>

                <div class="informazioni_utente">
                    <label for="data_n">Data di nascita</label>
                    <input type="text" name="data_nascita" id="data_n" placeholder="AAAA-MM-GG">
                </div>

                <div class="informazioni_utente">
                    <label for="paese">Paese/regione</label>
                    <select name="paese" id="paese">
                        <option value="Italia">Italia</option>
                        <option value="Belgio">Belgio</option>
                        <option value="Francia">Francia</option>
                        <option value="Spagna">Spagna</option>
                        <option value="Portogallo">Portogallo</option>
                        <option value="Germania">Germania</option>
                    </select>
                </div>

                <input type="submit" name='salva_modifiche' value="Salva" id="salva_impostazioni">
            </form>

            <form name="form_elimina_account" action="{{ url('gestione_account/elimina_account') }}" method="POST"
                id="form_elimina">
                @csrf
                <span>Elimina account</span>
                <input type='submit' name="elimina_account" value="Elimina" id="elimina">
            </form>

        </div>

    </section>
@endsection
