//RFI TAG:driverName=HTML Widget



EMIC:setOutput(TARGET:plugins/www/header.html)
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/label.js"> </script>
EMIC:restoreOutput

EMIC:setOutput(TARGET:temp/header.html)
<script type="module" src="./JS/Label.js"> </script>
EMIC:restoreOutput

EMIC:setOutput(TARGET:wwwroot/JS/Label.js)
EMIC:setInput(DEV:_WEB/API/Widgets/Label/plugins/label.js)
EMIC:restoreOutput
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*RFI JSon
{
	'Nombre': 'label',
	'NombreToolBox': 'label',
	'Tipo' : 'Widget',
	'title': 'Botón sin retención',
	'html-tag': 'emic-widget-label',
}
*/
//	'instance': '{"component":"emic-widget-label","attributes":{}}',
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @fn void labelSetValue(int labelViewName,int Value)
 * @alias labelSetValue
 * @brief Set label
 * @param labelViewName labelViewName
 * @param Value Value
 * @return Nothing
 */ 

// Esta función establece el valor de un elemento de etiqueta (label) en la página web.
function labelSetValue(labelViewName, value) {
    // Verifica si 'gaugeName' contiene "/PING/" y si es así, descarta la función.
    if (labelViewName.includes('/PING/')) {
        return;
    }
    // Normaliza el nombre de la etiqueta eliminando cualquier parte antes de la última barra diagonal '/'.
    var lName = labelViewName.includes('/') ? labelViewName.substr(labelViewName.lastIndexOf('/') + 1) : labelViewName;
	console.log(lName);
    // Busca el elemento con el ID igual a 'lName'.
    var element = document.getElementById(lName);
	console.log(element);
    if (!element) {
		console.log("L-" + lName);
        element = document.getElementById("L-" + lName);
		console.log(element);
    }
    // Comprueba si se encontró un elemento con el ID 'lName'.
    if (element) {
        // Cambia el valor del atributo 'text_val' del elemento a 'value'.
        element.setAttribute('text_val', value);
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

