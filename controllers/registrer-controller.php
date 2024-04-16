<?php
//Implementacion del archivo para el model del "Registrer"
require('../models/registrer-model.php');

//Obtnecion de las variables del formulario llenado por el usuario
$names = $_POST['nombre']; //Nombre(s)
$lasnames = $_POST['apellidos']; //Apellidos
$birthday = $_POST['cumplea']; //Fecha de cumpleaños
$phone = $_POST['telefono']; //Numero telefonico
$state = $_POST['estado']; //Estado de la republica
$municipality = $_POST['municipio']; //Municipio de estado
$cologne = $_POST['colonia']; //Colonia del municipio
$mailcode = $_POST['cp']; //Codigo postal
$email = $_POST['correo']; //Correo electronico
$password = $_POST['contra']; //Contraseña

//Construstor de la clase "Registrer_model" para el uso de sus funciones
$registrer = new Registrer_model();

try {

    //Funcion para la creacion de un nuevo usuario
    $createUser = $registrer->newUser($names, $lasnames, $birthday, $phone, $state, $municipality, $cologne, $mailcode, $email, $password);
    //Devolucion de una respuesta al ajax por medio de formato JSON
    echo json_encode($createUser);

} catch (Exception $exception) {
    //Si se encuentra un problema durante la ejecucion se atrapara el error y sera retornado
    return $exception;
}

