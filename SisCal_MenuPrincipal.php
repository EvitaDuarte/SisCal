		<link rel="stylesheet" href="css/menupt.css">
		<?php
			$v_Color= 'style="color: #ff41ae;"';
		?>

		<header>
			<img class="logoMenu" src="assets/img/logo_ine_completo_svg1200.svg" alt="INE Logo">
			<nav>
				<ul>
            		<li><a id="b_inicio"  onClick="Enviar('SisCal00_00.php');">Inicio</a></li>
            		<li id="ADM" data-esquema="ADM,ING,EGR,CHE,CAP"> 
                    	<a>Admin<b>▼</b></a>
                		<ul>
                			<hr>
                    		<li onClick="Enviar('SisCal01_01Usuarios.php');" id="a1" data-esquema="ADM">
                    			<a>Usuarios</a></li>
                    		<li onClick="Enviar('SisCal01_02Esquemas.php');" id="a2" data-esquema="ADM">
                    			<a>Esquemas</a></li>
                     		<hr>

                		</ul>
            		</li>
            		<li  id="carga" data-esquema="ADM,ING,EGR,CHE,CAP">
                    	<a>Carga<b>▼</b></a>
                        <ul>
                        	<hr>
                            <li onClick="Enviar('SisCal02_01Carga.php');">   
                            	<a>Carga</a></li>
                            <li onClick="Enviar('SisCal02_01CargaT.php');" >   
                            	<a>Carga Neteado</a></li>
							<hr>							
                        </ul>
                	</li>
 					<li>
                        <a id="b_user" data-after="Mi cuenta" style="color: #ff41ae; text-transform: uppercase;">
                            <?= substr($usrNombreC,0,20) ?>
                            <ion-icon name="arrow-dropdown" size="small" class="arrow-dropdown" id="AD-Clases"></ion-icon>
                            <img src="assets/img/usuario.png" style="position: absolute; top: 8px; right: -30px; "//>
                        </a>
                        <ul class="sub-menu-dr">
                            <li id="li-drop"><a class="b_csesion" onclick="#"><?= $usrEsquema ?></a></li>
                            <li id="li-drop"><a class="b_csesion" onClick="Enviar('SisCal00_Salir.php');">Cerrar sesión</a></li>
                        </ul>
                    </li>
                </ul>
			</nav>
			<div class="menuToggle"></div>
		</header>
<!-- Menu -->

		<div id="data_content"></div>

<!-- Menu -->
		<div class="side-bar">
    		<div class="menu-list" id="close_side" style="-webkit-tap-highlight-color: transparent;">
        		<ion-icon name="close-circle-outline"></ion-icon>
    		</div>
    		<img class="go-home" id="go-home" src="assets/img/person-at-home.png"/>
		</div>
		<!-- Menu -->

		<!-- Marca de agua SC -->
		<section class="logo_SC" id="logo_SC">
		    <a id="b_sc_logo">
		        <h1>
		            <img alt="Sistemas complementarios Logo" class="logo_sc_bn">
		        </h1>
		    </a>
		</section>
		<!-- Marca de agua CTIA -->
		<section class="logo_CTIA" id="logo_CTIA">
		    <a id="b_ctia_logo">
		        <h1>
		            <img alt="CTIA Logo" class="logo_ctia_bn">
		        </h1>
		    </a>
		</section>
		<input type="hidden" id="nomEsquema" value="<?= $usrEsquema ?>">
		<script src="js/menu_principal_.js"></script>
		
		<script type="module" src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons/ionicons.esm.js"></script> <!-- Iconos de IONICONS-->
		<script nomodule="" src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons/ionicons.js"></script><!--Iconos de IONICONS--> 
		
		<script type="text/javascript">
			function actualizarMenus() {
				// Oculta o Despliega los submenus de cada Opción principal, de acuerdo al ROL
				vEsquema = document.getElementById("nomEsquema").value.toUpperCase().substring(0,3);
				//console.log(`Esquema=${vEsquema}`);
				if (vEsquema!="ADM"){ // El administrador puede ver todo
				    document.querySelectorAll('li').forEach(function(li) {
				        var esquemas = li.getAttribute('data-esquema');
				        if (esquemas!=null){// Algunos li no tienen data-esquema
					        //console.log(`Esquema=${esquemas}`);
					        if (esquemas.includes(vEsquema)) {
					            li.style.display = 'block';
					        } else {
					            li.style.display = 'none';
					        }
					    }
				    });
				}

			}

			document.addEventListener('DOMContentLoaded', function() {
			    actualizarMenus();
			});
				
		</script>