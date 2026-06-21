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

fetch('ottieni_account').then(SuccessoRichiesta, ErroreDiRete).then(riempiForm);

function riempiForm(informazioni) {
    const form = document.forms['form_informazioni_utente'];
    form.email.value = informazioni.email;
    form.telefono.value = informazioni.telefono;
    form.data_nascita.value = informazioni.data_nascita;
    form.paese.value = informazioni.paese;
}


const formUtente = document.forms['form_informazioni_utente'];
formUtente.addEventListener("submit", cambiaInformazioni);

function cambiaInformazioni(event) {
    checkForm(event, formUtente);
}

function checkForm(event, formUtente) {
    checkEmail(event, formUtente);
    checkTelefono(event, formUtente);
    checkPassword(event, formUtente);
    checkDataNascita(event, formUtente);
}


function checkEmail(event, form) {
    if (form.email.value.length === 0 || !form.email.value.includes("@")) {

        if (!document.querySelector("#mess_err")) {
            const email = document.querySelector("#field_email");
            email.classList.add("errore");

            const messErrore = document.createElement("div");
            if (form.email.value.length === 0)
                messErrore.textContent = "Obbligatorio";
            else if (!form.email.value.includes("@"))
                messErrore.textContent = "Indirizzo e-mail non valido";
            messErrore.classList.add("errore");
            messErrore.id = "mess_err";

            form.appendChild(messErrore);

            event.preventDefault();
        }
        else if (document.querySelector("#mess_err")) {

            const messErrore = document.querySelector("#mess_err");

            if (form.email.value.length === 0)
                messErrore.textContent = "Obbligatorio";
            else if (!form.email.value.includes("@"))
                messErrore.textContent = "Indirizzo e-mail non valido";

            event.preventDefault();
        }
    } else if (document.querySelector("#mess_err")) {
        const email = document.querySelector("#field_email");
        email.classList.remove("errore");
        const messErrore = document.querySelector("#mess_err");
        messErrore.remove();
    }
}


function checkTelefono(event, formUtente) {

    if (formUtente.telefono.value.length > 0 && formUtente.telefono.value.length != 10) {

        if (!document.querySelector("#tel_err")) {
            const telefono = document.querySelector("#field_telefono");
            telefono.classList.add("errore");

            const messErrore = document.createElement("div");
            messErrore.textContent = "Il numero deve essere di 10 caratteri";
            messErrore.classList.add("errore");
            messErrore.id = "tel_err";

            formUtente.appendChild(messErrore);
        }
        event.preventDefault();

    } else if (formUtente.telefono.value.length === 10 && document.querySelector("#tel_err")) {
        const telefono = document.querySelector("#field_telefono");
        telefono.classList.remove("errore");
        const messErrore = document.querySelector("#tel_err");
        messErrore.remove();
    }
}


function checkPassword(event, form) {
    if (form.password.value.length < 8 && form.password.value.length != 0) {

        if (!document.querySelector("#password_err")) {
            const password = document.querySelector("#field_password");
            password.classList.add("errore");

            const messErrore = document.createElement("div");
            messErrore.textContent = "Minino 8 caratteri";
            messErrore.classList.add("errore");
            messErrore.id = "password_err";

            form.appendChild(messErrore);
        }

        event.preventDefault();

    } else if (document.querySelector("#password_err")) {
        const password = document.querySelector("#field_password");
        password.classList.remove("errore");
        const messErrore = document.querySelector("#password_err");
        messErrore.remove();
    }

}


function checkDataNascita(event, form) {

    const dataInserita = form.data_nascita.value;
    const data = document.querySelector("#data_n");

    let errore = false;
    let testoErrore = "";

    if (dataInserita.length === 0) {
        errore = true;
        testoErrore = "Obbligatorio";
    }

    else if (dataInserita.length !== 10) {
        errore = true;
        testoErrore = "Usa il formato esatto: AAAA-MM-GG (senza spazi)";
    }

    else {
        const stringaAnno = dataInserita.substring(0, 4);
        const stringaMese = dataInserita.substring(5, 7);
        const stringaGiorno = dataInserita.substring(8, 10);

        const anno = Number(stringaAnno);
        const mese = Number(stringaMese);
        const giorno = Number(stringaGiorno);

        const annoCorrente = new Date().getFullYear();

        if (
            !(anno >= 1900 && anno <= annoCorrente) ||
            !(mese >= 1 && mese <= 12) ||
            !(giorno >= 1 && giorno <= 31)
        ) {
            errore = true;
            testoErrore = "Data non valida";
        }
    }

    if (errore) {
        data.classList.add("errore");

        if (!document.querySelector("#data_err")) {
            const messErrore = document.createElement("div");
            messErrore.classList.add("errore");
            messErrore.id = "data_err";
            form.appendChild(messErrore);
        }

        document.querySelector("#data_err").textContent = testoErrore;
        event.preventDefault();

    } else {
        data.classList.remove("errore");
        const messErrore = document.querySelector("#data_err");
        if (messErrore) {
            messErrore.remove();
        }
    }
}


const formElimina = document.forms['form_elimina_account'];
formElimina.addEventListener("submit", richiestaEliminazione);

function richiestaEliminazione(event) {

    event.preventDefault();

    const modale = document.createElement("div");
    modale.id = "modale-elm";
    modale.classList.add("modale");
    document.body.classList.add("no-scroll");

    const pannelloConferma = document.createElement("div");
    pannelloConferma.id = "pannello-conferma-elm";

    const testoAvviso = document.createElement("h3");
    testoAvviso.textContent = "Sei sicuro di voler eliminare definitivamente il tuo account?";

    const containerBottoni = document.createElement("div");
    containerBottoni.id = "container-bottoni";

    const btnAnnulla = document.createElement("button");
    btnAnnulla.textContent = "Annulla";
    btnAnnulla.classList.add("buttons");
    btnAnnulla.id = "annulla-elm";

    btnAnnulla.addEventListener("click", function () {
        modale.remove();
        document.body.classList.remove("no-scroll");
    });

    const btnConferma = document.createElement("button");
    btnConferma.textContent = "Sì, elimina";
    btnConferma.classList.add("buttons");
    btnConferma.id = "conferma-elm";

    btnConferma.addEventListener("click", function () {
        formElimina.submit();
    });

    containerBottoni.appendChild(btnAnnulla);
    containerBottoni.appendChild(btnConferma);

    pannelloConferma.appendChild(testoAvviso);
    pannelloConferma.appendChild(containerBottoni);

    modale.appendChild(pannelloConferma);

    document.body.appendChild(modale);
}


const searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("click", apriRicerca);
const mobileSearchBar = document.querySelector("#mobile-search-bar");
mobileSearchBar.addEventListener("click", apriRicerca);

//Oggetto che contiene le ricerche più popolari
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

    //Sto settando tutto per aprire il menù di ricerca
    menu.classList.add("modale")
    document.body.classList.add("no-scroll");
    document.querySelector("#top-nav").classList.add("hidden");
    document.querySelector("#bottom-nav").classList.add("hidden");

    //L'if serve per applicare il pattern GoF Singleton dato che voglio creare il menù una sola volta
    let structMenu = document.querySelector("#menu-search-bar");
    if (!structMenu) {

        //Sto creando la struttura generale del menù
        structMenu = document.createElement("div");
        structMenu.id = "menu-search-bar";
        menu.appendChild(structMenu);

        //A questo punto divido il structMenu in:

        //Parte superiore
        const UpperMenu = document.createElement("div");
        UpperMenu.id = "upper-menu-search-bar";

        //Logo parte superiore
        const imgUpperMenu = document.createElement("img")
        imgUpperMenu.src = "/LaravelNikeWebsite/public/Images/logo-nero.png";
        imgUpperMenu.id = "nike-logo-newbar";
        imgUpperMenu.dataset.logo = "nero"

        imgUpperMenu.addEventListener("click", function () {
            if (imgUpperMenu.dataset.logo === "nero") {
                imgUpperMenu.src = "/LaravelNikeWebsite/public/Images/logo-arancione.png"
                imgUpperMenu.dataset.logo = "arancione"
            }
            else {
                imgUpperMenu.src = "/LaravelNikeWebsite/public/Images/logo-nero.png"
                imgUpperMenu.dataset.logo = "nero"
            }
        })

        UpperMenu.appendChild(imgUpperMenu);

        //Barra di ricerca parte superiore
        const newSearchBar = document.createElement("form");
        newSearchBar.id = "new-search-bar";

        const imgNewSearchBar = document.createElement("img");
        imgNewSearchBar.src = "/LaravelNikeWebsite/public/Images/search-img.png";

        const textSearchBar = document.createElement("input");
        textSearchBar.type = "text";
        textSearchBar.placeholder = "Cerca";
        textSearchBar.id = "text-search-upperbar"

        const inputSearchBar = document.createElement("input");
        inputSearchBar.type = "submit";
        inputSearchBar.classList.add("hidden");

        //Listener collegato al form per inviare i dati
        newSearchBar.addEventListener('submit', ricerca);

        //Collego al form i vari componenti
        newSearchBar.appendChild(imgNewSearchBar);
        newSearchBar.appendChild(textSearchBar);
        newSearchBar.appendChild(inputSearchBar);
        //Collego il form al menu
        UpperMenu.appendChild(newSearchBar);

        //Pulsante parte superiore per uscire dal menu
        const exitMenu = document.createElement("div");
        exitMenu.textContent = 'Annulla';
        exitMenu.id = "exit-search-button"
        exitMenu.addEventListener("click", chiudiRicerca);
        UpperMenu.appendChild(exitMenu);

        //Parte inferiore
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

        //Aggiungo parte sup e inf al structMenu
        structMenu.appendChild(UpperMenu);
        structMenu.appendChild(BottomMenu);
    }
    //se esiste già tolgo semplicemente la classe hidden che avrò inserito quando l'ho chiuso
    else {
        structMenu.classList.remove("hidden");
    }

}



//API per prodotti
function ricerca(event) {
    event.preventDefault();

    const vecchioErrore = document.querySelector("#errore_aggiunta_login");
    if (vecchioErrore) {
        vecchioErrore.remove();
    }

    const barraRicerca = document.querySelector("#text-search-upperbar");
    const oggettoCercato = barraRicerca.value;

    fetch('../api/storeapi').then(SuccessoRichiesta, ErroreDiRete).then(function (json) {

        fetch('../preferiti/ottieni_preferiti')
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
                    imgLike.src = "/LaravelNikeWebsite/public/Images/clicked_favourite.png";
                    imgLike.dataset.pref = 1;
                    imgLike.addEventListener("click", rimuoviPreferito);
                } else {
                    imgLike.src = "/LaravelNikeWebsite/public/Images/heart-img.png";
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

    const prodPref = event.currentTarget;

    prodPref.src = "/LaravelNikeWebsite/public/Images/clicked_favourite.png";

    prodPref.dataset.pref = 1; //1 preferito, 0 non preferito
    const idProdotto = prodPref.dataset.id;

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
    inputForm2.value = prodPref.dataset.pref;

    form.appendChild(inputForm2);

    const form_data = {
        method: 'post', body: new FormData(form)
    };

    fetch("../preferiti/gestione_preferiti", form_data)
        .then(response => response.text())
        .then(testoRisposta => console.log("Risposta del server:", testoRisposta));

    prodPref.removeEventListener("click", aggiungiPreferito);
    prodPref.addEventListener("click", rimuoviPreferito);

}

function rimuoviPreferito(event) {
    const prodPref = event.currentTarget;

    prodPref.src = "/LaravelNikeWebsite/public/Images/heart-img.png";

    prodPref.dataset.pref = 0; //1 preferito, 0 non preferito
    const idProdotto = prodPref.dataset.id;

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
    inputForm2.value = prodPref.dataset.pref;

    form.appendChild(inputForm2);

    const form_data = {
        method: 'post', body: new FormData(form)
    };

    fetch("../preferiti/gestione_preferiti", form_data)
        .then(response => response.text())
        .then(testoRisposta => console.log("Risposta del server:", testoRisposta));

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

    document.querySelector("#pannello-lat").classList.add("hidden");
}