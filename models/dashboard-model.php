<?php
//Implementacion de la conexion a la base de datos
require("../config/database.php");

class Dashboard_model
{
    private $conn;
    public function __construct()
    {
        $objectconn = new Connection();
        $this->conn = $objectconn->getConn();
    }

    //Funcion para determinar el roll que tiene el usuario logeado
    public function getRollAdmin($email)
    {

        $query = "SELECT roll_u FROM users_tecnosite WHERE email_u = ?";
        $stw = $this->conn->prepare($query);
        $stw->bind_param('s', $email);
        $stw->execute();

        $result = $stw->get_result();

        $row = $result->fetch_assoc();

        if ($row['roll_u'] == "admin") {
            return true;
        } else {
            return false;
        }
    }

    //Funcion para extraer todas las solicitudes de cotizaciones
    public function getQuotes()
    {

        $qgetQuotes = "SELECT * FROM quotations_tecnosite WHERE status_q = 'new' AND id_user IS NULL LIMIT 10";
        $stwgetQuotes = $this->conn->prepare($qgetQuotes);
        $stwgetQuotes->execute();

        $result = $stwgetQuotes->get_result();

        $response = array();

        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }

        return $response;
    }

    //Funcion que los usuarios atiendan nuevas cotizaciones
    public function acceptQuote($email, $invoice)
    {

        $response = array();

        // Obtener el ID del usuario
        $getId = "SELECT id_u FROM users_tecnosite WHERE email_u = ?";
        $stwgetId = $this->conn->prepare($getId);
        $stwgetId->bind_param("s", $email);
        $stwgetId->execute();
        $result = $stwgetId->get_result();

        $row = $result->fetch_array();
        $id = $row[0];

        // Actualizar la cotización con el ID del usuario
        $acceptQuote = "UPDATE quotations_tecnosite SET id_user = ?, status_q = 'takeit' WHERE invoice_q = ?";
        $stwAQ = $this->conn->prepare($acceptQuote);
        $stwAQ->bind_param("is", $id, $invoice); // Corregido aquí
        $stwAQ->execute();

        $result = $stwAQ->get_result();

        if (!$result) {
            $response[] = array(
                'execute' => true
            );
        } else {
            $response[] = array(
                'execute' => false
            );
        }

        return json_encode($response);
    }

    //Funcion para extraer las solicitudes de actualizacion de cotizaciones de un usuario en especifico
    public function getUpdateRequestE($email)
    {

        // Obtener el ID del usuario
        $getId = "SELECT id_u FROM users_tecnosite WHERE email_u = ?";
        $stwgetId = $this->conn->prepare($getId);
        $stwgetId->bind_param("s", $email);
        $stwgetId->execute();
        $results = $stwgetId->get_result();

        $rows = $results->fetch_array();
        $id = $rows[0];

        $query = "SELECT * FROM update_request_tecnosite WHERE id_user = ? AND (state_ur = 'send' OR state_ur = 'pending' OR state_ur = 'denied' OR state_ur = 'accepted') LIMIT 10";
        $stw = $this->conn->prepare($query);
        $stw->bind_param("i", $id);
        $stw->execute();

        $result = $stw->get_result();

        $response = array();

        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }

        return $response;
    }

    //Funcion para determninar si el usuario es administrador (funcion interna)
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
            echo "<script>console.log('" . $th . "');</script>";
        }
    }

    //Funcion para contar la cantidad de nuevas solicitudes de cotizaciones hay
    public function countQuotes()
    {
        try {
            // Realizar la consulta para contar las cotizaciones nuevas
            $query = "SELECT invoice_q FROM quotations_tecnosite WHERE status_q = 'new'";
            $queryResult = mysqli_query($this->conn, $query);

            // Verificar si la consulta fue exitosa
            if ($queryResult) {
                // Contar el número de filas devueltas por la consulta
                return $queryResult->num_rows;
            } else {
                // Devolver falso si la consulta no fue exitosa
                return false;
            }
        } catch (\Throwable $th) {
            // Manejar cualquier excepción y devolver un mensaje de error
            return "Error al contar cotizaciones: " . $th->getMessage();
        }
    }
}
