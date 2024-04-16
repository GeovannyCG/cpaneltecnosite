$(function () {
    console.log("Works jQwuery");

    //DOM de los elementos del view
    let selected = document.querySelector("#slctdProducts");
    let divProducts = document.querySelector("#div-products");
    let btnShowMore = document.querySelector("#showMore");
    let btnSearch = document.querySelector("#button-search");
    let inputSearch = document.querySelector("#input-search");

    //Variable que guardara de manera local el array con los productos ya sea cuando sean todo o por categoria
    let productos;

    //Variable que resguardara los productos arrojados a raiz de una busqueda
    let searchProductos = null;

    //Obtener los productos por su categoria
    function getProductsCategory(categoria) {
        $.ajax({
            type: "GET",
            url: "./Products",
            data: { request: "getproductcategori", category: categoria },
            dataType: "json",
            async: false,
            success: function (response) {
                divProducts.innerHTML = ``;
                productos = response;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR);
                console.error(textStatus);
                console.error(errorThrown);
            }
        });
    }

    //Obtener todos los productos
    function getAllProducts() {

        // Peticion AJAX para traer todos los productos
        $.ajax({
            type: "GET",
            url: "./Products",
            data: { request: "getAllProducts" },
            dataType: "json",
            async: false,
            success: function (response) {
                divProducts.innerHTML = ``;
                productos = response;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(jqXHR);
                console.error(textStatus);
                console.errror(errorThrown);
            }
        });

    }

    //Funcion para demostrar todas las cotegorias junto con el numero de productos ligadas a la misma
    function getCategories() {

        if (selected) { //Valuidar que el DOM donde se mostrara la lista EXISTA
            //Peticion AJAX para obtener la cantidad de todos los productos disponibles
            $.ajax({
                type: "GET",
                url: "./Products",
                data: { request: "countproducts" },
                dataType: "json",
                success: function (response) {
                    selected.innerHTML = ``;
                    let allP = document.createElement("option");
                    allP.getAttribute("selected", "selected");
                    allP.textContent = `Todos (${response[0]['count']})`;
                    allP.value = "todos";
                    selected.appendChild(allP);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });

            //Peticion AJAX para extraer todas las categorias y la cantidad de todos los productos disponibles
            $.ajax({
                type: "GET",
                url: "./Products",
                data: { request: "getAllCategories" },
                dataType: "json",
                success: function (response) {
                    response.forEach(rsp => {
                        let category = document.createElement("option");
                        category.value = `${rsp['categoria']}`;
                        category.textContent = `${rsp['categoria']} (${rsp['cantidad']})`;
                        selected.appendChild(category);
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });

        }

    }

    //Funcion para crear las tarjetas con los productos obtenidos de las peticiones
    function createCard(imagen, nombre, descripcion, categoria, idProducto) {
        let producto = document.createElement("div");
        producto.classList.add("card-product");
        producto.style.marginTop = "10px";
        // Hay que cambiar por la imagen del producto
        producto.innerHTML = `
            <img src="${imagen}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p style="margin-top: 5px;">${descripcion}</p>
                <p style="color: grey; font-size: 13px;">${categoria}</p>
                <a href="./Detalles?idproducto=${idProducto}" class="btn btn-primary">Ver mas</a>
            </div>`;
        divProducts.appendChild(producto);
    }

    /**
     * FUNCTION MAIN
     */

    try {
        //Metodo que extrae todas las categorias existentes
        getCategories();

        //Metodo para extraer todos los productos
        getAllProducts();

        //Funcion para agregar el funcionamieto para mostrar mas productos
        function mostrarElementos(inicio, fin, items) {
            for (var i = inicio; i < items.length && i < fin; i++) {
                createCard(items[i]['imagen'], items[i]['nombre'], items[i]['descripcion_corta'], items[i]['categoria'], items[i]['idProducto']);
            }
        }

        //Inicializacion del metodo para ir mostrando mas productos
        mostrarElementos(0, 15, productos);

        //Detectar cuando el usuario le de click al boton de mostrar mas productos
        btnShowMore.addEventListener("click", () => {
            // Calcular el número actual de productos mostrados
            var productosMostrados = document.querySelectorAll("#div-products .card-product").length;
            // Establecer inicio como el número actual de productos mostrados
            var inicio = productosMostrados;
            // Establecer fin como el inicio más 15
            var fin = inicio + 15;
            // Llamar a la función mostrarElementos con los nuevos valores de inicio y fin dependiendo si estamos en busqueda o no

            //Estructura de control para determinar si se esta usando los productos por categoria o busqueda
            if (searchProductos == null) {
                mostrarElementos(inicio, fin, productos);
            } else {
                mostrarElementos(inicio, fin, searchProductos);
            }

            btnShowMore.disabled = true;

            setTimeout(() => {
                btnShowMore.disabled = false;
            }, 5000);
        });

        //Evento para que se detecte el evento de cambio de categoria y extraiga todos los productos relacionados
        selected.addEventListener("change", () => {
            divProducts.innerHTML = `
        <div class="card-product">
                    <img src="./assets/images/placeholder-image.png" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title placeholder-glow">
                            <span class="placeholder col-6"></span>
                        </h5>
                        <p class="card-text placeholder-glow">
                            <span class="placeholder col-7"></span>
                            <span class="placeholder col-4"></span>
                            <span class="placeholder col-4"></span>
                            <span class="placeholder col-6"></span>
                            <span class="placeholder col-8"></span>
                        </p>
                        <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                    </div>
                </div>

                <div class="card-product">
                    <img src="./assets/images/placeholder-image.png" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title placeholder-glow">
                            <span class="placeholder col-6"></span>
                        </h5>
                        <p class="card-text placeholder-glow">
                            <span class="placeholder col-7"></span>
                            <span class="placeholder col-4"></span>
                            <span class="placeholder col-4"></span>
                            <span class="placeholder col-6"></span>
                            <span class="placeholder col-8"></span>
                        </p>
                        <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                    </div>
                </div>

                <div class="card-product">
                    <img src="./assets/images/placeholder-image.png" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title placeholder-glow">
                            <span class="placeholder col-6"></span>
                        </h5>
                        <p class="card-text placeholder-glow">
                            <span class="placeholder col-7"></span>
                            <span class="placeholder col-4"></span>
                            <span class="placeholder col-4"></span>
                            <span class="placeholder col-6"></span>
                            <span class="placeholder col-8"></span>
                        </p>
                        <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                    </div>
                </div>

                <div class="card-product">
                    <img src="./assets/images/placeholder-image.png" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title placeholder-glow">
                            <span class="placeholder col-6"></span>
                        </h5>
                        <p class="card-text placeholder-glow">
                            <span class="placeholder col-7"></span>
                            <span class="placeholder col-4"></span>
                            <span class="placeholder col-4"></span>
                            <span class="placeholder col-6"></span>
                            <span class="placeholder col-8"></span>
                        </p>
                        <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                    </div>
                </div>
        `;
            divProducts.classList.add("products-container");

            if (selected.value === "todos") {
                getAllProducts();
                inputSearch.value = "";
                inputSearch.disabled = false;
                btnSearch.innerHTML = `<i class="bi bi-search"></i>`;
                buscar = false;
                searchProductos = null;
                mostrarElementos(0, 15, productos);

            } else {
                getProductsCategory(selected.value);
                inputSearch.value = "";
                inputSearch.disabled = false;
                btnSearch.innerHTML = `<i class="bi bi-search"></i>`;
                buscar = false;
                searchProductos = null;
                mostrarElementos(0, 15, productos);
            }
        });

        //Variable que inicializa el buscador de productos
        let buscar = false;

        //Evento que detecta cuando se hace click en el boton de busqueda
        btnSearch.addEventListener("click", () => {
            if (buscar) {
                btnSearch.innerHTML = `<i class="bi bi-search"></i>`;
                inputSearch.value = "";
                divProducts.innerHTML = ``;
                searchProductos = null;
                inputSearch.disabled = false;
                divProducts.classList.add("products-container");
                mostrarElementos(0, 15, productos);
            } else {
                let search = inputSearch.value.trim();
                if (search == "") {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Ingresa un nombre que buscar",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    btnSearch.innerHTML = `<i class="bi bi-x-lg"></i>`;
                    divProducts.innerHTML = ``;
                    inputSearch.disabled = true;
                    // Filtrar los productos que coinciden con la búsqueda
                    const productosFiltrados = productos.filter(p =>
                        p['nombre'].toLowerCase().includes(inputSearch.value.trim().toLowerCase())
                    );
                    searchProductos = productosFiltrados;
                    // Si hay productos que coinciden, mostrarlos
                    if (searchProductos.length > 0) {
                        mostrarElementos(0, 15, searchProductos);
                    } else {
                        // Si no hay productos que coincidan, mostrar la alerta
                        divProducts.classList.remove("products-container");
                        divProducts.innerHTML = `
                        <center>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" color="grey" class="bi bi-clipboard-x-fill" viewBox="0 0 16 16">
                            <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zm4 7.793 1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                        <h2 style="color: grey;">No hubo ningun resultado para "${inputSearch.value}".</h2>
                        </center>
                        `;
                    }
                }
            }
            buscar = !buscar; // Cambia el estado después de actualizar el contenido del botón
        });

    } catch (error) {
        console.error(error);
    }

});