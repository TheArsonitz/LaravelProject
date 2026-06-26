const preferenza = document.querySelector("#pref_acqu");
preferenza.addEventListener("click", apriPreferenze);

function apriPreferenze(event) {

    const tendinaEsistente = document.querySelector("#tendina_preferenza");

    if (tendinaEsistente) {

        if (tendinaEsistente.classList.contains("hidden"))
            tendinaEsistente.classList.remove("hidden");
        else
            tendinaEsistente.classList.add("hidden");
        return;
    }

    const tendina = document.createElement("div");
    tendina.id = "tendina_preferenza";

    const opzione1 = document.createElement("div");
    opzione1.classList.add("scelta");
    opzione1.textContent = "Uomo";
    opzione1.addEventListener("click", selezionaOpzione);

    const opzione2 = document.createElement("div");
    opzione2.classList.add("scelta");
    opzione2.textContent = "Donna";
    opzione2.addEventListener("click", selezionaOpzione);

    const invioPref = document.createElement("input");
    invioPref.id = "input_preferenza"
    invioPref.type = "hidden";
    invioPref.name = "preferenza";

    tendina.appendChild(opzione1);
    tendina.appendChild(opzione2);
    tendina.appendChild(invioPref);

    event.currentTarget.appendChild(tendina);

}

function selezionaOpzione(event) {

    event.stopPropagation();

    const preferenzaScelta = event.currentTarget.textContent;

    const testo = document.querySelector("#testo_pref");

    testo.textContent = preferenzaScelta;

    const input = document.querySelector("#input_preferenza");
    if (preferenzaScelta === "Uomo") {
        input.value = "m";
    } else if (preferenzaScelta === "Donna") {
        input.value = "f";
    }

    chiudiPreferenze();
}

function chiudiPreferenze() {
    const tendina = document.querySelector("#tendina_preferenza");
    if (tendina) {
        tendina.classList.add("hidden");
    }
}

document.addEventListener("click", function (event) {
    if (!preferenza.contains(event.target)) {
        chiudiPreferenze();
    }
});


const form = document.forms["registrazione_form"];
form.addEventListener("submit", checkForm);

function checkForm(event) {
    checkNome(event);
    checkCognome(event);
    checkPassword(event);
    checkPreferenza(event);
    checkData(event);
    checkCondizioni(event);
}

function checkNome(event) {
    if (form.nome.value.length === 0) {

        const erroreNome = document.querySelector("#errore_php");

        if (erroreNome) {
            erroreNome.remove();
        }

        if (!document.querySelector("#nome_err")) {
            const nome = document.querySelector("#form_nome");
            nome.classList.add("errore");

            const messErrore = document.createElement("div");
            messErrore.textContent = "Obbligatorio";
            messErrore.classList.add("errore");
            messErrore.id = "nome_err";

            form.appendChild(messErrore);
        }

        event.preventDefault();

    }
}

function checkCognome(event) {
    if (form.cognome.value.length === 0) {

        const erroreNome = document.querySelector("#errore_php");

        if (erroreNome) {
            erroreNome.remove();
        }

        if (!document.querySelector("#cognome_err")) {
            const cognome = document.querySelector("#form_cognome");
            cognome.classList.add("errore");

            const messErrore = document.createElement("div");
            messErrore.textContent = "Obbligatorio";
            messErrore.classList.add("errore");
            messErrore.id = "cognome_err";

            form.appendChild(messErrore);
        }

        event.preventDefault();

    }
}

function checkPassword(event) {
    if (form.password.value.length < 8) {

        const erroreNome = document.querySelector("#errore_php");

        if (erroreNome) {
            erroreNome.remove();
        }

        if (!document.querySelector("#password_err")) {
            const password = document.querySelector("#form_password");
            password.classList.add("errore");

            const regola = document.querySelector("#reg1");
            regola.classList.add("errore");

            if (form.password.value.length === 0) {
                const regola = document.querySelector("#reg2");
                regola.classList.add("errore");
            }

        }

        event.preventDefault();

    }

}

function checkPreferenza(event) {

    const inputPreferenza = document.querySelector("#input_preferenza");

    if (!inputPreferenza || inputPreferenza.value.length === 0) {

        const erroreNome = document.querySelector("#errore_php");

        if (erroreNome) {
            erroreNome.remove();
        }

        if (!document.querySelector("#preferenza_err")) {
            const preferenza = document.querySelector("#pref_acqu");
            preferenza.classList.add("errore");

            const messErrore = document.createElement("div");
            messErrore.textContent = "Obbligatorio";
            messErrore.classList.add("errore");
            messErrore.id = "preferenza_err";

            form.appendChild(messErrore);
        }

        event.preventDefault();

    }

}

function checkData(event) {

    const erroreNome = document.querySelector("#errore_php");

    if (erroreNome) {
        erroreNome.remove();
    }

    if (form.giorno.value < 1 || form.giorno.value > 31) {
        if (document.querySelector("#form_giorno").dataset.errore === "0") {
            const giorno = document.querySelector("#form_giorno");
            giorno.classList.add("errore");
            giorno.dataset.errore = 1;

            if (!document.querySelector("#data_err")) {
                const messErrore = document.createElement("div");
                messErrore.textContent = "Obbligatorio";
                messErrore.classList.add("errore");
                messErrore.id = "data_err";

                form.appendChild(messErrore);
            }
        }

        event.preventDefault();

    }

    if (form.mese.value < 1 || form.mese.value > 12) {
        if (document.querySelector("#form_mese").dataset.errore === "0") {
            const mese = document.querySelector("#form_mese");
            mese.classList.add("errore");
            mese.dataset.errore = 1;

            if (!document.querySelector("#data_err")) {
                const messErrore = document.createElement("div");
                messErrore.textContent = "Obbligatorio";
                messErrore.classList.add("errore");
                messErrore.id = "data_err";

                form.appendChild(messErrore);
            }
        }

        event.preventDefault();

    }

    if ((form.anno.value < 1900 || form.anno.value > new Date().getFullYear())) {
        if (document.querySelector("#form_anno").dataset.errore === "0") {
            const anno = document.querySelector("#form_anno");
            anno.classList.add("errore");
            anno.dataset.errore = 1;

            if (!document.querySelector("#data_err")) {
                const messErrore = document.createElement("div");
                messErrore.textContent = "Obbligatorio";
                messErrore.classList.add("errore");
                messErrore.id = "data_err";

                form.appendChild(messErrore);
            }
        }

        event.preventDefault();

    }

}


function checkCondizioni(event) {

    if (!document.querySelector("#nec_check").checked) {

        document.querySelector("#necessario").classList.add("errore");

        event.preventDefault();

    }

}
