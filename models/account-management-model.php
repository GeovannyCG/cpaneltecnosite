<?php
//Implementar la configuracion a la base de datos
include('../config/database.php');

//Clase del modelo
class Account_management_model
{
    //Variable privada que almacenara la conexion a la base de datos
    private $conn;

    //Constructor de la clase con la asignacion de la configuracion de la base de datos
    public function __construct()
    {
        $objConn = new Connection();
        $this->conn = $objConn->getConn();
    }

    /**
     * Funcion pricipal del MODEL donde se crearan las funciones 
     */

    //Funcion para crear un nuevo usuario
    public function newUser($names, $firstlastnames, $secondtlastnames, $birthday, $phone, $email, $password, $roll)
    {

        try {
            $encryptP = password_hash($password, PASSWORD_BCRYPT);
            //Query a la base de datos
            $qnewUser = "INSERT INTO users_tecnosite (names_u, surname_u, secondsurname_u, birthday_u, phone_u, email_u, password_u, status_u, attempts_u, roll_u) VALUES (?, ?, ?, ?, ?, ?, ?,'unlocked', 0, ?)";
            //Preparacion del Query para recibimiento de parametros
            $stwqnewUser = $this->conn->prepare($qnewUser);
            //Asignacion de los parametros
            $stwqnewUser->bind_param("ssssisss", $names, $firstlastnames, $secondtlastnames, $birthday, $phone, $email, $encryptP, $roll);
            //Ejecucion de la consulta
            $stwqnewUser->execute();

            if ($stwqnewUser->affected_rows > 0) { //Obtencion del numero de filas afectadas por el Query
                return true; //Si fue afectada mas de 0
            } else {
                return false; //Si no fue afectada ninguna
            }
        } catch (Exception $e) {
            return $e;
        }
    }

    //Funcion para verificar de que el correo ingresado no este en uso
    public function checkEmail($email)
    {
        try {
            $queryCheck = "SELECT email_u FROM users_tecnosite WHERE email_u = ?"; //Query a la base de datos
            $stmtCheck = $this->conn->prepare($queryCheck); //Preparacion del Query para recibimiento de parametros
            $stmtCheck->bind_param("s", $email); //Asignacion de los parametros
            $stmtCheck->execute(); //Ejecucion de la consulta

            // Obtener el resultado de la consulta
            $result = $stmtCheck->get_result();

            // Verificar el número de filas devueltas
            if ($result->num_rows > 0) {
                return true; // El correo electrónico ya está en uso
            } else {
                return false; // El correo electrónico no está en uso
            }
        } catch (Exception $e) {
            return $e;
        }
    }

    //Funcion para extraer todas las cuentas existentes
    public function getAllAccounts()
    {
        $getAccounts = "SELECT * FROM users_tecnosite";
        $executeAccounts = mysqli_query($this->conn, $getAccounts);

        $response = array();
        while ($row = $executeAccounts->fetch_assoc()) {
            $response[] = $row;
        }
        return $response;
    }

    //Funcion para actualizar datos de usuario
    public function updateInformationUser($id, $name, $lastname, $slastname, $birtday, $phone, $status, $roll)
    {

        try {
            $query = "UPDATE users_tecnosite SET names_u = ?, surname_u = ?, secondsurname_u = ?, birthday_u = ?, phone_u = ?, status_u = ?, roll_u = ? WHERE id_u = ?";
            $stw = $this->conn->prepare($query);
            $stw->bind_param("ssssissi", $name, $lastname, $slastname, $birtday, $phone, $status, $roll, $id);
            $stw->execute();

            if ($this->conn->affected_rows > 0) {
                return true;
            } else {
                return false;
            }
        } catch (Error $th) {
            var_dump($th);
        }
    }

    //Funcion para saber si el usuario tiene permisos de administrador
    public function showPageAdmin($email)
    {
        try {
            $query = "SELECT roll_u FROM users_tecnosite WHERE email_u = '$email'";
            $execute = mysqli_query($this->conn, $query);
            if ($execute) {
                $result = $execute->fetch_assoc();
                $roll = $result['roll_u'];
                if ($roll == "admin") {
                    return true;
                } else {
                    return false;
                }
            } else {
                echo "<script>console.log('" . json_encode($this->conn->error) . "');</script>";
            }
        } catch (\Throwable $th) {
            echo "<script>console.log('".$th."');</script>";
        }
    }
}
