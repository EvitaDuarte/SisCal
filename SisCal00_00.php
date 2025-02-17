<!DOCTYPE html>
<html lang="es">
<head>
    <?php
        include("SisCal_00VarSesion.php");
    ?>
    <title><?= $v_TituloS ?></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/panel_style.css">
</head>
<body>
    <input type="hidden" id="s_usuario" value="<?= $usrClave ?>">

    <div id="main_container">
            
        <?php include('SisCal_MenuPrincipal.php'); ?>

        <div id="gl-alerts"></div>

        <section class="datos-personales">
            <br><br><br>
            <h1 class="title" style="width: 70%; margin: 0 auto;"><?= $v_TituloS ?></h1>
            <div class="container-data" style="min-height: 300px;">
            </div>
            
        </section>
    </div>
    <script src="js/cerrarSesion_.js"></script>
</body>
</html>