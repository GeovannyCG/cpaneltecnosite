<?php
// Implementacion del archivo de conexion a db
require('../config/database.php');

class Quotes_model
{
    //Variable privada para la reservacion de la conexion con la db
    private $connection;
    // Constructor de la clase
    public function __construct()
    {
        $objConn = new Connection();
        $this->connection = $objConn->getConn();
    }

    /**
     * FUNCIONES DEL MODEL
     */

    //Funcion para verificar si el usuario con la sesion actual es administrador o no
    public function getUserPermissions($email)
    {
        $query = "SELECT roll_u FROM users_tecnosite WHERE email_u = ?";
        $stw = $this->connection->prepare($query);
        $stw->bind_param("s", $email);
        $stw->execute();
        $result = $stw->get_result();
        $row = $result->fetch_assoc();
        if ($row['roll_u'] == "admin") {
            return true;
        } else {
            return false;
        }
    }
    //Funcion para extraer todas las cotizaciones con estado de nuevo
    public function getAllQuotes()
    {
        $query = "SELECT * FROM quotations_tecnosite WHERE status_q = 'new'";
        $result = mysqli_query($this->connection, $query);
        $response = array();
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        return $response;
    }
    //Funcion para aceptar una cotizacion por X usuario
    public function acceptQuote($email, $invoice)
    {

        $response = array();

        // Obtener el ID del usuario
        $getId = "SELECT id_u FROM users_tecnosite WHERE email_u = ?";
        $stwgetId = $this->connection->prepare($getId);
        $stwgetId->bind_param("s", $email);
        $stwgetId->execute();
        $result = $stwgetId->get_result();

        $row = $result->fetch_array();
        $id = $row[0];

        // Actualizar la cotización con el ID del usuario
        $acceptQuote = "UPDATE quotations_tecnosite SET id_user = ?, status_q = 'takeit' WHERE invoice_q = ?";
        $stwAQ = $this->connection->prepare($acceptQuote);
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
    //Funcion para extraer las cotizaciones a las cuales les de seguimiento X usuario
    public function getspecificallyquots($email)
    {
        //Obtener el id del usuario inicicado actualmente
        $idQuery = "SELECT id_u FROM users_tecnosite WHERE email_u = '$email'";
        $resultq = mysqli_query($this->connection, $idQuery);
        $rest = $resultq->fetch_assoc();
        $idUsuario = $rest['id_u'];

        $getQuotes = "SELECT * FROM quotations_tecnosite WHERE id_user = $idUsuario";
        $getQuotesR = mysqli_query($this->connection, $getQuotes);

        $response = array();
        while ($row = $getQuotesR->fetch_assoc()) {
            $response[] = $row;
        }

        return $response;
    }

    //Actualizar el estado de una cotizacion en especifico
    public function updateStatusQuote($status, $invoice)
    {
        $query = "UPDATE quotations_tecnosite SET status_q = '$status' WHERE invoice_q = '$invoice'";
        $result = mysqli_query($this->connection, $query);
        if ($result) {
            // Obtener el número de filas afectadas
            $rows_affected = $this->connection->affected_rows;

            if ($rows_affected > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    //Funcion para eliminar o archivar una cotizacion
    public function manageExistQuote($invoice)
    {
        $query = "DELETE FROM quotations_tecnosite WHERE invoice_q = '$invoice'";
        $execute = mysqli_query($this->connection, $query);

        if ($execute) {
            $result = $this->connection->affected_rows;
            if ($result > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    //Funcion para extraer el historial de cotizaciones
    public function getHistoryQuotes()
    {
        $query = "SELECT * FROM quotations_history_tecnosite";
        $result = mysqli_query($this->connection, $query);
        $response = array();
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        return $response;
    }

    //Funcion para extraer todas las cotizaciones que estan siendo gestionadas (ADMINISTRADOR)
    public function getAllActiveQuotes()
    {
        $getAllQuotes = "SELECT * FROM quotations_tecnosite WHERE status_q IN ('takeit', 'confirmation-sent', 'confirmation-made', 'unasnwered-confirmation', 'bill-shiping', 'payment-made', 'unasnwered-payment', 'order-delivery', 'order-made', 'unasnwered-order', 'shipment-made', 'shipping-difficulties', 'order-hold', 'order-cancellation', 'order-delivered')";
        $respesta = mysqli_query($this->connection, $getAllQuotes);

        $response = array();
        while ($row = $respesta->fetch_assoc()) {
            $response[] = $row;
        }

        return $response;
    }

    //Funcion para realizar busqueda de cotizaciones en especifico del usuario X
    public function serachQuotesUser($user, $quote)
    {
        try {
            //Consulta para saber el id del usuario
            $idUser = "SELECT id_u FROM users_tecnosite WHERE email_u = '$user'";
            $e_idUser = mysqli_query($this->connection, $idUser);
            $row = $e_idUser->fetch_assoc();
            $id = $row['id_u'];

            //Consulta para extraer las cotizaciones que coinsidan con la busqueda
            $getQuotes = "SELECT * FROM quotations_tecnosite WHERE invoice_q = ? AND id_user = ?";
            $stwGetQuotes = $this->connection->prepare($getQuotes);
            $stwGetQuotes->bind_param("si", $quote, $id);
            $stwGetQuotes->execute();
            $results = $stwGetQuotes->get_result();

            $response = array();

            while ($rows = $results->fetch_assoc()) {
                $response[] = $rows;
            }

            return $response;
        } catch (Error $error) {
            var_dump($error->getMessage());
        }
    }

    //Funcion para realizar la busqueda de cotizaciones en especifico desde el historial de cotizaciones
    public function serachQuotesUserHistory($user, $quote)
    {
        try {
            //Consulta para saber el id del usuario
            $idUser = "SELECT id_u FROM users_tecnosite WHERE email_u = '$user'";
            $e_idUser = mysqli_query($this->connection, $idUser);
            $row = $e_idUser->fetch_assoc();
            $id = $row['id_u'];

            //Consulta para extraer las cotizaciones que coinsidan con la busqueda
            $getQuotes = "SELECT * FROM quotations_history_tecnosite WHERE invoice_qh = ? AND id_user = ?";
            $stwGetQuotes = $this->connection->prepare($getQuotes);
            $stwGetQuotes->bind_param("si", $quote, $id);
            $stwGetQuotes->execute();
            $results = $stwGetQuotes->get_result();

            $response = array();

            while ($rows = $results->fetch_assoc()) {
                $response[] = $rows;
            }

            return $response;
        } catch (Error $error) {
            var_dump($error->getMessage());
        }
    }

    public function showPageAdmin($email)
    {
        try {
            $query = "SELECT roll_u FROM users_tecnosite WHERE email_u = '$email'";
            $execute = mysqli_query($this->connection, $query);
            if ($execute) {
                $result = $execute->fetch_assoc();
                $roll = $result['roll_u'];
                if ($roll == "admin") {
                    return true;
                } else {
                    return false;
                }
            } else {
                echo "<script>console.log('" . json_encode($this->connection->error) . "');</script>";
            }
        } catch (\Throwable $th) {
            echo "<script>console.log('".$th."');</script>";
        }
    }
}
