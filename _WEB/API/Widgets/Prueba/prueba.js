//RFI TAG:driverName=HTML Widget



#setFile plugins/www/header.html
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/prueba.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/prueba.js"> </script>
#unSetFile

#setFile wwwroot/JS/Prueba.js
#newRFIcode(_WEB/API/Widgets/Prueba/plugins/prueba.js,name=)
#unSetFile
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*RFI JSon
{
	'Nombre': 'Prueba',
	'NombreToolBox': 'Prueba',
	'Tipo' : 'Widget',
	'title': 'Botón sin retención',
	'html-tag': 'emic-widget-prueba',
}
*/
//	'instance': '{"component":"emic-widget-prueba","attributes":{}}',
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Eventos
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*RFI JSon
{
	'Nombre': 'buttonPress',
	'NombreToolBox': 'buttonPress',
	'Tipo' : 'SistemEvt',
	'title': 'when press mouse over prueba',
	'instancia':'{
		"NombreWorkBox": "Event.Prueba.Presionado",
		"definir":"event_mousedown_active",
		"parametros": [{"value":"Prueba","title":"Prueba name "}]
		}'
}
*/


/*RFI JSon
{
	'Nombre': 'buttonRelease',
	'NombreToolBox': 'buttonRelease',
	'Tipo' : 'SistemEvt',
	'title': 'time in which the prueba was up in [ms], when up mouse over prueba',
	'instancia':'{
		"NombreWorkBox": "Event.Prueba.Soltado",
		"definir":"event_mousedown_active",
		"parametros": [	{"value":"ChecktBox","title":"ChecktBox name "},{"value":"TimeEndClick","title":"time in which the prueba was up in [ms] "}]
		}'
}
*/

