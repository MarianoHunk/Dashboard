//RFI TAG:driverName=HTML Widget



EMIC:setOutput(TARGET:plugins/www/header.html)
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/prueba.js"> </script>
EMIC:restoreOutput

EMIC:setOutput(TARGET:temp/header.html)
<script type="module" src="./JS/prueba.js"> </script>
EMIC:restoreOutput

EMIC:setOutput(TARGET:wwwroot/JS/Prueba.js)
EMIC:setInput(DEV:_WEB/API/Widgets/Prueba/plugins/prueba.js)
EMIC:restoreOutput
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
/*xRFI JSon
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


/*xRFI JSon
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

