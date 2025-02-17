<?php
    header_remove('x-powered-by');
    session_start();
    //echo "** " .$_SESSION['SisCalClave'] . " **";

    
    $vinactivo = 900; // 120; // 900;

    if(isset($_SESSION['tiempo'])){
        $vida_session = time() - $_SESSION['tiempo'];
        if($vida_session > $vinactivo){
            // header("Location OpeBan00_salir.php"); //exit;
            header("Location: SisCal00_home.php");exit;
        }else{
            $_SESSION['tiempo'] = time();
        }
    }else{
        //header("Location OpeBan00_salir.php");//exit;
        header("Location: SisCal00_home.php");exit;
    }

    

    if(!isset($_SESSION['SisCalClave'])){
        header("Location SisCal00_salir.php"); //exit;
        // header("Location: SisCal00_home.php");exit;
    }else{
        // Se recuperan variables de sesion
        $usrClave     = $_SESSION['SisCalClave'];
        $usrApellidos = $_SESSION['SisCalApellidos'];
        $usrNombres   = $_SESSION['SisCalNombres'];
        $usrCurp      = $_SESSION['SisCalCurp'];
        $usrNombreC   = $_SESSION['SisCalNC'];
        $usrPuesto    = $_SESSION["SisCalPuesto"];
        $usrEsquema   = $_SESSION['SisCalEsquema'];
        $v_TituloS    = $_SESSION['SisCalTituloS'];
        $v_Error      = $_SESSION['SisCalError'];
        $v_Alias      = $_SESSION['alias'];
    }
?>
