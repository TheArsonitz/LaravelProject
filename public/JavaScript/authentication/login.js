const form = document.forms["login_form"];
form.addEventListener("submit", checkForm);

function checkForm(event) {
    if (form.email.value.length === 0 || !form.email.value.includes("@")) {

        const erroreServer = document.querySelector("#errore_php");

        if (erroreServer) {
            erroreServer.remove();
        }

        if (!document.querySelector("#mess_err")) {
            const email = document.querySelector("#form_email");
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
    }

}