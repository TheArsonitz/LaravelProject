const form = document.forms["login_form"];
form.addEventListener("submit", checkForm);

function checkForm(event) {
    if (form.password.value.length === 0 ||
        strlen(form.password.value.length) < 8
    ) {

        //Così elimino l'eventuale errore generato dal php
        const erroreServer = document.querySelector("#pass_sbagl");

        if (erroreServer) {
            erroreServer.remove();
        }

        if (!document.querySelector("#mess_err")) {
            const password = document.querySelector("#form_password");
            password.classList.add("errore");

            const messErrore = document.createElement("div");
            if (form.password.value.length === 0)
                messErrore.textContent = "Obbligatorio";
            else
                messErrore.textContent = "La password deve contenere almeno 8 caratteri";
            messErrore.classList.add("errore");
            messErrore.id = "mess_err";

            form.appendChild(messErrore);
        }

        event.preventDefault();

    }

}