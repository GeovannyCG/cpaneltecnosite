<?php
//Inclusion del archivo "registrer-model.php"
require("../models/registrer-model.php");

//Obtencion del correo electronico del usuario
$email = $_POST['email_User'];

//Referencia del constructor de la clase "Registrer_model"
$registrer = new Registrer_model();

try {
    //Funcion para verificacion de la existencia del correo electronico
    $verifyEmail = $registrer->checkEmail($email);
    //Devolucion de la respuesta de la funcion en formato JSON para el AJAX
    echo json_encode($verifyEmail);
    
} catch (Exception $e) {
    //Manejo de Exception
    return $e;
}