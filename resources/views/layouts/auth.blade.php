<!DOCTYPE html>
<html>

<head>
    @yield('titolo_pagina')
    @yield('css_href')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @yield('js_src')
    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet">
</head>

<body>
    <article>

        <div id="loghi">

            <img id="nike" src="{{ url('Images/logo-nero.png') }}">

            <img id="jordan" src="{{ url('Images/jordan_logo.png') }}">

        </div>

        <h1>
            @yield('titolo_h1')
        </h1>

        @yield('dati')

        @yield('form')

    </article>
</body>

</html>
