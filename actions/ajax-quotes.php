<?php

//Inclusion del arhivo model del apartado
require('../models/quotes-model.php');

//Inicializar la sesion actual del usuario
session_start();
$account = $_SESSION['correo'];

try {
    //Referencia al objeto de la clase Quotes_model
    $objtModel = new Quotes_model();

    //Variable que obtendra la accion requerida por el usuario
    $request = $_GET['request'];

    //Variable que guardara las respuestas ya procesadas
    $response = array();

    if (!isset($request)) {
        //Si se intenta acceder a la accion sin hacer mandando una peticion se cancelara automaticamente la accion
        exit();
    } else {
        //De lo contrario se procesara la peticion
        if ($request == "getallquotes") { //Extraer todas las cotizaciones disponibles con estado de nuevas

            $newQuotes = $objtModel->getAllQuotes();

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
                    'ammount_products' => $nq['amount_products_q'],
                    'prices_products' => $nq['price_products_q']
                );
            }
            sleep(2);
            echo json_encode($response);
        } else if ($request == "acceptquote") { //Aceptar una cotizacion en especifico
            //Variable para obtener la cotizacion que se va a aceptar
            echo $acceptedQuote = $objtModel->acceptQuote($account, $_GET['invoice']);
        } else if ($request == "getspecifiquotes") { //Extraer cotizaciones que le da seguimiento el usuario logeado actualmente
            $cotzAtendidas = $objtModel->getspecificallyquots($account);

            foreach ($cotzAtendidas as $ctzAten) {
                $response[] = array(
                    'invoice' => $ctzAten['invoice_q'],
                    'names' => $ctzAten['names_c_q'],
                    'surname' => $ctzAten['surname_c_q'],
                    'second_surname' => $ctzAten['secondsurname_c_q'],
                    'state_origin' => $ctzAten['state_origin_name_c_q'],
                    'email' => $ctzAten['email_c_q'],
                    'company' => $ctzAten['company_c_q'],
                    'municipality' => $ctzAten['municipality_name_c_q'],
                    'postal_code' => $ctzAten['postal_code_c_q'],
                    'street_direction' => $ctzAten['street_direction_c_q'],
                    'building_name' => $ctzAten['building_name_c_q'],
                    'ford_number' => $ctzAten['ford_number_c_q'],
                    'rfc' => $ctzAten['rfc_c_q'],
                    'additional_instructions' => $ctzAten['additional_instructions_c_q'],
                    'delivery_preferences' => $ctzAten['delivery_preferences_c_q'],
                    'date_create' => $ctzAten['date_create_q'],
                    'products_id' => $ctzAten['products_id_q'],
                    'ammount_products' => $ctzAten['amount_products_q'],
                    'prices_products' => $ctzAten['price_products_q'],
                    'status' => $ctzAten['status_q']
                );
            }
            sleep(2);
            echo json_encode($response);
        } else if ($request == "updatestatusq") { //Actualizar el estado de una cotizacion en especifico
            $invoice = $_GET['quote'];
            $status = $_GET['status'];
            $updateStatus = $objtModel->updateStatusQuote($status, $invoice);
            if ($updateStatus == true) {
                $response[] = array(
                    'execute_status' => true
                );
            } else {
                $response[] = array(
                    'execute_status' => false
                );
            }
            echo json_encode($response);
        } else if ($request == "managequote") { //Terminar el procedimiento de una cotizacion
            $quote = $_GET['quote'];
            $finalizar = $objtModel->manageExistQuote($quote);
            if ($finalizar == true) {
                $response[] = array(
                    'execute_status' => true
                );
            } else {
                $response[] = array(
                    'execute_status' => false
                );
            }

            echo json_encode($response);
        } else if ($request == "gethistory") { //Extraer todas las cotizaciones ya concluidas

            $historial = $objtModel->getHistoryQuotes();

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
            $allActive = $objtModel->getAllActiveQuotes();

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
        } else if ($request == "searchUserQuotes") { //Extraer las cotizaciones a partir de una busqueda solicitada por un usuario X
            $invoiceQuote = $_GET['cotizacion'];
            $quotesUserSearch = $objtModel->serachQuotesUser($account, $invoiceQuote);
            foreach ($quotesUserSearch as $qus) {
                $response[] = array(
                    'invoice' => $qus['invoice_q'],
                    'names' => $qus['names_c_q'],
                    'surname' => $qus['surname_c_q'],
                    'second_surname' => $qus['secondsurname_c_q'],
                    'state_origin' => $qus['state_origin_name_c_q'],
                    'email' => $qus['email_c_q'],
                    'company' => $qus['company_c_q'],
                    'municipality' => $qus['municipality_name_c_q'],
                    'postal_code' => $qus['postal_code_c_q'],
                    'street_direction' => $qus['street_direction_c_q'],
                    'building_name' => $qus['building_name_c_q'],
                    'ford_number' => $qus['ford_number_c_q'],
                    'rfc' => $qus['rfc_c_q'],
                    'additional_instructions' => $qus['additional_instructions_c_q'],
                    'delivery_preferences' => $qus['delivery_preferences_c_q'],
                    'date_create' => $qus['date_create_q'],
                    'products_id' => $qus['products_id_q'],
                    'ammount_products' => $qus['amount_products_q'],
                    'prices_products' => $qus['price_products_q'],
                    'status' => $qus['status_q']
                );
            }
            sleep(3);
            echo json_encode($response);
        } else if ($request == "searchUserQuotesH") { //Extraer las cotizaciones del historial apartir de una busqueda hecha por el usuario
            $searchHistory = $_GET['cotizacion'];
            $historySearchResults = $objtModel->serachQuotesUserHistory($account, $searchHistory);
            foreach ($historySearchResults as $hsr) {
                $response[] = array(
                    'invoice' => $hsr['invoice_qh'],
                    'names' => $hsr['names_c_qh'],
                    'surname' => $hsr['surname_c_qh'],
                    'second_surname' => $hsr['secondsurname_c_qh'],
                    'state_origin' => $hsr['state_origin_name_c_qh'],
                    'email' => $hsr['email_c_qh'],
                    'company' => $hsr['company_c_qh'],
                    'municipality' => $hsr['municipality_name_c_qh'],
                    'postal_code' => $hsr['postal_code_c_qh'],
                    'street_direction' => $hsr['street_direction_c_qh'],
                    'building_name' => $hsr['building_name_c_qh'],
                    'ford_number' => $hsr['ford_number_c_qh'],
                    'rfc' => $hsr['rfc_c_qh'],
                    'additional_instructions' => $hsr['additional_instructions_c_qh'],
                    'delivery_preferences' => $hsr['delivery_preferences_c_qh'],
                    'date_create' => $hsr['date_create_qh'],
                    'products_id' => $hsr['products_id_qh'],
                    'ammount_products' => $hsr['amount_products_qh'],
                    'prices_products' => $hsr['price_products_qh'],
                    'status' => $hsr['status_qh']
                );
            }
            sleep(3);
            echo json_encode($response);
        }
    }
} catch (\Throwable $th) {
    var_dump($th);
}
