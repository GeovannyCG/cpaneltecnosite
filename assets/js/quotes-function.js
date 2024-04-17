$(function () {
    console.log("jQuery is ready!");

    /**
     * OBTENCION DE LOS DOM DE LOS ELEMENTOS HTML
     */
    let inputBuscador = document.querySelectorAll(".input-buscador"); //Inputs de buscador de cada tabla
    let btnBuscador = document.querySelectorAll(".btn-search");
    let btnRecargar = document.querySelectorAll(".refresh");
    let tbNuvsCotizaciones = document.querySelector("#tb-nuevas-cotizaciones"); //Tabla de nuevas cotizaciones (admin) (coumun)
    let tbSegCotizaciones = document.querySelector("#tb-seguimiento-cotizaciones"); //Tabla para el seguimiento de cotizaciones (admin) (coumun)
    let tbActCotizaciones = document.querySelector("#tb-activas-cotizaciones"); //Tabla para las cotizaciones activas (admin)
    let tbHistorialCoti = document.querySelector("#tb-historial-cotizaciones"); //Tabla para mostrar el historial de cotizaciones

    /**
     * FUNCIONES QUE SE UTILIZARAN A LO LARGO DE LA INTERACCION DEL SITIO
     */

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

    //Obtener todas las cotizaciones catalogadas como nuevas
    function getAllQuotes() {

        $.ajax({
            type: "GET",
            url: "./quotes-action",
            data: { request: "getallquotes" },
            dataType: "json",
            success: function (response) {
                tbNuvsCotizaciones.innerHTML = ``;

                if (response.length > 0) { //Se verifica que la respuesta del servidor tenga mas de 0 resultados
                    response.forEach(rs => {
                        let fila = document.createElement("tr");
                        fila.innerHTML = `
                            <td>${rs['invoice']}</td>
                            <td>${rs['date_create']}</td>
                            <td>${rs['names']} ${rs['surname']} ${rs['second_surname']}</td>
                            <td><h5><span class="badge text-bg-success">Nueva</span></h5></td>
                            <td class="actions-buttons">
                        <button class="btn view-quote" data-bs-toggle="modal" data-bs-target="#exampleModal${rs["invoice"]}"><i
                                class="bi bi-eye-fill white-icon"></i></button>
                        <a id="accepted${rs["invoice"]}" class="btn accept-quote"><i class="bi bi-check-circle-fill white-icon"></i></a>
                        </td>
                    `;
                        tbNuvsCotizaciones.appendChild(fila);
                        //Agregar el evento de click a todos los botones
                        let btnAceptar = document.getElementById("accepted" + rs["invoice"]);
                        btnAceptar.addEventListener("click", () => {
                            // Aquí agregas tu lógica de evento para cada elemento <a>
                            Swal.fire({
                                title: `¿Deseas aceptar la cotizacion ${rs["invoice"]}?`,
                                showDenyButton: true,
                                confirmButtonText: "Aceptar",
                                denyButtonText: `Cancelar`,
                                confirmButtonColor: "#7CA9FF",
                            }).then((result) => {

                                if (result.isConfirmed) {

                                    $.ajax({
                                        type: "GET",
                                        url: "./quotes-action",
                                        data: { request: "acceptquote", invoice: rs["invoice"] },
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

                                                tbNuvsCotizaciones.innerHTML = `
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

                                                tbSegCotizaciones.innerHTML = `
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

                                                getAllQuotes();
                                                getSpecificallyQuotes();

                                            } else {
                                                Swal.fire({
                                                    position: "top-end",
                                                    icon: "error",
                                                    title: "Cotizacion no aceptada",
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

                        // Verificar si el modal ya existe
                        let modalExistente = document.getElementById(`exampleModal${rs["invoice"]}`);

                        // Si el modal ya existe, eliminarlo antes de crear uno nuevo
                        if (modalExistente) {
                            modalExistente.remove();
                        }

                        //Crear el Modal donde se mostrara la informacion
                        let modal = document.createElement("div"); //Se crea un modal por cada elemento de la coleccion que devuelva el AJAX
                        modal.classList.add("modal", "fade");
                        modal.setAttribute("style", "color: black;");
                        modal.setAttribute("id", `exampleModal${rs["invoice"]}`);
                        modal.setAttribute("tabindex", "-1");
                        modal.setAttribute("aria-labelledby", "exampleModalLabel");
                        modal.setAttribute("aria-hidden", "true");
                        modal.innerHTML = `
                        <div class="modal-dialog modal-dialog-scrollable modal-xl">
                        <div class="modal-content">
                        <div class="modal-header">
                        <h2 class="modal-title fs-5" id="exampleModalLabel">Solicitud de cotizacion #
                            ${rs["invoice"]}
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
                                    <input type="text" class="form-control" value="${rs["names"]} ${rs["surname"]} ${rs["second_surname"]}" id="inputNames" disabled>
                                </div>
                                <div class="col">
                                    <!-- input para agregar los apellidos -->
                                    <label for="inputEmail">Correo electronico:</label>
                                    <input type="text" class="form-control" value="${rs["email"]}" id="inputEmail" disabled>
                                </div>
                            </div>
            
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputCompany">Compañia:</label>
                                    <input type="text" class="form-control" value="${rs["company"]}" id="inputCompany" disabled>
                                </div>
            
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputRfc">RFC:</label>
                                    <input type="text" class="form-control" value="${rs["rfc"]}" id="inputRfc" disabled>
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
                                    <input type="text" class="form-control" value="${rs["state_origin"]}" id="inputEstado"
                                        disabled>
                                </div>
                                <div class="col">
                                    <!-- input para agregar los apellidos -->
                                    <label for="inputMunicipio">Municipio:</label>
                                    <input type="text" class="form-control" value="${rs["state_origin"]}" id="inputMunicipio"
                                        disabled>
                                </div>
                            </div>
            
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputCP">Codigo postal:</label>
                                    <input type="text" class="form-control" value="${rs["postal_code"]}" id="inputCP" disabled>
                                </div>
            
                            </div>
                        </div><br>
            
                        <div>
                            <h6>Datos de direccion</h6>
                            <div class="row" id="tablep${rs["invoice"]}">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputCalle">Calle:</label>
                                    <input type="text" class="form-control" value="${rs["street_direction"]}" id="inputCalle"
                                        disabled>
                                </div>
                                <div class="col">
                                    <!-- input para agregar los apellidos -->
                                    <label for="inputEdificio">Municipio:</label>
                                    <input type="text" class="form-control" value="${rs["building_name"]}" id="inputEdificio"
                                        disabled>
                                </div>
                            </div>
            
                            <div class="row">
                                <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                                <div class="col">
                                    <!-- Input para agregar nombres -->
                                    <label for="inputCP">Numero de piso o departamento:</label>
                                    <input type="text" class="form-control" value="${rs["ford_number"]}" id="inputCP" disabled>
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
                                <tbody id="tabla${rs["invoice"]}">
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

                        document.body.appendChild(modal);

                        //Se extraen los valores de los productos y cantidades
                        let idProductos = rs["products_id"];
                        let cantidadProductos = rs["ammount_products"];
                        let preciosProductos = rs["prices_products"];

                        //Se convierten en un array
                        let arrayIds = idProductos.split(","); //Se 
                        let arrayCantidad = cantidadProductos.split(",");
                        let arrayPrecios = preciosProductos.split(",");
                        let arrayInt = arrayPrecios.map(str => parseFloat(str));

                        //El array de los idProductos se convierte en un JSON que sera enviado por una consulta AJAX
                        let productosArray = JSON.stringify(arrayIds);
                        let dom = "#tabla" + rs["invoice"];

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
                } else { // En caso contrario se mostrara un mensaje de que no hay registros diponibles
                    tbNuvsCotizaciones.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" style="color: gray"; width="70" height="70" fill="currentColor" class="bi bi-inbox-fill" viewBox="0 0 16 16">
                                <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z"/>
                            </svg>
                            <h5 style="color: gray;">Aun no hay nuevas cotizaciones...</h5>
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

    //Obtener las cotizaciones en especifico que lleva a cabo cada usuario
    function getSpecificallyQuotes() {
        $.ajax({
            type: "GET",
            url: "./quotes-action",
            data: { request: "getspecifiquotes" },
            dataType: "json",
            success: function (response) {
                tbSegCotizaciones.innerHTML = ``;

                if (response.length > 0) { //Se verifica que la respuesta del servidor traiga mas de 0 registros
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
                        acciones.innerHTML = `<button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#detalles-cotizacion-${e["invoice"]}"><i class="bi bi-folder-symlink-fill"></i></button>`;

                        fila.appendChild(estado);
                        fila.appendChild(acciones);
                        tbSegCotizaciones.appendChild(fila);

                        // Verificar si el modal ya existe
                        let modalExistente = document.getElementById(`detalles-cotizacion-${e["invoice"]}`);

                        // Si el modal ya existe, eliminarlo antes de crear uno nuevo
                        if (modalExistente) {
                            modalExistente.remove();
                        }

                        //Crear el Modal donde se mostrara la informacion
                        let modal = document.createElement("div"); //Se crea un modal por cada elemento de la coleccion que devuelva el AJAX
                        modal.classList.add("modal", "fade");
                        modal.setAttribute("style", "color: black;");
                        modal.setAttribute("id", `detalles-cotizacion-${e["invoice"]}`);
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
                                <tbody id="tabla-mostrar-${e["invoice"]}">
                                </tbody>
                            </table>
                        </div>
    
                        <!-- Acciones para la cotizacion -->
                        <div style = "margin-bottom: 20px;">
                        <h6>Gestor de estado de cotizacion</h6>
                            <div style="margin-bottom: 20px;">
                                <label for="opciones-cotizacion-${e['invoice']}" class="form-label">Estado de la cotizacion ${e['invoice']} actualmente:</label>
                                <select class="form-select" aria-label="Default select example" style="width: 500px;" id="opciones-cotizacion-${e['invoice']}">
                                    <option value="takeit">Cotizacion pendiente de atender</option>
                                    <option value="confirmation-sent">Se envio confirmacion de cotizacion a usuario</option>
                                    <option value="confirmation-made">El usuario confirmo la cotizacion</option>
                                    <option value="unasnwered-confirmation" style="color: red;">El usuario no confirmo la cotizacion</option>
                                    <option value="bill-shiping">Realizacion de envio de ficha de pago a usuario</option>
                                    <option value="payment-made">El usuario realizo el pago correctamente</option>
                                    <option value="unasnwered-payment" style="color: red;">El usuario no realizo el pago correspondiente</option>
                                    <option value="order-delivery">Levantamiento de orden de pedido ante CT</option>
                                    <option value="order-made">CT confirma de enterado de la orden de pedido</option>
                                    <option value="unasnwered-order" style="color: red;">No se recibio ninguna respuesta de enterado por parte de CT</option>
                                    <option value="shipment-made">El pedio del usuario fue enviado a su domicilio</option>
                                    <option value="shipping-difficulties" style="color: orange;">El envio del pedido al usuario presento dificultades</option>
                                    <option value="order-hold" style="color: orange;">El envio del pedido al usuario fue retenido</option>
                                    <option value="order-cancellation" style="color: orange;">El envio del pedido al usuario fue cancelado</option>
                                    <option value="order-delivered">El usuario recibio el pedido en su domicilio</option>
                                </select>
                            </div>
                            <h6>Otras opciones</h6>
                            <div>
                                <button type="button" class="btn btn-danger" id="btn-terminar-${e['invoice']}">Terminar seguimiento de la cotizacion</button>
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

                        // Cargar el estado de la cotización actual
                        let selectElement = document.querySelector("#opciones-cotizacion-" + e['invoice']);
                        let arrayOptions = selectElement.options;

                        // Marcar como seleccionado la opcion cuyo value sea igual al estado de la cotizacion en la db
                        for (let i = 0; i < arrayOptions.length; i++) {
                            if (e['status'] == arrayOptions[i].value) {
                                arrayOptions[i].selected = true;
                                break;
                            }
                        }

                        //Agregar el evento para detectar cuando el usuario desee cambiar el estado de una cotizacion
                        selectElement.addEventListener("change", (event) => {
                            event.preventDefault();

                            const select = event.target;
                            const newValue = select.value;

                            //Mensaje de confirmacion de cambio de estado de cotizacion
                            Swal.fire({
                                title: `¿Deseas cambiar el estado de la cotizacion: ${e['invoice']}?`,
                                showDenyButton: true,
                                confirmButtonText: "Guardar",
                                confirmButtonColor: "#7CA9FF",
                                denyButtonText: "Cancelar"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    //Enviar peticion a servidor para actualizar el estado de la cotizacion
                                    $.ajax({
                                        type: "GET",
                                        url: "./quotes-action",
                                        data: { request: "updatestatusq", quote: e['invoice'], status: select.value },
                                        dataType: "json",
                                        success: function (response) {

                                            if (response[0]['execute_status']) {
                                                select.value = newValue;
                                                Swal.fire("¡Guardado!", "", "success");
                                                // Cerrar el modal activo
                                                $('.modal').modal('hide');
                                                tbSegCotizaciones.innerHTML = `
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
                                                getSpecificallyQuotes();

                                                btnBuscador[0].disabled = true;
                                                btnRecargar[1].disabled = true;

                                                setTimeout(() => {
                                                    btnBuscador[0].disabled = false;
                                                    btnRecargar[1].disabled = false;
                                                }, 5000);
                                            } else {
                                                select.selectedIndex = select.dataset.originalIndex;
                                                Swal.fire("Cambios no guardados", "", "info");
                                            }
                                        },
                                        error: function (jqXHR, textStatus, errorThrown) {
                                            console.log(jqXHR);
                                            console.log(textStatus);
                                            console.log(errorThrown);
                                        }
                                    });
                                } else if (result.isDenied) {
                                    // Restaurar el valor original del select si el usuario cancela
                                    select.selectedIndex = select.dataset.originalIndex;
                                    Swal.fire("Cambios no guardados", "", "info");
                                }
                            });
                        });

                        //Eventos para detectar cuando el usuario desee ejecutar una accion en la cotizacion
                        //Eliminar Cotizacion
                        document.querySelector("#btn-terminar-" + e['invoice']).addEventListener("click", () => {
                            Swal.fire({
                                title: "¿Deseas dar por concluida esta cotizacion?",
                                showDenyButton: true,
                                confirmButtonText: "Si",
                                denyButtonText: `No`
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    $.ajax({
                                        type: "GET",
                                        url: "./quotes-action",
                                        data: { request: "managequote", quote: e['invoice'] },
                                        dataType: "json",
                                        success: function (response) {

                                            if (response[0]['execute_status'] == true) {
                                                Swal.fire("Cotizacion concluida correctamente", "", "success");

                                                // Cerrar el modal activo
                                                $('.modal').modal('hide');

                                                tbSegCotizaciones.innerHTML = `
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

                                                getSpecificallyQuotes();

                                                btnBuscador[0].disabled = true;
                                                btnRecargar[1].disabled = true;

                                                setTimeout(() => {
                                                    btnBuscador[0].disabled = false;
                                                    btnRecargar[1].disabled = false;
                                                }, 5000);

                                            } else if (response[0]['execute_status'] == false) {
                                                // Cerrar el modal activo
                                                $('.modal').modal('hide');
                                                tbSegCotizaciones.innerHTML = `
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

                                                getSpecificallyQuotes();

                                                btnBuscador[0].disabled = true;
                                                btnRecargar[1].disabled = true;

                                                setTimeout(() => {
                                                    btnBuscador[0].disabled = false;
                                                    btnRecargar[1].disabled = false;
                                                }, 5000);
                                                Swal.fire("Algo salio mal", "Puede que la cotizacion ya haya sido concluida por un administrador.", "warning");
                                            }

                                        },
                                        error: function (jqXHR, textStatus, errorThrown) {
                                            console.error(jqXHR);
                                            console.error(textStatus);
                                            console.error(errorThrown);
                                        }
                                    });
                                } else if (result.isDenied) {
                                    Swal.fire("Cambios no realizados", "", "info");
                                }
                            });
                        });

                        // Guardar el valor original del select al cargar la página o cuando se necesite
                        const selecte = selectElement;
                        selecte.dataset.originalIndex = selecte.selectedIndex;

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
                        let dom = "#tabla-mostrar-" + e["invoice"];

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
                } else { // De lo contrario se mostrara un mensaje de que no hay ningun registro
                    tbSegCotizaciones.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align: center;">
                        <svg xmlns="http://www.w3.org/2000/svg" style="color: gray;" width="70" height="70" fill="currentColor" class="bi bi-cup-hot-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6zM13 12.5a2 2 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5"/>
                            <path d="m4.4.8-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 3.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 6.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 9.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8"/>
                        </svg>
                            <h5 style="color: gray;">Vaya, no tienes cotizaciones por atender.</h5>
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

    //Obtener las cotizaciones ya finalizadas
    function getHistoryQuotes() {
        $.ajax({
            type: "GET",
            url: "./quotes-action",
            data: { request: "gethistory" },
            dataType: "json",
            success: function (response) {
                tbHistorialCoti.innerHTML = ``;

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
                        tbHistorialCoti.appendChild(fila);

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
                    tbHistorialCoti.innerHTML = `
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

    //Obtener todas las cotizaciones
    function getAllActiveQuotes() {
        $.ajax({
            type: "GET",
            url: "./quotes-action",
            data: { request: "getallactivequotes" },
            dataType: "json",
            success: function (response) {
                tbActCotizaciones.innerHTML = ``;

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
                        tbActCotizaciones.appendChild(fila);

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
    
                        <!-- Acciones para la cotizacion -->
                        <div style = "margin-bottom: 20px;">
                        <h6>Gestor de estado de cotizacion</h6>
                            <div style="margin-bottom: 20px;">
                                <label for="opciones-c-${e['invoice']}" class="form-label">Estado de la cotizacion ${e['invoice']} actualmente:</label>
                                <select class="form-select" aria-label="Default select example" style="width: 500px;" id="opciones-c-${e['invoice']}">
                                    <option value="takeit">Cotizacion pendiente de atender</option>
                                    <option value="confirmation-sent">Se envio confirmacion de cotizacion a usuario</option>
                                    <option value="confirmation-made">El usuario confirmo la cotizacion</option>
                                    <option value="unasnwered-confirmation" style="color: red;">El usuario no confirmo la cotizacion</option>
                                    <option value="bill-shiping">Realizacion de envio de ficha de pago a usuario</option>
                                    <option value="payment-made">El usuario realizo el pago correctamente</option>
                                    <option value="unasnwered-payment" style="color: red;">El usuario no realizo el pago correspondiente</option>
                                    <option value="order-delivery">Levantamiento de orden de pedido ante CT</option>
                                    <option value="order-made">CT confirma de enterado de la orden de pedido</option>
                                    <option value="unasnwered-order" style="color: red;">No se recibio ninguna respuesta de enterado por parte de CT</option>
                                    <option value="shipment-made">El pedio del usuario fue enviado a su domicilio</option>
                                    <option value="shipping-difficulties" style="color: orange;">El envio del pedido al usuario presento dificultades</option>
                                    <option value="order-hold" style="color: orange;">El envio del pedido al usuario fue retenido</option>
                                    <option value="order-cancellation" style="color: orange;">El envio del pedido al usuario fue cancelado</option>
                                    <option value="order-delivered">El usuario recibio el pedido en su domicilio</option>
                                </select>
                            </div>
                            <h6>Otras opciones</h6>
                            <div>
                                <button type="button" class="btn btn-danger" id="terminar-${e['invoice']}">Terminar seguimiento de la cotizacion</button>
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

                        // Cargar el estado de la cotización actual
                        let selectElement = document.querySelector("#opciones-c-" + e['invoice']);
                        let arrayOptions = selectElement.options;

                        // Marcar como seleccionado la opcion cuyo value sea igual al estado de la cotizacion en la db
                        for (let i = 0; i < arrayOptions.length; i++) {
                            if (e['status'] == arrayOptions[i].value) {
                                arrayOptions[i].selected = true;
                                break;
                            }
                        }

                        //Agregar el evento para detectar cuando el usuario desee cambiar el estado de una cotizacion
                        selectElement.addEventListener("change", (event) => {
                            event.preventDefault();

                            const select = event.target;
                            const newValue = select.value;

                            //Mensaje de confirmacion de cambio de estado de cotizacion
                            Swal.fire({
                                title: `¿Deseas cambiar el estado de la cotizacion: ${e['invoice']}?`,
                                showDenyButton: true,
                                confirmButtonText: "Guardar",
                                confirmButtonColor: "#7CA9FF",
                                denyButtonText: "Cancelar"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    //Enviar peticion a servidor para actualizar el estado de la cotizacion
                                    $.ajax({
                                        type: "GET",
                                        url: "./quotes-action",
                                        data: { request: "updatestatusq", quote: e['invoice'], status: select.value },
                                        dataType: "json",
                                        success: function (response) {

                                            if (response[0]['execute_status']) {
                                                select.value = newValue;
                                                Swal.fire("¡Guardado!", "", "success");
                                                // Cerrar el modal activo
                                                $('.modal').modal('hide');
                                                tbActCotizaciones.innerHTML = `
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
                                                getAllActiveQuotes();

                                                btnBuscador[0].disabled = true;
                                                btnRecargar[1].disabled = true;

                                                setTimeout(() => {
                                                    btnBuscador[0].disabled = false;
                                                    btnRecargar[1].disabled = false;
                                                }, 5000);
                                            } else {
                                                select.selectedIndex = select.dataset.originalIndex;
                                                Swal.fire("Cambios no guardados", "", "info");
                                            }
                                        },
                                        error: function (jqXHR, textStatus, errorThrown) {
                                            console.log(jqXHR);
                                            console.log(textStatus);
                                            console.log(errorThrown);
                                        }
                                    });
                                } else if (result.isDenied) {
                                    // Restaurar el valor original del select si el usuario cancela
                                    select.selectedIndex = select.dataset.originalIndex;
                                    Swal.fire("Cambios no guardados", "", "info");
                                }
                            });
                        });

                        //Eventos para detectar cuando el usuario desee ejecutar una accion en la cotizacion
                        //Eliminar Cotizacion
                        document.querySelector("#terminar-" + e['invoice']).addEventListener("click", () => {
                            Swal.fire({
                                title: "¿Deseas dar por concluida esta cotizacion?",
                                showDenyButton: true,
                                confirmButtonText: "Si",
                                denyButtonText: `No`
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    $.ajax({
                                        type: "GET",
                                        url: "./quotes-action",
                                        data: { request: "managequote", quote: e['invoice'] },
                                        dataType: "json",
                                        success: function (response) {

                                            if (response[0]['execute_status'] == true) {
                                                Swal.fire("Cotizacion concluida correctamente", "", "success");

                                                // Cerrar el modal activo
                                                $('.modal').modal('hide');
                                                tbActCotizaciones.innerHTML = `
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

                                                getAllActiveQuotes();

                                                btnBuscador[1].disabled = true;
                                                btnRecargar[2].disabled = true;

                                                setTimeout(() => {
                                                    btnBuscador[1].disabled = false;
                                                    btnRecargar[2].disabled = false;
                                                }, 5000);

                                            } else if (response[0]['execute_status'] == false) {
                                                // Cerrar el modal activo
                                                $('.modal').modal('hide');
                                                tbActCotizaciones.innerHTML = `
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

                                                getAllActiveQuotes();

                                                btnBuscador[1].disabled = true;
                                                btnRecargar[2].disabled = true;

                                                setTimeout(() => {
                                                    btnBuscador[1].disabled = false;
                                                    btnRecargar[2].disabled = false;
                                                }, 5000);
                                                Swal.fire("Algo salio mal", "Puede que la cotizacion ya haya sido concluida por el usuario al que se le fue asignada originalmente.", "warning");
                                            }

                                        },
                                        error: function (jqXHR, textStatus, errorThrown) {
                                            console.error(jqXHR);
                                            console.error(textStatus);
                                            console.error(errorThrown);
                                        }
                                    });
                                } else if (result.isDenied) {
                                    Swal.fire("Cambios no realizados", "", "info");
                                }
                            });
                        });


                        // Guardar el valor original del select al cargar la página o cuando se necesite
                        const selecte = selectElement;
                        selecte.dataset.originalIndex = selecte.selectedIndex;

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
                    tbActCotizaciones.innerHTML = `
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

    /**
     * EJECUCION PRINCIPAL
     */

    try {
        //Cargar las nuevas cotizaciones
        getAllQuotes();
        getSpecificallyQuotes();
        //verificar que la tabla para visualizar todas las cotizaciones activas esta en pantalla (ADMINISTRADORES)
        if (tbActCotizaciones) {
            getAllActiveQuotes();
        }
        //verificar que la tabla para visualizar el historial de las cotizaciones esta en pantalla (ADMINISTRADORES)
        if (tbHistorialCoti) {
            getHistoryQuotes();
        }

        /**
         * EVENTOS PARA LOS BOTONES DE RECARGAR DE CADA UNA DE LAS TABLAS
         */

        //Recargar la tabla de nuevas cotizaciones
        btnRecargar[0].addEventListener("click", () => {
            btnRecargar[0].disabled = true;
            tbNuvsCotizaciones.innerHTML = `
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
            getAllQuotes();
            setTimeout(() => {
                btnRecargar[0].disabled = false;
            }, 5000);
        });

        //Recargar la tabla de Seguimiento de cotizaciones.
        btnRecargar[1].addEventListener("click", () => {
            btnRecargar[1].disabled = true;
            btnBuscador[0].disabled = true;
            inputBuscador[0].disabled = true;
            tbSegCotizaciones.innerHTML = `
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
            getSpecificallyQuotes();
            setTimeout(() => {
                btnRecargar[1].disabled = false;
                btnBuscador[0].disabled = false;
                inputBuscador[0].disabled = false;
            }, 5000);
        });

        //Recargar la tabla de cotizaciones activas
        if (tbActCotizaciones) {
            btnRecargar[2].addEventListener("click", () => {
                btnRecargar[2].disabled = true;
                btnBuscador[1].disabled = true;
                inputBuscador[1].disabled = true;
                tbActCotizaciones.innerHTML = `
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
                getAllActiveQuotes();
                setTimeout(() => {
                    btnRecargar[2].disabled = false;
                    btnBuscador[1].disabled = false;
                    inputBuscador[1].disabled = false;
                }, 5000);
            });
        }

        //Recargar la tabla de historial de tbActCotizaciones
        if (tbHistorialCoti) {
            btnRecargar[3].addEventListener("click", () => {
                btnRecargar[3].disabled = true;
                btnBuscador[2].disabled = true;
                inputBuscador[2].disabled = true;
                tbHistorialCoti.innerHTML = `
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
                getHistoryQuotes();
                setTimeout(() => {
                    btnRecargar[3].disabled = false;
                    btnBuscador[2].disabled = false;
                    inputBuscador[2].disabled = false;
                }, 5000);
            });
        }

        /**
         * EVENTOS PARA LAS BUSQUEDAS DE CADA TABLA
         */

        //TABLA DE SEGUIMIENTO DE COTIZACIONES!
        //Variable que detectara si se busca un elemento o se restaurar el estado de boton de busqueda (CAMBIA POR CADA TABLA).
        let busquedaActiva = false;
        btnBuscador[0].addEventListener("click", () => {
            //Limpiar los posibles espacios que pueden desde el dato de busqueda (CAMBIA POR CADA TABLA).
            let dato = inputBuscador[0].value.toUpperCase().trim();
            //Verificar que el input de busqueda no este vacio.
            if (dato === "") {
                //Mensaje de que el input esta vacio y no se puede hacer la busqueda
                Swal.fire("Busqueda incorrecta", "Debes de colocar el FOLIO de la cotizacion que deseas encontrar.", "warning");
            } else {
                //Verificar si hay una busqueda activa actualmente
                if (!busquedaActiva) { //(CAMBIA POR CADA TABLA).
                    //Agregar el efecto de carga a la tabla (CAMBIA POR CADA TABLA).
                    tbSegCotizaciones.innerHTML = `
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
                    //Agregar el efecto de carga al boton de busqueda (CAMBIA POR CADA TABLA).
                    btnBuscador[0].innerHTML = `
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span class="visually-hidden" role="status">Loading...</span>
                    `;
                    btnBuscador[0].disabled = true;
                    //Agregar los efectos de carga de busqueda al input de busqueda.
                    inputBuscador[0].disabled = true;
                    //Realziacion de la peticion al servidor (CAMBIA POR CADA TABLA).
                    $.ajax({
                        type: "GET",
                        url: "./quotes-action",
                        data: { request: 'searchUserQuotes', cotizacion: dato },
                        dataType: "json",
                        success: function (response) {
                            //Se agrega el icono de resetear al boton de busqueda y se habilita nuevamente
                            btnBuscador[0].innerHTML = `<i class="bi bi-x"></i>`;
                            btnBuscador[0].disabled = false;

                            //Se muestran los elementos resultantes de la busqueda hecha por el usuario (RECICLADO DEL METODO DESIGNADO PARA CARGAR CADA TABLA) (CAMBIA POR CADA TABLA).
                            tbSegCotizaciones.innerHTML = ``;

                            if (response.length > 0) { //Se verifica que la respuesta del servidor traiga mas de 0 registros (CAMBIA POR CADA TABLA).
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
                                    acciones.innerHTML = `<button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#detalles-cotizacion-${e["invoice"]}"><i class="bi bi-folder-symlink-fill"></i></button>`;

                                    fila.appendChild(estado);
                                    fila.appendChild(acciones);
                                    tbSegCotizaciones.appendChild(fila);

                                    // Verificar si el modal ya existe
                                    let modalExistente = document.getElementById(`detalles-cotizacion-${e["invoice"]}`);

                                    // Si el modal ya existe, eliminarlo antes de crear uno nuevo
                                    if (modalExistente) {
                                        modalExistente.remove();
                                    }

                                    //Crear el Modal donde se mostrara la informacion
                                    let modal = document.createElement("div"); //Se crea un modal por cada elemento de la coleccion que devuelva el AJAX
                                    modal.classList.add("modal", "fade");
                                    modal.setAttribute("style", "color: black;");
                                    modal.setAttribute("id", `detalles-cotizacion-${e["invoice"]}`);
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
                    <tbody id="tabla-mostrar-${e["invoice"]}">
                    </tbody>
                </table>
            </div>

            <!-- Acciones para la cotizacion -->
            <div style = "margin-bottom: 20px;">
            <h6>Gestor de estado de cotizacion</h6>
                <div style="margin-bottom: 20px;">
                    <label for="opciones-cotizacion-${e['invoice']}" class="form-label">Estado de la cotizacion ${e['invoice']} actualmente:</label>
                    <select class="form-select" aria-label="Default select example" style="width: 500px;" id="opciones-cotizacion-${e['invoice']}">
                        <option value="takeit">Cotizacion pendiente de atender</option>
                        <option value="confirmation-sent">Se envio confirmacion de cotizacion a usuario</option>
                        <option value="confirmation-made">El usuario confirmo la cotizacion</option>
                        <option value="unasnwered-confirmation" style="color: red;">El usuario no confirmo la cotizacion</option>
                        <option value="bill-shiping">Realizacion de envio de ficha de pago a usuario</option>
                        <option value="payment-made">El usuario realizo el pago correctamente</option>
                        <option value="unasnwered-payment" style="color: red;">El usuario no realizo el pago correspondiente</option>
                        <option value="order-delivery">Levantamiento de orden de pedido ante CT</option>
                        <option value="order-made">CT confirma de enterado de la orden de pedido</option>
                        <option value="unasnwered-order" style="color: red;">No se recibio ninguna respuesta de enterado por parte de CT</option>
                        <option value="shipment-made">El pedio del usuario fue enviado a su domicilio</option>
                        <option value="shipping-difficulties" style="color: orange;">El envio del pedido al usuario presento dificultades</option>
                        <option value="order-hold" style="color: orange;">El envio del pedido al usuario fue retenido</option>
                        <option value="order-cancellation" style="color: orange;">El envio del pedido al usuario fue cancelado</option>
                        <option value="order-delivered">El usuario recibio el pedido en su domicilio</option>
                    </select>
                </div>
                <h6>Otras opciones</h6>
                <div>
                    <button type="button" class="btn btn-danger" id="btn-terminar-${e['invoice']}">Terminar seguimiento de la cotizacion</button>
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

                                    // Cargar el estado de la cotización actual
                                    let selectElement = document.querySelector("#opciones-cotizacion-" + e['invoice']);
                                    let arrayOptions = selectElement.options;

                                    // Marcar como seleccionado la opcion cuyo value sea igual al estado de la cotizacion en la db
                                    for (let i = 0; i < arrayOptions.length; i++) {
                                        if (e['status'] == arrayOptions[i].value) {
                                            arrayOptions[i].selected = true;
                                            break;
                                        }
                                    }

                                    //Agregar el evento para detectar cuando el usuario desee cambiar el estado de una cotizacion
                                    selectElement.addEventListener("change", (event) => {
                                        event.preventDefault();

                                        const select = event.target;
                                        const newValue = select.value;

                                        //Mensaje de confirmacion de cambio de estado de cotizacion
                                        Swal.fire({
                                            title: `¿Deseas cambiar el estado de la cotizacion: ${e['invoice']}?`,
                                            showDenyButton: true,
                                            confirmButtonText: "Guardar",
                                            confirmButtonColor: "#7CA9FF",
                                            denyButtonText: "Cancelar"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                //Enviar peticion a servidor para actualizar el estado de la cotizacion
                                                $.ajax({
                                                    type: "GET",
                                                    url: "./quotes-action",
                                                    data: { request: "updatestatusq", quote: e['invoice'], status: select.value },
                                                    dataType: "json",
                                                    success: function (response) {

                                                        if (response[0]['execute_status']) {
                                                            select.value = newValue;
                                                            Swal.fire("¡Guardado!", "", "success");
                                                            // Cerrar el modal activo
                                                            $('.modal').modal('hide');
                                                            tbSegCotizaciones.innerHTML = `
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
                                                            getSpecificallyQuotes();

                                                            btnBuscador[0].disabled = true;
                                                            btnRecargar[1].disabled = true;

                                                            setTimeout(() => {
                                                                btnBuscador[0].disabled = false;
                                                                btnRecargar[1].disabled = false;
                                                            }, 5000);
                                                        } else {
                                                            select.selectedIndex = select.dataset.originalIndex;
                                                            Swal.fire("Cambios no guardados", "", "info");
                                                        }
                                                    },
                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                        console.log(jqXHR);
                                                        console.log(textStatus);
                                                        console.log(errorThrown);
                                                    }
                                                });
                                            } else if (result.isDenied) {
                                                // Restaurar el valor original del select si el usuario cancela
                                                select.selectedIndex = select.dataset.originalIndex;
                                                Swal.fire("Cambios no guardados", "", "info");
                                            }
                                        });
                                    });

                                    //Eventos para detectar cuando el usuario desee ejecutar una accion en la cotizacion
                                    //Eliminar Cotizacion
                                    document.querySelector("#btn-terminar-" + e['invoice']).addEventListener("click", () => {
                                        Swal.fire({
                                            title: "¿Deseas dar por concluida esta cotizacion?",
                                            showDenyButton: true,
                                            confirmButtonText: "Si",
                                            denyButtonText: `No`
                                        }).then((result) => {
                                            /* Read more about isConfirmed, isDenied below */
                                            if (result.isConfirmed) {
                                                $.ajax({
                                                    type: "GET",
                                                    url: "./quotes-action",
                                                    data: { request: "managequote", quote: e['invoice'] },
                                                    dataType: "json",
                                                    success: function (response) {

                                                        if (response[0]['execute_status'] == true) {
                                                            Swal.fire("Cotizacion concluida correctamente", "", "success");

                                                            // Cerrar el modal activo
                                                            $('.modal').modal('hide');

                                                            tbSegCotizaciones.innerHTML = `
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

                                                            getSpecificallyQuotes();

                                                            btnBuscador[0].disabled = true;
                                                            btnRecargar[1].disabled = true;

                                                            setTimeout(() => {
                                                                btnBuscador[0].disabled = false;
                                                                btnRecargar[1].disabled = false;
                                                            }, 5000);

                                                        } else if (response[0]['execute_status'] == false) {
                                                            // Cerrar el modal activo
                                                            $('.modal').modal('hide');
                                                            tbSegCotizaciones.innerHTML = `
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

                                                            getSpecificallyQuotes();

                                                            btnBuscador[0].disabled = true;
                                                            btnRecargar[1].disabled = true;

                                                            setTimeout(() => {
                                                                btnBuscador[0].disabled = false;
                                                                btnRecargar[1].disabled = false;
                                                            }, 5000);
                                                            Swal.fire("Algo salio mal", "Puede que la cotizacion ya haya sido concluida por un administrador.", "warning");
                                                        }

                                                    },
                                                    error: function (jqXHR, textStatus, errorThrown) {
                                                        console.error(jqXHR);
                                                        console.error(textStatus);
                                                        console.error(errorThrown);
                                                    }
                                                });
                                            } else if (result.isDenied) {
                                                Swal.fire("Cambios no realizados", "", "info");
                                            }
                                        });
                                    });

                                    // Guardar el valor original del select al cargar la página o cuando se necesite
                                    const selecte = selectElement;
                                    selecte.dataset.originalIndex = selecte.selectedIndex;

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
                                    let dom = "#tabla-mostrar-" + e["invoice"];

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
                            } else { // De lo contrario se mostrara un mensaje de que no hay ningun registro (CAMBIA POR CADA TABLA).
                                tbSegCotizaciones.innerHTML = `
                                <tr>
                                    <td colspan="5" style="text-align: center;">
                                        <svg xmlns="http://www.w3.org/2000/svg" style="color: gray;" width="70" height="70" fill="currentColor" class="bi bi-emoji-dizzy" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M9.146 5.146a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708m-5 0a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 1 1 .708.708l-.647.646.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708M10 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
                                        </svg>
                                        <h5 style="color: gray;">No hay ningun resultado para: "${dato}".</h5>
                                    </td>
                                </tr>
                                `;
                            }

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            //Mensaje de error al realizar la busqueda hecha por el usuario.
                            Swal.fire("Ups... Algo no salio bien", "Lo sentimos, tuvimos problemas para procesar tu peticion, intentalo mas tarde.", "error");
                            //Se intenta recargar los datos que ya estaban mostrados en la tabla (CAMBIA POR CADA TABLA).
                            getSpecificallyQuotes();
                            //Agregar el efecto de carga al boton de busqueda (CAMBIA POR CADA TABLA).
                            btnBuscador[0].innerHTML = `<i class="bi bi-search"></i>`;
                            btnBuscador[0].disabled = false;
                            //Agregar los efectos de carga de busqueda al input de busqueda. (CAMBIA POR CADA TABLA).
                            inputBuscador[0].disabled = false;
                            //Vaciar el input de la busqueda
                            inputBuscador[0].value = "";

                            //Mensajes de error en la consola
                            console.error(jqXHR);
                            console.error(textStatus);
                            console.error(errorThrown);
                        }
                    });
                } else {
                    //Agregar el efecto de carga en la tabla (CAMBIA POR CADA TABLA).
                    tbSegCotizaciones.innerHTML = `
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
                    getSpecificallyQuotes();
                    //Agregar el efecto de carga al boton de busqueda (CAMBIA POR CADA TABLA).
                    btnBuscador[0].innerHTML = `<i class="bi bi-search"></i>`;
                    //Vaciar el input de la busqueda y des habilitarlo por 5 segundos
                    inputBuscador[0].value = "";
                    btnBuscador[0].disabled = true;
                    //Esperar un tiempo para que no se pueda hacer una busqueda enseguida de volver al estado original
                    setTimeout(() => {
                        //Agregar los efectos de carga de busqueda al input de busqueda. (CAMBIA POR CADA TABLA).
                        btnBuscador[0].disabled = false;
                        inputBuscador[0].disabled = false;
                    }, 5000);
                }
                //Inicializar la variable para detectar si hay busqueda activa o no con el valor opuesto (true o false) para determinar el comportamiento al siguiente click (CAMBIA POR CADA TABLA).
                busquedaActiva = !busquedaActiva;
            }
        });

        //TABLA DE COTIZACIONES ACTIVAS DE TODOS LOS USUARIOS!
        if (tbActCotizaciones) {
            //Variable que detectara si se busca un elemento o se restaurar el estado de boton de busqueda (CAMBIA POR CADA TABLA).
            let busquedaActiva1 = false;
            btnBuscador[1].addEventListener("click", () => {
                //Limpiar los posibles espacios que pueden desde el dato de busqueda (CAMBIA POR CADA TABLA).
                let dato = inputBuscador[1].value.toUpperCase().trim();
                //Verificar que el input de busqueda no este vacio.
                if (dato === "") {
                    //Mensaje de que el input esta vacio y no se puede hacer la busqueda
                    Swal.fire("Busqueda incorrecta", "Debes de colocar el FOLIO de la cotizacion que deseas encontrar.", "warning");
                } else {
                    //Verificar si hay una busqueda activa actualmente
                    if (!busquedaActiva1) { //(CAMBIA POR CADA TABLA).
                        //Agregar el efecto de carga a la tabla (CAMBIA POR CADA TABLA).
                        tbActCotizaciones.innerHTML = `
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
                        //Agregar el efecto de carga al boton de busqueda (CAMBIA POR CADA TABLA).
                        btnBuscador[1].innerHTML = `
        <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        <span class="visually-hidden" role="status">Loading...</span>
            `;
                        btnBuscador[1].disabled = true;
                        //Agregar los efectos de carga de busqueda al input de busqueda.
                        inputBuscador[1].disabled = true;
                        //Realziacion de la peticion al servidor (CAMBIA POR CADA TABLA).
                        $.ajax({
                            type: "GET",
                            url: "./quotes-action",
                            data: { request: 'searchUserQuotes', cotizacion: dato },
                            dataType: "json",
                            success: function (response) {
                                //Se agrega el icono de resetear al boton de busqueda y se habilita nuevamente
                                btnBuscador[1].innerHTML = `<i class="bi bi-x"></i>`;
                                btnBuscador[1].disabled = false;

                                //Se muestran los elementos resultantes de la busqueda hecha por el usuario (RECICLADO DEL METODO DESIGNADO PARA CARGAR CADA TABLA) (CAMBIA POR CADA TABLA).
                                tbActCotizaciones.innerHTML = ``;

                                if (response.length > 0) { //Se verifica que la respuesta del servidor traiga mas de 0 registros (CAMBIA POR CADA TABLA).
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
                                        tbActCotizaciones.appendChild(fila);

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
        
                            <!-- Acciones para la cotizacion -->
                            <div style = "margin-bottom: 20px;">
                            <h6>Gestor de estado de cotizacion</h6>
                                <div style="margin-bottom: 20px;">
                                    <label for="opciones-c-${e['invoice']}" class="form-label">Estado de la cotizacion ${e['invoice']} actualmente:</label>
                                    <select class="form-select" aria-label="Default select example" style="width: 500px;" id="opciones-c-${e['invoice']}">
                                        <option value="takeit">Cotizacion pendiente de atender</option>
                                        <option value="confirmation-sent">Se envio confirmacion de cotizacion a usuario</option>
                                        <option value="confirmation-made">El usuario confirmo la cotizacion</option>
                                        <option value="unasnwered-confirmation" style="color: red;">El usuario no confirmo la cotizacion</option>
                                        <option value="bill-shiping">Realizacion de envio de ficha de pago a usuario</option>
                                        <option value="payment-made">El usuario realizo el pago correctamente</option>
                                        <option value="unasnwered-payment" style="color: red;">El usuario no realizo el pago correspondiente</option>
                                        <option value="order-delivery">Levantamiento de orden de pedido ante CT</option>
                                        <option value="order-made">CT confirma de enterado de la orden de pedido</option>
                                        <option value="unasnwered-order" style="color: red;">No se recibio ninguna respuesta de enterado por parte de CT</option>
                                        <option value="shipment-made">El pedio del usuario fue enviado a su domicilio</option>
                                        <option value="shipping-difficulties" style="color: orange;">El envio del pedido al usuario presento dificultades</option>
                                        <option value="order-hold" style="color: orange;">El envio del pedido al usuario fue retenido</option>
                                        <option value="order-cancellation" style="color: orange;">El envio del pedido al usuario fue cancelado</option>
                                        <option value="order-delivered">El usuario recibio el pedido en su domicilio</option>
                                    </select>
                                </div>
                                <h6>Otras opciones</h6>
                                <div>
                                    <button type="button" class="btn btn-danger" id="terminar-${e['invoice']}">Terminar seguimiento de la cotizacion</button>
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

                                        // Cargar el estado de la cotización actual
                                        let selectElement = document.querySelector("#opciones-c-" + e['invoice']);
                                        let arrayOptions = selectElement.options;

                                        // Marcar como seleccionado la opcion cuyo value sea igual al estado de la cotizacion en la db
                                        for (let i = 0; i < arrayOptions.length; i++) {
                                            if (e['status'] == arrayOptions[i].value) {
                                                arrayOptions[i].selected = true;
                                                break;
                                            }
                                        }

                                        //Agregar el evento para detectar cuando el usuario desee cambiar el estado de una cotizacion
                                        selectElement.addEventListener("change", (event) => {
                                            event.preventDefault();

                                            const select = event.target;
                                            const newValue = select.value;

                                            //Mensaje de confirmacion de cambio de estado de cotizacion
                                            Swal.fire({
                                                title: `¿Deseas cambiar el estado de la cotizacion: ${e['invoice']}?`,
                                                showDenyButton: true,
                                                confirmButtonText: "Guardar",
                                                confirmButtonColor: "#7CA9FF",
                                                denyButtonText: "Cancelar"
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    //Enviar peticion a servidor para actualizar el estado de la cotizacion
                                                    $.ajax({
                                                        type: "GET",
                                                        url: "./quotes-action",
                                                        data: { request: "updatestatusq", quote: e['invoice'], status: select.value },
                                                        dataType: "json",
                                                        success: function (response) {

                                                            if (response[0]['execute_status']) {
                                                                select.value = newValue;
                                                                Swal.fire("¡Guardado!", "", "success");
                                                                // Cerrar el modal activo
                                                                $('.modal').modal('hide');
                                                                tbActCotizaciones.innerHTML = `
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
                                                                getAllActiveQuotes();

                                                                btnBuscador[0].disabled = true;
                                                                btnRecargar[1].disabled = true;

                                                                setTimeout(() => {
                                                                    btnBuscador[0].disabled = false;
                                                                    btnRecargar[1].disabled = false;
                                                                }, 5000);
                                                            } else {
                                                                select.selectedIndex = select.dataset.originalIndex;
                                                                Swal.fire("Cambios no guardados", "", "info");
                                                            }
                                                        },
                                                        error: function (jqXHR, textStatus, errorThrown) {
                                                            console.log(jqXHR);
                                                            console.log(textStatus);
                                                            console.log(errorThrown);
                                                        }
                                                    });
                                                } else if (result.isDenied) {
                                                    // Restaurar el valor original del select si el usuario cancela
                                                    select.selectedIndex = select.dataset.originalIndex;
                                                    Swal.fire("Cambios no guardados", "", "info");
                                                }
                                            });
                                        });

                                        //Eventos para detectar cuando el usuario desee ejecutar una accion en la cotizacion
                                        //Eliminar Cotizacion
                                        document.querySelector("#terminar-" + e['invoice']).addEventListener("click", () => {
                                            Swal.fire({
                                                title: "¿Deseas dar por concluida esta cotizacion?",
                                                showDenyButton: true,
                                                confirmButtonText: "Si",
                                                denyButtonText: `No`
                                            }).then((result) => {
                                                /* Read more about isConfirmed, isDenied below */
                                                if (result.isConfirmed) {
                                                    $.ajax({
                                                        type: "GET",
                                                        url: "./quotes-action",
                                                        data: { request: "managequote", quote: e['invoice'] },
                                                        dataType: "json",
                                                        success: function (response) {

                                                            if (response[0]['execute_status'] == true) {
                                                                Swal.fire("Cotizacion concluida correctamente", "", "success");

                                                                // Cerrar el modal activo
                                                                $('.modal').modal('hide');
                                                                tbActCotizaciones.innerHTML = `
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

                                                                getAllActiveQuotes();

                                                                btnBuscador[1].disabled = true;
                                                                btnRecargar[2].disabled = true;

                                                                setTimeout(() => {
                                                                    btnBuscador[1].disabled = false;
                                                                    btnRecargar[2].disabled = false;
                                                                }, 5000);

                                                            } else if (response[0]['execute_status'] == false) {
                                                                // Cerrar el modal activo
                                                                $('.modal').modal('hide');
                                                                tbActCotizaciones.innerHTML = `
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

                                                                getAllActiveQuotes();

                                                                btnBuscador[1].disabled = true;
                                                                btnRecargar[2].disabled = true;

                                                                setTimeout(() => {
                                                                    btnBuscador[1].disabled = false;
                                                                    btnRecargar[2].disabled = false;
                                                                }, 5000);
                                                                Swal.fire("Algo salio mal", "Puede que la cotizacion ya haya sido concluida por el usuario al que se le fue asignada originalmente.", "warning");
                                                            }

                                                        },
                                                        error: function (jqXHR, textStatus, errorThrown) {
                                                            console.error(jqXHR);
                                                            console.error(textStatus);
                                                            console.error(errorThrown);
                                                        }
                                                    });
                                                } else if (result.isDenied) {
                                                    Swal.fire("Cambios no realizados", "", "info");
                                                }
                                            });
                                        });


                                        // Guardar el valor original del select al cargar la página o cuando se necesite
                                        const selecte = selectElement;
                                        selecte.dataset.originalIndex = selecte.selectedIndex;

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
                                } else { // De lo contrario se mostrara un mensaje de que no hay ningun registro (CAMBIA POR CADA TABLA).
                                    tbActCotizaciones.innerHTML = `
                        <tr>
                            <td colspan="5" style="text-align: center;">
                                <svg xmlns="http://www.w3.org/2000/svg" style="color: gray;" width="70" height="70" fill="currentColor" class="bi bi-emoji-dizzy" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="M9.146 5.146a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708m-5 0a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 1 1 .708.708l-.647.646.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708M10 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
                                </svg>
                                <h5 style="color: gray;">No hay ningun resultado para: "${dato}".</h5>
                            </td>
                        </tr>
                        `;
                                }

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                //Mensaje de error al realizar la busqueda hecha por el usuario.
                                Swal.fire("Ups... Algo no salio bien", "Lo sentimos, tuvimos problemas para procesar tu peticion, intentalo mas tarde.", "error");
                                //Se intenta recargar los datos que ya estaban mostrados en la tabla (CAMBIA POR CADA TABLA).
                                getAllActiveQuotes();
                                //Agregar el efecto de carga al boton de busqueda (CAMBIA POR CADA TABLA).
                                btnBuscador[1].innerHTML = `<i class="bi bi-search"></i>`;
                                btnBuscador[1].disabled = false;
                                //Agregar los efectos de carga de busqueda al input de busqueda. (CAMBIA POR CADA TABLA).
                                inputBuscador[1].disabled = false;
                                //Vaciar el input de la busqueda
                                inputBuscador[1].value = "";

                                //Mensajes de error en la consola
                                console.error(jqXHR);
                                console.error(textStatus);
                                console.error(errorThrown);
                            }
                        });
                    } else {
                        //Agregar el efecto de carga en la tabla (CAMBIA POR CADA TABLA).
                        tbActCotizaciones.innerHTML = `
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
                        getAllActiveQuotes();
                        //Agregar el efecto de carga al boton de busqueda (CAMBIA POR CADA TABLA).
                        btnBuscador[1].innerHTML = `<i class="bi bi-search"></i>`;
                        //Vaciar el input de la busqueda y des habilitarlo por 5 segundos
                        inputBuscador[1].value = "";
                        btnBuscador[1].disabled = true;
                        //Esperar un tiempo para que no se pueda hacer una busqueda enseguida de volver al estado original
                        setTimeout(() => {
                            //Agregar los efectos de carga de busqueda al input de busqueda. (CAMBIA POR CADA TABLA).
                            btnBuscador[1].disabled = false;
                            inputBuscador[1].disabled = false;
                        }, 5000);
                    }
                    //Inicializar la variable para detectar si hay busqueda activa o no con el valor opuesto (true o false) para determinar el comportamiento al siguiente click (CAMBIA POR CADA TABLA).
                    busquedaActiva1 = !busquedaActiva1;
                }
            });
        }
        //TABLA PARA HISTORIAL DE COTIZACIONES!
        //Variable que detectara si se busca un elemento o se restaurar el estado de boton de busqueda (CAMBIA POR CADA TABLA).
        if (tbHistorialCoti) {
            let busquedaActiva2 = false;
            btnBuscador[2].addEventListener("click", () => {
                //Limpiar los posibles espacios que pueden desde el dato de busqueda (CAMBIA POR CADA TABLA).
                let dato = inputBuscador[2].value.toUpperCase().trim();
                //Verificar que el input de busqueda no este vacio.
                if (dato === "") {
                    //Mensaje de que el input esta vacio y no se puede hacer la busqueda
                    Swal.fire("Busqueda incorrecta", "Debes de colocar el FOLIO de la cotizacion que deseas encontrar.", "warning");
                } else {
                    //Verificar si hay una busqueda activa actualmente
                    if (!busquedaActiva2) { //(CAMBIA POR CADA TABLA).
                        //Agregar el efecto de carga a la tabla (CAMBIA POR CADA TABLA).
                        tbHistorialCoti.innerHTML = `
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
                        //Agregar el efecto de carga al boton de busqueda (CAMBIA POR CADA TABLA).
                        btnBuscador[2].innerHTML = `
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span class="visually-hidden" role="status">Loading...</span>
                        `;
                        btnBuscador[2].disabled = true;
                        //Agregar los efectos de carga de busqueda al input de busqueda.
                        inputBuscador[2].disabled = true;
                        //Realziacion de la peticion al servidor (CAMBIA POR CADA TABLA).
                        $.ajax({
                            type: "GET",
                            url: "./quotes-action",
                            data: { request: 'searchUserQuotesH', cotizacion: dato },
                            dataType: "json",
                            success: function (response) {
                                //Se agrega el icono de resetear al boton de busqueda y se habilita nuevamente
                                btnBuscador[2].innerHTML = `<i class="bi bi-x"></i>`;
                                btnBuscador[2].disabled = false;

                                //Se muestran los elementos resultantes de la busqueda hecha por el usuario (RECICLADO DEL METODO DESIGNADO PARA CARGAR CADA TABLA) (CAMBIA POR CADA TABLA).
                                tbHistorialCoti.innerHTML = ``;

                                if (response.length > 0) { //Se verifica que la respuesta del servidor traiga mas de 0 registros (CAMBIA POR CADA TABLA).
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
                                        tbHistorialCoti.appendChild(fila);

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
                                } else { // De lo contrario se mostrara un mensaje de que no hay ningun registro (CAMBIA POR CADA TABLA).
                                    tbHistorialCoti.innerHTML = `
                                <tr>
                                    <td colspan="5" style="text-align: center;">
                                        <svg xmlns="http://www.w3.org/2000/svg" style="color: gray;" width="70" height="70" fill="currentColor" class="bi bi-emoji-dizzy" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                            <path d="M9.146 5.146a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708m-5 0a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 1 1 .708.708l-.647.646.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 0-.708M10 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
                                        </svg>
                                        <h5 style="color: gray;">No hay ningun resultado para: "${dato}".</h5>
                                    </td>
                                </tr>
                                `;
                                }

                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                //Mensaje de error al realizar la busqueda hecha por el usuario.
                                Swal.fire("Ups... Algo no salio bien", "Lo sentimos, tuvimos problemas para procesar tu peticion, intentalo mas tarde.", "error");
                                //Se intenta recargar los datos que ya estaban mostrados en la tabla (CAMBIA POR CADA TABLA).
                                getHistoryQuotes();
                                //Agregar el efecto de carga al boton de busqueda (CAMBIA POR CADA TABLA).
                                btnBuscador[2].innerHTML = `<i class="bi bi-search"></i>`;
                                btnBuscador[2].disabled = false;
                                //Agregar los efectos de carga de busqueda al input de busqueda. (CAMBIA POR CADA TABLA).
                                inputBuscador[2].disabled = false;
                                //Vaciar el input de la busqueda
                                inputBuscador[2].value = "";

                                //Mensajes de error en la consola
                                console.error(jqXHR);
                                console.error(textStatus);
                                console.error(errorThrown);
                            }
                        });
                    } else {
                        //Agregar el efecto de carga en la tabla (CAMBIA POR CADA TABLA).
                        tbHistorialCoti.innerHTML = `
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
                        getHistoryQuotes();
                        //Agregar el efecto de carga al boton de busqueda (CAMBIA POR CADA TABLA).
                        btnBuscador[2].innerHTML = `<i class="bi bi-search"></i>`;
                        //Vaciar el input de la busqueda y des habilitarlo por 5 segundos
                        inputBuscador[2].value = "";
                        btnBuscador[2].disabled = true;
                        //Esperar un tiempo para que no se pueda hacer una busqueda enseguida de volver al estado original
                        setTimeout(() => {
                            //Agregar los efectos de carga de busqueda al input de busqueda. (CAMBIA POR CADA TABLA).
                            btnBuscador[2].disabled = false;
                            inputBuscador[2].disabled = false;
                        }, 5000);
                    }
                    //Inicializar la variable para detectar si hay busqueda activa o no con el valor opuesto (true o false) para determinar el comportamiento al siguiente click (CAMBIA POR CADA TABLA).
                    busquedaActiva2 = !busquedaActiva2;
                }
            });
        }

    } catch (error) {
        console.log(error);
    }
});