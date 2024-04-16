<?php
//Implementacion de la conexion a la db
require("../config/database.php");

class Login
{
    //Variable local que almacenara la conexion de la db.
    private $connection;

    //Constructor de la clase Login
    public function __construct()
    {
        $connectionObj = new Connection();
        $this->connection = $connectionObj->getConn();
    }

    public function validationUser($user, $password)
    {
        //Array para guardar los datos a devolver en formato JSON
        $json = array();

        try {

            //Verificar las credenciales
            $queryCredentials = "SELECT email_u, password_u, status_u, attempts_u FROM users_tecnosite WHERE email_u = ?";
            $stwCredentials = $this->connection->prepare($queryCredentials);
            $stwCredentials->bind_param("s", $user);
            $stwCredentials->execute();

            $resultados = $stwCredentials->get_result();

            if ($resultados->num_rows > 0) { //! VERIFICAR SI HAY UNA CUENTA DADA DE ALTA CON ESE CORREO
                //Recabar la informacion restante del usuario
                $rowCredentials = $resultados->fetch_assoc();
                $pass = $rowCredentials['password_u'];
                $status = $rowCredentials['status_u'];
                $attempts = $rowCredentials['attempts_u'];
                $email = $rowCredentials['email_u'];

                //Verificar si el correo ingresado no cuenta con bloqueo de cuenta
                if ($status == "locked") { //!VERIFICAR SI LA CUENTA TIENE BLOQUEO

                    $json[] = array(
                        'code' => 2, // Cambiado de 001 a 1
                        'description' => "Cuenta bloqueada por motivos de seguridad.",
                        'error' => "LOCKED_USER"
                    );

                    $jsonstring = json_encode($json);

                    return $jsonstring;
                } else { //!SI NO TIENE BLOQUEO LA CUENTA


                    if (!password_verify($password, $pass)) { //!SE VERIFICA QUE LA CONTRASEÑA INGRESADA 

                        //Varificar el numero de intentos
                        if ($attempts < 3) { //!SE VERIFICAN EL NUMERO DE INTENTOS DE INGRESO

                            //Query para actualizar el numero de intentos
                            $queryAttempts = "UPDATE users_tecnosite SET attempts_u = (attempts_u+1) WHERE email_u = ?";
                            $stwAttempts = $this->connection->prepare($queryAttempts);
                            $stwAttempts->bind_param("s", $user);
                            $stwAttempts->execute();

                            if ($stwAttempts->affected_rows > 0) {
                                //Se consulta el numero de intentos despues de hacer la actualizacion
                                $numAttempts = "SELECT attempts_u FROM users_tecnosite WHERE email_u = ?";
                                $stwAttempts = $this->connection->prepare($numAttempts);
                                $stwAttempts->bind_param("s", $user);
                                $stwAttempts->execute();
                                $result = $stwAttempts->get_result();

                                $rowAttempts = $result->fetch_assoc();
                                $atteps = $rowAttempts['attempts_u'];

                                $json[] = array(
                                    'code' => 3,
                                    'description' => "Intento fallido al iniciar sesion",
                                    'error' => "WRONG_PASSWORD",
                                    'attemp' => $atteps
                                );

                                $jsonstring = json_encode($json);

                                return $jsonstring;
                            }
                        } else { //!SE VERIFICAN EL NUMERO DE INTENTOS DE INGRESO
                            //En caso de exceder los 3 intentos se procedera con el bloqueo de la cuenta
                            $queryLocked = "UPDATE users_tecnosite SET status_u = 'locked' WHERE email_u = ?";
                            $stwLocked = $this->connection->prepare($queryLocked);
                            $stwLocked->bind_param("s", $user);
                            $stwLocked->execute();

                            if ($stwLocked->affected_rows > 0) {

                                $json[] = array(
                                    'code' => 4,
                                    'description' => "La cuenta del usuario ha sido bloqueda tras varios intentos erroneos de inicio de sesion.",
                                    'error' => "ATTEMPTS_FINISHED",
                                    'account' => $email
                                );

                                $jsonstring = json_encode($json);

                                return $jsonstring;
                            }
                        }
                    } else { //!SE VERIFICA QUE LA CONTRASEÑA INGRESADA
                        if (!$attempts == 0) {
                            //Query para actualizar el numero de intentos
                            $queryAttempts = "UPDATE users_tecnosite SET attempts_u = 0 WHERE email_u = ?";
                            $stwAttempts = $this->connection->prepare($queryAttempts);
                            $stwAttempts->bind_param("s", $user);
                            $stwAttempts->execute();
                        }

                        session_start();
                        $_SESSION['correo'] = $user;

                        $json[] = array(
                            'code' => 0, // Cambiado de 001 a 1
                            'description' => "Acceso concedido",
                            'bypass' => "ACCESS_CONCED"
                        );

                        $jsonstring = json_encode($json);

                        sleep(2);

                        return $jsonstring;
                    }
                }
            } else { //!SI NO HAY UNA CUENTA DADA DE ALTA CON ESE CORREO

                $json[] = array(
                    'code' => 1, // Cambiado de 001 a 1
                    'description' => "Cuenta no ligada al correo proporcionado",
                    'error' => "USER_NOT_FOUND"
                );

                $jsonstring = json_encode($json);

                return $jsonstring;
            }
        } catch (Exception $e) {

            $json[] = array(
                'code' => 502, // Cambiado de 001 a 1
                'description' => "Error de servidor",
                'error' => $e
            );

            $jsonstring = json_encode($json);

            return $jsonstring;
        }
    }
}