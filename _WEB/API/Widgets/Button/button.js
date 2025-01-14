//RFI TAG:driverName=HTML Widget



EMIC:setOutput(TARGET:plugins/www/header.html)
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/button.js"> </script>
EMIC:restoreOutput

EMIC:setOutput(TARGET:temp/header.html)
<script type="module" src="./JS/button.js"> </script>
EMIC:restoreOutput

EMIC:setOutput(TARGET:wwwroot/JS/Button.js)
EMIC:setInput(DEV:_WEB/API/Widgets/Button/plugins/button.js)
EMIC:restoreOutput
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*RFI JSon
{
	'Nombre': 'Button',
	'NombreToolBox': 'Button',
	'Tipo' : 'Widget',
	'title': 'Botón sin retención',
	'html-tag': 'emic-widget-button',
}
*/
//	'instance': '{"component":"emic-widget-button","attributes":{}}',
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Eventos
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*RFI JSon
{
	'Nombre': 'buttonPress',
	'NombreToolBox': 'buttonPress',
	'Tipo' : 'SistemEvt',
	'title': 'when press mouse over button',
	'instancia':'{
		"NombreWorkBox": "Event.Button.Presionado",
		"definir":"event_mousedown_active",
		"parametros": [{"value":"Button","title":"Button name "}]
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
		"NombreWorkBox": "Event.Button.Soltado",
		"definir":"event_mousedown_active",
		"parametros": [	{"value":"ChecktBox","title":"ChecktBox name "},{"value":"TimeEndClick","title":"time in which the button was up in [ms] "}]
		}'
}
*/

