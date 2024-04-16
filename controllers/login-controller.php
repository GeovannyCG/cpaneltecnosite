<?php 
require('../models/login-model.php');

// Declaración de los campos recibidos desde el "view" del login.
$user = $_POST['email']; // Variable que almacena el valor del campo de correo electrónico (email) proporcionado por el usuario en el formulario de inicio de sesión.
$pass2 = $_POST['pass'];  // Variable que almacena el valor del campo de contraseña (password) proporcionado por el usuario en el formulario de inicio de sesión.

try {

    $loginObj = new Login();

    echo $access = $loginObj->validationUser($user, $pass2);

} catch (Exception $exception) {
    return $exception;
}