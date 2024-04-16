<?php

//Obviar errores que estan controlados
//error_reporting(0);

//Metodo para el manejo de la conexion a la base de datos
class Connection { 

    //Referenciacion de variables para datos de conexion a db
    private $host = "localhost";
    private $user = "root";
    private $password = "";
    private $database = "tecnositedb";

    //Variable que guardara la conexion a la db
    private $conn;

    //Constructor de la clase "Connection"
    public function __construct()
    {
        //Se establece conexion a la base de datos
        $this->conn = new mysqli($this->host, $this->user, $this->password, $this->database);

        //Validacion de la conexion a la base de datos
        if ($this->conn->connect_error) {
            # Agregar una interfaz de error a la conexion a la base de datos.
        }
    }

    //Funcion que devolvera la conexion a la db en caso de conexion establecida.
    public function getConn() {
        return $this->conn;
    }
}