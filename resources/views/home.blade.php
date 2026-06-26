@extends('layouts.app')

@section('titolo_pagina')
    <title>Nike. Just Do It . Nike IT</title>
@endsection

@section('css_href')
    <link rel="stylesheet" href= "{{ url('Css/home/home.css') }}" />
@endsection

@section('js_src')
    <script src="{{ url('JavaScript/home/home.js') }}" defer></script>
@endsection

@section('contenuto_informativo')
    <section id="sezione-1">

        <a href="#"></a>

        <div id="sezione-1-container">

            <div id="sezione1-title">
                JOGA SINISTRO
            </div>

            <div id="sezione1-text">
                Brasil Futebol x Jordan Brand. Consideralo un avvertimento.
            </div>

            <div class="buttons">
                Scopri
            </div>

        </div>

    </section>

    <section id="sezione-2">

        <div class="sezione-2-container">


            <div class="sezione-2-img" id="sezione-2-img1">
                <a href="#"></a>

                <div class="sezione-2-container2">

                    <div id="sezione-2-title1">
                        NikeSKIMS
                    </div>

                    <div id="sezione-2-text1">
                        Collezione Spring '26 per la palestra
                    </div>

                    <div class="buttons">
                        Scopri
                    </div>

                </div>

            </div>


            <div class="sezione-2-img" id="sezione-2-img2">
                <a href="#"></a>

                <div class="sezione-2-container2">

                    <div id="sezione-2-title2">
                        Air Max
                    </div>

                    <div id="sezione-2-text2">
                        Above the Influence
                    </div>

                    <div class="sezione-2-container-btns">

                        <div class="buttons acquista">
                            Acquista
                        </div>

                        <div class="buttons">
                            Scopri
                        </div>

                    </div>
                </div>

            </div>
        </div>


        <div class="sezione-2-container">


            <div class="sezione-2-img" id="sezione-2-img3">
                <a href="#"></a>

                <div class="sezione-2-container2">

                    <div id="sezione-2-title3">
                        Nike Style By
                    </div>

                    <div id="sezione-2-text3">
                        Not Here To Be Liked
                    </div>

                    <div class="sezione-2-container-btns">

                        <div class="buttons acquista">
                            Acquista
                        </div>

                        <div class="buttons" id="lkbk">
                            LookBook
                        </div>

                    </div>

                </div>

            </div>


            <div class="sezione-2-img" id="sezione-2-img4">
                <a href="#"></a>

                <div class="sezione-2-container2">

                    <div id="sezione-2-title4">
                        Nike Running
                    </div>

                    <div id="sezione-2-text4">
                        Fast Pack
                    </div>

                    <div class="buttons acquista">
                        Acquista
                    </div>

                </div>

            </div>
        </div>

    </section>

    <section id="sezione-3">

        <div class="sezione-3-container">
            <a href="#"></a>

            <div class="sezione-3-container">

                <div id="sezione-3-title">
                    Kylian Mbappé Mercurial Superfly
                </div>

                <div id="sezione-3-text">
                    Raised on Air
                </div>

                <div id="sezione-3-container-btns">

                    <div class="buttons" id="tim-btn">
                        Tutti i modelli
                    </div>

                    <div class="buttons">
                        Kids
                    </div>

                </div>

            </div>

        </div>

    </section>

    <section id="sezione-4">

        <div id="sezione-4-top">

            <div id="scorrimento-sezione-4-top">

                <span>Acquista le nostre icone</span>

                <div class="arrow-btns" id="next-arrow">
                    <img src="{{ url('Images/freccetta.png') }}">
                </div>

                <div class="arrow-btns disabilitato" id="back-arrow">
                    <img src="{{ url('Images/freccetta_min.png') }}">
                </div>

            </div>

            <div id="sezione-4-container">

                <div class="sezione-4-img" id="img1-s4" data-position="1" data-pos-attuale="1">
                    <a href="#"></a>

                    <div class="buttons" id="airforce">
                        Air Force 1
                    </div>

                </div>

                <div class="sezione-4-img" id="img2-s4" data-position="2" data-pos-attuale="2">
                    <a href="#"></a>

                    <div class="buttons">
                        Air Max
                    </div>

                </div>

                <div class="sezione-4-img" id="img3-s4" data-position="3" data-pos-attuale="3">
                    <a href="#"></a>

                    <div class="buttons">
                        P-6000
                    </div>

                </div>

                <div class="sezione-4-img hidden" id="img4-s4" data-position="4" data-pos-attuale="4">
                    <a href="#"></a>

                    <div class="buttons">
                        Shox
                    </div>

                </div>

                <div class="sezione-4-img hidden" id="img5-s4" data-position="5" data-pos-attuale="5">
                    <a href="#"></a>

                    <div class="buttons">
                        Air Jordan
                    </div>

                </div>

                <div class="sezione-4-img hidden" id="img6-s4" data-position="6" data-pos-attuale="6">
                    <a href="#"></a>

                    <div class="buttons">
                        Pegasus
                    </div>

                </div>

                <div class="sezione-4-img hidden" id="img7-s4" data-position="7" data-pos-attuale="7">
                    <a href="#"></a>

                    <div class="buttons">
                        Vomero
                    </div>

                </div>

                <div class="sezione-4-img hidden" id="img8-s4" data-position="8" data-pos-attuale="8">
                    <a href="#"></a>

                    <div class="buttons">
                        Metcon
                    </div>

                </div>

                <div class="sezione-4-img hidden" id="img9-s4" data-position="9" data-pos-attuale="9">
                    <a href="#"></a>

                    <div class="buttons">
                        Mercurial
                    </div>

                </div>

            </div>

        </div>

        <div id="sezione-4-bottom">

            <div id="sezione-4-scarpe" class="s4-dist">
                <p class="sezione-4-bottom-title"> Scarpe </p>
                <p class="sezione-4-bottom-text">
                    <a href="#"><span>Scarpe da running nere</span></a><br>
                    <a href="#"><span>Scarpe da running bla...</span></a><br>
                    <a href="#"><span>Scarpe Nike P-6000</span></a><br>
                    <a href="#"><span>Scarpe Nike Initiator</span></a>
                </p>
            </div>

            <div id="sezione-4-abbigliamento" class="s4-dist">
                <p class="sezione-4-bottom-title"> Abbigliamento </p>
                <p class="sezione-4-bottom-text">
                    <a href="#"><span>Pantaloni da yoga</span></a><br>
                    <a href="#"><span>Pantaloni jogger Tech...</span></a><br>
                    <a href="#"><span>Tech Fleece</span></a>
                </p>
            </div>

            <div id="sezione-4-bambini" class="s4-dist">
                <p class="sezione-4-bottom-title"> Bambini </p>
                <p class="sezione-4-bottom-text">
                    <a href="#"><span>Scarpe nere per bambi...</span></a><br>
                    <a href="#"><span>Scarpe nere kids</span></a>
                </p>
            </div>

            <div id="sezione-4-inevidenza" class="s4-dist">
                <p class="sezione-4-bottom-title"> In evidenza </p>
                <p class="sezione-4-bottom-text">
                    <a href="#"><span>Squadre di calcio</span></a><br>
                    <a href="#"><span>Calcio</span></a><br>
                    <a href="#"><span>Nike Inghilterra</span></a><br>
                    <a href="#"><span>Nike Run Club</span> </a>
                </p>
            </div>

        </div>

    </section>
@endsection
