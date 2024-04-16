<?php
session_start();//Inicializacion de la sesion.
session_destroy();//Destruccion de la sesion.
unset($_SESSION['correo']);//Vaciado de la variable de sesion.

echo "<script>location.href = './'</script>";
exit; //Terminacion del script.