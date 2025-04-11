<!DOCTYPE html>
<html lang="es">  
    <head>
        <?php
            require_once("SisCal_00VarSesion.php"); // Pone disponible las variables de sesión
        ?>
        <meta charset="uft-8" />
        <title><?=$v_TituloS?></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-------------General Style's--------------->
        <link rel="stylesheet" href="assets/css/panel_style.css">
        <link rel="stylesheet" href="assets/css/seccion.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <body>

        <form name="Reportes" id="Reportes" method="post" enctype="multipart/form-data">
            <div id="main_container">    
                <?php include('SisCal_MenuPrincipal.php'); // Incluye el menú principal?>
                <section class="datos-personales2">
                    <h2 class="titleM">Carga</h2>
                    <div class="container-data">
                        <div class="data-form">
                            <div class="wrapper">
                                <section class="seccion_caja_despliegue" id="secCta">
                                    <div class="caja_captura">
                                        <label class="lbl_txt" for="idImportar">Opción</label>
                                         <select name="idImportar" id="idImportar" title="OpcionesCarga" onchange="impoXls();">  
                                            <option value=""       >Seleccionar</option>
                                            <option value="XlsSiga">XLS SIGA</option>
                                         </select>
                                    </div>
                                    <div class="caja_captura"></div>
                                    <div class="caja_captura">
                                        <label class="lbl_txt" for="idPasos">Estado</label>
                                        <input type="text" name="idPasos" id="idPasos" value="..................">
                                    </div>
                                </section>
                                <section class="seccion_caja" id="botones" style="display:none;">
                                    <div class="caja_captura">
                                        <div class="form-field-button_" id="grpBotones">
                                            <a class="btn_1 efecto" onclick="expoPdf();">
                                                <span>PDF</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="caja_captura" style="display: none;" id="cajaLayOut">
                                        <div class="form-field-button_" id="grpBotones">
                                            <a class="btn_1 efecto" onclick="expoXLS();">
                                                <span>LayOut Recibos</span>
                                            </a>
                                        </div>
                                    </div>
                                </section>
                                <section class="seccion_caja_despliegue_70" id="cuadriInteres">
                                    <div class="tabla-con-cuadricula">
                                        <table class="tablex" id="tablaVacia">
                                            <thead>
                                                <tr>
                                                    <th>Estructura</th>
                                                    <th>Enero</th>
                                                    <th>Febrero</th>
                                                    <th>Marzo</th>
                                                    <th>Abril</th>
                                                    <th>Mayo</th>
                                                    <th>Junio</th>
                                                    <th>Julio</th>
                                                    <th>Agosto</th>
                                                    <th>Septiembre</th>
                                                    <th>Octubre</th>
                                                    <th>Noviembre</th>
                                                    <th>Diciembre</th>
                                                </tr>
                                            </thead>
                                            <tbody id="cuerpo">
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                                <section class="seccion_caja_despliegue_70" id="cuadriRespuesta" style="display:none;">
                                    <div class="tabla-con-cuadricula">
                                        <table class="tablex" id="tablaRespuesta">
                                            <thead>
                                                <tr>
                                                    <th>Estructura</th>
                                                    <th>Enero</th>
                                                    <th>Febrero</th>
                                                    <th>Marzo</th>
                                                    <th>Abril</th>
                                                    <th>Mayo</th>
                                                    <th>Junio</th>
                                                    <th>Julio</th>
                                                    <th>Agosto</th>
                                                    <th>Septiembre</th>
                                                    <th>Octubre</th>
                                                    <th>Noviembre</th>
                                                    <th>Diciembre</th>
                                                </tr>
                                            </thead>
                                            <tbody id="cuerpoR">
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div id="loader-container" style="display:none;">
                <div id="loader">Procesando......</div>
            </div>
            <dialog id="cajaMensaje" class="dialogo">
                <div class="dialogo_header">
                    <div id="dialogo_close">X</div>
                </div>
                <hr>
                <div class="dialogo_body">
                    <p id="dialogMessage">Mensajes al usuario en lugar del alert</p>
                </div>
            </dialog>
            <dialog id="cajaRespuesta" class="dialogo">
                <div class="dialogo_header">
                    <div id="dialogo_close1">X</div>
                </div>
                <div class="dialogo_body">
                    <p id="dialogRespuesta">Mensajes al usuario en lugar del alert</p>
                </div>
                <div class="dialogo_botones">
                    <button id="btnSi" class="detalle_button1">Sí</button>
                    <button id="btnNo" class="detalle_button1">No</button>
                </div>
            </dialog>
<!--        Ingresa por LayOut _____________________________________________________            -->
            <dialog id="cajaCancelaLayOut" class="dialogo">
                <div class="dialogo_header">
                    <div id="dialogo_close3" class="claseX">&#8999;</div>
                </div>
                <hr>
                <div class="dialogo_body">
                    <div class="caja_captura">
                        <input type="file" name="ArchivoCarga_file" id="ArchivoCarga_file" class="inputF-file1" accept=".xlsx,.xls,.XLS,.XLSX" onchange="ponArchivoCarga();">
                        <label for="ArchivoCarga_file" class="inputF-label1" id="lblCarga" for="ArchivoCarga_file">
                            <i class="large material-icons space" id="input_icon">&#10697;</i>
                            <span id="input_text">
                                Seleccione Archivo de ......
                            </span>
                        </label>
                    </div>
                </div>
                <div class="dialogo_botones">
                    <button id="btnCancelaLayOut" class="detalle_button1"><span id="btn_text">Iniciar Carga</span></button>
                </div>
            </dialog>
<!--        Fin Ingresa LayOut ____________________________________________________            -->
        </form>
        <script src="js/cerrarSesion_.js"></script>
        <script src="js/rutinas_.js"></script>
        <script src="js/Carga_.js?ver=4.1"></script>
        <script src="assets/js/xlsx.mini.min.js"></script>
    </body>
</html>