$(function () {
    // console.log("jQuery Function");

    // Variables de los DOM del documento
    let imagen = document.querySelector("#imagen-producto");
    let nombre = document.querySelector("#nombre");
    let promocion = document.querySelector("#anuncio-promocion");
    let clave = document.querySelector("#clave");
    let descripcion = document.querySelector("#descripcion");
    let marca = document.querySelector("#marca");
    let categoria = document.querySelector("#categoria");
    let precios = document.querySelector("#info-precio");
    let lstEspec = document.querySelector("#especificaciones");
    let lstPromo = document.querySelector("#info-promocion");
    let tbExistencias = document.querySelector("#tabla-existencias");
    let tbDetCate = document.querySelector("#tabla-detalles-categoria");
    let tbDatosTec = document.querySelector("#tabla-datos-tecnicos");

    /**
     * FUNCIONES
     */

    //Limpiar el efecto del placeholder
    function limpiarPlaceholder(dom) {
        dom.innerHTML = ``;
    }

    //Limpiar el efecto del placeholder y quitar la clase para el efecto animado
    function limpiarPlaceholderAni(dom) {
        dom.classList.remove("placeholder-glow");
        dom.innerHTML = ``;
    }

    //Funcion para agregar porcentajes por parte de la empresa
    function agregarComisiones(precio) {
        let cVenta = precio * 0.30;
        let pCVenta = precio + cVenta;

        let cIVA = pCVenta * 0.16;
        let pcIVA = pCVenta + cIVA;

        return pcIVA;
    }

    //Funcion para hacer conversion de dolares a pesos
    function cambiarDivisa(precio, tipo_cambio) {
        return precio * tipo_cambio;
    }

    /**
     * MAIN
     */

    try {
        let url = new URL(window.location.href);
        let idProducto = url.searchParams.get("idproducto");

        $.ajax({
            type: "GET",
            url: "./Products",
            data: { request: "getdetailsproduct", product: idProducto },
            dataType: "json",
            success: function (response) {
                if (response.length === 0) {
                    Swal.fire({
                        title: "Producto no encontrado",
                        text: "Lo sentimos, no pudimos encontrar ese producto",
                        icon: "warning",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Regresar a catalogo"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "./Productos-Categories";
                        }
                    });
                } else {
                    //Limpiamos el place holder del quick resume
                    limpiarPlaceholder(nombre);
                    limpiarPlaceholderAni(clave);
                    limpiarPlaceholderAni(descripcion);
                    limpiarPlaceholderAni(marca);
                    limpiarPlaceholderAni(categoria);
                    limpiarPlaceholder(precios);
                    limpiarPlaceholder(lstEspec);
                    limpiarPlaceholder(lstPromo);
                    limpiarPlaceholder(tbExistencias);
                    limpiarPlaceholder(tbDetCate);
                    limpiarPlaceholder(tbDatosTec);
                    //Variable para detectar si hay promocion o no en el producto
                    let promocionActiva = false;
                    //Cargar la imagen
                    imagen.setAttribute("src", response[0]['imagen']);
                    //Nombre del producto
                    nombre.textContent = response[0]['nombre'];
                    //Se verifica que no hay pormociones para x producto
                    if (response[0]['promociones'].length > 0) {
                        promocionActiva = true;
                        promocion.innerHTML = `<span class="badge text-bg-success">En Promoción</span>`;
                    }
                    //Clave del producto
                    clave.innerHTML = `<b>Clave: </b>${response[0]['clave']}`;
                    //Descripcion del producto
                    descripcion.innerHTML = `<b>Descripcion: </b>${response[0]['descripcion_corta']}`;
                    //Marca del producto
                    marca.innerHTML = `<b>Marca: </b>${response[0]['marca']}`;
                    //Categoria del producto
                    categoria.innerHTML = `<b>Categoria: </b>${response[0]['categoria']}`;
                    //Estructura de control para demostrar el precio segun si hay promocion o no
                    if (promocionActiva === true) { //Si hay promociones activas

                        if (response[0]['moneda'] === "USD") { //Cuando el precio del producto viene en dolares
                            let precio_pesos = cambiarDivisa(response[0]['precio'], response[0]['tipoCambio']);
                            let mPrecio1 = document.createElement("p");
                            mPrecio1.style.textDecoration = "line-through";
                            mPrecio1.innerHTML = `<b>Precio antes: </b>$${agregarComisiones(precio_pesos).toFixed(2)} MXN`;
                            precios.appendChild(mPrecio1);
                            //Se compara en que tipo viene la promocion
                            if (response[0]['promociones'][0]['tipo'] === "porcentaje") { //Si es de porcentaje
                                //Se calcula el precio
                                let precio_o = agregarComisiones(precio_pesos);
                                let calculo = precio_o * (response[0]['promociones'][0]['promocion'] / 100);
                                let precio_n = precio_o - calculo;
                                let mPrecio2 = document.createElement("h4");
                                mPrecio2.innerHTML = `<b>Ahora: </b>$${precio_n.toFixed(2)} MXN`;
                                precios.appendChild(mPrecio2);
                            } else if (response[0]['promociones'][0]['tipo'] === "importe") { //Si es de importe
                                let mPrecio2 = document.createElement("h4");
                                mPrecio2.innerHTML = `<b>Ahora: </b>$${agregarComisiones(cambiarDivisa(response[0]['promociones'][0]['promocion'], response[0]['tipoCambio'])).toFixed(2)} MXN`;
                                precios.appendChild(mPrecio2);
                            }

                        } else if (response[0]['moneda'] === "MXN") { //Cuando el precio del producto viene en pesos
                            let mPrecio1 = document.createElement("p");
                            mPrecio1.style.textDecoration = "line-through";
                            mPrecio1.innerHTML = `<b>Precio antes: </b>$${agregarComisiones(response[0]['precio']).toFixed(2)} MXN`;
                            precios.appendChild(mPrecio1);
                            //Se compara en que tipo viene la promocion
                            if (response[0]['promociones'][0]['tipo'] === "porcentaje") { //Si es de porcentaje
                                //Se calcula el precio
                                let precio_o = agregarComisiones(response[0]['precio']);
                                let calculo = precio_o * (response[0]['promociones'][0]['promocion'] / 100);
                                let precio_n = precio_o - calculo;
                                let mPrecio2 = document.createElement("h4");
                                mPrecio2.innerHTML = `<b>Ahora: </b>$${precio_n.toFixed(2)} MXN`;
                                precios.appendChild(mPrecio2);
                            } else if (response[0]['promociones'][0]['tipo'] === "importe") { //Si es de importe
                                let mPrecio2 = document.createElement("h4");
                                mPrecio2.innerHTML = `<b>Ahora: </b>$${agregarComisiones(response[0]['promociones'][0]['promocion']).toFixed(2)} MXN`;
                                precios.appendChild(mPrecio2);
                            }
                        }

                    } else { //Precio del producto cuando no hay promociones
                        if (response[0]['moneda'] === "USD") {
                            let precio_pesos = cambiarDivisa(response[0]['precio'], response[0]['tipoCambio']);
                            let mPrecio = document.createElement("h4");
                            mPrecio.innerHTML = `<b>Precio: </b>$${agregarComisiones(precio_pesos).toFixed(2)} MXN`;
                            precios.appendChild(mPrecio);
                        } else if (response[0]['moneda'] === "MXN") {
                            let mPrecio = document.createElement("h4");
                            mPrecio.innerHTML = `<b>Precio: </b>$${agregarComisiones(response[0]['precio']).toFixed(2)} MXN`;
                            precios.appendChild(mPrecio);
                        }
                    }
                    //Determinar si hay especificaciones o no que mostrar
                    if (response[0]['especificaciones'] !== null) {
                        //Cargar las especificaciones del producto
                        for (let i = 0; i < response[0]['especificaciones'].length; i++) {
                            let caracteristica = document.createElement("li");
                            caracteristica.innerHTML = `<i class="bi bi-check2-circle"></i> ${response[0]['especificaciones'][i]['tipo']}: ${response[0]['especificaciones'][i]['valor']}`;
                            lstEspec.appendChild(caracteristica);
                        }
                    } else {
                        lstEspec.classList.remove("format-list");
                        let mensaje = document.createElement("div");
                        mensaje.style.color = "grey";
                        mensaje.innerHTML = `
                        <center>
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                            </svg>
                            <h4>No hay especificaciones disponibles para este producto</h4>
                        </center>
                        `;
                        lstEspec.appendChild(mensaje);
                    }
                    //Cargar los temrinos y condiciones en caso de que el producto tenga promocion
                    if (promocionActiva) {
                        //Cargar los terminos de las promociones de un producto
                        for (let i = 0; i < response[0]['promociones'].length; i++) {
                            //Tipo de promocion
                            let tipo = document.createElement("li");
                            tipo.innerHTML = `<i class="bi bi-check2-circle"></i> Tipo de promocion: ${response[0]['promociones'][i]['tipo']}`;
                            lstPromo.appendChild(tipo);
                            //Verificar si la promocion es de porcentaje o por importe
                            if (response[0]['promociones'][i]['tipo'] === "importe") {
                                //Verificar si la promocion viene en dolares o pesos mexicanos
                                if (response[0]['moneda'] === "USD") {
                                    //Tipo valor del precio
                                    let promocion = document.createElement("li");
                                    promocion.innerHTML = `<i class="bi bi-check2-circle"></i> Promocion: $${cambiarDivisa(response[0]['promociones'][i]['promocion'], response[0]['tipoCambio']).toFixed(2)} MXN`;
                                    lstPromo.appendChild(promocion);
                                } else {
                                    //Tipo valor del precio
                                    let promocion = document.createElement("li");
                                    promocion.innerHTML = `<i class="bi bi-check2-circle"></i> Promocion: $${response[0]['promociones'][i]['promocion']} MXN`;
                                    lstPromo.appendChild(promocion);
                                }
                            } else if (response[0]['promociones'][i]['tipo'] === "porcentaje") {
                                let promocion = document.createElement("li");
                                promocion.innerHTML = `<i class="bi bi-check2-circle"></i> Promocion: ${response[0]['promociones'][i]['promocion']}%`;
                                lstPromo.appendChild(promocion);
                            }
                            //Vigencia
                            //Inicio
                            let inicio = document.createElement("li");
                            inicio.innerHTML = `<i class="bi bi-check2-circle"></i> Inicio de la promocion: ${response[0]['promociones'][i]['vigencia']['inicio']}.`;
                            lstPromo.appendChild(inicio);
                            //Fin
                            let fin = document.createElement("li");
                            fin.innerHTML = `<i class="bi bi-check2-circle"></i> Fin de la promocion: ${response[0]['promociones'][i]['vigencia']['fin']}.`;
                            lstPromo.appendChild(fin);
                        }
                    } else {
                        lstPromo.classList.remove("format-list");
                        let mensaje = document.createElement("div");
                        mensaje.style.color = "grey";
                        mensaje.innerHTML = `
                        <center>
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                            </svg>
                            <h4>No hay informacion de promocion disponible para este producto</h4>
                        </center>
                        `;
                        lstPromo.appendChild(mensaje);
                    }
                    //Cargar las existencias del producto (FALTA DE AGREGAR CUANDO NO HAY DATOS)
                    if (response[0]['existencia'] !== "{}") {

                        const objeto = response[0]['existencia'];

                        for (let key in objeto) {
                            let fila = document.createElement("tr");
                            fila.innerHTML = `
                            <td>
                            ${key}
                                    </td>
                                    <td>
                                        <p class="placeholder-glow">
                                        ${objeto[key]}
                                        </p>
                                    </td>
                            `;
                            tbExistencias.appendChild(fila);
                        }

                    } else {

                    }

                    //Cargar los datos que tienen que ver con las categorias
                    let datosCategoria = [
                        {
                            tipo: "idSubCategoria",
                            valor: response[0]['idSubCategoria']
                        },
                        {
                            tipo: "SubCategoria",
                            valor: response[0]['subcategoria']
                        },
                        {
                            tipo: "IdCategoria",
                            valor: response[0]['idCategoria']
                        },
                        {
                            tipo: "Categoria",
                            valor: response[0]['categoria']
                        },
                    ];

                    for (let y = 0; y < datosCategoria.length; y++) {
                        let fila = document.createElement("tr");
                        fila.innerHTML = `
                        <td>
                        ${datosCategoria[y]['tipo']}
                        </td>

                        <td>
                        ${datosCategoria[y]['valor']}
                        </td>
                        `;
                        tbDetCate.appendChild(fila);
                    }

                    //Cargar los datos que tienen que ver los los datos tecnicos de cada producto
                    let datosTecnicos = [
                        {
                            tipo: "idProducto",
                            valor: response[0]['idSubCategoria']
                        },
                        {
                            tipo: "numParte",
                            valor: response[0]['numParte']
                        },
                        {
                            tipo: "Modelo",
                            valor: response[0]['modelo']
                        }
                    ];

                    for (let r = 0; r < datosTecnicos.length; r++) {
                        let fila = document.createElement("tr");
                        fila.innerHTML = `
                        <td>
                        ${datosTecnicos[r]['tipo']}
                        </td>

                        <td>
                        ${datosTecnicos[r]['valor']}
                        </td>
                        `;
                        tbDatosTec.appendChild(fila);
                    }
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR);
                console.error(textStatus);
                console.error(errorThrown);
            }
        });
    } catch (error) {
        console.error(error);
    }
});