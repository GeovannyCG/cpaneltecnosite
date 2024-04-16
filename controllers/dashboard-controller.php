<?php
//Implementacion del model
require("../models/dashboard-model.php");
//Inicializacion de sesion
session_start();

//Adignacion del valor de la variable de sesion
$session = $_SESSION["correo"];

//Validar si existe una variable de sesion
if (!isset($session)) {
    header("Location: ./");
    exit();
} else {
    //Estructura try catch para atrapar cuanquier error durante la ejecucion
    try {
        //Constructor de la clase model
        $dashModel = new Dashboard_model();

        //Verificar si el usuario es administrador o no
        $getRoll = $dashModel->getRollAdmin($session);

        $showOption = $dashModel->showPageAdmin($session);

        //Inclusion de la vista para el dashboard
        include("../views/dashboard-view.php");

    } catch (\Throwable $th) {
        echo "<script>console.log('" . $th->getMessage() . "')</script>";
    }
}
