<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Gestion cuentas - Tecnosite</title>

    <!-- Montserrat Font -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Material Icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">

    <!-- Favicon -->
    <link rel="shortcut icon" href="./assets/images/favicon.ico" type="image/x-icon">

    <!-- Icons de bootstrap -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    <!-- Link de CSS de bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="./assets/css/dash.css">

    <!-- CSS propio -->
    <link rel="stylesheet" href="./assets/css/account-managment-style.css">
</head>

<body>
    <div class="grid-container">

        <!-- Header -->
        <header class="header">
            <div class="menu-icon" onclick="openSidebar()">
                <span class="material-icons-outlined">menu</span>
            </div>
            <div class="header-left">
            </div>
            <div class="header-right">
                <!-- Show Date and Hour -->
                <p id="showdate"></p>

                <!-- Start notifications -->
                <div id="notifications">
                    <div id="dropdownMenuButton1">
                        <div id="countAlerts">0</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                        </svg>
                    </div>

                    <div class="dropdown-menu1" id="dropdownMenu1">
                        <p>Notificaciones</p>
                        <ul id="notifications2"></ul>
                    </div>
                </div>
                <!-- End notifications -->

                <!-- Start user options -->
                <div class="flex-shrink-0 dropdown" id="accont">
                    <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="./assets/images/user-icon.png" alt="mdo" width="32" height="32" class="rounded-circle">
                    </a>
                    <ul class="dropdown-menu text-small shadow">
                        <!-- Cuenta de usuario -->
                        <p style="padding: 10px;"><b><?php echo $_SESSION['correo'] ?></b></p>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor: pointer;"><i class="bi bi-bug"></i> Reportar un error</a></li>
                        <li><a id="btnLogout" class="dropdown-item" href="./CloseSession"><i class="bi bi-power"></i> Cerrar sesion...</a></li>
                    </ul>
                </div>
                <!-- End user options -->

            </div>
        </header>
        <!-- End Header -->

        <!-- Sidebar -->
        <aside id="sidebar">
            <div class="sidebar-title">
                <div class="sidebar-brand">
                    <img src="./assets/images/big-logo.png" width="200px" height="auto" alt="Logotipo Tecnosite">
                </div>
                <span class="material-icons-outlined" onclick="closeSidebar()">close</span>
            </div>

            <ul class="sidebar-list">
                <li class="sidebar-list-item" id="option1">
                    <a href="./Dashboard">
                        <div class="optionMenu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                            </svg>
                            <p>Inicio</p>
                        </div>
                    </a>
                </li>
                <li class="sidebar-list-item" id="option2">
                    <a href="./Quotes">
                        <div class="optionMenu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                                <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1M3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
                            </svg>
                            <p>Cotizaciones</p>
                        </div>
                    </a>
                </li>
                <li class="sidebar-list-item" id="option3">
                    <a href="./Productos-Categories">
                        <div class="optionMenu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                            </svg>
                            <p>Catalogo</p>
                        </div>
                    </a>
                </li>
                <li class="sidebar-list-item" id="option4">
                    <a href="./Accounts">
                        <div class="optionMenu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                            </svg>
                            <P>Gestion de cuentas</P>
                        </div>
                    </a>
                </li>
            </ul>
        </aside>
        <!-- End Sidebar -->

        <!-- Main -->
        <main class="main-container" id="mainContainer">
            <!-- Titulo principal del apartado -->
            <h4>GESTION DE CUENTAS</h4>
            <!-- Tabla para mostrar las cuentas de los usuarios -->
            <div class="container-table">
                <!-- Encabezado de contendor de tabala con buscador -->
                <div class="header-container-table">
                    <!-- Titulo -->
                    <h5><i class="bi bi-people-fill"></i> Gestion de cuentas</h5>

                    <!-- Herramientas -->
                    <div class="acciones">
                        <button class="btn btn-primary refresh" type="button"><i class="bi bi-arrow-clockwise"></i></button>
                    </div>
                </div>
                <!-- Tabla -->
                <table class="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre(s)</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Roll</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tb-todas-cuentas">
                        <tr>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                            <td>
                                <p class="placeholder-glow">
                                    <span class="placeholder col-10"></span>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <!-- Formulario para el registro de un nuevo usuario -->
            <div class="container-table">
                <!-- Encabezado de contendor de tabala con buscador -->
                <div class="header-container-table">
                    <!-- Titulo -->
                    <h5><i class="bi bi-person-fill-add"></i> Crear un nuevo usuario</h5>
                </div>

                <div>
                    <!-- Formulario -->
                    <form>
                        <!-- Div con clase row para almacenar elementos en filas (Bootstrap)-->
                        <div class="row">
                            <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
                            <div class="col">
                                <!-- Input para agregar nombres -->
                                <input type="text" class="form-control" placeholder="Nombre(s)" aria-label="Ingresa tu(s) nombre(s)" id="inputNames">
                            </div>
                            <div class="col">
                                <!-- input para agregar los apellidos -->
                                <input type="text" class="form-control" placeholder="Apellido paterno" aria-label="Apellido Paterno" id="inputLastnames">
                            </div>
                            <div class="col">
                                <!-- input para agregar los apellidos -->
                                <input type="text" class="form-control" placeholder="Apellido materno" aria-label="Apellido Materno" id="inputSecondLastnames">
                            </div>
                        </div> <br>

                        <div class="row">
                            <div class="col">
                                <label for="inputBirthday">¿Cuando naciste?</label>
                                <!-- Input para agregar la fecha de cumpleaños -->
                                <input type="date" class="form-control" placeholder="Fecha de cumpleaños" aria-label="Ingresa tu fecha de nacimiento" id="inputBirthday">
                            </div>
                        </div> <br>

                        <div class="row">
                            <div class="col">
                                <!-- input para ingresar el numero telefonico -->
                                <input type="number" class="form-control" placeholder="Numero de celular" aria-label="Ingresa tu numero de celular" id="inputPhone">
                            </div>
                        </div><br>

                        <div class="row">
                            <div class="col">
                                <!-- Input para agregar el correo electronico -->
                                <input type="email" class="form-control" placeholder="Correo electronico" aria-label="Ingresa tu correo electronico" id="inputEmail">
                            </div>

                            <div class="col password-div">
                                <!-- Input para agregar la contraseña a usar -->
                                <input type="password" class="form-control" data-toggle="tooltip" data-placement="right" title="Debe de contener por lo menos una letra mayuscula, minuscula, numero y caracter especial." placeholder="Crea una nueva contraseña" aria-label="Crea una nueva contraseña" id="inputPassword">
                                <div id="passwordmessage"></div>
                                <!-- Input para verificar la contraseña que se usara -->
                                <input type="password" aria-label="Repite tu contraseña" class="form-control" placeholder="Repite la contraseña" id="repinputPassword">
                                <div id="passwordmessage2"></div>
                                <!-- Input de checkbox para aceptar los terminos y condiciones -->
                                <div><input type="checkbox" aria-label="Mostrar contraseña" id="chkShowpass"> Mostrar la contraseña</div>
                            </div>
                        </div> <br>

                        <div class="row">
                            <div class="col">
                                <!-- Select para asignar los permisos de la cuenta -->
                                <label for="roll">¿Que tipo de usuario sera?</label>
                                <select id="roll" class="form-select" aria-label="Default select example">
                                    <option selected disabled>Selecciona un tipo de usuario</option>
                                    <option value="admin">Administrador</option>
                                    <option value="collaborator">Colaborador</option>
                                </select>
                            </div>
                        </div> <br>

                        <!-- Div donde se muestran los mensajes de errores en el formulario -->
                        <div id="error-message"></div>

                        <!-- <div class="g-recaptcha" data-sitekey="6LckKJEpAAAAAMlWWM__tuSJXXdMz8lcoUpyho-o" style="margin-bottom: 10px;"></div> -->
                        <button class="btn btn-primary" id="btnRegistrer" aria-label="Registrarme">Crear nueva cuenta</button>
                </div>
            </div>

        </main>
        <!-- End Main -->

    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="bi bi-bug"></i> Reportar un error</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="https://formsubmit.co/39c053e30c8c795e1d5c5d29b1018d57" method="post">
                    <div class="modal-body" id="body-modal">
                        <!-- Correo Electronico -->
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Correo electronico</label>
                            <input type="email" name="correo" class="form-control" value="<?php echo $_SESSION['correo'] ?>" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>

                        <!-- Asunto -->
                        <div class="mb-3">
                            <label for="asuntoerror" class="form-label">¿Cual es el problema?</label>
                            <select class="form-select" aria-label="Default select example" name="asunto" id="asuntoerror">
                                <option selected disabled>Selecciona un error</option>
                                <option value="Funcionamiento lento">Funcionamiento lento</option>
                                <option value="Accion inaccesible">Accion inaccesible</option>
                                <option value="La pagina no responde">La pagina no responde</option>
                                <option value="La pagina no se actualiza">La pagina no se actualiza</option>
                                <option value="No recibo notificaciones">No recibo notificaciones</option>
                                <option value="No realiza cambios en las cotizaciones">No realiza cambios en las cotizaciones</option>
                                <option value="Otros">Otros...</option>
                            </select>
                        </div>

                        <!-- Especificacion del problema -->
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Redacta lo ocurrido</label>
                            <textarea class="form-control" name="mensaje" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>

                        <!-- Nota -->
                        <p style="font-size: 13px;">
                            <b style="color: red;">*Nota:</b> Si el problema es otros, por favor indica primero cual es.
                        </p>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn" style="background-color: #374B80; color: white;">Enviar reporte</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <!-- ApexCharts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.35.5/apexcharts.min.js"></script>
    <!-- Custom JS -->
    <script src="./assets/js/dash.js"></script>
    <!-- Script de bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <!-- Script para CDN de jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <!-- Script para CDN de sweetAlert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- Script propio del apartado -->
    <script src="./assets/js/account-management-function.js"></script>
    <!-- Script propio (para el registro del usuario) -->
    <script src="./assets/js/registrer-function.js"></script>
</body>

</html>