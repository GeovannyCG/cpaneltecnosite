$(function () {
    /**
     * Extraccion de los elemtos DOM del dashboard y creacion de funciones
     */

    //!DOMS
    let productos = document.querySelector("#divProductos");
    let categories = document.querySelector("#divCategorias");
    let ofertas = document.querySelector("#divOfertas");
    let tiendas = document.querySelector("#divSucursales");
    let newQuotes = document.querySelector("#table-show-quotes"); //DOM del tbody de la tabla de Nuevas Cotizaciones
    let tbQuotesActive = document.querySelector("#tbody-quotes-actives"); //DOM del tbody de la tabla de cotizaciones activas
    let tbQuotesHistory = document.querySelector("#tbody-quotes-history"); //DOM del tbody de la tabla de historial cotizaciones
    let tbUsersAccounts = document.querySelector("#tbody-quotes-accounts") //DOM del tbody de la tabla de cuentas de usuarios
    let btnRecargar = document.querySelectorAll(".refresh");

    //!FUNCIONES

    //Funcion para insertar el efecto de holder en las tarjetas de estadisticas
    function placeHolder(dom) {
        dom.innerHTML = `
        <p class="placeholder-glow">
            <span class="placeholder col-12"></span>
        </p>`;
    }
    //Funcion para agregar el efecto de carga a los elementos de la tabla "Cotizaciones"
    function phTableQuotes(dom) {
        dom.innerHTML = `
        <tr>
            <th scope="row">
                <span class="placeholder col-12"></span>
            </th>
            <td>
                <span class="placeholder col-12"></span>
            </td>
            <td>
                <span class="placeholder col-12"></span>
            </td>
            <td>
                <span class="placeholder col-12"></span>
            </td>
        </tr>

        <tr>
            <th scope="row">
                <span class="placeholder col-12"></span>
            </th>
            <td>
                <span class="placeholder col-12"></span>
            </td>
            <td>
                <span class="placeholder col-12"></span>
            </td>
            <td>
                <span class="placeholder col-12"></span>
            </td>
        </tr>

        <tr>
            <th scope="row">
                <span class="placeholder col-12"></span>
            </th>
            <td>
                <span class="placeholder col-12"></span>
            </td>
            <td>
                <span class="placeholder col-12"></span>
            </td>
            <td>
                <span class="placeholder col-12"></span>
            </td>
        </tr>
        `;
    }

    //Funcion para extraer las nuevas cotizaciones y mostrarlas en pantalla
    function refreshQuotes() {


        $.ajax({ //Solicitud ajax para extraer las cotizaciones
            type: "GET",
            url: "./dash-action",
            data: { request: "newquotes" },
            dataType: "json",
            success: function (response) {
                newQuotes.innerHTML = ``;

                if (!response || Object.keys(response).length === 0) { //Si no hay nuevas cotizaciones se mostrar el mensaje de vacio
                    let mssgEmpety = document.createElement("tr");
                    mssgEmpety.innerHTML = `
                    <td colspan="3">
                    <center>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" style="color: gray;" class="bi bi-clipboard2-check-fill" viewBox="0 0 16 16">
                            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
                            <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                        </svg>
                        <h4 style="color: gray;">No hay nuevas cotizaciones...</h4>
                    </center>
                    <td/>
                    `;

                    newQuotes.appendChild(mssgEmpety);

                } else { //En caso contrario se creara un elemento tr por cada coleccion que devuelva la respuesta del ajax
                    response.forEach((e) => {
                        let row = document.createElement("tr");
                        row.innerHTML = `
                        <th scope="row">
            ${e["invoice"]}
            </th>
            <td>
            ${e["date_create"]}
            </td>
            <td>
            ${e["names"]} ${e["surname"]}
            </td>
            <td> <h5><span class="badge text-bg-success">${e["status"]}</span></h5></td>
            <td class="actions-buttons">
            <button class="btn view-quote" data-bs-toggle="modal" data-bs-target="#exampleModal${e["invoice"]}"><i
                    class="bi bi-eye-fill white-icon"></i></button>
            <a id="accepted${e["invoice"]}" class="btn accept-quote"><i class="bi bi-check-circle-fill white-icon"></i></a>
            </td>`;

                        newQuotes.appendChild(row);

                        let btnAceptar = document.getElementById("accepted" + e["invoice"]); //Se le agrega el evento clic a cada uno de los botones de aceptar
                        if (btnAceptar) {
                            btnAceptar.addEventListener("click", function () {
                                // Aquí agregas tu lógica de evento para cada elemento <a>
                                Swal.fire({
                                    title: `¿Deseas aceptar la cotizacion ${e["invoice"]}?`,
                                    showDenyButton: true,
                                    confirmButtonText: "Aceptar",
                                    denyButtonText: `Cancelar`,
                                    confirmButtonColor: "#7CA9FF",
                                }).then((result) => {
                                    if (result.isConfirmed) {

                                        $.ajax({
                                            type: "GET",
                                            url: "./dash-action",
                                            data: { request: "acceptquote", invoice: e["invoice"] },
                                            dataType: "json",
                                            success: function (response) {

                                                if (response[0]["execute"] == true) {

                                                    Swal.fire({
                                                        position: "top-end",
                                                        icon: "success",
                                                        title: "Cotizacion aceptada",
                                                        showConfirmButton: false,
                                                        timer: 1500,
                                                    });

                                                    refreshQuotes();

                                                } else {
                                                    Swal.fire({
                                                        position: "top-end",
                                                        icon: "error",
                                                        title: "Cotizacion no aceptada.",
                                                        showConfirmButton: false,
                                                        timer: 1500,
                                                    });
                                                }

                                            },
                                            error: function (jqXHR, textStatus, errorThrown) {
                                                console.log(jqXHR);
                                                console.log(textStatus);
                                                console.log(errorThrown);
                                            },
                                        });
                                    }
                                });
                            });
                        }

                        // Verificar si el modal ya existe
                        let modalExistente = document.getElementById(`exampleModal${e["invoice"]}`);

                        // Si el modal ya existe, eliminarlo antes de crear uno nuevo
                        if (modalExistente) {
                            modalExistente.remove();
                        }

                        // Crear y configurar el modal
                        let modal = document.createElement("div"); //Se crea un modal por cada elemento de la coleccion que devuelva el AJAX
                        modal.classList.add("modal", "fade");
                        modal.setAttribute("style", "color: black;");
                        modal.setAttribute("id", `exampleModal${e["invoice"]}`);
                        modal.setAttribute("tabindex", "-1");
                        modal.setAttribute("aria-labelledby", "exampleModalLabel");
                        modal.setAttribute("aria-hidden", "true");
                        modal.innerHTML = `
                        <div class="modal-dialog modal-dialog-scrollable modal-xl">
                            <div class="modal-content">
                            <div class="modal-header">
                            <h2 class="modal-title fs-5" id="exampleModalLabel">Solicitud de cotizacion #
                                ${e["invoice"]}
                            </h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                
                            <div>
                                <h6>Detalles del cliente</h6>
                                <div class="row">
                                    <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                    <div class="col">
                                        <!-- Input para agregar nombres -->
                                        <label for="inputNames">Nombre completo:</label>
                                        <input type="text" class="form-control" value="${e["names"]} ${e["surname"]} ${e["second_surname"]}" id="inputNames" disabled>
                                    </div>
                                    <div class="col">
                                        <!-- input para agregar los apellidos -->
                                        <label for="inputEmail">Correo electronico:</label>
                                        <input type="text" class="form-control" value="${e["email"]}" id="inputEmail" disabled>
                                    </div>
                                </div>
                
                                <div class="row">
                                    <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                    <div class="col">
                                        <!-- Input para agregar nombres -->
                                        <label for="inputCompany">Compañia:</label>
                                        <input type="text" class="form-control" value="${e["company"]}" id="inputCompany" disabled>
                                    </div>
                
                                    <div class="col">
                                        <!-- Input para agregar nombres -->
                                        <label for="inputRfc">RFC:</label>
                                        <input type="text" class="form-control" value="${e["rfc"]}" id="inputRfc" disabled>
                                    </div>
                                </div>
                            </div><br>
                
                            <div>
                                <h6>Origen</h6>
                                <div class="row">
                                    <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                    <div class="col">
                                        <!-- Input para agregar nombres -->
                                        <label for="inputEstado">Estado:</label>
                                        <input type="text" class="form-control" value="${e["state_origin"]}" id="inputEstado"
                                            disabled>
                                    </div>
                                    <div class="col">
                                        <!-- input para agregar los apellidos -->
                                        <label for="inputMunicipio">Municipio:</label>
                                        <input type="text" class="form-control" value="${e["state_origin"]}" id="inputMunicipio"
                                            disabled>
                                    </div>
                                </div>
                
                                <div class="row">
                                    <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                    <div class="col">
                                        <!-- Input para agregar nombres -->
                                        <label for="inputCP">Codigo postal:</label>
                                        <input type="text" class="form-control" value="${e["postal_code"]}" id="inputCP" disabled>
                                    </div>
                
                                </div>
                            </div><br>
                
                            <div>
                                <h6>Datos de direccion</h6>
                                <div class="row" id="tablep${e["invoice"]}">
                                    <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                    <div class="col">
                                        <!-- Input para agregar nombres -->
                                        <label for="inputCalle">Calle:</label>
                                        <input type="text" class="form-control" value="${e["street_direction"]}" id="inputCalle"
                                            disabled>
                                    </div>
                                    <div class="col">
                                        <!-- input para agregar los apellidos -->
                                        <label for="inputEdificio">Municipio:</label>
                                        <input type="text" class="form-control" value="${e["building_name"]}" id="inputEdificio"
                                            disabled>
                                    </div>
                                </div>
                
                                <div class="row">
                                    <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                    <div class="col">
                                        <!-- Input para agregar nombres -->
                                        <label for="inputCP">Numero de piso o departamento:</label>
                                        <input type="text" class="form-control" value="${e["ford_number"]}" id="inputCP" disabled>
                                    </div>
                
                                </div>
                            </div><br>
            
                            <div>
                                <h6>Productos solicitados</h6>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Clave</th>
                                            <th scope="col">Imagen</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tabla${e["invoice"]}">
                                    </tbody>
                                </table>
                            </div>
                
                
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                            </div>
                        </div>
                    `;
                        document.body.appendChild(modal); //Se agrega el modal al body del documento HTML

                        //!Extraccion de los productos por cada elemento que devuelva la coleccion del AJAX

                        //Se extraen los valores de los productos y cantidades
                        let idProductos = e["products_id"];
                        let cantidadProductos = e["ammount_products"];
                        let preciosProductos = e["prices_products"];

                        //Se convierten en un array
                        let arrayIds = idProductos.split(","); //Se 
                        let arrayCantidad = cantidadProductos.split(",");
                        let arrayPrecios = preciosProductos.split(",");
                        let arrayInt = arrayPrecios.map(str => parseFloat(str));

                        //El array de los idProductos se convierte en un JSON que sera enviado por una consulta AJAX
                        let productosArray = JSON.stringify(arrayIds);

                        let dom = "#tabla" + e["invoice"];

                        //Agregar el efecto de carga en las tablas donde se mostraran los productos
                        document.querySelector(dom).innerHTML = `
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
                            </tr>
                        `;

                        $.ajax({
                            type: "GET",
                            url: "./Products",
                            data: { request: "search", datas: productosArray },
                            dataType: "json",
                            success: function (response) { //Por cada elemento devuelto de la respuesta AJAX se crea un nuevo elemento tr para mostrar los productos de manera visual
                                document.querySelector(dom).innerHTML = ""; // Limpiar contenido previo
                                arrayCantidad.forEach((cantidad, index) => {
                                    let rest = response[index]; // Obtener el producto correspondiente a la cantidad
                                    let contenidoHTML = `
                                        <tr>
                                            <th scope="row">${rest["clave"]}</th>
                                            <td><img src="${rest["imagen"]}" alt="producto" width="200px" height="auto"></td>
                                            <td>${rest["nombre"]}</td>
                                            <td>${cantidad}</td>
                                            <td>$${formatNumber(arrayInt[index])} MXN</td>
                                        </tr>
                                    `;
                                    document.querySelector(dom).innerHTML += contenidoHTML;
                                });

                                let filaTotal = document.createElement("tr");
                                filaTotal.innerHTML = `
                                <th></th>
                                <td></td>
                                <td></td>
                                <td><strong>Total:</strong></td>
                                <td>${totalVent(arrayInt)}</td>
                                `;

                                document.querySelector(dom).appendChild(filaTotal);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log(jqXHR);
                                console.log(textStatus);
                                console.log(errorThrown);
                            },
                        });
                    });
                }
            },
            error: function (xhr, status, error) {
                // Manejar el error
                console.log(status); // Esto podría mostrar [object Object]
            },
        });
    }

    //Funciones para la ejecucion de las secciones de cotizaciones!!!!!!!!!!!!!!!!!!
    //Dar formato a los precios de los productos mostrados en las cotizaciones
    function formatNumber(number) {
        let partes = number.toFixed(2).split('.');
        return partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.' + partes[1];
    }

    //Obtener precio total de los productos en cada cotizacion
    function totalVent(precios) {
        let acumulador = 0;

        precios.forEach(precio => {
            acumulador += precio;
        });

        return "$" + formatNumber(acumulador) + " MNX";
    }

    //Obtener Todas las cotizaciones Activas
    function getAllActiveQuotes() {
        $.ajax({
            type: "GET",
            url: "./dash-action",
            data: { request: "getallactivequotes" },
            dataType: "json",
            success: function (response) {
                tbQuotesActive.innerHTML = ``;

                if (response.length > 0) {
                    response.forEach(e => {
                        let fila = document.createElement("tr");
                        fila.innerHTML = `
                        <td>${e['invoice']}</td>
                        <td>${e['date_create']}</td>
                        <td>${e['names']} ${e['surname']} ${e['second_surname']}</td>
                        `;

                        //Columna para mostrar el estado de la cotizacion
                        let estado = document.createElement("td");

                        switch (e['status']) {
                            case "takeit":
                                estado.innerHTML = `<h5><span class="badge text-bg-light">Por atender</span></h5>`;
                                break;
                            case "confirmation-sent":
                                estado.innerHTML = `<h5><span class="badge text-bg-info">Confirmacion Enviada</span></h5>`;
                                break;
                            case "confirmation-made":
                                estado.innerHTML = `<h5><span class="badge text-bg-primary">Confirmacion realizada</span></h5>`;
                                break;
                            case "unasnwered-confirmation":
                                estado.innerHTML = `<h5><span class="badge text-bg-danger">Confirmacion no realizada</span></h5>`;
                                break;
                            case "bill-shiping":
                                estado.innerHTML = `<h5><span class="badge text-bg-primary">Se envio factura</span></h5>`;
                                break;
                            case "payment-made":
                                estado.innerHTML = `<h5><span class="badge text-bg-primary">Pago recibido</span></h5>`;
                                break;
                            case "unasnwered-payment":
                                estado.innerHTML = `<h5><span class="badge text-bg-danger">Pago no recibido</span></h5>`;
                                break;
                            case "order-delivery":
                                estado.innerHTML = `<h5><span class="badge text-bg-primary">Orden enviada a CT</span></h5>`;
                                break;
                            case "order-made":
                                estado.innerHTML = `<h5><span class="badge text-bg-primary">Orden hecha en CT</span></h5>`;
                                break;
                            case "unasnwered-order":
                                estado.innerHTML = `<h5><span class="badge text-bg-danger">Orden sin respuesta de CT</span></h5>`;
                                break;
                            case "shipment-made":
                                estado.innerHTML = `<h5><span class="badge text-bg-primary">Envio en camino</span></h5>`;
                                break;
                            case "shipping-difficulties":
                                estado.innerHTML = `<h5><span class="badge text-bg-warning">Problemas con el envio</span></h5>`;
                                break;
                            case "order-hold":
                                estado.innerHTML = `<h5><span class="badge text-bg-warning">Envio retenido</span></h5>`;
                                break;
                            case "order-cancellation":
                                estado.innerHTML = `<h5><span class="badge text-bg-danger">Envio cancelado</span></h5>`;
                                break;
                            case "order-delivered":
                                estado.innerHTML = `<h5><span class="badge text-bg-success">Pedido entregado</span></h5>`;
                                break;
                        }

                        //Columna par mostrar el boton para abrir la cotizacion
                        let acciones = document.createElement("td");
                        acciones.innerHTML = `<button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#historial-cotizacion-${e["invoice"]}"><i class="bi bi-folder-symlink-fill"></i></button>`;

                        fila.appendChild(estado);
                        fila.appendChild(acciones);
                        tbQuotesActive.appendChild(fila);

                        // Verificar si el modal ya existe
                        let modalExistente = document.getElementById(`historial-cotizacion-${e["invoice"]}`);

                        // Si el modal ya existe, eliminarlo antes de crear uno nuevo
                        if (modalExistente) {
                            modalExistente.remove();
                        }

                        //Crear el Modal donde se mostrara la informacion
                        let modal = document.createElement("div"); //Se crea un modal por cada elemento de la coleccion que devuelva el AJAX
                        modal.classList.add("modal", "fade");
                        modal.setAttribute("style", "color: black;");
                        modal.setAttribute("id", `historial-cotizacion-${e["invoice"]}`);
                        modal.setAttribute("tabindex", "-1");
                        modal.setAttribute("aria-labelledby", "exampleModalLabel");
                        modal.setAttribute("aria-hidden", "true");
                        modal.innerHTML = `
                        <div class="modal-dialog modal-dialog-scrollable modal-fullscreen">
                        <div class="modal-content">
                        <div class="modal-header">
                        <h2 class="modal-title fs-5" id="exampleModalLabel">Solicitud de cotizacion #
                            ${e["invoice"]}
                        </h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
    
                        <div>
                            <h6>Detalles del cliente</h6>
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputNames">Nombre completo:</label>
                                    <input type="text" class="form-control" value="${e["names"]} ${e["surname"]} ${e["second_surname"]}" id="inputNames" disabled>
                                </div>
                                <div class="col">
                                    <!-- input para agregar los apellidos -->
                                    <label for="inputEmail">Correo electronico:</label>
                                    <input type="text" class="form-control" value="${e["email"]}" id="inputEmail" disabled>
                                </div>
                            </div>
    
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputCompany">Compañia:</label>
                                    <input type="text" class="form-control" value="${e["company"]}" id="inputCompany" disabled>
                                </div>
    
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputRfc">RFC:</label>
                                    <input type="text" class="form-control" value="${e["rfc"]}" id="inputRfc" disabled>
                                </div>
                            </div>
                        </div><br>
    
                        <div>
                            <h6>Origen</h6>
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputEstado">Estado:</label>
                                    <input type="text" class="form-control" value="${e["state_origin"]}" id="inputEstado"
                                        disabled>
                                </div>
                                <div class="col">
                                    <!-- input para agregar los apellidos -->
                                    <label for="inputMunicipio">Municipio:</label>
                                    <input type="text" class="form-control" value="${e["state_origin"]}" id="inputMunicipio"
                                        disabled>
                                </div>
                            </div>
    
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputCP">Codigo postal:</label>
                                    <input type="text" class="form-control" value="${e["postal_code"]}" id="inputCP" disabled>
                                </div>
    
                            </div>
                        </div><br>
    
                        <div>
                            <h6>Datos de direccion</h6>
                            <div class="row" id="tablep${e["invoice"]}">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputCalle">Calle:</label>
                                    <input type="text" class="form-control" value="${e["street_direction"]}" id="inputCalle"
                                        disabled>
                                </div>
                                <div class="col">
                                    <!-- input para agregar los apellidos -->
                                    <label for="inputEdificio">Municipio:</label>
                                    <input type="text" class="form-control" value="${e["building_name"]}" id="inputEdificio"
                                        disabled>
                                </div>
                            </div>
    
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputCP">Numero de piso o departamento:</label>
                                    <input type="text" class="form-control" value="${e["ford_number"]}" id="inputCP" disabled>
                                </div>
    
                            </div>
                        </div><br>
    
                        <div>
                            <h6>Productos solicitados</h6>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Clave</th>
                                        <th scope="col">Imagen</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Importe</th>
                                    </tr>
                                </thead>
                                <tbody id="tablas-mostrar-${e["invoice"]}">
                                </tbody>
                            </table>
                        </div>
    
                        
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                        </div>
                        </div>
                        `;
                        //Agregar el modal al cuerpo del body
                        document.body.appendChild(modal);

                        //Se extraen los valores de los productos y cantidades
                        let idProductos = e["products_id"];
                        let cantidadProductos = e["ammount_products"];
                        let preciosProductos = e["prices_products"];

                        //Se convierten en un array
                        let arrayIds = idProductos.split(","); //Se 
                        let arrayCantidad = cantidadProductos.split(",");
                        let arrayPrecios = preciosProductos.split(",");
                        let arrayInt = arrayPrecios.map(str => parseFloat(str));

                        //El array de los idProductos se convierte en un JSON que sera enviado por una consulta AJAX
                        let productosArray = JSON.stringify(arrayIds);
                        let dom = "#tablas-mostrar-" + e["invoice"];

                        //Agregar el efecto de carga en las tablas donde se mostraran los productos
                        document.querySelector(dom).innerHTML = `
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
                            </tr>
                        `;

                        $.ajax({
                            type: "GET",
                            url: "./Products",
                            data: { request: "search", datas: productosArray },
                            dataType: "json",
                            success: function (response) { //Por cada elemento devuelto de la respuesta AJAX se crea un nuevo elemento tr para mostrar los productos de manera visual
                                document.querySelector(dom).innerHTML = ""; // Limpiar contenido previo
                                arrayCantidad.forEach((cantidad, index) => {
                                    let rest = response[index]; // Obtener el producto correspondiente a la cantidad
                                    let contenidoHTML = `
                                        <tr>
                                            <th scope="row">${rest["clave"]}</th>
                                            <td><img src="${rest["imagen"]}" alt="producto" width="200px" height="auto"></td>
                                            <td>${rest["nombre"]}</td>
                                            <td>${cantidad}</td>
                                            <td>$${formatNumber(arrayInt[index])} MXN</td>
                                        </tr>
                                    `;
                                    document.querySelector(dom).innerHTML += contenidoHTML;
                                });

                                let filaTotal = document.createElement("tr");
                                filaTotal.innerHTML = `
                                <th></th>
                                <td></td>
                                <td></td>
                                <td><strong>Total:</strong></td>
                                <td>${totalVent(arrayInt)}</td>
                                `;

                                document.querySelector(dom).appendChild(filaTotal);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log(jqXHR);
                                console.log(textStatus);
                                console.log(errorThrown);
                            },
                        });

                    });
                } else {
                    tbQuotesActive.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" style="color: gray; width="70" height="70" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                            </svg>
                            <h4 style="color: gray;">Ningun usuario esta gestionando alguna cotizacion</h4>
                        </td>
                    </tr>
                    `;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR);
                console.error(textStatus);
                console.error(errorThrown);
            }
        });
    }

    //Obtener las cotizaciones ya finalizadas
    function getHistoryQuotes() {
        $.ajax({
            type: "GET",
            url: "./dash-action",
            data: { request: "gethistory" },
            dataType: "json",
            success: function (response) {
                tbQuotesHistory.innerHTML = ``;

                if (response.length > 0) {
                    response.forEach(e => {
                        let fila = document.createElement("tr");
                        fila.innerHTML = `
                        <td>${e['invoice']}</td>
                        <td>${e['date_create']}</td>
                        <td>${e['names']} ${e['surname']} ${e['second_surname']}</td>
                        `;

                        //Columna para mostrar el estado de la cotizacion
                        let estado = document.createElement("td");

                        switch (e['status']) {
                            case "takeit":
                                estado.innerHTML = `<h5><span class="badge text-bg-light">Por atender</span></h5>`;
                                break;
                            case "confirmation-sent":
                                estado.innerHTML = `<h5><span class="badge text-bg-info">Confirmacion Enviada</span></h5>`;
                                break;
                            case "confirmation-made":
                                estado.innerHTML = `<h5><span class="badge text-bg-primary">Confirmacion realizada</span></h5>`;
                                break;
                            case "unasnwered-confirmation":
                                estado.innerHTML = `<h5><span class="badge text-bg-danger">Confirmacion no realizada</span></h5>`;
                                break;
                            case "bill-shiping":
                                estado.innerHTML = `<h5><span class="badge text-bg-primary">Se envio factura</span></h5>`;
                                break;
                            case "payment-made":
                                estado.innerHTML = `<h5><span class="badge text-bg-primary">Pago recibido</span></h5>`;
                                break;
                            case "unasnwered-payment":
                                estado.innerHTML = `<h5><span class="badge text-bg-danger">Pago no recibido</span></h5>`;
                                break;
                            case "order-delivery":
                                estado.innerHTML = `<h5><span class="badge text-bg-primary">Orden enviada a CT</span></h5>`;
                                break;
                            case "order-made":
                                estado.innerHTML = `<h5><span class="badge text-bg-primary">Orden hecha en CT</span></h5>`;
                                break;
                            case "unasnwered-order":
                                estado.innerHTML = `<h5><span class="badge text-bg-danger">Orden sin respuesta de CT</span></h5>`;
                                break;
                            case "shipment-made":
                                estado.innerHTML = `<h5><span class="badge text-bg-primary">Envio en camino</span></h5>`;
                                break;
                            case "shipping-difficulties":
                                estado.innerHTML = `<h5><span class="badge text-bg-warning">Problemas con el envio</span></h5>`;
                                break;
                            case "order-hold":
                                estado.innerHTML = `<h5><span class="badge text-bg-warning">Envio retenido</span></h5>`;
                                break;
                            case "order-cancellation":
                                estado.innerHTML = `<h5><span class="badge text-bg-danger">Envio cancelado</span></h5>`;
                                break;
                            case "order-delivered":
                                estado.innerHTML = `<h5><span class="badge text-bg-success">Pedido entregado</span></h5>`;
                                break;
                        }

                        //Columna par mostrar el boton para abrir la cotizacion
                        let acciones = document.createElement("td");
                        acciones.innerHTML = `<button class="btn view-quote" data-bs-toggle="modal" data-bs-target="#cotizacion-${e["invoice"]}"><i class="bi bi-eye-fill white-icon"></i></button>`;

                        fila.appendChild(estado);
                        fila.appendChild(acciones);
                        tbQuotesHistory.appendChild(fila);

                        // Verificar si el modal ya existe
                        let modalExistente = document.getElementById(`cotizacion-${e["invoice"]}`);

                        // Si el modal ya existe, eliminarlo antes de crear uno nuevo
                        if (modalExistente) {
                            modalExistente.remove();
                        }

                        //Crear el Modal donde se mostrara la informacion
                        let modal = document.createElement("div"); //Se crea un modal por cada elemento de la coleccion que devuelva el AJAX
                        modal.classList.add("modal", "fade");
                        modal.setAttribute("style", "color: black;");
                        modal.setAttribute("id", `cotizacion-${e["invoice"]}`);
                        modal.setAttribute("tabindex", "-1");
                        modal.setAttribute("aria-labelledby", "exampleModalLabel");
                        modal.setAttribute("aria-hidden", "true");
                        modal.innerHTML = `
                        <div class="modal-dialog modal-dialog-scrollable modal-fullscreen">
                        <div class="modal-content">
                        <div class="modal-header">
                        <h2 class="modal-title fs-5" id="exampleModalLabel">Solicitud de cotizacion #
                            ${e["invoice"]}
                        </h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
        
                        <div>
                            <h6>Detalles del cliente</h6>
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputNames">Nombre completo:</label>
                                    <input type="text" class="form-control" value="${e["names"]} ${e["surname"]} ${e["second_surname"]}" id="inputNames" disabled>
                                </div>
                                <div class="col">
                                    <!-- input para agregar los apellidos -->
                                    <label for="inputEmail">Correo electronico:</label>
                                    <input type="text" class="form-control" value="${e["email"]}" id="inputEmail" disabled>
                                </div>
                            </div>
        
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputCompany">Compañia:</label>
                                    <input type="text" class="form-control" value="${e["company"]}" id="inputCompany" disabled>
                                </div>
        
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputRfc">RFC:</label>
                                    <input type="text" class="form-control" value="${e["rfc"]}" id="inputRfc" disabled>
                                </div>
                            </div>
                        </div><br>
        
                        <div>
                            <h6>Origen</h6>
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputEstado">Estado:</label>
                                    <input type="text" class="form-control" value="${e["state_origin"]}" id="inputEstado"
                                        disabled>
                                </div>
                                <div class="col">
                                    <!-- input para agregar los apellidos -->
                                    <label for="inputMunicipio">Municipio:</label>
                                    <input type="text" class="form-control" value="${e["state_origin"]}" id="inputMunicipio"
                                        disabled>
                                </div>
                            </div>
        
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputCP">Codigo postal:</label>
                                    <input type="text" class="form-control" value="${e["postal_code"]}" id="inputCP" disabled>
                                </div>
        
                            </div>
                        </div><br>
        
                        <div>
                            <h6>Datos de direccion</h6>
                            <div class="row" id="tablep${e["invoice"]}">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputCalle">Calle:</label>
                                    <input type="text" class="form-control" value="${e["street_direction"]}" id="inputCalle"
                                        disabled>
                                </div>
                                <div class="col">
                                    <!-- input para agregar los apellidos -->
                                    <label for="inputEdificio">Municipio:</label>
                                    <input type="text" class="form-control" value="${e["building_name"]}" id="inputEdificio"
                                        disabled>
                                </div>
                            </div>
        
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputCP">Numero de piso o departamento:</label>
                                    <input type="text" class="form-control" value="${e["ford_number"]}" id="inputCP" disabled>
                                </div>
        
                            </div>
                        </div><br>
        
                        <div>
                            <h6>Productos solicitados</h6>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Clave</th>
                                        <th scope="col">Imagen</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Importe</th>
                                    </tr>
                                </thead>
                                <tbody id="tabla-mostrars-${e["invoice"]}">
                                </tbody>
                            </table>
                        </div>
                        </div>
                        </div>
                        `;
                        //Agregar el modal al cuerpo del body
                        document.body.appendChild(modal);

                        //Se extraen los valores de los productos y cantidades
                        let idProductos = e["products_id"];
                        let cantidadProductos = e["ammount_products"];
                        let preciosProductos = e["prices_products"];

                        //Se convierten en un array
                        let arrayIds = idProductos.split(","); //Se 
                        let arrayCantidad = cantidadProductos.split(",");
                        let arrayPrecios = preciosProductos.split(",");
                        let arrayInt = arrayPrecios.map(str => parseFloat(str));

                        //El array de los idProductos se convierte en un JSON que sera enviado por una consulta AJAX
                        let productosArray = JSON.stringify(arrayIds);
                        let dom = "#tabla-mostrars-" + e["invoice"];

                        //Agregar el efecto de carga en las tablas donde se mostraran los productos
                        document.querySelector(dom).innerHTML = `
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
                            </tr>
                        `;

                        $.ajax({
                            type: "GET",
                            url: "./Products",
                            data: { request: "search", datas: productosArray },
                            dataType: "json",
                            success: function (response) { //Por cada elemento devuelto de la respuesta AJAX se crea un nuevo elemento tr para mostrar los productos de manera visual
                                document.querySelector(dom).innerHTML = ""; // Limpiar contenido previo
                                arrayCantidad.forEach((cantidad, index) => {
                                    let rest = response[index]; // Obtener el producto correspondiente a la cantidad
                                    let contenidoHTML = `
                                        <tr>
                                            <th scope="row">${rest["clave"]}</th>
                                            <td><img src="${rest["imagen"]}" alt="producto" width="200px" height="auto"></td>
                                            <td>${rest["nombre"]}</td>
                                            <td>${cantidad}</td>
                                            <td>$${formatNumber(arrayInt[index])} MXN</td>
                                        </tr>
                                    `;
                                    document.querySelector(dom).innerHTML += contenidoHTML;
                                });

                                let filaTotal = document.createElement("tr");
                                filaTotal.innerHTML = `
                                <th></th>
                                <td></td>
                                <td></td>
                                <td><strong>Total:</strong></td>
                                <td>${totalVent(arrayInt)}</td>
                                `;

                                document.querySelector(dom).appendChild(filaTotal);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log(jqXHR);
                                console.log(textStatus);
                                console.log(errorThrown);
                            },
                        });

                    });
                } else {
                    tbQuotesHistory.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" style="color: gray;" width="70" height="70" fill="currentColor" class="bi bi-book-fill" viewBox="0 0 16 16">
                            <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                        </svg>
                            <h4 style="color: gray;">No hay historial de cotizaciones disponibles...</h4>
                        </td>
                    </tr>
                    `;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    }

    // Funcion para extraer las cuentas activas actualmente
    function getAccounts() {
        //Peticion Ajax al servidor
        $.ajax({
            type: "GET",
            url: "./dash-action",
            data: { request: "get-all-accounts" },
            dataType: "json",
            success: function (response) {

                //Verificar que la respuesta tenga mas de un registro devuelto
                if (response.length > 0) {
                    //Se limpian las filas de la tabla para poder mostrar las filas
                    tbUsersAccounts.innerHTML = ``;
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
                        tbUsersAccounts.appendChild(filaTabla);

                        // Verificar si el modal ya existe
                        let modalExistente = document.getElementById(`modalUsuario${e['idUsuario']}`);

                        // Si el modal ya existe, eliminarlo antes de crear uno nuevo
                        if (modalExistente) {
                            modalExistente.remove();
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
                                            <label for="#inputNombres${e['idUsuario']}" class="form-label">Nombre(s):</label>
                                            <input type="email" class="form-control" id="inputNombres${e['idUsuario']}" value="${e['Nombres']}" disabled>
                                        </div>
                                        <div class="col">
                                            <label for="#inputApellidoP${e['idUsuario']}" class="form-label">Apellido paterno:</label>
                                            <input type="email" class="form-control" id="inputApellidoP${e['idUsuario']}" value="${e['ApellidoP']}" disabled>
                                        </div>
                                        <div class="col">
                                            <label for="#inputApellidoM${e['idUsuario']}" class="form-label">Apellido materno:</label>
                                            <input type="email" class="form-control" id="inputApellidoM${e['idUsuario']}" value="${e['ApellidoM']}" disabled>
                                        </div>
                                    </div><br>

                                    <div class="row">
                                        <div class="col">
                                            <label for="#inputCumpleanios${e['idUsuario']}" class="form-label">Fecha de cumpleaños:</label>
                                            <input type="date" class="form-control" id="inputCumpleanios${e['idUsuario']}" value="${e['Cumpleanios']}" disabled>
                                        </div>
                                        <div class="col">
                                            <label for="#inputTelefono${e['idUsuario']}" class="form-label">Numero telefonico:</label>
                                            <input type="number" class="form-control" id="inputTelefono${e['idUsuario']}" value="${e['Telefono']}" disabled>
                                        </div>
                                    </div><br>

                                    <div class="row">
                                        <div class="col">
                                            <label for="#inputCorreo${e['idUsuario']}" class="form-label">Correo:</label>
                                            <input type="email" class="form-control" id="inputCorreo${e['idUsuario']}" value="${e['Correo']}" disabled>
                                        </div>
                                        <div class="col">
                                            <label for="#inputContrasenia${e['idUsuario']}" class="form-label">Contraseña:</label>
                                            <input type="password" class="form-control" id="inputContrasenia${e['idUsuario']}" value="${e['Contrasenia']}" disabled>
                                        </div>
                                    </div><br>

                                    <div class="row">
                                        <div class="col">
                                            <label for="#inputEstado${e['idUsuario']}" class="form-label">Estado de la cuenta:</label>
                                            <input type="text" class="form-control" id="inputEstado${e['idUsuario']}" value="${e['Estatus']}" disabled>
                                        </div>
                                        <div class="col">
                                            <label for="#inputIntentos${e['idUsuario']}" class="form-label">Numero de intentos de acceder a la cuenta:</label>
                                            <input type="number" class="form-control" id="inputIntentos${e['idUsuario']}" value="${e['Intentos']}" disabled>
                                        </div>
                                        <div class="col">
                                            <label for="#inputRoll${e['idUsuario']}" class="form-label">Permisos de la cuenta:</label>
                                            <input type="text" class="form-control" id="inputRoll${e['idUsuario']}" value="${e['Roll']}" disabled>
                                        </div>
                                    </div>
                                </form><br>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                            </div>
                        </div>`;
                        document.body.appendChild(modalUsuario);

                    });
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
     * MAIN ***********************************************************************
     */

    try {
        // Mostrar efecto de carga en las tarjetas de informacion
        placeHolder(productos);
        placeHolder(categories);
        placeHolder(ofertas);
        placeHolder(tiendas);

        //Cargar la cantidad de productos existentes.
        $.ajax({
            type: "GET",
            url: "./Products",
            data: { request: "countproducts" },
            dataType: "json",
            success: function (response) {
                productos.innerHTML = ``;
                let h1 = document.createElement("h1");
                h1.textContent = response[0]["count"];
                productos.appendChild(h1);
            },
            error: function (jqXHR, textStatus, errorThrown, error) {
                console.log(errorThrown);
            },
        });

        //Cargar la cantidad de cotegorias que hay
        $.ajax({
            type: "GET",
            url: "./Products",
            data: { request: "countcategories" },
            dataType: "json",
            success: function (response) {
                categories.innerHTML = ``;
                let h2 = document.createElement("h1");
                h2.textContent = response[0]["categories"];
                categories.appendChild(h2);
            },
            error: function (errorThrown, error, textStatus) {
                console.log("Hubo un error: " + error);
            },
        });

        // Cargar la catidad de productos con oferta
        $.ajax({
            type: "GET",
            url: "./Products",
            data: { request: "countofferts" },
            dataType: "json",
            success: function (response) {
                ofertas.innerHTML = ``;
                let h3 = document.createElement("h1");
                h3.textContent = response[0]["offert"];
                ofertas.appendChild(h3);
            },
            error: function (errorThrown, error, textStatus) {
                console.log("Hubo un error: " + error);
            },
        });

        // Cargar la cantidad de tiendas existentes
        $.ajax({
            type: "GET",
            url: "./Products",
            data: { request: "countstores" },
            dataType: "json",
            success: function (response) {
                tiendas.innerHTML = ``;
                let h4 = document.createElement("h1");
                h4.textContent = response[0]["stores"];
                tiendas.appendChild(h4);
            },
            error: function (error, errorThrown, textStatus) {
                // console.log();
                console.log("Hubo un error: " + textStatus);
            },
        });

        //Cargar los datos de la tabla cotizaciones
        refreshQuotes();// Mostrar efecto de carga en las tarjetas de informacion
        placeHolder(productos);
        placeHolder(categories);
        placeHolder(ofertas);
        placeHolder(tiendas);

        //Cargar la cantidad de productos existentes.
        $.ajax({
            type: "GET",
            url: "./Products",
            data: { request: "countproducts" },
            dataType: "json",
            success: function (response) {
                productos.innerHTML = ``;
                let h1 = document.createElement("h1");
                h1.textContent = response[0]["count"];
                productos.appendChild(h1);
            },
            error: function (jqXHR, textStatus, errorThrown, error) {
                console.log(errorThrown);
            },
        });

        //Cargar la cantidad de cotegorias que hay
        $.ajax({
            type: "GET",
            url: "./Products",
            data: { request: "countcategories" },
            dataType: "json",
            success: function (response) {
                categories.innerHTML = ``;
                let h2 = document.createElement("h1");
                h2.textContent = response[0]["categories"];
                categories.appendChild(h2);
            },
            error: function (errorThrown, error, textStatus) {
                console.log("Hubo un error: " + error);
            },
        });

        // Cargar la catidad de productos con oferta
        $.ajax({
            type: "GET",
            url: "./Products",
            data: { request: "countofferts" },
            dataType: "json",
            success: function (response) {
                ofertas.innerHTML = ``;
                let h3 = document.createElement("h1");
                h3.textContent = response[0]["offert"];
                ofertas.appendChild(h3);
            },
            error: function (errorThrown, error, textStatus) {
                console.log("Hubo un error: " + error);
            },
        });

        // Cargar la cantidad de tiendas existentes
        $.ajax({
            type: "GET",
            url: "./Products",
            data: { request: "countstores" },
            dataType: "json",
            success: function (response) {
                tiendas.innerHTML = ``;
                let h4 = document.createElement("h1");
                h4.textContent = response[0]["stores"];
                tiendas.appendChild(h4);
            },
            error: function (error, errorThrown, textStatus) {
                // console.log();
                console.log("Hubo un error: " + textStatus);
            },
        });

        //Cargar los datos de la tabla cotizaciones
        refreshQuotes();
        //Agregar evento de click cl boton de recargar
        btnRecargar[0].addEventListener("click", () => {
            newQuotes.innerHTML = `<tr>
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
            </tr>`;
            refreshQuotes();
        });

        if (tbQuotesActive) {
            getAllActiveQuotes();

            btnRecargar[1].addEventListener("click", () => {
                tbQuotesActive.innerHTML = `<tr>
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
                </tr>`;

                getAllActiveQuotes();
            });
        }

        if (tbQuotesHistory) {
            getHistoryQuotes();

            btnRecargar[2].addEventListener("click", () => {
                tbQuotesHistory.innerHTML = `<tr>
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
                </tr>`;

                getHistoryQuotes();
            });
        }

        if (tbUsersAccounts) {
            getAccounts();

            btnRecargar[3].addEventListener("click", () => {
                tbUsersAccounts.innerHTML = `<tr>
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
        }

    } catch (error) {
        //Mostrar el error atrapado por el try-catch
        console.error(error);
    }

});
