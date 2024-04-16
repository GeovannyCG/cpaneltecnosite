$(function () {

    //Limitacion del copiado y pegado en campos del formulario
    $("#inputNames").on('cut copy paste', function (event) { //Campo "Nombre(s)"
        event.preventDefault();
    });

    $("#inputLastnames").on('cut copy paste', function (event) { //Campo "Apellido paterno"
        event.preventDefault();
    });

    $("#inputSecondLastnames").on('cut copy paste', function (event) { //Campo "Apellido materno"
        event.preventDefault();
    });

    $("#inputPhone").on('cut copy paste', function (event) { //Campo "Numero telefonico"
        event.preventDefault();
    });

    $("#inputPassword").on('cut copy paste', function (event) { //Campo "Contraseña"
        event.preventDefault();
    });

    $("#repinputPassword").on('cut copy paste', function (event) { //Campo "Repetir Contraseña"
        event.preventDefault();
    });

    //Mostrar ocultar las contraseñas
    $("#chkShowpass").change(function (e) {
        if ($("#chkShowpass").prop("checked")) {
            $("#inputPassword").attr("type", "text");
            $("#repinputPassword").attr("type", "text");
        } else {
            $("#inputPassword").attr("type", "password");
            $("#repinputPassword").attr("type", "password");
        }
    });

    //Limitacion de los caracteres especiales en "inputNames"
    $("#inputNames").keypress(function (e) {
        let char = e.key;

        if (!/[A-Za-zñÑ\s]$/.test(char)) {
            //Denegar el ingreso
            e.preventDefault();
        }
    });

    //Limitacion de los caracteres especiales en "inputLastnames"
    $("#inputLastnames").keypress(function (e) {
        let char = e.key;

        if (!/[A-Za-zñÑ\s]$/.test(char)) {
            e.preventDefault();
        }
    });

    //Tooltip para indicar especificaciones de la estrutura valida para la contraseña
    //Mostrar el tooltip al encontrar el foco del input
    $('#inputPassword').on('focus', function () {
        $(this).tooltip('show');
    });
    // Ocultar el tooltip al perder el foco del input
    $('#inputPassword').on('blur', function () {
        $(this).tooltip('hide');
    });

    //Limitacion de solo numeros en los campos phone y c.p.
    $("#inputPhone").keypress(function (e) {
        let char = e.key;

        if (!/[0-9]/.test(char)) {
            e.preventDefault();
        }
    });



    //Obtencion del DOM de los inputs en el formulario
    let name = document.querySelector("#inputNames"); //DOM del Nombres
    let lastname = document.querySelector("#inputLastnames"); //DOM del Apellidos
    let Secondname = document.querySelector("#inputSecondLastnames"); //DOM del Apellidos
    let birthday = document.querySelector("#inputBirthday"); // DOM del Fecha de cumpleaños
    let phone = document.querySelector("#inputPhone"); //DOM del Numero de telefono
    let email = document.querySelector("#inputEmail"); //DOM del Correo electronico
    let password = document.querySelector("#inputPassword"); //DOM del Contraseña
    let reppasswprd = document.querySelector("#repinputPassword"); //DOM del Reescribir la contraseña
    let roll = document.querySelector("#roll");//DOM para el select donde se determina el tipo de usuario
    let passwordMessage = document.querySelector("#passwordmessage"); //DOM del Div donde se muestran los mensajes del "#inputPassword"
    let passwordMessage2 = document.querySelector("#passwordmessage2"); //DOM del Div donde se muestran los mensajes del "#repinputPassword"

    //!Funciones...

    //Funcion para verificacion de la creacion de la contraseña
    function veryfiPassword() {

        //Limpieza del div donde se muestra el mensaje acerca de la contraseña al usuario
        passwordMessage.innerHTML = "";
        //Booleano para verificar la contraseña
        let passwordVeryfi = true;

        if (password.value.length < 8) {
            let message = document.createElement("p");
            message.textContent = "Un minimo de 8 caracteres";
            password.style.borderColor = "orange";
            message.style.color = "orange";
            passwordMessage.appendChild(message);
        } else {

            //Expresiones regulares para validar la contraseña
            let regexUppercase = /[A-Z]/;
            let regexLowercase = /[a-z]/;
            let regexNumber = /[0-9]/;
            let regexSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

            //Verificacion del cumplimiento de las expresiones regulares en la contraseña
            if (!regexUppercase.test(password.value)) {
                passwordVeryfi = false;
            } else if (!regexLowercase.test(password.value)) {
                passwordVeryfi = false;
            } else if (!regexNumber.test(password.value)) {
                passwordVeryfi = false;
            } else if (!regexSpecialChar.test(password.value)) {
                passwordVeryfi = false;
            } else {
                passwordVeryfi = true;
            }

            //Comparacion del resultado obtenido de la verificacion del cumplimiento de las expresiones regulares
            if (passwordVeryfi == false) {
                let warningMessage = document.createElement("p");
                warningMessage.textContent = "Contraseña invalida.";
                password.style.borderColor = "orange";
                warningMessage.style.color = "orange";
                passwordMessage.appendChild(warningMessage);
                return false;
            } else {
                let warningMessage = document.createElement("p");
                warningMessage.textContent = "Contraseña Valida.";
                password.style.borderColor = "green";
                warningMessage.style.color = "green";
                passwordMessage.appendChild(warningMessage);
                return true;
            }
        }
    }

    //Funcion para ractificacion de la contraseña creada
    function veryfiPassword2() {
        passwordMessage2.innerHTML = ""; //Se limpia el contenido del div donde se muestra el mensaje
        passwordMessage2.style.borderColor = "none"; //Se limpia el estilo de borde

        if (veryfiPassword() === true) { //Se llama el metodo de verificar contraseña

            if (reppasswprd.value !== password.value) { //Se corrobora si las conraseñas ingresadas no coinciden
                let messageError2 = document.createElement("p");
                messageError2.textContent = "Las contraseñas no coinsiden";
                reppasswprd.style.borderColor = "red";
                messageError2.style.color = "red";
                passwordMessage2.appendChild(messageError2);
                return false;
            } else {
                let messageError2 = document.createElement("p");
                messageError2.textContent = "Las contraseñas coinsiden";
                reppasswprd.style.borderColor = "green";
                messageError2.style.color = "green";
                passwordMessage2.appendChild(messageError2);
                return true;
            }
        }
    }

    //Funcion para verificar el correo electronico
    function veryfiEmail(email) {
        var regexCorreo = /^[^\s@]+@[^\s@]+\.[A-Za-z]+$/;
        return regexCorreo.test(email);
    }


    //!Eventos del usuario...

    //Ocultar el input para reescribir la contraseña
    reppasswprd.style.display = "none";

    //Verificacion de cumplimiento de requerimientos en la contraseña
    password.addEventListener("input", () => {

        if (veryfiPassword() === true) {
            reppasswprd.style.display = "block";
            reppasswprd.style.borderColor = "#DEE2E6";
            reppasswprd.value = "";
        } else {
            reppasswprd.style.display = "none";
            passwordMessage2.innerHTML = "";
        }

        veryfiPassword();
    });

    //Verificacion de cumplimiento de requerimientos en la contraseña
    password.addEventListener("blur", () => {

        if (veryfiPassword() === true) {
            reppasswprd.style.display = "block";
        } else {
            reppasswprd.style.display = "none";
            passwordMessage2.innerHTML = "";
        }

        veryfiPassword();
    });

    //Ractificar la contraseña ingresada por el usuario
    reppasswprd.addEventListener("input", () => {
        if (veryfiPassword() === true) {
            veryfiPassword2();
        }
    });

    //Ractificar la contraseña ingresada por el usuario
    reppasswprd.addEventListener("blur", () => {
        if (veryfiPassword() === true) {
            veryfiPassword2();
        }
    });

    //Limitacion de 10 digitos en elnumero telefonico
    phone.addEventListener("keypress", function (event) {
        if (phone.value.length >= 10) {
            event.preventDefault();
        }
    });

    //Envio del formulario
    $("#btnRegistrer").click(function (e) {

        e.preventDefault();

        //Guardar el nombre de las variables en un array
        let variables = [name, lastname, Secondname, birthday, phone, password, reppasswprd, roll];
        //Variable para detectar cuando un input no haya sido llenado
        let empty = false;

        //Iteracion de las variables guardadas en el array para verificar si alguna de ellas esta vacia
        for (let i = 0; i < variables.length; i++) {
            if (variables[i].value.trim() == '' || variables[i].value == 'Selecciona un tipo de usuario') {
                empty = true;
                variables[i].classList.add("wrong-date");
            } else {
                variables[i].classList.remove("wrong-date");
            }
        }

        //Obtencion del DOM del DIV donde se muestran los mensajes de errores en el formulario
        let divError = document.querySelector("#error-message");

        //Limpieza del div donde se muestran los errores cometidos por el usuario
        divError.innerHTML = "";

        //Booleano que ayuda a determinar si el formulario esta listo para ser enviado o no
        let validationForm = true;

        //Se valida si uno o mas campos del formulario esta vacios y mostrar un mensaje.
        if (empty == true) {
            let mess = document.createElement("li");
            mess.textContent = "Todos los campos marcados en rojo deben ser llenados.";
            mess.style.color = "red";
            email.classList.add("wrong-date");
            divError.appendChild(mess);
            validationForm = false;
        }

        //Se valida que el numero telefonico tenga la cantidad de digitos que componen uno.
        if (phone.value.length < 10) {
            phone.style.borderColor = "red";
            let phoneMessage = document.createElement("li");
            phoneMessage.textContent = "Numero telefonico invalido.";
            phoneMessage.style.color = "red";
            email.classList.add("wrong-date");
            divError.appendChild(phoneMessage);
            validationForm = false;
        } else {
            phone.style.borderColor = "#DEE2E6";
        }

        //#Validaciones del correo electronico
        let emailVerify = true;

        if (email.value.trim() == "") {
            emailVerify = false;
        } else if (!veryfiEmail(email.value.trim())) {
            let emailMessage = document.createElement("li");
            emailMessage.textContent = "Correo electronico invalido.";
            emailMessage.style.color = "red";
            email.style.borderColor = "red";
            emailVerify = false;
            divError.appendChild(emailMessage);

        } else if (veryfiEmail(email.value.trim())) {

            let email_User = $("#inputEmail").val();

            //Validar que el correo ingresado no este dado de alta en el sistema
            $.ajax({
                type: "POST",
                url: "./account-management-action",
                data: { request: "checkemail", email_User: email_User },
                dataType: "json",
                async: false,
                success: function (response) {

                    if (response == true) {
                        let errorEmail = document.createElement("li");
                        errorEmail.textContent = "El correo esta dado de alta con otra cuenta";
                        errorEmail.style.color = "red";
                        divError.appendChild(errorEmail);

                        emailVerify = false;
                    }

                }, error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Error al procesar la solicitud:", textStatus, errorThrown);
                    emailVerify = false;
                }
            });

        }

        if (emailVerify == true) {
            email.classList.remove("wrong-date");
            email.style.borderColor = "#DEE2E6";
        } else {
            email.classList.add("wrong-date");
            validationForm = false;
        }

        //Una vez se validaron los campos anteriores se verifica que en el proceso de validacion haya habido un inconveniente
        if (validationForm === false) {
            Swal.fire("Formulario Invalido");
        } else {
            let nombre = $("#inputNames").val();
            let apellidoP = $("#inputLastnames").val(); //DOM del Apellidos
            let apellidoM = $("#inputSecondLastnames").val(); //DOM del Apellidos
            let cumplea = $("#inputBirthday").val(); // DOM del Fecha de cumpleaños
            let telefono = $("#inputPhone").val(); //DOM del Numero de telefono
            let correo = $("#inputEmail").val(); //DOM del Correo electronico
            let contra = $("#inputPassword").val(); //DOM del Contraseña
            let permisos = $("#roll").val();

            //Creacion del AJAX para hecer el envio de los datos al servidor
            $.ajax({
                type: "POST",
                url: "./account-management-action",
                data: { request: "insert-user", name: nombre, firstLastname: apellidoP, secondLastname: apellidoM, birthd: cumplea, phone: telefono, email: correo, pass: contra, rollUser: permisos },
                dataType: "json",
                success: function (response) {
                    if (response == true) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Usuario registrado",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        name.value = "";
                        lastname.value = "";
                        Secondname.value = "";
                        birthday.value = "";
                        phone.value = "";
                        email.value = "";
                        password.value = "";
                        password.style.borderColor = "#DEE2E6";
                        reppasswprd.style.borderColor = "#DEE2E6";
                        reppasswprd.value = "";
                        reppasswprd.style.display = "none";
                        roll.selectedIndex = 0;
                        passwordMessage.innerHTML = ``; //DOM del Div donde se muestran los mensajes del "#inputPassword"
                        passwordMessage2.innerHTML = ``;
                        document.querySelector("#chkShowpass").checked = false;
                        password.setAttribute("type", "password");
                        reppasswprd.setAttribute("type", "password");
                    } else {
                        Swal.fire("Ups, algo salio mal", "Lo sentimos no fue posible llevar a acabo lo solicitado, por favor intenta mas tarde.", "error");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Error al procesar la solicitud:", textStatus, errorThrown);
                    Swal.fire("Ups, algo salio mal", "Lo sentimos no fue posible llevar a acabo lo solicitado, por favor intenta mas tarde.", "error");
                }
            });

        }

    });

});