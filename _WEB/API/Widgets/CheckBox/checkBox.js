//RFI TAG:driverName=HTML Widget

#setFile plugins/www/header.html
<script type="module"  src="/dashboard/.{userName}./.{project}./.{userModule}./JS/checkBox.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/checkBox.js"> </script>
#unSetFile

#setFile wwwroot/JS/checkBox.js
#newRFIcode(_WEB/API/Widgets/CheckBox/plugins/checkBox.js,name=)
#unSetFile

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*RFI JSon
{
	'Nombre': 'checkBox',
	'NombreToolBox': 'CheckBox',
	'Tipo' : 'Widget',
	'title': 'Check Box',
	'html-tag': 'emic-widget-checkbox',
	'instance': '{"component":"emic-widget-checkbox","attributes":{}}',
}
*/

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*RFI JSon
{
	'Nombre': 'checkboxChange',
	'NombreToolBox': 'checkboxChange',
	'Tipo' : 'SistemEvt',
	'title': 'when checkbox state changes',
	'instancia':'{
		"NombreWorkBox": "Event.checkbox.change",
		"definir":"event_change_active",
		"parametros": [{"value":"Checkbox","title":"Checkbox name "},{"value":"Checked","title":"Checkbox state "}]
		}'
}
*/

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @fn void checkboxSetcheck(int chekboxId,int Value)
 * @alias checkboxSetcheck
 * @brief Set check
 * @param chekboxId chekboxId
 * @param Value Value
 * @return Nothing
 */

function checkboxSetcheck(chekboxId, Value) {
	var tName = chekboxId;
	if (chekboxId.includes('/')) {
		tName = chekboxId.substr(chekboxId.lastIndexOf('/') + 1);
	}
	var element = document.getElementById(tName);

	// Este es el 'if' que verifica si el elemento existe
	if (element) {
		element.checked = (Value == "1");
	}
	// Si el elemento no existe, se ejecuta este bloque 'else'
	else {
		// Este es el console.log que se ejecuta si el elemento no se encuentra
		console.log("Checkbox con id ", tName, " no encontrado");
	}
}

