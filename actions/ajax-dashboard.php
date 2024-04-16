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
    } else if ($request == "count-quotes") { //Verificar cuantas nuevas cotizaciones hay
        $count = $dash->countQuotes();
        sleep(3);
        echo json_encode($count);
    } else if ($request == "gethistory") { //Extraer todas las cotizaciones ya concluidas

        $historial = $dash->getHistoryQuotes();

        foreach ($historial as $ctn) {
            $response[] = array(
                'invoice' => $ctn['invoice_qh'],
                'names' => $ctn['names_c_qh'],
                'surname' => $ctn['surname_c_qh'],
                'second_surname' => $ctn['secondsurname_c_qh'],
                'state_origin' => $ctn['state_origin_name_c_qh'],
                'email' => $ctn['email_c_qh'],
                'company' => $ctn['company_c_qh'],
                'municipality' => $ctn['municipality_name_c_qh'],
                'postal_code' => $ctn['postal_code_c_qh'],
                'street_direction' => $ctn['street_direction_c_qh'],
                'building_name' => $ctn['building_name_c_qh'],
                'ford_number' => $ctn['ford_number_c_qh'],
                'rfc' => $ctn['rfc_c_qh'],
                'additional_instructions' => $ctn['additional_instructions_c_qh'],
                'delivery_preferences' => $ctn['delivery_preferences_c_qh'],
                'date_create' => $ctn['date_create_qh'],
                'products_id' => $ctn['products_id_qh'],
                'ammount_products' => $ctn['amount_products_qh'],
                'prices_products' => $ctn['price_products_qh'],
                'status' => $ctn['status_qh']
            );
        }

        sleep(2);
        echo json_encode($response);
    } else if ($request == "getallactivequotes") { //Extraer todas las cotizaciones activas
        $allActive = $dash->getAllActiveQuotes();

        foreach ($allActive as $act) {
            $response[] = array(
                'invoice' => $act['invoice_q'],
                'names' => $act['names_c_q'],
                'surname' => $act['surname_c_q'],
                'second_surname' => $act['secondsurname_c_q'],
                'state_origin' => $act['state_origin_name_c_q'],
                'email' => $act['email_c_q'],
                'company' => $act['company_c_q'],
                'municipality' => $act['municipality_name_c_q'],
                'postal_code' => $act['postal_code_c_q'],
                'street_direction' => $act['street_direction_c_q'],
                'building_name' => $act['building_name_c_q'],
                'ford_number' => $act['ford_number_c_q'],
                'rfc' => $act['rfc_c_q'],
                'additional_instructions' => $act['additional_instructions_c_q'],
                'delivery_preferences' => $act['delivery_preferences_c_q'],
                'date_create' => $act['date_create_q'],
                'products_id' => $act['products_id_q'],
                'ammount_products' => $act['amount_products_q'],
                'prices_products' => $act['price_products_q'],
                'status' => $act['status_q']
            );
        }
        sleep(2);
        echo json_encode($response);
    } else if ($request == "get-all-accounts") { //Obtener todas las cuentas actuales dadas de alta

        $getAccounts = $dash->getAllAccounts();

        foreach ($getAccounts as $gAc) {
            $response[] = array(
                'idUsuario' => $gAc['id_u'],
                'Nombres' => $gAc['names_u'],
                'ApellidoP' => $gAc['surname_u'],
                'ApellidoM' => $gAc['secondsurname_u'],
                'Cumpleanios' => $gAc['birthday_u'],
                'Telefono' => $gAc['phone_u'],
                'Correo' => $gAc['email_u'],
                'Contrasenia' => $gAc['password_u'],
                'Estatus' => $gAc['status_u'],
                'Intentos' => $gAc['attempts_u'],
                'Roll' => $gAc['roll_u']
            );
        }
        
        sleep(3);
        echo json_encode($response);
    }
} catch (Error $th) {
    //En caso de error lo devolvera junto con una descripcion
    $response[] = array(
        'status' => "Error",
        'description' => $th->getMessage()
    );

    echo json_encode($response);
}
