const form = document.forms["login_form"];
form.addEventListener("submit", checkForm);

function checkForm(event) {
    if (form.password.value.length === 0 ||
        form.password.value.length < 8
    ) {

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
            else if (form.password.value.length < 8)
                messErrore.textContent = "Le password hanno almeno 8 caratteri";
            messErrore.classList.add("errore");
            messErrore.id = "mess_err";

            form.appendChild(messErrore);
        } else {

        }

        event.preventDefault();

    }

}