<?php
//Ocultar los errores
error_reporting(1);
//Implementar el MODEL del apartado
require('../models/account-management-model.php');
// Inicializar la sesion del usuario actual
session_start();
$account = $_SESSION['correo'];

/**
 * EJECUCION PRINCIPAL
 */
try {
    //Verificar si hay una sesion activa actualmente
    if (!isset($account)) { //Si no hay una activa
        header("Location: ./");
        exit();
    } else { //Si hay una activa
        $model = new Account_management_model();
        //Verificar que el usuario sea administrador
        if ($model->showPageAdmin($account) == true) {
            //Implementar la vista del apartado
            require('../views/account-management-view.php');
        } else {
            header("Location: ./Dashboard");
            exit();
        }
    }
} catch (\Throwable $th) {
    var_dump($th->getMessage());
    exit();
}
