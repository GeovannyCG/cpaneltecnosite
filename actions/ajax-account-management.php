<?php
//Reportar errores
error_reporting(1);
//Incluir el MODEL del apartado
require('../models/account-management-model.php');
//Inicializar la sesion del usuario actual
session_start();
$account = $_SESSION['correo'];

/**
 * Ejecucion principal del script
 */
try {
    //Variable que obtendra la accion requerida por el usuario
    $request = $_POST['request'];
    //Variable que guardara en json para las respuesta del servidor
    $response = array();
    //Instancia de la clase MODEL del apartado.
    $objModell = new Account_management_model();

    //Se verifica que haya una request cuando se ingrese
    if (!isset($request)) {
        //Si no es valida la request se parara la ejecucion del script
        exit();
    } else {
        //En caso contrario se ejecutara el script con normalidad
        if ($request == "checkemail") {
            $email = $_POST['email_User'];
            echo json_encode($objModell->checkEmail($email));
        } else if ($request == "insert-user") {
            $nombre = $_POST['name'];
            $apellidoP = $_POST['firstLastname'];
            $apellidoM = $_POST['secondLastname'];
            $cumpleanios = $_POST['birthd'];
            $telefono = $_POST['phone'];
            $correo = $_POST['email'];
            $contrasenia = $_POST['pass'];
            $rollUsuario = $_POST['rollUser'];

            echo json_encode($objModell->newUser($nombre, $apellidoP, $apellidoM, $cumpleanios, $telefono, $correo, $contrasenia, $rollUsuario));
        } else if ($request == "get-all-accounts") { //Obtener todas las cuentas actuales dadas de alta

            $getAccounts = $objModell->getAllAccounts();

            foreach ($getAccounts as $gAc) {
                $response[] = array(
                    'idUsuario' => $gAc['id_u'],
                    'Nombres' => $gAc['names_u'],
                    'ApellidoP' => $gAc['surname_u'],
                    'ApellidoM' => $gAc['secondsurname_u'],
                    'Cumpleanios' => $gAc['birthday_u'],
                    'Telefono' => $gAc['phone_u'],
                    'Correo' => $gAc['email_u'],
                    'Contrasenia' => $gAc['password_u'],
                    'Estatus' => $gAc['status_u'],
                    'Intentos' => $gAc['attempts_u'],
                    'Roll' => $gAc['roll_u']
                );
            }
            
            sleep(3);
            echo json_encode($response);
        } else if ($request == "update-user") { //Actualizar la informacion del usuario
            $id = $_POST['id'];
            $name = $_POST['name'];
            $lastname = $_POST['lastname'];
            $slastname = $_POST['slastname'];
            $birtday = $_POST['birtday'];
            $phone = $_POST['phone'];
            $status = $_POST['status'];
            $roll = $_POST['roll'];
            $updateUser = $objModell->updateInformationUser($id, $name, $lastname, $slastname, $birtday, $phone, $status, $roll);
            sleep(3);
            echo json_encode($updateUser);
        }
    }
    //code...
} catch (\Throwable $th) {
    //En caso de posible error durante la ejecucion se imprimira en consola
    var_dump($th->getMessage());
    exit();
}