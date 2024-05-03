-- !TABLA DE USUARIOS

-- CREATE TABLE users_tecnosite(
--     id_u int auto_increment,
--     names_u varchar(50) not null,
--     surname_u varchar(50) not null,
--     secondsurname_u varchar(50) not null,
--     birthday_u date not null,
--     phone_u bigint not null,
--     email_u varchar(50)not null,
--     password_u char(60) not null,
--     status_u varchar(30) not null,
--     attempts_u varchar(30) not null,
--     roll_u varchar(25) not null,
--     primary key(id_u)
-- );


-- !TABLA DE COTIZACIONES

-- CREATE TABLE quotations_tecnosite(
--     invoice_q varchar(30) not null,
--     names_c_q varchar(100) not null,
--     surname_c_q varchar(100) not null,
--     secondsurname_c_q varchar(100) not null,
--     email_c_q varchar(100) not null,
--     company_c_q varchar(100),
--     state_origin_name_c_q varchar(100) not null,
--     municipality_name_c_q varchar(100) not null,
--     postal_code_c_q int(10) not null,
--     street_direction_c_q varchar(150) not null,
--     building_name_c_q varchar(100),
--     ford_number_c_q varchar(255),
--     rfc_c_q varchar(15) not null,
--     additional_instructions_c_q varchar(255),
--     delivery_preferences_c_q varchar(255),
--     date_create_q date not null,
--     products_id_q varchar(255) not null,
--     amount_products_q varchar(255) not null,
--     price_products_q varchar(255) NOT NULL,
--     status_q varchar(50) not null,
--     id_user int,
--     primary key(invoice_q),
--     foreign key (id_user)references users_tecnosite(id_u)
-- );


--!TABLA DE HISTORIAL DE COTIZACIONES

-- CREATE TABLE quotations_history_tecnosite(
--     invoice_qh varchar(30) not null,
--     names_c_qh varchar(100) not null,
--     surname_c_qh varchar(100) not null,
--     secondsurname_c_qh varchar(100) not null,
--     email_c_qh varchar(100) not null,
--     company_c_qh varchar(100),
--     state_origin_name_c_qh varchar(100) not null,
--     municipality_name_c_qh varchar(100) not null,
--     postal_code_c_qh int(10) not null,
--     street_direction_c_qh varchar(150) not null,
--     building_name_c_qh varchar(100),
--     ford_number_c_qh varchar(255),
--     rfc_c_qh varchar(15) not null,
--     additional_instructions_c_qh varchar(255),
--     delivery_preferences_c_qh varchar(255),
--     date_create_qh date not null,
--     products_id_qh varchar(255) not null,
--     amount_products_qh varchar(255) not null,
--     status_qh varchar(50) not null,
--     price_products_qh varchar(255) NOT NULL,
--     reason_term_qh varchar(100) not null,
--     id_user int,
--     primary key(invoice_qh),
--     foreign key (id_user)references users_tecnosite(id_u)
-- );

-- TRIGGERS

-- DELIMITER //
-- CREATE TRIGGER archivar_cotizacion
-- BEFORE DELETE ON quotations_tecnosite
-- FOR EACH ROW
-- BEGIN
--     -- Insertar los datos de la fila que se eliminará en la tabla de destino
--     INSERT INTO quotations_history_tecnosite (invoice_qh, names_c_qh, surname_c_qh, secondsurname_c_qh, email_c_qh, company_c_qh, state_origin_name_c_qh, municipality_name_c_qh, postal_code_c_qh, street_direction_c_qh, building_name_c_qh, ford_number_c_qh, rfc_c_qh, additional_instructions_c_qh, delivery_preferences_c_qh, date_create_qh, products_id_qh, amount_products_qh, price_products_qh, status_qh, id_user)
--     VALUES (OLD.invoice_q, OLD.names_c_q, OLD.surname_c_q, OLD.secondsurname_c_q, OLD.email_c_q, OLD.company_c_q, OLD.state_origin_name_c_q, OLD.municipality_name_c_q, OLD.postal_code_c_q, OLD.street_direction_c_q, OLD.building_name_c_q, OLD.ford_number_c_q, OLD.rfc_c_q, OLD.additional_instructions_c_q, OLD.delivery_preferences_c_q, OLD.date_create_q, OLD.products_id_q, OLD.amount_products_q, OLD.price_products_q, OLD.status_q, OLD.id_user);
-- END;
-- //
-- DELIMITER ;
