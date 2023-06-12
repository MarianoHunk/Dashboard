//RFI TAG:driverName=HTML Widget

/*RFI JSon
{
	'Nombre': 'ButtonSr',
	'NombreToolBox': 'ButtonSr',
	'Tipo' : 'Widget',
	'title': 'Botón sin retención',
	'html-tag': 'emic-widget-buttonsr',
}
*/
//	'instance': '{"component":"emic-widget-buttonsr","attributes":{}}',


#setFile plugins/www/header.html
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/buttonSr.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/buttonSr.js"> </script>
#unSetFile

#setFile wwwroot/JS/ButtonSr.js
#newRFIcode(_WEB/API/Widgets/ButtonSr/plugins/buttonSr.js,name=)
#unSetFile

/*RFI JSon
{
	'Nombre': 'buttonPress',
	'NombreToolBox': 'buttonPress',
	'Tipo' : 'SistemEvt',
	'title': 'when press mouse over button',
	'instancia':'{
		"NombreWorkBox": "Event.ButtonSr.Presionado",
		"definir":"event_mousedown_active",
		"parametros": [{"value":"ChecktBox","title":"ChecktBox name "}]
		}'
}
*/


/*RFI JSon
{
	'Nombre': 'buttonRelease',
	'NombreToolBox': 'buttonRelease',
	'Tipo' : 'SistemEvt',
	'title': 'time in which the button was up in [ms], when up mouse over button',
	'instancia':'{
		"NombreWorkBox": "Event.ButtonSr.Soltado",
		"definir":"event_mousedown_active",
		"parametros": [	{"value":"ChecktBox","title":"ChecktBox name "},{"value":"TimeEndClick","title":"time in which the button was up in [ms] "}]
		}'
}
*/

