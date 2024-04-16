<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <!-- link del script para el recaptcha de google -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <!-- Link de CSS de Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <style>
        /* Estilos que hacen centrar el contenido de la pagina */
        body {
            display: grid;
            place-content: center;
            background-color: rgba(0, 0, 0, 0.0); /* Color de fondo con transparencia */
        }

        /* Estilos que se le aplican a todo elemento label */
        label {
            color: grey;
            size: 5px;
        }

        /* Estilos para agregar borde de color rojo a los inputs cuando hay error*/
        .wrong-date {
            border-color: red;
        }

        /* Estilos para agregar borde de color naranja a los inputs cuando hay avisos*/
        .warning-date {
            border-color: orange;
        }

        /* Estilos para dar espacio entre los inputs de las contraseñas */
        .password-div {
            display: grid;
            gap: 5px;
        }
    </style>

</head>

<body>
    <!-- Formulario -->
    <form style="width: 700px;">
    <!-- Titulo del formulario -->
        <h1>Registrer</h1>
        <!-- Div con clase row para almacenar elementos en filas (Bootstrap)-->
        <div class="row">
            <!-- Div  con clase col para crear las columnas por fila (Bootstrap)-->
            <div class="col">
                <!-- Input para agregar nombres -->
                <input type="text" class="form-control" placeholder="Nombre(s)" aria-label="Ingresa tu(s) nombre(s)" id="inputNames">
            </div>
            <div class="col">
                <!-- input para agregar los apellidos -->
                <input type="text" class="form-control" placeholder="Apellidos" aria-label="Ingresa tus apellidos" id="inputLastnames">
            </div>
        </div> <br>

        <div class="row">
            <div class="col">
                <label for="inputBirthday">¿Cuando naciste?</label>
                <!-- Input para agregar la fecha de cumpleaños -->
                <input type="date" class="form-control" placeholder="Fecha de cumpleaños" aria-label="Ingresa tu fecha de nacimiento" id="inputBirthday">
            </div>
            <div class="col">
                <!-- input para ingresar el numero telefonico -->
                <input type="number" class="form-control" placeholder="Numero de celular" aria-label="Ingresa tu numero de celular" id="inputPhone">
            </div>
        </div> <br>

        <div class="row">
            <div class="col">
                <!-- Input para seleccionar el estado de procedencia -->
                <select id="inputState" class="form-select" aria-label="Ingresa tu estado de procedencia">
                    <option selected disabled>Elige tu estado...</option>
                    <option value="Aguascalientes">Aguascalientes</option>
                    <option value="Baja California">Baja California</option>
                    <option value="Baja California Sur">Baja California Sur</option>
                    <option value="Campeche">Campeche</option>
                    <option value="Chiapas">Chiapas</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Ciudad de México">Ciudad de México</option>
                    <option value="Coahuila">Coahuila</option>
                    <option value="Colima">Colima</option>
                    <option value="Durango">Durango</option>
                    <option value="Guanajuato">Guanajuato</option>
                    <option value="Guerrero">Guerrero</option>
                    <option value="Hidalgo">Hidalgo</option>
                    <option value="Jalisco">Jalisco</option>
                    <option value="Estado de México">Estado de México</option>
                    <option value="Michoacán">Michoacán</option>
                    <option value="Morelos">Morelos</option>
                    <option value="Nayarit">Nayarit</option>
                    <option value="Nuevo León">Nuevo León</option>
                    <option value="Oaxaca">Oaxaca</option>
                    <option value="Puebla">Puebla</option>
                    <option value="Querétaro">Querétaro</option>
                    <option value="Quintana Roo">Quintana Roo</option>
                    <option value="San Luis Potosí">San Luis Potosí</option>
                    <option value="Sinaloa">Sinaloa</option>
                    <option value="Sonora">Sonora</option>
                    <option value="Tabasco">Tabasco</option>
                    <option value="Tamaulipas">Tamaulipas</option>
                    <option value="Tlaxcala">Tlaxcala</option>
                    <option value="Veracruz">Veracruz</option>
                    <option value="Yucatán">Yucatán</option>
                    <option value="Zacatecas">Zacatecas</option>
                </select>
            </div>
            <div class="col">
                <!-- Input para agregar el municipio de procedencia -->
                <input type="text" class="form-control" placeholder="Municipio" aria-label="Ingresa tu municipio" id="inputMunicipality">
            </div>
        </div> <br>

        <div class="row">
            <div class="col">
                <!-- Input para agregar la colonia de procedencia -->
                <input type="text" class="form-control" placeholder="Colonia" aria-label="Ingresa tu colonia" id="inputCologne">
            </div>

            <div class="col">
                <!-- Input para agregar en codigo postal  -->
                <input type="number" class="form-control" placeholder="Codigo postal" aria-label="Ingresa tu codigo postal" id="inputMailcode">
            </div>
        </div> <br>

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

        <!-- Div donde se muestran los mensajes de errores en el formulario -->
        <div id="error-message"></div>


        <p> <input type="checkbox" id="termscondi" aria-label="Acepto los terminos y condiciones"> Estoy deacuerdo con los <a href="">Terminos y condiciones</a>.</p>
        <!-- <div class="g-recaptcha" data-sitekey="6LckKJEpAAAAAMlWWM__tuSJXXdMz8lcoUpyho-o" style="margin-bottom: 10px;"></div> -->
        <button class="btn btn-primary" id="btnRegistrer" aria-label="Registrarme">Registrarme</button>


    </form>

    <!-- CND de script de Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <!-- CND de script de jQuery -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <!-- CND de script de SweetAlert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Script propio -->
    <script src="./assets/js/registrer-function.js"></script>
</body>

</html>