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
	'Nombre': 'checkbox',
	'NombreToolBox': 'checkbox',
	'Tipo' : 'Widget',
	'title': 'Control checkbox',
	'html-tag': 'emic-widget-checkbox',
}
*/
//	'instance': '{"component":"emic-widget-checkbox","attributes":{}}',


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

