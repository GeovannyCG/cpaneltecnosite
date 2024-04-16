<?php 

error_reporting(0);
session_start();

if (isset($_SESSION['correo'])) {
    header(("Location: ./Dashboard"));
    exit();
} 
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Link de CSS de bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!-- Link de CSS propio -->
    <link rel="stylesheet" href="./assets/css/style-login.css">
    <!-- Favicon -->
    <link rel="shortcut icon" href="./assets/images/favicon.ico" type="image/x-icon">
    <title>Iniciar sesion - Tecnosite</title>
</head>

<body>

    <!-- Alerta acerca del inicio de seion -->
    <div class="alert-container" id="div-alert"></div>

    <!-- Contenedor principal de la pagina -->
    <div class="container">
        <!-- Logotipo de la empresa -->
        <div id="logo">
            <img src="./assets/images/Logotipo-Tecnosite.png" alt="" width="300px" height="auto">
        </div>
        <!-- Formulario de inicio de sesion -->
        <form id="formulario">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label text-form">Correo electronico:</label>
                <input type="email" class="form-control" name="emailUser" id="email" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text text-form">No compartas tus credenciales con terceros.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label text-form">Contraseña:</label>
                <input type="password" class="form-control" name="passUser" id="pass">
            </div>
            <div class="mb-3 form-check form-switch">
                <input type="checkbox" role="switch" class="form-check-input" id="show">
                <label class="form-check-label text-form" for="exampleCheck1">Mostra contraseña</label>
            </div>
            <div>
                <div id="submit-div">
                    <button type="submit" class="btn button-login" id="login">Entrar</button>
                </div>
            </div>
        </form>
    </div>

    <!-- Pie de pagina -->
    <div class="footer-page">
        <p id="autore"></p>
    </div>

    <!-- Script de bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <!-- Script de Jquery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <!-- Script para el ajax -->
    <script src="./assets/js/login-function.js"></script>
</body>

</html>