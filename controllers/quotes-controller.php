<?php

error_reporting(1);
//Se implementa el archivo model
require('../models/quotes-model.php');
//Se inicializa la sesion del usuario
session_start();
$account = $_SESSION['correo'];
/**
 * MAIN
 */
try {

    if (!isset($account)) {
        header("Location: ./");
        exit();
    } else {
        //Instanciamiento del objeto del modelo
        $objModel = new Quotes_model();

        $permisos = $objModel->getUserPermissions($account);

        $showOption = $objModel->showPageAdmin($account);

        require('../views/quotes-view.php');
    }
} catch (\Throwable $th) {
    echo "<script>console.log('" . $th->getMessage() . "')</script>";
}
