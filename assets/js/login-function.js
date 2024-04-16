//Funcion de jQuery para detectar cuando la vista sea llamada
let divAlerts = document.querySelector("#div-alert");
let domEmail = document.querySelector("#email");
let domPass = document.querySelector("#pass");
let divSubmit = document.querySelector("#submit-div");

//Funciones
function showAlert(description, timeShow, styleAlert) {

    let alert = document.createElement("div");
    alert.classList.add("alert", styleAlert);
    alert.role = "alert";
    alert.textContent = description;
    divAlerts.appendChild(alert);
    
    setTimeout( function() {
        alert.style.display = "none";
    }, timeShow);
}

function hiddenButtonLogin() {
    divSubmit.innerHTML = `
    <button class="btn btn-dark" type="button" disabled>
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span role="status">Ingresando...</span>
    </button>`;
}

function showButtonLogin() {
    divSubmit.innerHTML = `<button type="submit" class="btn button-login" id="login">Entrar</button>`;
}



$(function() {

    //Funcion para extraer los valores del formulario
    $("#formulario").submit(function (e) { 
        e.preventDefault(); // Detiene el envío predeterminado del formulario

        hiddenButtonLogin();

        let email = $("#email").val();
        let pass = $("#pass").val();

        if (email.trim() == "" || pass.trim() == "") {

            domEmail.style.borderColor = "red";
            domPass.style.borderColor = "red";
            
            showButtonLogin();
            showAlert("Debes de llenar todos los campos para iniciar sesion.", 3000, "alert-danger");

        } else {
            
            $.ajax({
                type: "POST",
                url: "./Login",
                data: { email: email, pass: pass },
                dataType: "json",
                success: function (response) {

                    if (response[0]['error'] == "USER_NOT_FOUND") {

                        showAlert("Lo sentimos, no pudimos encontrar una cuenta ligada a ese correo. Verificalo por favor.", 5000, "alert-primary");

                    } else if (response[0]['error'] == "LOCKED_USER") {

                        let divFather = document.createElement("div");
                        let divChild = document.createElement("div");
                        let divChild2 = document.createElement("div");
                        let divContainer = document.createElement("div");
                        let closeBtn = document.createElement("button");

                        divChild2.classList.add("alert", "alert-warning", "alert-dismissible");
                        divChild2.role = "alert";
                        divContainer.innerHTML = `La cuenta esta bloqueada tras varios intentos de acceso. contacta con un administrador para poder recuperarla.</a>`;
                        closeBtn.type = "button";
                        closeBtn.classList.add("btn-close");
                        closeBtn.setAttribute("data-bs-dismiss", "alert");
                        closeBtn.setAttribute("arial-label", "Close");

                        divFather.appendChild(divChild);
                        divChild.appendChild(divChild2);
                        divChild2.appendChild(divContainer);
                        divChild2.appendChild(closeBtn);

                        divAlerts.appendChild(divFather);

                        divSubmit.innerHTML = `<button type="submit" class="btn button-login" id="login">Entrar</button>`;

                    } else if (response[0]['error'] == "WRONG_PASSWORD") {

                        divSubmit.innerHTML = `<button type="submit" class="btn button-login" id="login">Entrar</button>`;
                        showAlert(`Contraseña erronea, intento ${response[0]['attemp']} de 3.`, 5000, "alert-danger");
    
                    } else if (response[0]['error'] == "ATTEMPTS_FINISHED") {

                        divSubmit.innerHTML = `<button type="submit" class="btn button-login" id="login">Entrar</button>`;

                        showAlert(`Lo sentimos, la cuenta con el correo ${response[0]['account']} fue bloqueada.`, 5000, "alert-danger");
                    } else if (response[0]['bypass'] == "ACCESS_CONCED") {
                        location.href = "./Dashboard";
                    }

                    showButtonLogin();
    
                }, error: function (jqXHR, textStatus, errorThrown, error) {
                    console.error("Error al procesar la solicitud:", error);
                }
            });
        }

    });
});

//Funciones extras

document.getElementById("show").addEventListener("change", () => {
    if(document.getElementById("show").checked) {
        document.getElementById("pass").type = "text";
    } else {
        document.getElementById("pass").type = "password";
    }
});

//Devolver al color normal los inputs
domEmail.addEventListener("input", () => {
    domEmail.style.borderColor = "#DEE2E6";
});

domPass.addEventListener("input", () => {
    domPass.style.borderColor = "#DEE2E6";
});

//Obtener el año en curso
let fecha = new Date();

let year = fecha.getFullYear();

document.querySelector("#autore").textContent = `© ${year} Tecnosite Soluciones Integrales. Todos los derechos reservados.`;