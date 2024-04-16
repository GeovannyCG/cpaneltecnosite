-- -- phpMyAdmin SQL Dump
-- -- version 5.2.0
-- -- https://www.phpmyadmin.net/
-- --
-- -- Servidor: 127.0.0.1:3306
-- -- Tiempo de generación: 16-04-2024 a las 09:09:32
-- -- Versión del servidor: 8.0.31
-- -- Versión de PHP: 8.0.26

-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- START TRANSACTION;
-- SET time_zone = "+00:00";


-- /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
-- /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
-- /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
-- /*!40101 SET NAMES utf8mb4 */;

-- --
-- -- Base de datos: `tecnositedb`
-- --

-- -- --------------------------------------------------------

-- --
-- -- Estructura de tabla para la tabla `quotations_history_tecnosite`
-- --

-- DROP TABLE IF EXISTS `quotations_history_tecnosite`;
-- CREATE TABLE IF NOT EXISTS `quotations_history_tecnosite` (
--   `invoice_qh` varchar(30) NOT NULL,
--   `names_c_qh` varchar(100) NOT NULL,
--   `surname_c_qh` varchar(100) NOT NULL,
--   `secondsurname_c_qh` varchar(100) NOT NULL,
--   `email_c_qh` varchar(100) NOT NULL,
--   `company_c_qh` varchar(100) DEFAULT NULL,
--   `state_origin_name_c_qh` varchar(100) NOT NULL,
--   `municipality_name_c_qh` varchar(100) NOT NULL,
--   `postal_code_c_qh` int NOT NULL,
--   `street_direction_c_qh` varchar(150) NOT NULL,
--   `building_name_c_qh` varchar(100) DEFAULT NULL,
--   `ford_number_c_qh` varchar(255) DEFAULT NULL,
--   `rfc_c_qh` varchar(15) NOT NULL,
--   `additional_instructions_c_qh` varchar(255) DEFAULT NULL,
--   `delivery_preferences_c_qh` varchar(255) DEFAULT NULL,
--   `date_create_qh` date NOT NULL,
--   `products_id_qh` varchar(255) NOT NULL,
--   `amount_products_qh` varchar(255) NOT NULL,
--   `price_products_qh` varchar(255) NOT NULL,
--   `status_qh` varchar(50) NOT NULL,
--   `id_user` int DEFAULT NULL,
--   PRIMARY KEY (`invoice_qh`),
--   KEY `id_user` (`id_user`)
-- ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --
-- -- Volcado de datos para la tabla `quotations_history_tecnosite`
-- --

-- INSERT INTO `quotations_history_tecnosite` (`invoice_qh`, `names_c_qh`, `surname_c_qh`, `secondsurname_c_qh`, `email_c_qh`, `company_c_qh`, `state_origin_name_c_qh`, `municipality_name_c_qh`, `postal_code_c_qh`, `street_direction_c_qh`, `building_name_c_qh`, `ford_number_c_qh`, `rfc_c_qh`, `additional_instructions_c_qh`, `delivery_preferences_c_qh`, `date_create_qh`, `products_id_qh`, `amount_products_qh`, `price_products_qh`, `status_qh`, `id_user`) VALUES
-- ('TEC001', 'Luis Armando', 'Arellano', 'Ramirez', 'luisarmando@gmail.com', 'Innosoftcg', 'Colima', 'Las Cruzes', 54478, 'Carretera Gustavo a madero', 'Los pinos', 'Numero 3', 'HJSA893D', 'Ninguna', 'Yes', '2024-03-27', '57607, 54986', '2, 3', '400.00, 452.89', 'takeit', 1);

-- -- --------------------------------------------------------

-- --
-- -- Estructura de tabla para la tabla `quotations_tecnosite`
-- --

-- DROP TABLE IF EXISTS `quotations_tecnosite`;
-- CREATE TABLE IF NOT EXISTS `quotations_tecnosite` (
--   `invoice_q` varchar(30) NOT NULL,
--   `names_c_q` varchar(100) NOT NULL,
--   `surname_c_q` varchar(100) NOT NULL,
--   `secondsurname_c_q` varchar(100) NOT NULL,
--   `email_c_q` varchar(100) NOT NULL,
--   `company_c_q` varchar(100) DEFAULT NULL,
--   `state_origin_name_c_q` varchar(100) NOT NULL,
--   `municipality_name_c_q` varchar(100) NOT NULL,
--   `postal_code_c_q` int NOT NULL,
--   `street_direction_c_q` varchar(150) NOT NULL,
--   `building_name_c_q` varchar(100) DEFAULT NULL,
--   `ford_number_c_q` varchar(255) DEFAULT NULL,
--   `rfc_c_q` varchar(15) NOT NULL,
--   `additional_instructions_c_q` varchar(255) DEFAULT NULL,
--   `delivery_preferences_c_q` varchar(255) DEFAULT NULL,
--   `date_create_q` date NOT NULL,
--   `products_id_q` varchar(255) NOT NULL,
--   `amount_products_q` varchar(255) NOT NULL,
--   `price_products_q` varchar(255) NOT NULL,
--   `status_q` varchar(50) NOT NULL,
--   `id_user` int DEFAULT NULL,
--   PRIMARY KEY (`invoice_q`),
--   KEY `id_user` (`id_user`)
-- ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --
-- -- Volcado de datos para la tabla `quotations_tecnosite`
-- --

-- INSERT INTO `quotations_tecnosite` (`invoice_q`, `names_c_q`, `surname_c_q`, `secondsurname_c_q`, `email_c_q`, `company_c_q`, `state_origin_name_c_q`, `municipality_name_c_q`, `postal_code_c_q`, `street_direction_c_q`, `building_name_c_q`, `ford_number_c_q`, `rfc_c_q`, `additional_instructions_c_q`, `delivery_preferences_c_q`, `date_create_q`, `products_id_q`, `amount_products_q`, `price_products_q`, `status_q`, `id_user`) VALUES
-- ('TEC002', 'Julio Cesar', 'Chavez', 'Lopez', 'cesar@gmail.com', 'Oxxo', 'Mexicali', 'Los reyes la paz', 45656, 'Gustavo a madero', 'No aplica', 'No aplica', 'JSH762', 'Ninguna', 'Ninguna', '2024-03-27', '29138, 43983, 48210', '1, 3, 5', '1.00, 1.00, 1.00', 'new', NULL);

-- --
-- -- Disparadores `quotations_tecnosite`
-- --
-- DROP TRIGGER IF EXISTS `archivar_cotizacion`;
-- DELIMITER $$
-- CREATE TRIGGER `archivar_cotizacion` BEFORE DELETE ON `quotations_tecnosite` FOR EACH ROW BEGIN
--     -- Insertar los datos de la fila que se eliminará en la tabla de destino
--     INSERT INTO quotations_history_tecnosite (invoice_qh, names_c_qh, surname_c_qh, secondsurname_c_qh, email_c_qh, company_c_qh, state_origin_name_c_qh, municipality_name_c_qh, postal_code_c_qh, street_direction_c_qh, building_name_c_qh, ford_number_c_qh, rfc_c_qh, additional_instructions_c_qh, delivery_preferences_c_qh, date_create_qh, products_id_qh, amount_products_qh, price_products_qh, status_qh, id_user)
--     VALUES (OLD.invoice_q, OLD.names_c_q, OLD.surname_c_q, OLD.secondsurname_c_q, OLD.email_c_q, OLD.company_c_q, OLD.state_origin_name_c_q, OLD.municipality_name_c_q, OLD.postal_code_c_q, OLD.street_direction_c_q, OLD.building_name_c_q, OLD.ford_number_c_q, OLD.rfc_c_q, OLD.additional_instructions_c_q, OLD.delivery_preferences_c_q, OLD.date_create_q, OLD.products_id_q, OLD.amount_products_q, OLD.price_products_q, OLD.status_q, OLD.id_user);
-- END
-- $$
-- DELIMITER ;

-- -- --------------------------------------------------------

-- --
-- -- Estructura de tabla para la tabla `record_activity_tecnosite`
-- --

-- DROP TABLE IF EXISTS `record_activity_tecnosite`;
-- CREATE TABLE IF NOT EXISTS `record_activity_tecnosite` (
--   `id_ha` int NOT NULL AUTO_INCREMENT,
--   `title_ha` varchar(50) NOT NULL,
--   `description_ra` varchar(50) NOT NULL,
--   `date_ra` datetime NOT NULL,
--   `email_ra` varchar(100) NOT NULL,
--   `id_user` int NOT NULL,
--   PRIMARY KEY (`id_ha`),
--   KEY `id_user` (`id_user`)
-- ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -- --------------------------------------------------------

-- --
-- -- Estructura de tabla para la tabla `unlock_request_tecnosite`
-- --

-- DROP TABLE IF EXISTS `unlock_request_tecnosite`;
-- CREATE TABLE IF NOT EXISTS `unlock_request_tecnosite` (
--   `id_ur` int NOT NULL AUTO_INCREMENT,
--   `email_ulr` varchar(100) NOT NULL,
--   `date_ulr` datetime NOT NULL,
--   `state_ulr` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
--   `id_user` int NOT NULL,
--   PRIMARY KEY (`id_ur`),
--   KEY `id_user` (`id_user`)
-- ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -- --------------------------------------------------------

-- --
-- -- Estructura de tabla para la tabla `update_request_tecnosite`
-- --

-- DROP TABLE IF EXISTS `update_request_tecnosite`;
-- CREATE TABLE IF NOT EXISTS `update_request_tecnosite` (
--   `id_ur` int NOT NULL AUTO_INCREMENT,
--   `title_ur` varchar(50) NOT NULL,
--   `description_ur` varchar(50) NOT NULL,
--   `date_ur` datetime NOT NULL,
--   `state_ur` varchar(50) NOT NULL,
--   `token_ur` varchar(255) NOT NULL,
--   `id_user` int NOT NULL,
--   `invoice_q` varchar(50) NOT NULL,
--   PRIMARY KEY (`id_ur`),
--   KEY `id_user` (`id_user`),
--   KEY `invoice_q` (`invoice_q`)
-- ) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --
-- -- Volcado de datos para la tabla `update_request_tecnosite`
-- --

-- INSERT INTO `update_request_tecnosite` (`id_ur`, `title_ur`, `description_ur`, `date_ur`, `state_ur`, `token_ur`, `id_user`, `invoice_q`) VALUES
-- (3, 'Actualizar numero telefonico', 'Error al ingresarlo', '2024-03-29 23:47:07', 'send', 'ewqqweqeasdsadwesafwarefawsefsadfweasfsadf', 1, 'TEC001');

-- -- --------------------------------------------------------

-- --
-- -- Estructura de tabla para la tabla `users`
-- --

-- DROP TABLE IF EXISTS `users`;
-- CREATE TABLE IF NOT EXISTS `users` (
--   `id_u` int NOT NULL AUTO_INCREMENT,
--   `name_u` varchar(50) NOT NULL,
--   `lastnames_u` varchar(50) NOT NULL,
--   `birthday_u` varchar(50) NOT NULL,
--   `phone_u` int NOT NULL,
--   `state_u` varchar(35) NOT NULL,
--   `municipality_u` varchar(35) NOT NULL,
--   `cologne_u` varchar(35) NOT NULL,
--   `mail_code` int NOT NULL,
--   `email_u` varchar(50) NOT NULL,
--   `password_u` char(60) NOT NULL,
--   `registration_date_u` date NOT NULL,
--   `status_u` varchar(30) NOT NULL,
--   `attempts_u` varchar(30) NOT NULL,
--   `permissions_u` varchar(25) NOT NULL,
--   PRIMARY KEY (`id_u`)
-- ) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --
-- -- Volcado de datos para la tabla `users`
-- --

-- INSERT INTO `users` (`id_u`, `name_u`, `lastnames_u`, `birthday_u`, `phone_u`, `state_u`, `municipality_u`, `cologne_u`, `mail_code`, `email_u`, `password_u`, `registration_date_u`, `status_u`, `attempts_u`, `permissions_u`) VALUES
-- (4, 'Julio', 'Calles Loza', '2008-02-01', 2147483647, 'Estado de México', 'Nicolas Romero', 'Los tubos', 56565, 'julio@gmail.com', '$2y$10$cpvIFgIbMb2MRgQms2/aMeRiLiP12qB.njoT/7jsKGTQeknnjHF3.', '2024-03-15', 'unlocked', '0', 'customer'),
-- (3, 'Hiojan Geovanny', 'Carrasco Garcia', '2002-09-05', 2147483647, 'Estado de México', 'Nicolas Romero', 'Los Tubos', 54460, 'hiojan75@gmail.com', '$2y$10$oexzOfN2GoYad2LvrpfrH.V419Ok8z133Izic/bEH07IfxlmSaezu', '2024-03-15', 'unlocked', '0', 'customer'),
-- (5, 'pepe', 'Ramirez', '2024-03-01', 2147483647, 'Jalisco', 'werfdsafsd', 'fsdsafsdf', 43434, 'hiojan725@gmail.com', '$2y$10$v02y7cU41T9cKm1r/vJsXeEx2zBdePMY3deJRNa0UPcDnWM/izudq', '2024-03-20', 'unlocked', '0', 'customer');

-- -- --------------------------------------------------------

-- --
-- -- Estructura de tabla para la tabla `users_tecnosite`
-- --

-- DROP TABLE IF EXISTS `users_tecnosite`;
-- CREATE TABLE IF NOT EXISTS `users_tecnosite` (
--   `id_u` int NOT NULL AUTO_INCREMENT,
--   `names_u` varchar(50) NOT NULL,
--   `surname_u` varchar(50) NOT NULL,
--   `secondsurname_u` varchar(50) NOT NULL,
--   `birthday_u` date NOT NULL,
--   `phone_u` bigint NOT NULL,
--   `email_u` varchar(50) NOT NULL,
--   `password_u` char(60) NOT NULL,
--   `status_u` varchar(30) NOT NULL,
--   `attempts_u` varchar(30) NOT NULL,
--   `roll_u` varchar(25) NOT NULL,
--   PRIMARY KEY (`id_u`)
-- ) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --
-- -- Volcado de datos para la tabla `users_tecnosite`
-- --

-- INSERT INTO `users_tecnosite` (`id_u`, `names_u`, `surname_u`, `secondsurname_u`, `birthday_u`, `phone_u`, `email_u`, `password_u`, `status_u`, `attempts_u`, `roll_u`) VALUES
-- (1, 'Hiojan Geovanny', 'Carrasco', 'Garcia', '2002-09-05', 5578753399, 'hiojan75@gmail.com', '$2y$10$oexzOfN2GoYad2LvrpfrH.V419Ok8z133Izic/bEH07IfxlmSaezu', 'unlocked', '0', 'admin'),
-- (8, 'Brandon Donovan', 'Garcia', 'Mendoza', '2024-04-16', 3333333333, 'donovan@gmail.com', '$2y$10$64OcsyIra0Aazaaduw03w.YnyYRpEXnCemd1WnuwRwGByCnwtJcQy', 'locked', '3', 'collaborator');
-- COMMIT;

-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
