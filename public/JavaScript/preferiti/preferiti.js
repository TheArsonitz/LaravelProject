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


    menu.classList.add("modale")
    document.body.classList.add("no-scroll");
    document.querySelector("#top-nav").classList.add("hidden");
    document.querySelector("#bottom-nav").classList.add("hidden");


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


function ricerca(event) {
    event.preventDefault();

    const vecchioErrore = document.querySelector("#errore_aggiunta_login");
    if (vecchioErrore) {
        vecchioErrore.remove();
    }

    const barraRicerca = document.querySelector("#text-search-upperbar");
    const oggettoCercato = barraRicerca.value;

    fetch('api/storeapi').then(SuccessoRichiesta, ErroreDiRete).then(function (json) {

        fetch('preferiti/ottieni_preferiti')
            .then(SuccessoRichiesta, ErroreDiRete)
            .then(function (preferiti) {

                mostraArticoli(json, oggettoCercato, preferiti);
            }

            );

    }
    );

}

function mostraArticoli(articoliJson, oggettoCercato, preferiti) {

    if (articoliJson === null)
        console.log("Nessun dato ricevuto, verifica eventuali errori di stato o di rete!");
    else {

        const risultatoRicerca = [];
        let i = 0;
        oggettoCercato = oggettoCercato.toLowerCase();

        for (let articolo of articoliJson) {

            const titleMinusc = articolo.title.toLowerCase();

            if (titleMinusc.includes(oggettoCercato) && i < 3) {
                risultatoRicerca.unshift(articolo);
                i++;
            }

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

    const likeProdPref = event.currentTarget;

    likeProdPref.src = urlImg + "/clicked_favourite.png";

    likeProdPref.dataset.pref = 1;
    const idProdotto = likeProdPref.dataset.id;

    const form = document.createElement("form");

    const csrfInput = document.createElement("input");
    csrfInput.type = "hidden";
    csrfInput.name = "_token";
    csrfInput.value = document.querySelector('meta[name="csrf-token"]').content;
    form.appendChild(csrfInput);

    const inputForm = document.createElement("input");
    inputForm.type = "text";
    inputForm.name = "prodotto_id";
    inputForm.value = idProdotto;

    form.appendChild(inputForm);

    const inputForm2 = document.createElement("input");
    inputForm2.type = "text";
    inputForm2.name = "azione";
    inputForm2.value = likeProdPref.dataset.pref;

    form.appendChild(inputForm2);

    const form_data = {
        method: 'post',
        body: new FormData(form)
    };

    fetch("preferiti/gestione_preferiti", form_data)
        .then(response => response.text())
        .then(testoRisposta => console.log("Risposta del server:", testoRisposta));

    likeProdPref.removeEventListener("click", aggiungiPreferito);
    likeProdPref.addEventListener("click", rimuoviPreferito);

    const noPreferiti = document.querySelector("#no_pref");
    if (noPreferiti) {
        noPreferiti.remove();
    }

    const containerFoto = document.querySelector("#box-fotos-pref");
    if (containerFoto) {
        containerFoto.remove();
    }

    fetch('api/storeapi')
        .then(SuccessoRichiesta, ErroreDiRete)
        .then(function (articoliJson) {
            fetch('preferiti/ottieni_preferiti')
                .then(SuccessoRichiesta, ErroreDiRete)
                .then(function (preferiti) {
                    mostraPreferiti(articoliJson, preferiti);
                }
                );
        }
        );

}

function rimuoviPreferito(event) {
    const likeProdPref = event.currentTarget;

    likeProdPref.src = urlImg + "/heart-img.png";

    likeProdPref.dataset.pref = 0;
    const idProdotto = likeProdPref.dataset.id;

    const form = document.createElement("form");

    const csrfInput = document.createElement("input");
    csrfInput.type = "hidden";
    csrfInput.name = "_token";
    csrfInput.value = document.querySelector('meta[name="csrf-token"]').content;
    form.appendChild(csrfInput);

    const inputForm = document.createElement("input");
    inputForm.type = "text";
    inputForm.name = "prodotto_id";
    inputForm.value = idProdotto;

    form.appendChild(inputForm);

    const inputForm2 = document.createElement("input");
    inputForm2.type = "text";
    inputForm2.name = "azione";
    inputForm2.value = likeProdPref.dataset.pref;

    form.appendChild(inputForm2);

    const form_data = {
        method: 'post',
        body: new FormData(form)
    };

    fetch("preferiti/gestione_preferiti", form_data)
        .then(response => response.text())
        .then(testoRisposta => console.log("Risposta del server:", testoRisposta));

    likeProdPref.removeEventListener("click", rimuoviPreferito);
    likeProdPref.addEventListener("click", aggiungiPreferito);


    const prodPref = document.querySelector("#prodotto_" + idProdotto);

    if (prodPref) {

        const overlay = document.createElement("div");
        overlay.classList.add("overlay_rimozione");
        prodPref.appendChild(overlay);

        likeProdPref.src = urlImg + "/heart-img.png";

        setTimeout(function () {
            prodPref.remove();

            if (document.querySelectorAll(".img-box-fotos-pref").length === 0) {

                document.querySelector("#box-fotos-pref").remove();

                const sezionePreferiti = document.querySelector("#sezione-preferiti");

                const noPreferiti = document.createElement("p");
                noPreferiti.id = "no_pref";
                noPreferiti.textContent = "Gli articoli aggiunti ai preferiti saranno salvati qui.";

                sezionePreferiti.appendChild(noPreferiti);
            }

        }, 2000);
    }

}


function chiudiRicerca() {
    const menu = document.querySelector("#home-page-header");
    menu.classList.remove("modale")
    document.body.classList.remove("no-scroll");

    document.querySelector("#top-nav").classList.remove("hidden");
    document.querySelector("#bottom-nav").classList.remove("hidden");

    const structMenu = document.querySelector("#menu-search-bar");
    structMenu.classList.add("hidden");

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



fetch('api/storeapi').then(SuccessoRichiesta, ErroreDiRete)
    .then(function (articoliJson) {

        fetch('preferiti/ottieni_preferiti')
            .then(SuccessoRichiesta, ErroreDiRete)
            .then(function (preferiti) {
                mostraPreferiti(articoliJson, preferiti);
            }

            );

    }
    );


function mostraPreferiti(articoliJson, preferiti) {
    if (articoliJson === null)
        console.log("Nessun dato ricevuto, verifica eventuali errori di stato o di rete!");
    else {

        if (preferiti.length === 0) {
            const sezionePreferiti = document.querySelector("#sezione-preferiti");

            const noPreferiti = document.createElement("p");
            noPreferiti.id = "no_pref";
            noPreferiti.textContent = "Gli articoli aggiunti ai preferiti saranno salvati qui.";

            sezionePreferiti.appendChild(noPreferiti);
        }
        else {

            const oggettiPreferiti = [];

            for (let i = 0; i < articoliJson.length; i++) {

                if ((preferiti.includes(Number(articoliJson[i].id)))) {
                    oggettiPreferiti.push(articoliJson[i]);
                }

            }

            const sezionePreferiti = document.querySelector("#sezione-preferiti");

            const boxFoto = document.createElement("div");
            boxFoto.id = "box-fotos-pref";

            for (let j = 0; j < oggettiPreferiti.length; j++) {

                const prodotto = oggettiPreferiti[j];

                const boxSingolo = document.createElement("div");
                boxSingolo.classList.add("img-box-fotos-pref");
                boxSingolo.id = "prodotto_" + prodotto.id;

                const imgLike = document.createElement("img");
                imgLike.classList.add("like");
                imgLike.dataset.id = prodotto.id;

                imgLike.src = urlImg + "/clicked_favourite.png";
                imgLike.dataset.pref = 1;
                imgLike.addEventListener("click", rimuoviDaPaginaPreferito);

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

                const bottoneCarrello = document.createElement("div");
                bottoneCarrello.classList.add("btn-carrello");
                bottoneCarrello.textContent = "Aggiungi al carrello";
                boxSingolo.appendChild(bottoneCarrello);

                boxFoto.appendChild(boxSingolo);
            }

            sezionePreferiti.appendChild(boxFoto);

        }

    }

}


function rimuoviDaPaginaPreferito(event) {
    const likeProdPref = event.currentTarget;
    const idlikeProdPref = likeProdPref.dataset.id;

    likeProdPref.dataset.pref = 0;
    const idProdotto = likeProdPref.dataset.id;

    const form = document.createElement("form");

    const csrfInput = document.createElement("input");
    csrfInput.type = "hidden";
    csrfInput.name = "_token";
    csrfInput.value = document.querySelector('meta[name="csrf-token"]').content;
    form.appendChild(csrfInput);

    const inputForm = document.createElement("input");
    inputForm.type = "text";
    inputForm.name = "prodotto_id";
    inputForm.value = idProdotto;

    form.appendChild(inputForm);

    const inputForm2 = document.createElement("input");
    inputForm2.type = "text";
    inputForm2.name = "azione";
    inputForm2.value = likeProdPref.dataset.pref;

    form.appendChild(inputForm2);

    const form_data = {
        method: 'post',
        body: new FormData(form)
    };
    fetch("preferiti/gestione_preferiti", form_data)
        .then(response => response.text())
        .then(testoRisposta => console.log("Risposta del server:", testoRisposta));


    const prodPref = document.querySelector("#prodotto_" + idlikeProdPref);

    const overlay = document.createElement("div");
    overlay.classList.add("overlay_rimozione");

    prodPref.appendChild(overlay);
    likeProdPref.src = urlImg + "/heart-img.png";

    setTimeout(function () {
        prodPref.remove();

        if (document.querySelectorAll(".img-box-fotos-pref").length === 0) {

            document.querySelector("#box-fotos-pref").remove();

            const sezionePreferiti = document.querySelector("#sezione-preferiti");

            const noPreferiti = document.createElement("p");
            noPreferiti.id = "no_pref";
            noPreferiti.textContent = "Gli articoli aggiunti ai preferiti saranno salvati qui.";

            sezionePreferiti.appendChild(noPreferiti);
        }

    }, 2000);

}



const mobileMenu = document.querySelector("#mobile-menu-btmnav");
mobileMenu.addEventListener("click", apriMenuMobile);

function apriMenuMobile() {

    document.body.classList.add("no-scroll");
    mobileSearchBar.removeEventListener("click", apriRicerca);

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

    mobileSearchBar.addEventListener("click", apriRicerca);

    document.body.classList.remove("no-scroll");
    document.querySelector("#home-page-header").classList.remove("modale");

    const pannelloLaterale = document.querySelector("#pannello-lat").classList.add("hidden");
}
