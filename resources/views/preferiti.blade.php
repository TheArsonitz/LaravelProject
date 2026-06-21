@extends('layouts.app')

@section('titolo_pagina')
    <title>Nike Store. Preferiti.</title>
@endsection

@section('css_href')
    <link rel="stylesheet" href= "{{ url('Css/preferiti/preferiti.css') }}" />
@endsection

@section('js_src')
    <script src="{{ url('JavaScript/preferiti/preferiti.js') }}" defer></script>
@endsection

@section('contenuto_informativo')
    <section id="sezione-preferiti">

        <h3>Preferiti</h3>

    </section>
@endsection
