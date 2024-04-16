<?php
//Implementacion del model de dashboard
require("../models/dashboard-model.php");

//Constructor para la clase del model de dashboard
$dash = new Dashboard_model();
//Recuperar la variable request
$request = $_GET['request'];

//Iniciar la sesion
session_start();

//Funcion para extraer las nuevas cotizaciones
try {

    //Array que se encargara de regresar las respuestas
    $response = array();

    if ($request == "newquotes") { //Si la solicitud para mostrar 10 nuevas cotuizaciones

        $newQuotes = $dash->getQuotes();

        foreach ($newQuotes as $nq) {

            $response[] = array(
                'invoice' => $nq['invoice_q'],
                'names' => $nq['names_c_q'],
                'surname' => $nq['surname_c_q'],
                'second_surname' => $nq['secondsurname_c_q'],
                'email' => $nq['email_c_q'],
                'company' => $nq['company_c_q'],
                'state_origin' => $nq['state_origin_name_c_q'],
                'municipality' => $nq['municipality_name_c_q'],
                'postal_code' => $nq['postal_code_c_q'],
                'street_direction' => $nq['street_direction_c_q'],
                'building_name' => $nq['building_name_c_q'],
                'ford_number' => $nq['ford_number_c_q'],
                'rfc' => $nq['rfc_c_q'],
                'additional_instructions' => $nq['additional_instructions_c_q'],
                'delivery_preferences' => $nq['delivery_preferences_c_q'],
                'date_create' => $nq['date_create_q'],
                'products_id' => $nq['products_id_q'],
                'ammount_products' => $nq['amount_products_q']
            );
        }
        sleep(3);
        echo json_encode($response);
    } else if ($request == "acceptquote") { //Si se desea aceptar una nueva cotizacion

        echo $acceptQ = $dash->acceptQuote($_SESSION['correo'], $_GET['invoice']);

    } else if ($request == "updaterequeste") {

        $updateRequest = $dash->getUpdateRequestE($_SESSION['correo']);

        foreach ($updateRequest as $ur) {

            $response[] = array(
                'id' => $ur['id_ur'],
                'title' => $ur['title_ur'],
                'description' => $ur['description_ur'],
                'date' => $ur['date_ur'],
                'state' => $ur['state_ur'],
                'token' => $ur['token_ur'],
                'user' => $ur['id_user'],
                'invoice' => $ur['invoice_q']
            );

        }

        echo json_encode($response);
    } else if ($request == "count-quotes") { //Verificar cuantas nuevas cotizaciones hay
        $count = $dash->countQuotes();
        sleep(3);
        echo json_encode($count);
    }

} catch (Error $th) {
    //En caso de error lo devolvera junto con una descripcion
    $response[] = array(
        'status' => "Error",
        'description' => $th->getMessage()
    );

    echo json_encode($response);
}
