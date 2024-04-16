$(function () {
    /**
     * Extraccion de los elemtos DOM del dashboard y creacion de funciones
     */

    //!DOMS
    let productos = document.querySelector("#divProductos");
    let categories = document.querySelector("#divCategorias");
    let ofertas = document.querySelector("#divOfertas");
    let tiendas = document.querySelector("#divSucursales");
    let newQuotes = document.querySelector("#table-show-quotes"); //DOM de la tabla cotizaciones
    let updateRequest = document.querySelector("#updateRequestT"); //DOM de la tabla de Peticiones para actualizar cotizaciones

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
        phTableQuotes(newQuotes);

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
                                            data: { request: "acceptquote", invoice : e["invoice"]},
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
        
                        // Crear y configurar el modal
                        let modal = document.createElement("div"); //Se crea un modal por cada elemento de la coleccion que devuelva el AJAX
                        modal.classList.add("modal", "fade");
                        modal.setAttribute("style", "color: black;");
                        modal.setAttribute("id", `exampleModal${e["invoice"]}`);
                        modal.setAttribute("tabindex", "-1");
                        modal.setAttribute("aria-labelledby", "exampleModalLabel");
                        modal.setAttribute("aria-hidden", "true");
                        modal.innerHTML = `
                        <div class="modal-dialog modal-dialog-scrollable modal-lg">
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

                        //Se convierten en un array
                        let arrayIds = idProductos.split(","); //Se 
                        let arrayCantidad = cantidadProductos.split(",");

                        //El array de los idProductos se convierte en un JSON que sera enviado por una consulta AJAX
                        let productosArray = JSON.stringify(arrayIds);

                        let dom = "#tabla" + e["invoice"];

                        phTableQuotes(document.querySelector(dom));

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
                                        </tr>
                                    `;
                                    document.querySelector(dom).innerHTML += contenidoHTML;
                                });
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

    //Funcion para extraer las solicitudes de cotizacion
    function loadUpdateRequest() {

        if (updateRequest) {

            phTableQuotes(updateRequest);

            $.ajax({
                type: "GET",
                url: "./dash-action",
                data: {request : "updaterequeste"},
                dataType: "json",
                success: function (response) {
                    updateRequest.innerHTML =``;

                    if (!response || Object.keys(response).length === 0) {

                        let noUpdateR = document.createElement("tr");
                        noUpdateR.innerHTML = `
                        <td colspan="3">
                    <center>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" style="color: gray;" class="bi bi-clipboard2-check-fill" viewBox="0 0 16 16">
                            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
                            <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
                        </svg>
                        <h4 style="color: gray;">No haz hecho ninguna solicitud</h4>
                    </center>
                    <td/>
                        `;

                        updateRequest.appendChild(noUpdateR);
                    } else {

                        response.forEach(res => {
                            let update = document.createElement("tr");
                            update.innerHTML = `
                            <td>${res['invoice']}</td>
                            <td style="font-size: 11px;">${res['title']}</td>
                            `;

                            updateRequest.appendChild(update);

                            let estado = document.createElement("td");

                            if (res['state'] == "send") {
                                estado.innerHTML = `
                                <td><span class="badge text-bg-primary">${res['state']}</span></td>
                                `;
                            } else if (res['state'] == "pending") {
                                estado.innerHTML = `
                                <td><span class="badge text-bg-warning">${res['state']}</span></td>
                                `;
                            } else if (res['state'] == "denied") {
                                estado.innerHTML = `
                                <td><span class="badge text-bg-danger">${res['state']}</span></td>
                                `;
                            } else if (res['state'] == "accepted") {
                                estado.innerHTML = `
                                <td><span class="badge text-bg-success">${res['state']}</span></td>
                                `;
                            }

                            update.appendChild(estado);

                            let buttons = document.createElement("td");
                            buttons.classList.add("actions-buttons");
                            buttons.innerHTML = `
                            <button class="btn view-quote" data-bs-toggle="modal" data-bs-target="#actualizacion${res['id']}"><i
                    class="bi bi-eye-fill white-icon"></i></button>
            <a href="https://www.google.com" class="btn btn-secondary"><i class="bi bi-arrow-up-right-square-fill white-icon"></i></a>
                            `;

                            update.appendChild(buttons);

                            let modalur = document.createElement("div"); //Se crea un modal por cada elemento de la coleccion que devuelva el AJAX
                            modalur.classList.add("modal", "fade");
                            modalur.setAttribute("style", "color: black;");
                            modalur.setAttribute("id", `actualizacion${res['id']}`);
                            modalur.setAttribute("tabindex", "-1");
                            modalur.setAttribute("aria-labelledby", "exampleModalLabel");
                            modalur.setAttribute("aria-hidden", "true");
                            modalur.innerHTML = `
                            <div class="modal-dialog modal-dialog-scrollable">
                                <div class="modal-content">
                                <div class="modal-header">
                                <h2 class="modal-title fs-5" id="exampleModalLabel">Cotizacion a actualizar #${res['invoice']}
                                </h2>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            
                            <div>

                                <h6>Detalles de la solicitud</h6><br>

                                <label for="idUpdateRequest">ID de la solicitud</label>
                                <input type="text" class="form-control" value="${res['id']}" id="idUpdateRequest" disabled><br>

                                <label for="idUpdateRequest">Titulo</label>
                                <input type="text" class="form-control" value="${res['title']}" id="idUpdateRequest" disabled><br>

                                <label for="idUpdateRequest">Descripcion</label>
                                <input type="text" class="form-control" value="${res['description']}" id="idUpdateRequest" disabled><br>

                                <label for="idUpdateRequest">Fecha y hora de creacion</label>
                                <input type="text" class="form-control" value="${res['date']}" id="idUpdateRequest" disabled><br>

                                <label for="idUpdateRequest">Estado</label>
                                <input type="text" class="form-control" value="${res['state']}" id="idUpdateRequest" disabled>

                            </div>
                    
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                                </div>
                            </div>
                        `;

                            document.body.appendChild(modalur);


                        });

                    }
                }, 
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        } else {
            
        }
    }

    //Funcion para extraer las solicitudes de desbloqueo de cuenta
    function loadUnlockRequest() {

    }

    //Funcion para extraer todas las solicitudes para actualizacion de cotizaciones
    function loadUpdatesRequestA() {

    }

    //Funcion para extraer todas las actividades realizadas dentro del sistema
    function loadRecord() {
        
    }

    /**
     * MAIN ***********************************************************************
     */

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
    refreshQuotes();

    //Cargar los datos de la tabla de solicitudes de cotizaciones
    loadUpdateRequest();
});
