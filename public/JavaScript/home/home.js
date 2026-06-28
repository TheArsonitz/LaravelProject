const searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("click", apriRicerca);
const mobileSearchBar = document.querySelector("#mobile-search-bar");
mobileSearchBar.addEventListener("click", apriRicerca);


const ricerchePopolari = {
    0: "challenger",
    1: "nike challenger",
    2: "air force 1",
    3: "jordan 4",
    4: "air max",
    5: "scarpe da calcio",
    6: "jordan",
    7: "scarpe"
};

function apriRicerca() {

    const menu = document.querySelector("#home-page-header");


    menu.classList.add("modale");
    document.body.classList.add("no-scroll");
    document.querySelector("#top-nav").classList.add("hidden");
    document.querySelector("#bottom-nav").classList.add("hidden");

    const notificationIcon = document.querySelector("#not-icon");
    if (notificationIcon)
        notificationIcon.classList.add("hidden");


    let structMenu = document.querySelector("#menu-search-bar");
    if (!structMenu) {


        structMenu = document.createElement("div");
        structMenu.id = "menu-search-bar";
        menu.appendChild(structMenu);




        const UpperMenu = document.createElement("div");
        UpperMenu.id = "upper-menu-search-bar";


        const imgUpperMenu = document.createElement("img")
        imgUpperMenu.src = urlImg + "/logo-nero.png";
        imgUpperMenu.id = "nike-logo-newbar";
        imgUpperMenu.dataset.logo = "nero"

        imgUpperMenu.addEventListener("click", function () {
            if (imgUpperMenu.dataset.logo === "nero") {
                imgUpperMenu.src = urlImg + "/logo-arancione.png"
                imgUpperMenu.dataset.logo = "arancione"
            }
            else {
                imgUpperMenu.src = urlImg + "/logo-nero.png"
                imgUpperMenu.dataset.logo = "nero"
            }
        })

        UpperMenu.appendChild(imgUpperMenu);


        const newSearchBar = document.createElement("form");
        newSearchBar.id = "new-search-bar";

        const imgNewSearchBar = document.createElement("img");
        imgNewSearchBar.src = urlImg + "/search-img.png";

        const textSearchBar = document.createElement("input");
        textSearchBar.type = "text";
        textSearchBar.placeholder = "Cerca";
        textSearchBar.id = "text-search-upperbar"

        const inputSearchBar = document.createElement("input");
        inputSearchBar.type = "submit";
        inputSearchBar.classList.add("hidden");


        newSearchBar.addEventListener('submit', ricerca);


        newSearchBar.appendChild(imgNewSearchBar);
        newSearchBar.appendChild(textSearchBar);
        newSearchBar.appendChild(inputSearchBar);

        UpperMenu.appendChild(newSearchBar);


        const exitMenu = document.createElement("div");
        exitMenu.textContent = 'Annulla';
        exitMenu.id = "exit-search-button"
        exitMenu.addEventListener("click", chiudiRicerca);
        UpperMenu.appendChild(exitMenu);


        const BottomMenu = document.createElement("div");
        BottomMenu.id = "bottom-menu-search-bar";

        const boxBottomMenu = document.createElement("div");
        boxBottomMenu.textContent = 'I termini più cercati';
        boxBottomMenu.id = "box-bottom-menu"

        const buttonsSection = document.createElement("div");
        buttonsSection.id = "buttons-menu-search-bar";

        boxBottomMenu.appendChild(buttonsSection);

        BottomMenu.appendChild(boxBottomMenu);

        for (let i = 0; i < 8; i++) {
            let button = document.createElement("div");
            button.classList.add("buttons");
            button.textContent = ricerchePopolari[i];
            buttonsSection.appendChild(button);
        }


        structMenu.appendChild(UpperMenu);
        structMenu.appendChild(BottomMenu);
    }

    else {
        structMenu.classList.remove("hidden");
    }

}




function ricerca(event) {
    event.preventDefault();

    const vecchioErrore = document.querySelector("#errore_aggiunta_login");
    if (vecchioErrore) {
        vecchioErrore.remove();
    }

    const barraRicerca = document.querySelector("#text-search-upperbar");
    const oggettoCercato = barraRicerca.value;

    fetch('api/storeapi').then(SuccessoRichiesta, ErroreDiRete)
        .then(function (json) {

            if (json == null)
                console.log("Si è verificato un errore. Riprova.")
            else {
                fetch('preferiti/ottieni_preferiti')
                    .then(SuccessoRichiesta, ErroreDiRete)
                    .then(function (preferiti) {

                        if (preferiti == null)
                            console.log("Si è verificato un errore. Riprova.");
                        else
                            mostraArticoli(json, oggettoCercato, preferiti);

                    }

                    );
            }

        }
        );

}

function mostraArticoli(articoliJson, oggettoCercato, preferiti) {

    const risultatoRicerca = [];
    let i = 0;
    oggettoCercato = oggettoCercato.toLowerCase();

    for (let articolo of articoliJson) {

        const titleMinusc = articolo.title.toLowerCase();

        if (titleMinusc.includes(oggettoCercato) && i < 3) {
            risultatoRicerca.unshift(articolo);
            i++;
        }

        if (i === 3)
            break;

    }

    if (i !== 0) {

        const notFoundEl = document.querySelector("#search-not-found");
        const vecchiRisultati = document.querySelector("#box-fotos");
        const buttonsSearchBar = document.querySelector("#box-bottom-menu");

        if (notFoundEl) {
            notFoundEl.remove();
        }

        if (vecchiRisultati) {
            vecchiRisultati.remove();
        }
        if (buttonsSearchBar) {
            buttonsSearchBar.classList.add("hidden");
        }

        const bottomMenu = document.querySelector("#bottom-menu-search-bar");

        const boxFoto = document.createElement("div");
        boxFoto.id = "box-fotos";

        for (let j = 0; j < i; j++) {

            const prodotto = risultatoRicerca[j];

            const boxSingolo = document.createElement("div");
            boxSingolo.classList.add("img-box-fotos");

            const imgLike = document.createElement("img");
            imgLike.classList.add("like");
            imgLike.dataset.id = prodotto.id;

            if (preferiti.includes(Number(prodotto.id))) {
                imgLike.src = urlImg + "/clicked_favourite.png";
                imgLike.dataset.pref = 1;
                imgLike.addEventListener("click", rimuoviPreferito);
            } else {
                imgLike.src = urlImg + "/heart-img.png";
                imgLike.dataset.pref = 0;
                imgLike.addEventListener("click", aggiungiPreferito);
            }

            boxSingolo.appendChild(imgLike);

            const img = document.createElement("img");
            img.src = prodotto.image;
            boxSingolo.appendChild(img);

            const titolo = document.createElement("h4");
            titolo.textContent = prodotto.title;
            boxSingolo.appendChild(titolo);

            const categoria = document.createElement("span");
            categoria.textContent = prodotto.category;
            boxSingolo.appendChild(categoria);

            const prezzo = document.createElement("span");
            prezzo.textContent = prodotto.price + "€";
            boxSingolo.appendChild(prezzo);

            boxFoto.appendChild(boxSingolo);
        }

        bottomMenu.appendChild(boxFoto);

    }

    else if (i === 0) {
        const buttonsSearchBar = document.querySelector("#box-bottom-menu");
        buttonsSearchBar.classList.add("hidden");

        const vecchiRisultati = document.querySelector("#box-fotos");
        if (vecchiRisultati) {
            vecchiRisultati.remove();
        }

        const notFoundEl = document.querySelector("#search-not-found");
        if (notFoundEl) {
            notFoundEl.remove();
        }

        const notFound = document.createElement("h2")
        notFound.id = "search-not-found"
        notFound.textContent = "Siamo spiacenti :( , nessun risultato trovato per: " + oggettoCercato;
        const bottomMenu = document.querySelector("#bottom-menu-search-bar");
        bottomMenu.appendChild(notFound);
    }

}


function aggiungiPreferito(event) {

    if (document.querySelector("#stato_autenticazione").value === "falso") {

        if (!document.querySelector("#errore_aggiunta_login")) {
            const erroreLogin = document.createElement("h4");
            erroreLogin.id = "errore_aggiunta_login";
            erroreLogin.textContent = "Per inserire un oggetto tra i preferiti devi prima accedere/registrarti!";
            document.querySelector("#bottom-menu-search-bar").appendChild(erroreLogin);
        }
        return;
    }
    else if (document.querySelector("#stato_autenticazione").value === "vero"
        && document.querySelector("#errore_aggiunta_login")) {

        document.querySelector("#errore_aggiunta_login").remove();

    }

    const prodPref = event.currentTarget;

    prodPref.src = urlImg + "/clicked_favourite.png";

    prodPref.dataset.pref = 1;
    const idProdotto = prodPref.dataset.id;

    formData = new FormData();
    formData.append('_token', document.querySelector('meta[name="csrf-token"]').content);
    formData.append('prodotto_id', idProdotto);
    formData.append('azione', prodPref.dataset.pref);

    const form_data = {
        method: 'post',
        body: formData
    };

    fetch("preferiti/gestione_preferiti", form_data)
        .then(SuccessoRichiesta, ErroreDiRete)
        .then(function (risposta) {
            if (risposta === null)
                console.log("Errore di rete.");
            else
                console.log(risposta.status);
        });

    prodPref.removeEventListener("click", aggiungiPreferito);
    prodPref.addEventListener("click", rimuoviPreferito);

}

function rimuoviPreferito(event) {
    const prodPref = event.currentTarget;

    prodPref.src = urlImg + "/heart-img.png";

    prodPref.dataset.pref = 0;
    const idProdotto = prodPref.dataset.id;


    formData = new FormData();
    formData.append('_token', document.querySelector('meta[name="csrf-token"]').content);
    formData.append('prodotto_id', idProdotto);
    formData.append('azione', prodPref.dataset.pref);

    const form_data = {
        method: 'post',
        body: formData
    };

    fetch("preferiti/gestione_preferiti", form_data)
        .then(SuccessoRichiesta, ErroreDiRete)
        .then(function (risposta) {
            if (risposta === null)
                console.log("Errore di rete.");
            else
                console.log(risposta.status);
        });

    prodPref.removeEventListener("click", rimuoviPreferito);
    prodPref.addEventListener("click", aggiungiPreferito);
}


function chiudiRicerca() {
    const menu = document.querySelector("#home-page-header");
    menu.classList.remove("modale")
    document.body.classList.remove("no-scroll");

    document.querySelector("#top-nav").classList.remove("hidden");
    document.querySelector("#bottom-nav").classList.remove("hidden");

    const structMenu = document.querySelector("#menu-search-bar");
    structMenu.classList.add("hidden");

    const notificationIcon = document.querySelector("#not-icon");
    if (notificationIcon)
        notificationIcon.classList.remove("hidden");

    if (document.querySelector("#box-bottom-menu").classList.contains("hidden")) {

        if (document.querySelector("#box-fotos")) {
            document.querySelector("#box-fotos").remove();
        }
        else {
            document.querySelector("#search-not-found").remove();
        }

        document.querySelector("#box-bottom-menu").classList.remove("hidden");
    }

    if (document.querySelector("#errore_aggiunta_login")) {
        document.querySelector("#errore_aggiunta_login").remove();
    }

    document.querySelector("#text-search-upperbar").value = "";

}



const nextArrow = document.querySelector("#next-arrow");
nextArrow.addEventListener("click", scorriAvanti);

const immCarosello = [];

for (let i = 0; i < 9; i++) {
    immCarosello.push(document.querySelector("#img" + (i + 1) + "-s4"));
}

function scorriAvanti(event) {

    let backArrow = document.querySelector("#back-arrow");
    if (backArrow.classList.contains("disabilitato")) {
        backArrow.classList.remove("disabilitato");
        backArrow.addEventListener("click", scorriIndietro);
    }

    let nextPosizioneReale;
    let posizioneAttuale;

    let finestraVisibile = [];

    for (let i = 0; i < 9; i++) {

        posizioneAttuale = parseInt(immCarosello[i].dataset.posAttuale, 10)

        if (posizioneAttuale === 1 || posizioneAttuale === 2 || posizioneAttuale === 3) {
            finestraVisibile.push(immCarosello[i]);
        }
    }

    nextPosizioneReale = parseInt(finestraVisibile[2].dataset.position) + 1;

    if (nextPosizioneReale <= 9) {

        if (nextPosizioneReale === 9) {
            event.currentTarget.classList.add("disabilitato");
            (event.currentTarget).removeEventListener("click", scorriAvanti);
        }

        for (let imm of immCarosello) {
            if (parseInt(imm.dataset.position, 10) === nextPosizioneReale)
                finestraVisibile.push(imm);
        }

        finestraVisibile[0].dataset.posAttuale = "0";
        finestraVisibile[1].dataset.posAttuale = "1";
        finestraVisibile[2].dataset.posAttuale = "2";
        finestraVisibile[3].dataset.posAttuale = "3";

        finestraVisibile[0].classList.add("hidden");
        finestraVisibile[3].classList.remove("hidden");
        finestraVisibile.shift();
    }

}

function scorriIndietro(event) {

    let nextArrow = document.querySelector("#next-arrow");
    if (nextArrow.classList.contains("disabilitato")) {
        nextArrow.classList.remove("disabilitato");
        nextArrow.addEventListener("click", scorriAvanti);
    }

    let previousPosizioneReale;
    let posizioneAttuale;

    let finestraVisibile = [];

    for (let i = 0; i < 9; i++) {

        posizioneAttuale = parseInt(immCarosello[i].dataset.posAttuale, 10)

        if (posizioneAttuale === 1 || posizioneAttuale === 2 || posizioneAttuale === 3) {
            finestraVisibile.push(immCarosello[i]);
        }
    }

    previousPosizioneReale = parseInt(finestraVisibile[0].dataset.position) - 1;

    if (previousPosizioneReale >= 1) {

        if (previousPosizioneReale === 1) {
            event.currentTarget.classList.add("disabilitato");
            (event.currentTarget).removeEventListener("click", scorriIndietro);
        }

        for (let imm of immCarosello) {
            if (parseInt(imm.dataset.position, 10) === previousPosizioneReale)
                finestraVisibile.unshift(imm);
        }

        finestraVisibile[0].dataset.posAttuale = "1";
        finestraVisibile[1].dataset.posAttuale = "2";
        finestraVisibile[2].dataset.posAttuale = "3";
        finestraVisibile[3].dataset.posAttuale = "0";

        finestraVisibile[0].classList.remove("hidden");
        finestraVisibile[3].classList.add("hidden");
        finestraVisibile.pop();
    }

}





fetch('api/weatherapi')
    .then(SuccessoRichiesta, ErroreDiRete)
    .then(consigliMeteo);

function SuccessoRichiesta(risposta) {
    console.log("Risposta: " + risposta.status);
    if (risposta.ok)
        return risposta.json();

    return null;
}

function ErroreDiRete(error) {
    console.log(error);
    return null;
}

let meteo = null;

function consigliMeteo(json) {
    if (json === null)
        console.log("Nessun dato ricevuto, verifica eventuali errori di stato o di rete!");

    else {
        const notificationIcon = document.createElement("div");
        notificationIcon.id = "not-icon";

        const bellNot = document.createElement("img");
        bellNot.id = "not-bell";
        bellNot.src = urlImg + "/bell_first_not.png";
        notificationIcon.appendChild(bellNot);

        const redNot = document.createElement("div");
        redNot.id = "red-popup-not";
        notificationIcon.appendChild(redNot);

        document.body.appendChild(notificationIcon);

        notificationIcon.addEventListener("click", apriNotifica);

        meteo = json;
    }

}

function apriNotifica() {
    let notifica = document.querySelector("#not-section")

    if (!notifica) {

        notifica = document.createElement("div");
        notifica.id = "not-section";
        notifica.classList.add("modale");
        document.body.classList.add("no-scroll");

        const pannelloNotifica = document.createElement("div");
        pannelloNotifica.id = "not-panel";

        const notificaTitle = document.createElement("div");
        notificaTitle.id = "not-title-box";

        pannelloNotifica.appendChild(notificaTitle);

        notifica.appendChild(pannelloNotifica);

        document.body.appendChild(notifica);

        const notificationIcon = document.querySelector("#not-icon");
        notificationIcon.classList.add("hidden");

        const redNot = document.querySelector("#red-popup-not");
        redNot.classList.add("hidden");

        const cittaUtente = meteo.location.name;
        const paeseUtente = meteo.location.country;

        const tempMedia = calcolaMediaTemperatura(meteo.forecast.forecastday);
        const codiceMeteo = trovaCodiceMeteo(meteo.forecast.forecastday);

        const consiglio = generatoreConsigli(tempMedia, codiceMeteo);
        const fraseConsigliata = consiglio.fraseConsigliata;
        const imgConsigliata = consiglio.imgNike;

        const titolo = document.createElement("h2");
        titolo.textContent = cittaUtente + ", " + paeseUtente;
        notificaTitle.appendChild(titolo);

        let imgMeteo = "";

        for (let giorno of meteo.forecast.forecastday) {
            if (giorno.day.condition.code === codiceMeteo) {
                imgMeteo = "https:" + giorno.day.condition.icon;
                break;
            }
        }

        const iconaNotificaMeteo = document.createElement("img");
        iconaNotificaMeteo.src = imgMeteo;

        notificaTitle.appendChild(iconaNotificaMeteo);

        const paragrafo = document.createElement("p");
        paragrafo.textContent = fraseConsigliata;
        pannelloNotifica.appendChild(paragrafo);

        const containerImgProd = document.createElement("div");
        containerImgProd.id = "container-img-prod";

        const imgProdottoMeteo = document.createElement("img")
        imgProdottoMeteo.id = "img2-not-panel";
        imgProdottoMeteo.src = imgConsigliata;
        containerImgProd.appendChild(imgProdottoMeteo);

        const bottoneImgProdotto = document.createElement("div");
        bottoneImgProdotto.classList.add("buttons");
        bottoneImgProdotto.id = "bottone-not-prod";

        const linkPagina = document.createElement("a");
        linkPagina.href = consiglio.linkPag;
        linkPagina.textContent = "Scopri di più";
        bottoneImgProdotto.appendChild(linkPagina);

        const bottoneIndietro = document.createElement("div");
        bottoneIndietro.id = "bottone-back-not";
        bottoneIndietro.textContent = "Torna al sito";

        bottoneIndietro.addEventListener("click", chiudiNotifica);

        containerImgProd.appendChild(bottoneImgProdotto);
        pannelloNotifica.appendChild(containerImgProd);

        pannelloNotifica.appendChild(bottoneIndietro);

    }

    notifica.classList.remove("hidden");

}

function generatoreConsigli(temperatura, codice) {
    const codiciPioggia = [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246];
    const codiciNeve = [1066, 1114, 1117, 1210, 1213, 1219, 1222, 1225];

    if (codiciPioggia.includes(codice)) {

        const meteoPioggia = {
            fraseConsigliata: "Giornate piovose in vista! Scopri i nostri impermeabili per affrontare le intemperie restando sempre all'asciutto.",
            imgNike: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/181bdadb-cad5-4a8d-862c-95ba8923744d/M+NK+UV+RPL+STRIDE+JACKET.png",
            linkPag: "#"
        }

        return meteoPioggia;
    }

    else if (codiciNeve.includes(codice)) {

        const meteoNeve = {
            fraseConsigliata: "Preparati a tornare bambino, neve in vista! Affronta il gelo con il nostro scaldacollo Nike Dri-FIT.",
            imgNike: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b9a351d4-b295-4e08-82be-93f7ba2d0bc0/NIKE+DRI-FIT+WRAP+2.0.png",
            linkPag: "#"
        }

        return meteoNeve;
    }

    else if (temperatura < 15) {

        const meteoFreddo = {
            fraseConsigliata: "Farà freschetto: (" + temperatura + "°C)! Scopri la collezione Tech Fleece.",
            imgNike: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/857466a8-bfcc-43fe-b59c-c6473a3c9f44/W+NSW+TCH+FLC+MR+JGGER+2.png",
            linkPag: "#"
        }

        return meteoFreddo;
    }
    else {

        const meteoCaldo = {
            fraseConsigliata: "Ci saranno le condizioni ideali (" + temperatura + "°C) per correre. Vedi le nostre nuove scarpe da running!",
            imgNike: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8f60c827-1f56-4416-a371-853230d9995a/HYPERBOOT+BY+NIKE+X+HYPERICE.png",
            linkPag: "#"
        }

        return meteoCaldo;
    }

}

function calcolaMediaTemperatura(previsioniMeteo) {
    const temp1 = previsioniMeteo[0].day.avgtemp_c;
    const temp2 = previsioniMeteo[1].day.avgtemp_c;
    const temp3 = previsioniMeteo[2].day.avgtemp_c;

    const tempMedia = (temp1 + temp2 + temp3) / 3;

    return parseInt(tempMedia);
}

function trovaCodiceMeteo(previsioniMeteo) {
    const cod1 = previsioniMeteo[0].day.condition.code;
    const cod2 = previsioniMeteo[1].day.condition.code;
    const cod3 = previsioniMeteo[2].day.condition.code;

    if ((cod1 !== cod2) && (cod1 !== cod3) && (cod2 !== cod3))
        return cod3;
    else if (cod1 === cod2 || cod1 === cod3)
        return cod1;
    else if (cod2 === cod3)
        return cod2;

}

function chiudiNotifica() {

    const notifica = document.querySelector("#not-section");
    notifica.classList.add("hidden");

    const notificationIcon = document.querySelector("#not-icon");
    notificationIcon.classList.remove("hidden");

    const bellNot = document.querySelector("#not-bell");
    bellNot.src = urlImg + "/bell_open.png";

    document.body.classList.remove("no-scroll");
}


const mobileMenu = document.querySelector("#mobile-menu-btmnav");
mobileMenu.addEventListener("click", apriMenuMobile);

function apriMenuMobile() {

    const notificationIcon = document.querySelector("#not-icon");

    if (notificationIcon)
        notificationIcon.classList.add("hidden");

    mobileSearchBar.removeEventListener("click", apriRicerca);

    document.body.classList.add("no-scroll");

    const menu = document.querySelector("#home-page-header");
    menu.classList.add("modale");

    let pannelloLaterale = document.querySelector("#pannello-lat");

    if (!pannelloLaterale) {

        pannelloLaterale = document.createElement("div");
        pannelloLaterale.id = "pannello-lat";

        const tastoChiudi = document.createElement("div");
        tastoChiudi.textContent = "X Chiudi";
        tastoChiudi.id = "chiudi-menu-btn";
        tastoChiudi.addEventListener("click", chiudiMenuMobile);
        pannelloLaterale.appendChild(tastoChiudi);

        const sezionePreferiti = document.createElement("a");
        sezionePreferiti.textContent = "Preferiti";
        sezionePreferiti.href = urlPreferiti;
        sezionePreferiti.classList.add("link-pannello");
        pannelloLaterale.appendChild(sezionePreferiti);

        const isLoggato = document.querySelector("#stato_autenticazione").value === "vero";

        if (isLoggato) {

            const sezioneAccount = document.createElement("a");
            sezioneAccount.id = "sezione-account-mobile";
            sezioneAccount.textContent = "Gestione Account";
            sezioneAccount.classList.add("link-pannello");
            sezioneAccount.href = urlGestioneAccount;
            pannelloLaterale.appendChild(sezioneAccount);

            const btnEsci = document.createElement("div");
            btnEsci.id = "bottone-logout";
            const testoEsci = document.createElement("a");
            testoEsci.textContent = "Esci";
            testoEsci.href = urlLogout;
            btnEsci.appendChild(testoEsci);
            pannelloLaterale.appendChild(btnEsci);

        } else {

            const btnAccedi = document.createElement("div");
            btnAccedi.id = "bottone-accesso";
            const testoAccedi = document.createElement("a");
            testoAccedi.textContent = "Accedi/Registrati";
            testoAccedi.href = urlLogin;
            btnAccedi.appendChild(testoAccedi);
            pannelloLaterale.appendChild(btnAccedi);

        }

        menu.appendChild(pannelloLaterale);

    } else {
        pannelloLaterale.classList.remove("hidden");
    }
}

function chiudiMenuMobile() {

    const notificationIcon = document.querySelector("#not-icon");

    if (notificationIcon) {
        notificationIcon.classList.remove("hidden");
    }

    mobileSearchBar.addEventListener("click", apriRicerca);

    document.body.classList.remove("no-scroll");
    document.querySelector("#home-page-header").classList.remove("modale");

    const pannelloLaterale = document.querySelector("#pannello-lat").classList.add("hidden");

}