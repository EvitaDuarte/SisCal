/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Autor   		: Miguel Ángel Bolaños Guillén        	*
 * Sistema 		: Sistema de Calendario Saldos       	*
 * Fecha   		: Febrero 2025                       	*
 * Descripción 	: Carga Archivo XLS para eliminar  		* 
 *                negativos				           		*
 *                						           		*
  *                						           		*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
var cPhp      	 = "Carga_.php";	// En este php estarán las funciones que se invocaran desde este JS
var dHoy	  	 = "";					// fecha de Hoy que regresa el servidor
var gTabla	  	 = "";					// Tabla HTML que se esta visualizando
var gForma	  	 = "";
var cPag 	  	 = "-1";				// Inicialización páginado servidor
var funPagina 	 = ""					// Función que tendrá que ejecutar nextpage
var dHoy	  	 = ""
var pagCta	  	 = "";					// Guarda la cuenta Bancaria para el paginado
var lTurno	  	 = false;
var lOkCheque 	 = 0;					// Error en los rangos de cheque
var gLongChe  	 = 8;
var gResultLines = [];					// Arreglo global g
var gOfcCtasInt	 = "";					// 
var gCtasUrs	 = "";
var gRepo		 = 0;
var gAnio		 = "";

window.onload = function () {		// Función que se ejecuta al cargar la página HTML que invoca a Consultas.js
	// Se obtiene el nombre del archivo que lo invoca
	var loc     = window.location;
    var cHtml 	= loc.pathname.substring(loc.pathname.lastIndexOf('/') + 1);
    //con sole.log(`cHtml[${cHtml}]`);
	// Casos en que se rquiere cargar información, antes de la captura del usuario
	// Por eso se pregunta por el nombre del archivo que invoca este JavaScript
	switch(cHtml){
		// ______________________________________
		case "SisCal02_01CargaT.php":
			//aDatos = {
			//	opcion 	: "CargaCuentasBancarias0"
			//};
			// Esta función esta en rutinas_.js e invoca a la función procesarRespuesta__ que esta en este archivo
			//con sole.log(`Va a ejecutar ${cHtml} ${cPhp} ${aDatos}`)
			//conectayEjecutaPost(aDatos,cPhp,null);
		break;
		// __________________________________________________________________________________

		// __________________________________________________________________________________
		// __________________________________________________________________________________
		default:
			mandaMensaje("No esta codificado el init de "+cHtml);
		break;

	}
	// __________________________________________

	// __________________________________________
}
// ********************************************************************************
// __________________________REGRESOS DE PHP _____________________________________
async function procesarRespuesta__(vRes) {		
	cOpc = vRes.opcion.opcion;					// Es como se recupera en PHP la opción 
    //con sole.log(`cOpc=[${cOpc}]`);
    switch(cOpc) {
    	// _____________________________________________
    	case "SisCal02_01Carga":
		break;
    	// _____________________________________________
    	case "SisCal02_01CargaT":
		break;
    	// _____________________________________________
		// _____________________________________________
		// _____________________________________________
		// _____________________________________________
		// _____________________________________________
		default:
			mandaMensaje("No esta codificado el regreso JS de [" + cOpc +"]" );
		break;
		// _____________________________________________
    }
}
// __________________________REGRESOS DE PHP ______________________________________
async function procesarError__(vRes) {		
	cOpc = vRes.opcion.opcion;					// Es como se recupera en PHP la opción 
    //con sole.log(`cOpc=${cOpc}`);
    switch(cOpc) {
		case "existeCheque":
		break;
    }
}
// __________________________REGRESOS DE PHP ______________________________________
// ________________________________________________________________________________
const refrescaPantalla = () =>{

}
// ________________________________________________________________________________
// ________________________________________________________________________________
const impoXls = () =>{
	cOpc = document.getElementById("idImportar").value
	switch(cOpc){
		// _____________________________
		case "":
		break;
		// _____________________________
		case "XlsSiga":
			cMes = document.getElementById("idMes").value
			if (cMes==""){
				document.getElementById("idImportar").value = "";
				mandaMensaje("Se requiere mes de ajuste");
			}else{
				document.getElementById('ArchivoCarga_file').value = "";
				document.getElementById("input_text").textContent = "Seleccione Archivo de SIGA";
				archivoLayOut(cOpc,"Calendario");
			}
		break;
		// _____________________________
		// _____________________________
	}
}
// ________________________________________________________________________________
async function archivoLayOut(cOpc,cTit){	// Solicita arcXlsSigahivo de layOut
	solicitaArchivoLayOut().then((respuesta) => {
		if (respuesta){ // Segun yo siempre regresa true
			var input1_file = document.getElementById('ArchivoCarga_file');
			if (input1_file.files.length >0){
				var oFile		= input1_file.files[0];
				cFile 			= oFile.name;
				
				esperaRespuesta(`Desea iniciar carga de ${cTit} de ${cFile} `).then((respuesta) => {
					if (respuesta){
						const reader  = new FileReader();
						reader.onload = async function (e) {
						    actualizarPaso("Cargando");await esperarFrame(); 
							const arrayBuffer  = e.target.result;
							if (cOpc==="XlsSiga"){
								 procesarXlsx(arrayBuffer, cOpc);
							}
						};
						if (cOpc=="CsvSiga" || cOpc=="Respuesta"){ // Usar para txt o csv
							reader.readAsText(oFile, 'UTF-8');
						}else if (cOpc=="XlsSiga" ){ // Usar para un XLS
							reader.readAsArrayBuffer(oFile);
						}
					}
				});
			}else{
				mandaMensaje("No se ha seleccionado archivo");
				document.getElementById("idExportar").value = "";
			}
		}
	});
}
// ________________________________________________________________________________
async function procesarXlsx(arrayBuffer, cOpc) {
    // Usamos la librería xlsx.mini.min.js para leer el archivo binario
    actualizarPaso("Cargando XLS");await esperarFrame(); 
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
	actualizarPaso("Hoja XLS");await esperarFrame();
    // Acceder a la primera hoja del archivo XLSX
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    if (cOpc === "XlsSiga") {
		datos = [];
	    // Convertir la hoja de cálculo a formato JSON
	    //const jsonData = XLSX.utils.sheet_to_json(sheet);
	    actualizarPaso("Convirtiendo");await esperarFrame(); 
		jsonData = XLSX.utils.sheet_to_json(sheet, { header: ['PERIOD_NAME','ESTRUCTURA', 'MONTO'], defval: null });

	    actualizarPaso("Filtrando Cap 1000");await esperarFrame(); 
	    datos = s2Filtra1000(jsonData);
		jsonData = null; // liberar memoria
 		console.log("Datos",datos);

		// Creamos un objeto donde guardaremos la información organizada por clave
	    let resultado = [];
	    // Iteramos sobre los datos
	    actualizarPaso("Vertical a Horizontal");await esperarFrame(); 
	    resultado	= s3Horizontal(datos);
	    datos		= null;
	    console.log ("horizontal",resultado)
	    
	    actualizarPaso("Completando Meses");await esperarFrame(); 
	    s4CompletaMeses(resultado); // resultado se pasa por referencia

	    // Ordenamos el arreglo por la propiedad 'clave'
	    actualizarPaso("Ordenando");await esperarFrame(); 
	    s5Ordena(resultado);

	    actualizarPaso("Neteo");await esperarFrame();
	    s6Neteo(resultado,cMes)

	    actualizarPaso("Quitando Positivos");await esperarFrame(); 
	    resultado1	= s7QuitaPositivos(resultado);
	    resultado	= null;

		//console.clear();
		console.log("Sin negativos",resultado1);
		
		actualizarPaso("Copiando");await esperarFrame(); 
		resultado2 = JSON.parse(JSON.stringify(resultado1));
		console.log("Copia Resultados",resultado2);

	    actualizarPaso("Poblando");	await esperarFrame(); 
		s8poblarTabla(resultado2);

		actualizarPaso("Quitando Saldos negativos");await esperarFrame();
		aRes = s9procesarResultados(resultado2);
		console.log(aRes)

		console.log("Antes de XLS",resultado1);
		actualizarPaso("Generando XLS");await esperarFrame();
		s10GeneraXls(aRes,resultado1,resultado2);

		actualizarPaso("FIN");await esperarFrame();
		document.getElementById("idImportar").value = "";
	}
}
// ________________________________________________________________________________
/* function procesarXlsSiga(resultado) {
	poblarTabla(resultado);
} */
// ________________________________________________________________________________
const buscaMes = (cPeriodo) =>{
	const meses = { 
		"ENE": "01", "FEB": "02",  "MAR": "03",  "ABR": "04", 
	    "MAY": "05", "JUN": "06",  "JUL": "07",  "AGO": "08",
	    "SEP": "09", "OCT": "10",  "NOV": "11",  "DIC": "12"
	};

	const cP = cPeriodo.substr(0, 3);
	return meses[cP] || "--"; 
}
// ________________________________________________________________________________
const buscaPeriodo = (cMes) =>{
	const periodo = {
	    "01": "ENE", "02": "FEB", "03": "MAR", "04": "ABR", "05": "MAY",
	    "06": "JUN", "07": "JUL", "08": "AGO", "09": "SEP", "10": "OCT",
	    "11": "NOV", "12": "DIC"
	};
	return periodo[cMes] || "--";
}
// ________________________________________________________________________________
function actualizarPaso(mensaje) {
    document.getElementById("idPasos").value = mensaje;
    document.getElementById("idPasos").dispatchEvent(new Event('input')); // Para actualizar si es un textarea
}
// ________________________________________________________________________________
function esperarFrame() {
    return new Promise(resolve => requestAnimationFrame(resolve));
}
// ________________________________________________________________________________
/*

const completarMeses = (arr) => {
	const meses = ['01', '02', '03', '04', '05', '06','07','08','09','10','11','12'];
	console.log(arr);
	return arr.map(item => {
		// Creamos un objeto con todos los posibles meses e inicializamos con 0
		let nuevoItem = {
			...item,
			...meses.reduce((acc, mes) => {
				if (!item[`importe_${mes}`]) {
					acc[`importe_${mes}`] = 0;
				}
				return acc;
			}, {})
		};
		return nuevoItem;
	});
}; */

// ________________________________________________________________________________

// ________________________________________________________________________________
function s2Filtra1000(jsonData){
	datos = [];
	jsonData.forEach(estru => {
		cClave = estru.ESTRUCTURA;
		if (cClave!=="ESTRUCTURA" && cClave!==null){
			gAnio = estru.PERIOD_NAME.trim().slice(-4);
  			if (cClave.substr(42,1)!=1){ // quitar capitulo mil
  				cMes = buscaMes(estru.PERIOD_NAME);
  				datos.push({clave:cClave,mes:cMes,importe:estru.MONTO,estatus:"N"})
  			}
  		}
	});
	return datos;
}
// ________________________________________________________________________________
function s3Horizontal(datos){
	let resultado = [];
    datos.forEach(item => {
        // Buscamos si ya existe la clave en el resultado
        let claveExistente = resultado.find(r => r.clave === item.clave);

        if (!claveExistente) {
            // Si la clave no existe, la agregamos con la estructura inicial
            claveExistente = { clave: item.clave };
            resultado.push(claveExistente);
        }

        // Agregamos el importe al mes correspondiente
        const mes = `importe_${item.mes.padStart(2, '0')}`;
        if (!claveExistente[mes]) {
			claveExistente[mes] = Math.round(item.importe * 100) / 100;  // Redondea a 2 decimales
		} else {
			claveExistente[mes] = Math.round((parseFloat(claveExistente[mes]) + item.importe) * 100) / 100;  // Redondea después de sumar
		}
    });
    return resultado;
}
// ________________________________________________________________________________
function s4CompletaMeses(resultado){
	// Ahora se llenan los huecos de los meses que no existen
    resultado.forEach(item => {
        // Iteramos por los meses de enero a diciembre
        for (let mes = 1; mes <= 12; mes++) {
            const mesFormateado = `importe_${String(mes).padStart(2, '0')}`;
            if (!item[mesFormateado]) {
                item[mesFormateado] = 0.00;  // Se asigna mes faltante
            }
        }
    });
}
// ________________________________________________________________________________
function s5Ordena(resultado){
	resultado.sort((a, b) => {
	    if (a.clave < b.clave) {
	        return -1;
	    }
	    if (a.clave > b.clave) {
	        return 1;
	    }
	    return 0;
	});
}
// ________________________________________________________________________________
function s6Neteo(resultados1,mes){
	// Recorremos cada objeto del array resultados1
    resultados1.forEach((resultado) => {
        let sumaAcumulada = 0.00; // Reiniciar la suma acumulada por cada objeto
        //console.log("resultado",resultado);
        // Iteramos desde enero hasta el mes seleccionado
        for (let i = 1; i <= mes; i++) {
            // Tomamos el importe correspondiente para el mes i
            let cMes    = `importe_${i < 10 ? '0' + i : i}`
            let importe = resultado[cMes];

            // console.log(i,cMes,importe)
            // Acumulamos el importe
            sumaAcumulada = sumaAcumulada + importe;

            // Si la suma acumulada es cero, setear los importes hasta ese mes a cero
            if (sumaAcumulada.toFixed(2) == '0.00') {
                for (let j = 1; j <= i; j++) {
                    resultado[`importe_${j < 10 ? '0' + j : j}`] = 0;
                }
                sumaAcumulada = 0.00
            }
        }
    });

    // return resultados1; Al ser un array se manda por referencia 
}
// ________________________________________________________________________________
function s7QuitaPositivos(resultado){
	resultado1 = resultado.filter(objeto => {
		// Extraer los valores de los importes de enero a diciembre
		const importes = Object.values(objeto).slice(1); // silce(1) indica Omitir la clave

		// Verificar si todos los importes son positivos o ceros
		const todosPositivos = importes.every(importe => importe >= 0);

		// Calcular la suma de los importes , el 0 indica que asigne el valor inicial de 0 a acc
		const suma = importes.reduce((acc, importe) => acc + importe, 0);

		// Eliminar objetos si todos los importes son positivos o si la toda la suma es negativa
		return !(todosPositivos || suma <= 0);
	});
	return resultado1;
}
// ________________________________________________________________________________
// Función para poblar la tabla con los datos del arreglo
function s8poblarTabla(resultado) {
	const cuerpoTabla = document.getElementById("cuerpo");
	// Limpiar el cuerpo de la tabla antes de agregar nuevas filas
    cuerpoTabla.innerHTML = "";  // Esto borra todo el contenido del cuerpo de la tabla
    // Recorrer cada objeto en el arreglo 'resultado'
    resultado.forEach(item => {
        // Crear una nueva fila de la tabla
        const fila = document.createElement("tr");

        // Crear una celda para la clave
        const celdaClave = document.createElement("td");
        celdaClave.textContent = item.clave;
        fila.appendChild(celdaClave);

        // Crear celdas para cada mes (importe_01, importe_02, ..., importe_12)
        for (let i = 1; i <= 12; i++) {
            const celda = document.createElement("td");
            // Crear el nombre de la propiedad con el formato correcto
            const mesFormateado = i < 10 ? `importe_0${i}` : `importe_${i}`;
            celda.textContent = item[mesFormateado];  // Importes como 'importe_01', 'importe_02', etc.
            fila.appendChild(celda);
        }

        // Agregar la fila al cuerpo de la tabla
        cuerpoTabla.appendChild(fila);
    });
}
// ________________________________________________________________________________
function s9procesarResultados(resultado1) {
    const AmpRedu = []; // Este es el arreglo donde se guardarán las ampliaciones y reducciones.

    // Recorrer cada renglón en el arreglo resultado1
    for (let i = 0; i < resultado1.length; i++) {
        let renglon = resultado1[i];
        
        // Seguir buscando y compensando negativos mientras los haya
        let saldoRestante = 0;

        for (let mesNum = 12; mesNum >0; mesNum--) { // Recorrer de enero (1) a diciembre (12)
            let mes = `importe_${String(mesNum).padStart(2, '0')}`;

            // Si el mes tiene un importe negativo, intentamos compensarlo
            if (renglon[mes] < 0) {
                saldoRestante = -renglon[mes]; // Tomamos el valor negativo como saldo a compensar

                // Crear una ampliación por el saldo negativo (lo convertimos a positivo)
                AmpRedu.push({
                    clave	: renglon.clave,
                    tipo	: 'A',
                    importe	: saldoRestante,
                    mes		: mes.substr(8,2)
                });

                // Ponemos el importe del mes a 0, porque ya hemos tomado el saldo
                renglon[mes] = 0;

                // Buscar primero en los meses anteriores (de mayo a enero si el negativo es en junio)
                for (let j = mesNum - 1; j >= 1; j--) { // Buscamos desde el mes anterior hacia enero
                    let mesAnterior = `importe_${String(j).padStart(2, '0')}`;
                    if (renglon[mesAnterior] > 0 && saldoRestante > 0) {
                        let montoCompensado = Math.min(renglon[mesAnterior], saldoRestante);

                        // Crear la reducción por el monto compensado
                        AmpRedu.push({
                            clave			: renglon.clave,
                            tipo			: 'R',
                            importe			: montoCompensado,
                            mes				: mesAnterior.substr(8,2)
                        });

                        // Reducir el saldo restante
                        saldoRestante -= montoCompensado;

                        // Restar el importe compensado de ese mes
                        //renglon[mesAnterior] -= montoCompensado;
                        renglon[mesAnterior] = parseFloat((renglon[mesAnterior] - montoCompensado).toFixed(2));

                        // Si ya no queda saldo por compensar, salimos del bucle
                        if (saldoRestante <= 0) break;
                    }
                }

                // Si aún queda saldo restante, buscar en los meses posteriores (de julio a diciembre)
                if (saldoRestante > 0) {
                    for (let j = mesNum + 1; j <= 12; j++) { // Desde el mes siguiente hacia diciembre
                        let mesPosterior = `importe_${String(j).padStart(2, '0')}`;
                        if (renglon[mesPosterior] > 0 && saldoRestante > 0) {
                            let montoCompensado = Math.min(renglon[mesPosterior], saldoRestante);

                            // Crear la reducción por el monto compensado
                            AmpRedu.push({
                                clave			: renglon.clave,
                                tipo			: 'R',
                                importe			: montoCompensado,
                                mes				: mesPosterior.substr(8,2)
                            });

                            // Reducir el saldo restante
                            saldoRestante -= montoCompensado;

                            // Restar el importe compensado de ese mes
                            //renglon[mesPosterior] -= montoCompensado;
                            renglon[mesPosterior] = parseFloat((renglon[mesPosterior] - montoCompensado).toFixed(2));

                            // Si ya no queda saldo por compensar, salimos del bucle
                            if (saldoRestante <= 0) break;
                        }
                    }
                }

                // Si ya no hay saldo pendiente por compensar, no seguimos buscando
                if (saldoRestante <= 0) {
                    //mesNum--; // Volver al mismo mes para seguir buscando otro negativo
                }
            }
        }
    }
    return { resultado1, AmpRedu };
}
// ________________________________________________________________________________
function s10GeneraXls(aRes,resultado1,resultado2){
// Crear un nuevo libro de Excel
	const wb = XLSX.utils.book_new();
	

	// Convertir el arreglo de objetos a una matriz de matrices
	//const resultado1Array = resultado1.map(item => Object.values(item));	
	// Se debe especificar cada columna en el orden deseado	
	const cabeza = ["ESTRUCTURA","ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
	const resultado1Array = [
		cabeza,  
		...resultado1.map(item => {
			return [
			    item.clave,
			    item.importe_01,
			    item.importe_02,
			    item.importe_03,
			    item.importe_04,
			    item.importe_05,
			    item.importe_06,
			    item.importe_07,
			    item.importe_08,
			    item.importe_09,
			    item.importe_10,
			    item.importe_11,
			    item.importe_12
			];
		})
	];
	resultado1 = null;

	const resultado2Array = [
		cabeza,  
		...aRes.resultado1.map(item => {
			return [
			    item.clave,
			    item.importe_01,
			    item.importe_02,
			    item.importe_03,
			    item.importe_04,
			    item.importe_05,
			    item.importe_06,
			    item.importe_07,
			    item.importe_08,
			    item.importe_09,
			    item.importe_10,
			    item.importe_11,
			    item.importe_12
			];
		})
	];
	resultado2 = null;

	const encabezado = ["CALENDARIO", "INE", "UR", "CTA", "SCTA", "AI", "PP", "SPG", "PY", "PTDA", "AMPLIACION", "REDUCCION"];
	const resultado3Array = [
		encabezado,  // Insertamos el encabezado como el primer renglón
		...aRes.AmpRedu.map(item => {
		    // Desglosar la clave
		    const clavePartes = item.clave.split("-");
		    
		    // Obtener el mes correspondiente
		    const mesNombre =buscaPeriodo(item.mes);
		    
		    // Construir el array de resultados con valores según el tipo y mes
		    return [
		        mesNombre+"-"+gAnio,   // El mes en formato abreviado
		        ...clavePartes.slice(0, 9),  // Partes de la clave
		        item.tipo === "A" ? item.importe : 0.00,  // Importe según tipo
		        item.tipo === "R" ? item.importe : 0.00   // Importe según tipo
		    ];
		})
	]; aRes = null;

	//const resultado3Array = aRes.AmpRedu.map(item => Object.values(item));		aRes	   = null;




	// Añadir las hojas
	XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(resultado1Array), 'Resultados 1');
	XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(resultado2Array), 'Resultados 2');
	XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(resultado3Array), 'AmpRedu');
	// Generar el archivo Excel y descargarlo
	XLSX.writeFile(wb, 'resultados.xlsx');
	console.log("Despues XLS",resultado1Array);
}
// ________________________________________________________________________________
// ________________________________________________________________________________