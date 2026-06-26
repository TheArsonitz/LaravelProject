<!DOCTYPE html>
<html>

<head>
    @yield('titolo_pagina')
    @yield('css_href')
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @yield('js_src')
    <script>
        urlPreferiti = "{{ url('preferiti') }}";
    </script>
    <script>
        urlGestioneAccount = "{{ url('/gestione_account/account') }}";
    </script>
    <script>
        urlLogout = "{{ url('/authentication/logout') }}";
    </script>
    <script>
        urlLogin = "{{ url('/authentication/login') }}";
    </script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Google Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet">
</head>

<body>

    @if ($auth)
        <input type='hidden' id='stato_autenticazione' value= 'vero'>
    @else
        <input type='hidden' id='stato_autenticazione' value= 'falso'>
    @endif

    <header id="home-page-header">

        <nav id="top-nav">

            <div id="top-nav-imgs">
                <a href="#"><img id="jrdn-logo" src="{{ url('Images/Jumpman_logo.png') }}"></a>
                <a href="#"><img id="cnvrs-logo" src="{{ url('Images/Converse_logo.png') }}"></a>
            </div>

            <div id="menu">
                <a href="#"><span>Trova un negozio</span></a>
                <span class="divider"> | </span>
                <div id="help-container">
                    <a href="#">Aiuto</a>
                    <div id="help-panel">
                        <div id="help-menu-panel">
                            <span id="help-menu-panel-title"> <a href="#">Aiuto</a></span><br>
                            <span class="help-menu-panel-section"><a href="#">Stato ordine</a></span><br>
                            <span class="help-menu-panel-section"><a href="#">Spedizione e consegna</a></span><br>
                            <span class="help-menu-panel-section"><a href="#">Restituzioni</a></span><br>
                            <span class="help-menu-panel-section"><a href="#">Tabelle delle taglie e delle
                                    misure</a></span><br>
                            <span class="help-menu-panel-section"><a href="#">Contattaci</a></span><br>
                            <span class="help-menu-panel-section"><a href="#">Informazioni sulla
                                    privacy</a></span><br>
                            <span class="help-menu-panel-section"><a href="#">Condizioni di vendita</a></span><br>
                            <span class="help-menu-panel-section"><a href="#">Condizioni d'uso</a></span><br>
                            <span class="help-menu-panel-section"><a href="#">Invia feedback</a></span><br>
                        </div>
                    </div>
                </div>
                <span class="divider"> | </span>

                @if ($auth)
                    <div id="login-container">
                        <a href="#"> Ciao, {{ $nome }} <img src="{{ url('Images/user.png') }}"> </a>
                        <div id="login-panel">
                            <div id="login-menu-panel">
                                <span id="login-menu-panel-title"> <a href="#">Account</a></span><br>
                                <span class="login-menu-panel-section"><a href="#">Profilo</a></span><br>
                                <span class="login-menu-panel-section"><a href="#">Ordini</a></span><br>
                                <span class="login-menu-panel-section"><a
                                        href="{{ url('/preferiti') }}">Preferiti</a></span><br>
                                <span class="login-menu-panel-section"><a href="#">Esperienze</a></span><br>
                                <span class="login-menu-panel-section"><a
                                        href="{{ url('gestione_account/account') }}">Impostazioni
                                        account</a></span><br>
                                <span class="login-menu-panel-section"><a
                                        href="{{ url('authentication/logout') }}">Esci</a></span><br>
                            </div>
                        </div>
                    </div>
                @else
                    <a href="#"><span>Unisciti a noi</span></a>
                    <span class="divider"> | </span>
                    <a href="{{ url('authentication/login') }}"><span>Accedi</span></a>
                @endif


            </div>

        </nav>

        <nav id="bottom-nav">

            <div id="bottom-nav-imgs">
                <a href="{{ url('home') }}"><img id="nike-logo" src="{{ url('Images/Logo_NIKE.png') }}"></a>
            </div>

            <div class="categories">

                <div class="categories-panel">
                    <a href="#"><span>Novità</span></a>
                    <div class="panel-menu-ctgrs" id="Novità-panel">

                        <div class="menu-ctgrs-container">

                            <div>
                                <a href="#">
                                    <h4>Novità</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutti i nuovi arrivi</span></a><br>
                                    <a href="#"><span>Best seller</span></a><br>
                                    <a href="#"><span>Calendario dei lanci SNKRS</span></a><br>
                                    <a href="#"><span>Novità: divise delle nazionali '26</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Highlights</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Jordan x Brasil Futebol</span></a><br>
                                    <a href="#"><span>Novità scarpe: Kylian Mbappé</span></a><br>
                                    <a href="#"><span>Il mondo Nike Tech</span></a><br>
                                    <a href="#"><span>Jordan: Day to Night</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Di tendenza</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Scarpe da maratona</span></a><br>
                                    <a href="#"><span>Abbigliamento sportswear</span></a><br>
                                    <a href="#"><span>Scarpe da calcio Elite</span></a><br>
                                    <a href="#"><span>Nike By You: scarpe personalizzate</span></a><br>
                                    <a href="#"><span>Set da palestra</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Brand</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Nike Sportswear</span></a><br>
                                    <a href="#"><span>ACG: All Conditions Gear</span></a><br>
                                    <a href="#"><span>Jordan</span></a><br>
                                    <a href="#"><span>Kobe</span></a><br>
                                    <a href="#"><span>NOCTA</span></a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="categories-panel">
                    <a href="#"><span>Uomo</span></a>
                    <div class="panel-menu-ctgrs" id="Uomo-panel">
                        <div class="menu-ctgrs-container">

                            <div>
                                <a href="#">
                                    <h4>Highlights</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Novità - Uomo</span></a><br>
                                    <a href="#"><span>Best seller</span></a><br>
                                    <a href="#"><span>Nuove scarpe: Kylian Mbappé</span></a><br>
                                    <a href="#"><span>Abbigliamento streetwear</span></a><br>
                                    <a href="#"><span>Il mondo Air Max</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Scarpe</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutte le scarpe</span></a><br>
                                    <a href="#"><span>Lifestyle</span></a><br>
                                    <a href="#"><span>Jordan</span></a><br>
                                    <a href="#"><span>Running</span></a><br>
                                    <a href="#"><span>Calcio</span></a><br>
                                    <a href="#"><span>Basket</span></a><br>
                                    <a href="#"><span>Training e palestra</span></a><br>
                                    <a href="#"><span>Skateboard</span></a><br>
                                    <a href="#"><span>Scarpe personalizzate</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Abbigliamento</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutto l'abbigliamento</span></a><br>
                                    <a href="#"><span>Felpe</span></a><br>
                                    <a href="#"><span>Pantaloni e tights</span></a><br>
                                    <a href="#"><span>Tute</span></a><br>
                                    <a href="#"><span>Giacche</span></a><br>
                                    <a href="#"><span>Top e t-shirt</span></a><br>
                                    <a href="#"><span>Shorts</span></a><br>
                                    <a href="#"><span>Divise e maglie</span></a><br>
                                    <a href="#"><span>Accessori</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Sport</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Running</span></a><br>
                                    <a href="#"><span>Calcio</span></a><br>
                                    <a href="#"><span>Basket</span></a><br>
                                    <a href="#"><span>Training e palestra</span></a><br>
                                    <a href="#"><span>Tennis</span></a><br>
                                    <a href="#"><span>Golf</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Brand</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Nike Sportswear</span></a><br>
                                    <a href="#"><span>ACG: All Conditions Gear</span></a><br>
                                    <a href="#"><span>Jordan</span></a><br>
                                    <a href="#"><span>Kobe</span></a><br>
                                    <a href="#"><span>NOCTA</span></a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="categories-panel">
                    <a href="#"><span>Donna</span></a>
                    <div class="panel-menu-ctgrs" id="Donna-panel">
                        <div class="menu-ctgrs-container">

                            <div>
                                <a href="#">
                                    <h4>Highlights</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Novità - Donna</span></a><br>
                                    <a href="#"><span>Best seller</span></a><br>
                                    <a href="#"><span>Style By: i trend del momento</span></a><br>
                                    <a href="#"><span>Pack abbigliamento stagionale</span></a><br>
                                    <a href="#"><span>Novità per il calcio: Alexia Putellas</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Scarpe</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutte le scarpe</span></a><br>
                                    <a href="#"><span>Lifestyle</span></a><br>
                                    <a href="#"><span>Jordan</span></a><br>
                                    <a href="#"><span>Running</span></a><br>
                                    <a href="#"><span>Training e palestra</span></a><br>
                                    <a href="#"><span>Calcio</span></a><br>
                                    <a href="#"><span>Scarpe personalizzate</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Abbigliamento</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutto l'abbigliamento</span></a><br>
                                    <a href="#"><span>Felpe</span></a><br>
                                    <a href="#"><span>Pantaloni</span></a><br>
                                    <a href="#"><span>Leggings</span></a><br>
                                    <a href="#"><span>Set coordinati</span></a><br>
                                    <a href="#"><span>Giacche</span></a><br>
                                    <a href="#"><span>Top e t-shirt</span></a><br>
                                    <a href="#"><span>Shorts</span></a><br>
                                    <a href="#"><span>Reggiseni sportivi</span></a><br>
                                    <a href="#"><span>Accessori</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Sport</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Training e palestra</span></a><br>
                                    <a href="#"><span>Running</span></a><br>
                                    <a href="#"><span>Calcio</span></a><br>
                                    <a href="#"><span>Basket</span></a><br>
                                    <a href="#"><span>Tennis</span></a><br>
                                    <a href="#"><span>Yoga</span></a><br>
                                    <a href="#"><span>Golf</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Brand</h4>
                                </a>
                                <p>
                                    <a href="#"><span>NikeSKIMS</span></a><br>
                                    <a href="#"><span>Nike Sportswear</span></a><br>
                                    <a href="#"><span>ACG: All Conditions Gear</span></a><br>
                                    <a href="#"><span>Jordan</span></a><br>
                                    <a href="#"><span>Kobe</span></a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="categories-panel">
                    <a href="#"><span>Kids</span></a>
                    <div class="panel-menu-ctgrs" id="Kids-panel">
                        <div class="menu-ctgrs-container">

                            <div>
                                <a href="#">
                                    <h4>Highlights</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Novità - Kids</span></a><br>
                                    <a href="#"><span>Best seller</span></a><br>
                                    <a href="#"><span>Teenager</span></a><br>
                                    <a href="#"><span>Collezione Nike x LEGO®</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Scarpe</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutte le scarpe</span></a><br>
                                    <a href="#"><span>Lifestyle</span></a><br>
                                    <a href="#"><span>Jordan</span></a><br>
                                    <a href="#"><span>Calcio</span></a><br>
                                    <a href="#"><span>Running</span></a><br>
                                    <a href="#"><span>Basket</span></a><br>
                                    <a href="#"><span>Educazione fisica</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Abbigliamento</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutto l'abbigliamento</span></a><br>
                                    <a href="#"><span>Felpe</span></a><br>
                                    <a href="#"><span>Pantaloni e leggings</span></a><br>
                                    <a href="#"><span>Giacche</span></a><br>
                                    <a href="#"><span>Tute</span></a><br>
                                    <a href="#"><span>Maglie e t-shirt</span></a><br>
                                    <a href="#"><span>Shorts</span></a><br>
                                    <a href="#"><span>Divise e maglie</span></a><br>
                                    <a href="#"><span>Accessori</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Kids per età</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Teenager (13-17 anni)</span></a><br>
                                    <a href="#"><span>Ragazzo/a (7-12 anni)</span></a><br>
                                    <a href="#"><span>Bambino/a (3-7 anni)</span></a><br>
                                    <a href="#"><span>Bebè e bimbo/a (0-3 anni)</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Sport</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Running</span></a><br>
                                    <a href="#"><span>Calcio</span></a><br>
                                    <a href="#"><span>Basket</span></a><br>
                                    <a href="#"><span>Educazione fisica</span></a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="categories-panel">
                    <a href="#"><span>Sport</span></a>
                    <div class="panel-menu-ctgrs" id="Sport-panel">
                        <div class="menu-ctgrs-container">

                            <div>
                                <a href="#">
                                    <h4>Highlights</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Novità: articoli sportivi</span></a><br>
                                    <a href="#"><span>Best seller</span></a><br>
                                    <a href="#"><span>Novità: divise delle nazionali '26</span></a><br>
                                    <a href="#"><span>Scarpe da running: Pegasus 42</span></a><br>
                                    <a href="#"><span>Novità scarpe: Jordan Basketball</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Running</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutti gli articoli da running</span></a><br>
                                    <a href="#"><span>Scarpe</span></a><br>
                                    <a href="#"><span>Abbigliamento</span></a><br>
                                    <a href="#"><span>Accessori</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Calcio</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutti gli articoli da calcio</span></a><br>
                                    <a href="#"><span>Scarpe</span></a><br>
                                    <a href="#"><span>Abbigliamento</span></a><br>
                                    <a href="#"><span>Accessori</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Training e palestra</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutti gli articoli da training e palestra</span></a><br>
                                    <a href="#"><span>Scarpe</span></a><br>
                                    <a href="#"><span>Abbigliamento</span></a><br>
                                    <a href="#"><span>Accessori</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Altri sport</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutti gli sport</span></a><br>
                                    <a href="#"><span>Basket</span></a><br>
                                    <a href="#"><span>Tennis</span></a><br>
                                    <a href="#"><span>Yoga</span></a><br>
                                    <a href="#"><span>Golf</span></a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="categories-panel">
                    <a href="#"><span>NikeSKIMS</span></a>
                    <div class="panel-menu-ctgrs" id="NikeSKIMS-panel">
                        <div class="menu-ctgrs-container">

                            <div>
                                <a href="#">
                                    <h4>Guide NikeSKIMS</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Lookbook NikeSKIMS</span></a><br>
                                    <a href="#"><span>Guida ai bra NikeSKIMS</span></a><br>
                                    <a href="#"><span>Guida alla collezione NikeSKIMS</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Abbigliamento</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutto l'abbigliamento</span></a><br>
                                    <a href="#"><span>Bra</span></a><br>
                                    <a href="#"><span>Maglie e canotte</span></a><br>
                                    <a href="#"><span>Leggings</span></a><br>
                                    <a href="#"><span>Shorts</span></a><br>
                                    <a href="#"><span>Scarpe</span></a><br>
                                    <a href="#"><span>Accessori</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Collezioni</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Tutte le collezioni</span></a><br>
                                    <a href="#"><span>Shine</span></a><br>
                                    <a href="#"><span>Matte</span></a><br>
                                    <a href="#"><span>Ribbed Seamless</span></a><br>
                                    <a href="#"><span>Stretch Knit</span></a><br>
                                    <a href="#"><span>Weightless</span></a>
                                </p>
                            </div>

                            <div>
                                <a href="#">
                                    <h4>Acquista per colore</h4>
                                </a>
                                <p>
                                    <a href="#"><span>Obsidian</span></a><br>
                                    <a href="#"><span>Dark Sepia</span></a><br>
                                    <a href="#"><span>Phoenix</span></a><br>
                                    <a href="#"><span>Himalayan</span></a><br>
                                    <a href="#"><span>Dune</span></a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div class="buttons">

                <div id="search-bar">
                    <img src="{{ url('Images/search-img.png') }}">
                    <span>Cerca</span>
                </div>

                <div id="mobile-search-bar">
                    <img src="{{ url('Images/search-img.png') }}">
                    <div id="mobile-search-overlay" class="overlay"></div>
                </div>

                <div id="mobile-user-icon">
                    @if ($auth)
                        <a href="{{ url('gestione_account/account') }}"><img src="{{ url('Images/user.png') }}"></a>
                    @else
                        <a href="{{ url('authentication/login') }}"><img src="{{ url('Images/user.png') }}"></a>
                    @endif
                    <div id="user-icon-overlay" class="overlay"></div>
                </div>

                <div id="favourite-products">
                    <a href="{{ url('/preferiti') }}"><img src="{{ url('Images/heart-img.png') }}"></a>
                    <div id="favourite-products-overlay" class="overlay"></div>
                </div>

                <div id="shopping-bag-products">
                    <a href="#"><img src="{{ url('Images/shopping-bag.png') }}"></a>
                    <div id="shopping-bag-overlay" class="overlay"></div>
                </div>

                <div id="mobile-menu-btmnav">
                    <div class="linea"></div>
                    <div class="linea"></div>
                    <div class="linea"></div>
                    <div id="mobile-menu-overlay" class="overlay"></div>
                </div>

            </div>

        </nav>

    </header>

    <article>

        @yield('contenuto_informativo')

        <footer>

            <div id="top-footer-divider"> </div>

            <div id="top-footer">

                <div id="top-footer-menu">

                    <div id="Risorse-top-footer">
                        <p class="title-top-footer">
                            <a href="#"><span>Risorse</span></a>
                        </p>

                        <p class="text-top-footer">
                            <a href="#"><span>Gift card</span></a><br>
                            <a href="#"><span>Gift card aziendali</span></a><br>
                            <a href="#"><span>Trova un negozio</span></a><br>
                            <a href="#"><span>Nike Journal</span></a><br>
                            <a href="#"><span>Diventa memeber</span></a><br>
                            <a href="#"><span>Feedback</span></a><br>
                            <a href="#"><span>Codici promozionali</span></a><br>
                            <a href="#"><span>Consigli sui prodotti</span></a><br>
                            <a href="#"><span>Shoe Finder - Running</span></a>
                        </p>

                        <p class="title-top-footer mobile-v">
                            <span>Risorse</span>
                            <img src="{{ url('Images/arrow-down.png') }}">
                        </p>

                    </div>

                    <div id="Assistenza-top-footer">
                        <p class="title-top-footer">
                            <a href="#"><span>Assistenza</span></a>
                        </p>

                        <p class="text-top-footer">
                            <a href="#"><span>Assistenza</span></a><br>
                            <a href="#"><span>Stato Ordine</span></a><br>
                            <a href="#"><span>Spedizione e consegna</span></a><br>
                            <a href="#"><span>Resi</span></a><br>
                            <a href="#"><span>Opzioni di pagamento</span></a><br>
                            <a href="#"><span>Contattaci</span></a><br>
                            <a href="#"><span>Recensioni</span></a><br>
                            <a href="#"><span>Assistenza Codici promozionali Nike</span></a>
                        </p>

                        <p class="title-top-footer mobile-v">
                            <span>Assistenza</span>
                            <img src="{{ url('Images/arrow-down.png') }}">
                        </p>

                    </div>

                    <div id="Azienda-top-footer">
                        <p class="title-top-footer">
                            <a href="#"><span>Azienda</span></a>
                        </p>

                        <p class="text-top-footer">
                            <a href="#"><span>Informazioni su Nike</span></a><br>
                            <a href="#"><span>News</span></a><br>
                            <a href="#"><span>Lavora con noi</span></a><br>
                            <a href="#"><span>Investitori</span></a><br>
                            <a href="#"><span>Sostenibilità</span></a><br>
                            <a href="#"><span>Accessibilità</span></a><br>
                            <a href="#"><span>Obiettivo</span></a><br>
                            <a href="#"><span>Nike Coaching</span></a><br>
                            <a href="#"><span>Segnala un problema</span></a><br>
                        </p>

                        <p class="title-top-footer mobile-v">
                            <span>Azienda</span>
                            <img src="{{ url('Images/arrow-down.png') }}">
                        </p>

                    </div>

                    <div id="Sconto-top-footer">
                        <p class="title-top-footer">
                            <a href="#"><span>Sconto Community</span></a>
                        </p>

                        <p class="text-top-footer">
                            <a href="#"><span>Studenti e studentesse</span></a><br>
                            <a href="#"><span>Personale docente</span></a><br>
                            <a href="#"><span>Operatori di emergenza</span></a><br>
                            <a href="#"><span>Personale sanitario</span></a><br>
                        </p>

                        <p class="title-top-footer mobile-v">
                            <span>Sconto Community</span>
                            <img src="{{ url('Images/arrow-down.png') }}">
                        </p>

                    </div>

                </div>

                <div id="top-footer-località">
                    <img src="{{ url('Images/icons-globe.png') }}">
                    <span>
                        @if ($auth)
                            {{ $paese }}
                        @else
                            Italia
                        @endif
                    </span>
                </div>

            </div>

            <div id="bottom-footer">

                <span id="license">© 2026 Nike, Inc. Tutti i diritti riservati</span>

                <div id="Guide-panel">

                    <span>Guide</span>

                    <img src="{{ url('Images/arrow-down.png') }}">

                    <div id="panel-btmftr">
                        <a href="#"><span>Nike Air</span></a>
                        <a href="#"><span>Nike Air Max</span></a>
                        <a href="#"><span>Nike FlyEase</span></a>
                        <a href="#"><span>Nike Pegasus</span></a>
                        <a href="#"><span>Nike React</span></a>
                        <a href="#"><span>Nike Vaporfly</span></a>
                    </div>

                </div>

                <a href="#"><span>Condizioni d'uso</span></a>

                <a href="#"><span>Condizioni di vendita</span></a>

                <a href="#"><span>Info legali e societarie</span></a>

                <a href="#"><span>Informativa sulla privacy e sui cookie</span></a>

                <a href="#"><span>Impostazioni relative a privacy e cookie</span></a>

            </div>

        </footer>

    </article>

</body>

</html>
