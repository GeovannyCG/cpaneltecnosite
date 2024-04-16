<?php
$ftpHost = '216.70.82.104';
$ftpUsuario = 'DFT1164';
$ftpContraseña = 'ooNPaDNuNFSguxncEFWR';

$urlFtp = 'ftp://' . $ftpUsuario . ':' . $ftpContraseña . '@' . $ftpHost . '/catalogo_xml/productos.json';

$contenidoJson = file_get_contents($urlFtp);

$productos = json_decode($contenidoJson, true);

if ($productos !== null) {

    $package = array();

    // Función para contar los productos
    function showProducts($jwson)
    {
        $c = count($jwson);

        $package[] = array(
            'count' => $c
        );

        return json_encode($package);
    }

    //Funcion para contar la cantidad de categorias disponibles
    function showCategories($json)
    {
        // Extraer todas las categorías del array JSON
        $categories = array_column($json, 'categoria');

        // Eliminar duplicados y obtener las categorías únicas
        $uniqueCategories = array_unique($categories);

        // Contar las categorías únicas
        $countCategories = count($uniqueCategories);

        // Crear el arreglo con el número de categorías
        $package[] = array(
            'categories' => $countCategories
        );

        // Codificar el arreglo como JSON
        return json_encode($package);
    }

    // Funcion para extraer la contidad de productos con ofertas actualmente
    function showOfferts($json)
    {
        $offert = 0;

        foreach ($json as $product) {
            if (isset($product['promociones']) && !empty($product['promociones'])) {
                $offert++;
            }
        }

        $package[] = array(
            'offert' => $offert
        );

        return json_encode($package);
    }

    // Funcion para extraer el numero de sucursales
    function countUniqueStores($json)
    {
        $uniqueStores = []; // Inicializamos un conjunto vacío para almacenar las tiendas únicas

        foreach ($json as $product) {
            foreach ($product['existencia'] as $store => $stock) {
                $uniqueStores[$store] = true; // Agregamos la tienda al conjunto
            }
        }

        $numUniqueStores = count($uniqueStores); // Contamos cuántas tiendas únicas hay

        $package[] = array(
            'stores' => $numUniqueStores
        );

        return json_encode($package);
    }

    // Funcion para devolver los productos solicitados en especifico
    function searchProducts($json, $ids)
    {
        $conversion = json_decode($ids);

        $productos = [];

        foreach ($json as $product) {
            for ($i = 0; $i < count($conversion); $i++) {
                if ($product['idProducto'] == $conversion[$i]) {
                    // Usar el campo 'idProducto' del objeto en $conversion
                    // para comparar con el 'idProducto' del producto actual
                    $productos[] = $product; // Agregar el producto al array de productos
                    break; // Romper el bucle una vez que se encuentre el producto
                }
            }
        }

        return json_encode($productos);
    }

    //Funcion para extraer todas las categorias y contar todos los productos
    function getAllCategories($json)
    {
        // Inicializar un array para almacenar las categorías únicas

        $uniqueCategories = array();

        // Recorrer cada elemento del array JSON
        foreach ($json as $item) {
            // Verificar si el elemento tiene la clave 'categoria'
            if (isset($item['categoria'])) {
                // Agregar la categoría al array de categorías únicas si no existe ya
                if (!in_array($item['categoria'], $uniqueCategories)) {
                    $uniqueCategories[] = $item['categoria'];
                }
            }
        }

        $resultp = array(); // Inicializa el array de resultados

        // Itera sobre cada categoría única
        foreach ($uniqueCategories as $categoria) {
            $cantidad = 0; // Inicializa el contador de cantidad

            // Itera sobre cada producto en el JSON
            foreach ($json as $producto) {
                // Verifica si la categoría del producto coincide con la categoría actual
                if ($producto['categoria'] === $categoria) {
                    $cantidad++; // Incrementa el contador de cantidad
                }
            }

            // Agrega la información de la categoría y su cantidad al resultado
            $resultp[] = array(
                'categoria' => $categoria,
                'cantidad' => $cantidad
            );
        }

        // Devolver el array de categorías únicas
        return json_encode($resultp);
    }

    //Funcion para extraer todos los productos del catalogo
    function getAllProducts($json) {

        foreach ($json as $j) {
            $package[] = $j;
        }

        return json_encode($package);
    }

    //Funcion para extraer los productos por categoria seleccionada por el usuario
    function getProductsCategory($json, $categoria) {
        $items = [];

        foreach ($json as $js) {
            if ($js['categoria'] == $categoria) {
                $items[] = $js;
            }
        }

        return json_encode($items);
    }

    //Funcion para extraer un producto en especifico (todos sus datos)
    function getDetailsProduct($json, $producto) {
        $item = array();

        foreach ($json as $js) {
            if ($js['idProducto'] == $producto) {
                $item[] = $js;
                break;
            }
        }

        return json_encode($item);
    }

    // Variable que rescatará la función que requiere el cliente
    $request = $_GET["request"];

    // Estructura try catch que se encargara de controlar los errores en el intercambio de informacion
    try {
        if ($request == "countproducts") { //Contar cuantos productos hay existentes (PARTE DE DASH)
            echo showProducts($productos);
        } else if ($request == "countcategories") { //Contar cuantas categoria existentes hay (PARTE DE DASH)
            echo showCategories($productos);
        } else if ($request == "countofferts") { // Contar cuantas ofertas hay disponibles (PARTE DE DASH)
            echo showOfferts($productos);
        } else if ($request == "countstores") { //Contar cuantas tiendas fisicas hay (PARTE DE DASH)
            echo countUniqueStores($productos);
        } else if ($request == "search") { //Buscar los productos especificos que contiene una cotizacion (PARTE DE DASH)
            $p = $_GET['datas'];
            echo searchProducts($productos, $p);
        } else if ($request == "getAllCategories") { //Extraer todas las categorias disponibles
            echo getAllCategories($productos);
        } else if ($request == "getAllProducts") { //Extraer todos los productos disponibles en el catalogo
            echo getAllProducts($productos);
        } else if ($request == "getproductcategori") { //Para extraer todos los productos que tienen que ver con X categoria
            $catego = $_GET['category'];
            echo getProductsCategory($productos, $catego);
        }else if ($request == "getdetailsproduct") { //Para extraer los datos en especifico de un producto (DETALLES DEL PRODUCTO)
            $producto = $_GET['product'];
            echo getDetailsProduct($productos, $producto);
            
        }
    } catch (\Throwable $th) {
        //Imprimir el error de PHP en lugar de usar un script de JavaScript
        $package[] = array(
            'status' => "error",
            'code_error' => $th->getMessage(),
        );

        return json_encode($package);
    }
} else {
    //En caso de que no se logre decodificar
    $package[] = array(
        'status' => "error",
        'code_error' => "Error al decodificar.",
    );

    return json_encode($package);
}
