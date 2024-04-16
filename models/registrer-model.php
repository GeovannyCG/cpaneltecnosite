<?php
//Implementacion del archivo de configuracion a db
require("../config/database.php");

//Creacion de la clase Registrer_model
class Registrer_model
{

    //Variable privada para contener la conexion a db
    private $connection;

    //Constructor de la clase
    public function __construct()
    {
        //Referencia del constructor de la clase "Connection".
        $connObject = new Connection();
        //Asugnacion de la conexion establecida por "Connection" a variable local privada
        $this->connection = $connObject->getConn();
    }

    //Funciones

    //Crear un nuevo usuario
    public function newUser($names, $lastnames, $birthday, $phone, $state, $municipality, $cologne, $mailcode, $email, $password)
    {

        try {
            $encryptP = password_hash($password, PASSWORD_BCRYPT);
            //Query a la base de datos
            $qnewUser = "INSERT INTO users (name_u, lastnames_u, birthday_u, phone_u, state_u, municipality_u, cologne_u, mail_code, email_u, password_u, registration_date_u,status_u, attempts_u, permissions_u) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, curdate(),'unlocked', 0, 'customer')";
            //Preparacion del Query para recibimiento de parametros
            $stwqnewUser = $this->connection->prepare($qnewUser);
            //Asignacion de los parametros
            $stwqnewUser->bind_param("sssisssiss", $names, $lastnames, $birthday, $phone, $state, $municipality, $cologne, $mailcode, $email, $encryptP);
            //Ejecucion de la consulta
            $stwqnewUser->execute();

            if ($stwqnewUser->affected_rows > 0) { //Obtencion del numero de filas afectadas por el Query
                return true; //Si fue afectada mas de 0
            } else {
                return false; //Si no fue afectada ninguna
            }

        } catch (Exception $e) {
            // return $e->getMessage();
            // Manejar excepciones
            return $e;
        }
    }

    //Funcion para validacion de existencia de correo electronio en el 
    public function checkEmail($email) {
        try {
            $queryCheck = "SELECT email_u FROM users WHERE email_u = ?"; //Query a la base de datos
            $stmtCheck = $this->connection->prepare($queryCheck); //Preparacion del Query para recibimiento de parametros
            $stmtCheck->bind_param("s", $email); //Asignacion de los parametros
            $stmtCheck->execute(); //Ejecucion de la consulta
            
            // Obtener el resultado de la consulta
            $result = $stmtCheck->get_result();
            
            // Verificar el número de filas devueltas
            if($result->num_rows > 0) {
                return true; // El correo electrónico ya está en uso
            } else {
                return false; // El correo electrónico no está en uso
            }
        } catch (Exception $e) {
            return $e; // Manejar excepciones
        }
    }

    
}
