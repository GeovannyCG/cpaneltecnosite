<?php
//Se inicializa la sesion actual en curso
session_start();

//Se verifica que haya una sesion actualmente
if (isset($_SESSION['correo'])) {
    header("Location: ./Dasboard");
} else {
    header("Location: ./Cpanel"); //Si no lo hay redireccionara al formulario de inicio de sesion
}
