$(function () {
    //Mensaje que de demuestra que funciona el buen funcionamiento de Jquery
    console.log("jQuery is working!");

    /**
     * OBTENCION DE LOS DOM DE LOS ELEMENTOS EN EL VIEW
     */
    let tablaCuentas = document.querySelector("#tb-todas-cuentas");
    let btnRefresh = document.querySelectorAll(".refresh");

    /**
     * FUNCIONES PARA EL FUNCIONAMIENTO DEL PROPIO SCRIPT
     */

    //Extraer todas las cuentas disponibles en el sistema
    function getAccounts() {
        //Peticion Ajax al servidor
        $.ajax({
            type: "POST",
            url: "./account-management-action",
            data: { request: "get-all-accounts" },
            dataType: "json",
            success: function (response) {

                //Verificar que la respuesta tenga mas de un registro devuelto
                if (response.length > 0) {
                    //Se limpian las filas de la tabla para poder mostrar las filas
                    tablaCuentas.innerHTML = ``;
                    //Se crea un fila y un modal por cada elemento devuelto por el 
                    response.forEach(e => {
                        //Se crea una fila
                        let filaTabla = document.createElement("tr");
                        //Se crean las columnas para mostrar la repuesta el servidor
                        filaTabla.innerHTML = `
                        <td><p>${e['idUsuario']}</p></td>
                        <td><p>${e['Nombres']}</p></td>
                        <td><p>${e['ApellidoP']} ${e['ApellidoM']}</p></td>
                        <td><p>${e['Correo']}</p></td>
                        <td><h5><span class="badge text-bg-warning">${e['Roll']}</span></h5></td>
                        <td><h5><span class="badge text-bg-success">${e['Estatus']}</span></h5></td>
                        <td>
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalUsuario${e['idUsuario']}">
                            <i class="bi bi-eye-fill"></i>
                            </button>
                        </td>
                        `;
                        //Se agregar la fila a la tabla que esta en el HTML
                        tablaCuentas.appendChild(filaTabla);

                        // Verificar si el modal ya existe
                        let modalExistente = document.getElementById(`modalUsuario${e['idUsuario']}`);

                        // Si el modal ya existe, eliminarlo antes de crear uno nuevo
                        if (modalExistente) {
                            modalExistente.remove();
                            alert(`modalUsuario${e['idUsuario']}`);
                        }

                        //Se crea el modal para mostrar los detalles de la cuenta seleccionada
                        let modalUsuario = document.createElement("div");
                        //Se agregan los atributos del div padre para el modal
                        modalUsuario.setAttribute("class", "modal fade");
                        modalUsuario.setAttribute("id", `modalUsuario${e['idUsuario']}`);
                        modalUsuario.setAttribute("tabindex", "-1");
                        modalUsuario.setAttribute("tabindex", "-1");
                        modalUsuario.setAttribute("aria-labelledby", "exampleModalLabel");
                        modalUsuario.setAttribute("aria-hidden", "true");
                        //Se agregar el resto de la estructura del modal
                        modalUsuario.innerHTML = `
                            <div class="modal-dialog modal-dialog-centered modal-xl">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Detalles de la cuenta "${e['Correo']}"</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="row">
                                        <div class="col">
                                            <label for="inputNombres${e['idUsuario']}" class="form-label">Nombre(s):</label>
                                            <input type="email" class="form-control" id="inputNombres${e['idUsuario']}" value="${e['Nombres']}">
                                        </div>
                                        <div class="col">
                                            <label for="inputApellidoP${e['idUsuario']}" class="form-label">Apellido paterno:</label>
                                            <input type="email" class="form-control" id="inputApellidoP${e['idUsuario']}" value="${e['ApellidoP']}">
                                        </div>
                                        <div class="col">
                                            <label for="inputApellidoM${e['idUsuario']}" class="form-label">Apellido materno:</label>
                                            <input type="email" class="form-control" id="inputApellidoM${e['idUsuario']}" value="${e['ApellidoM']}">
                                        </div>
                                    </div><br>

                                    <div class="row">
                                        <div class="col">
                                            <label for="inputCumpleanios${e['idUsuario']}" class="form-label">Fecha de cumpleaños:</label>
                                            <input type="date" class="form-control" id="inputCumpleanios${e['idUsuario']}" value="${e['Cumpleanios']}">
                                        </div>
                                        <div class="col">
                                            <label for="inputTelefono${e['idUsuario']}" class="form-label">Numero telefonico:</label>
                                            <input type="number" class="form-control" id="inputTelefono${e['idUsuario']}" value="${e['Telefono']}">
                                        </div>
                                    </div><br>

                                    <div class="row">
                                        <div class="col">
                                            <label for="inputCorreo${e['idUsuario']}" class="form-label">Correo:</label>
                                            <input type="email" class="form-control" id="inputCorreo${e['idUsuario']}" value="${e['Correo']}" disabled>
                                        </div>
                                        <div class="col">
                                            <label for="inputContrasenia${e['idUsuario']}" class="form-label">Contraseña:</label>
                                            <input type="password" class="form-control" id="inputContrasenia${e['idUsuario']}" value="${e['Contrasenia']}" disabled>
                                        </div>
                                    </div><br>

                                    <div class="row">
                                        <div class="col">
                                            <label for="inputEstado${e['idUsuario']}" class="form-label">Estado de la cuenta:</label>
                                            <input type="text" class="form-control" id="inputEstado${e['idUsuario']}" value="${e['Estatus']}">
                                        </div>
                                        <div class="col">
                                            <label for="inputIntentos${e['idUsuario']}" class="form-label">Numero de intentos de acceder a la cuenta:</label>
                                            <input type="number" class="form-control" id="inputIntentos${e['idUsuario']}" value="${e['Intentos']}">
                                        </div>
                                        <div class="col">
                                            <label for="inputRoll${e['idUsuario']}" class="form-label">Permisos de la cuenta:</label>
                                            <input type="text" class="form-control" id="inputRoll${e['idUsuario']}" value="${e['Roll']}">
                                        </div>
                                    </div>
                                </form><br>

                                <div style="color: red;">
                                    <h5>*Notas:</h5>
                                    <h6>Estados permitidos en el campo "Estado de la cuenta"</h6>
                                    <ul>
                                        <li>Cuenta desbloqueada: "unlocked"</li>
                                        <li>Cuenta bloqueada: "locked"</li>
                                    </ul>
                                    <h6>Tipos de usuarios permitidos para el campo "Permisos de la cuenta"</h6>
                                    <ul>
                                        <li>Cuenta con permisos de administrador: "admin"</li>
                                        <li>Cuenta con permisos de colaborador: "collaborator"</li>
                                    </ul>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-primary" id="btnActualizar${e['idUsuario']}">Actualizar datos</button>
                            </div>
                            </div>
                        </div>`;
                        document.body.appendChild(modalUsuario);

                        //Agregamos el evento de click al boton de actualizar
                        document.getElementById("btnActualizar" + e['idUsuario']).addEventListener("click", () => {
                            //Obtener los elementos dom del formulario
                            let nombre = document.getElementById("inputNombres" + e['idUsuario']);
                            let apellidoP = document.getElementById("inputApellidoP" + e['idUsuario']);
                            let apellidoM = document.getElementById("inputApellidoM" + e['idUsuario']);
                            let cumpleanios = document.getElementById("inputCumpleanios" + e['idUsuario']);
                            let numTelefonico = document.getElementById("inputTelefono" + e['idUsuario']);
                            let estadoCuenta = document.getElementById("inputEstado" + e['idUsuario']);
                            let numIntentos = document.getElementById("inputIntentos" + e['idUsuario']);
                            let permisos = document.getElementById("inputRoll" + e['idUsuario']);

                            let datosCorrectos = true;

                            //Verificar si lo que se ingreso en los campos Estado cuenta y Permisos cuenta son los permitidos
                            if (!(estadoCuenta.value === "unlocked" || estadoCuenta.value === "locked")) {
                                datosCorrectos = false;
                            } else if (!(permisos.value === "admin" || permisos.value === "collaborator")) {
                                datosCorrectos = false;
                            }

                            //Array con todos los values de los DOMS
                            let valores = [nombre.value, apellidoP.value, apellidoM.value, cumpleanios.value, numTelefonico.value, estadoCuenta.value, numIntentos.value, permisos.value];
                            //Verificar que ningun campo este vacio
                            for (let v = 0; v < valores.length; v++) {
                                if (valores[v].trim() === "") {
                                    datosCorrectos = false;
                                    break;
                                }
                            }

                            //Comparar si el formulario esta apto para el envio
                            if (!datosCorrectos) {
                                Swal.fire("Formulario invalido", "Lo sentimos, el formulario esta incompleto o no cumple con los parametros permitidos, llenalo correctamente para poder realizar la actualizacion.", "warning");
                            } else {
                                //Realizar la peticion ajax al servidor
                                $.ajax({
                                    type: "POST",
                                    url: "./account-management-action",
                                    data: { request: "update-user", id: e['idUsuario'], name: nombre.value, lastname: apellidoP.value, slastname: apellidoM.value, birtday: cumpleanios.value, phone: numTelefonico.value, status: estadoCuenta.value, roll: permisos.value },
                                    dataType: "json",
                                    success: function (response) {
                                        if (response === true) {
                                            Swal.fire({
                                                position: "top-end",
                                                icon: "success",
                                                title: "Usuario actualizado",
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            $('.modal').modal('hide');
                                            tablaCuentas.innerHTML = `<tr>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                        </tr>`;
                                            getAccounts();
                                        } else {
                                            Swal.fire("No fue posible realizar la actualizacion", "Lo sentimos no fue posible llevar a acabo lo solicitado, por favor intenta mas tarde.", "error");
                                            $('.modal').modal('hide');
                                            tablaCuentas.innerHTML = `<tr>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                            <td>
                                                <p class="placeholder-glow">
                                                    <span class="placeholder col-10"></span>
                                                </p>
                                            </td>
                                        </tr>`;
                                            getAccounts();
                                        }
                                    },
                                    error: function (jqXHR, textStatus, errorThrow) {
                                        Swal.fire("Ups, algo salio mal", `Lo sentimos no fue posible llevar a acabo lo solicitado, por favor intenta mas tarde. Error : ${textStatus}`, "error");
                                        console.error(jqXHR);
                                        console.error(textStatus);
                                        console.error(errorThrow);
                                    }
                                });
                            }
                        });

                    });
                } else {
                    //Mostrar mensaje de que no hay nada por mostrar
                }
            },
            error: function (textStatus, errorThrow, jqXHR) {
                //Mensaje 
                Swal.fire("Error al procesa la solicitud", `Error detectado: ${textStatus}, intentalo mas tarde.`, "error");
                //Mensajes por consola
                console.error(textStatus);
                console.error(errorThrow);
                console.error(jqXHR);
            }
        });
    }

    /**
     * EJECUCION PRINCIPAL DEL SCRIPT
     */

    try {
        //LLamar las funciones para inicializar la pagina
        getAccounts();

        /**
         * Agregar los eventos de click a los botones de recargar
         */

        //Boton de recargar los datos en la tabla de cuentas de usuarios
        btnRefresh[0].addEventListener("click", () => {
            tablaCuentas.innerHTML = `<tr>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
            <td>
                <p class="placeholder-glow">
                    <span class="placeholder col-10"></span>
                </p>
            </td>
        </tr>`;
            getAccounts();
        });

    } catch (error) {
        //En caso de erro se mostrara un mensaje por consola
        console.error(error);
    }

});