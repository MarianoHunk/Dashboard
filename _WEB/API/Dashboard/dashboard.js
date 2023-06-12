//RFI TAG:driverName=HTML Widget

console.log("local_dashboard.js");

/*RFI JSon
{
	'Nombre': 'panel',
	'NombreToolBox': 'panel',
	'Tipo' : 'emic-component',
	'title': 'Dashboard panel',
	"component": "emic-dashboard",
	'instance':'{
		"parameters": [	{"value":"Tag","title":"Tag to identify the message"},
						{"value":"Msj","title":"Message"}]
		}'
}
*/
/*RFI JSon
{
	'Nombre': 'panelVert',
	'NombreToolBox': 'Vertical Panel',
	'Tipo' : 'Widget',
	'title': 'when it receives a text string on the EMIC bus',
	'html-tag': 'emic-dash-panel',
	'attributes':{'direction': 'column'}
}
*/
/*RFI JSon
{
	'Nombre': 'panelHoriz',
	'NombreToolBox': 'Horizontal Panel',
	'Tipo' : 'Widget',
	'title': 'when it receives a text string on the EMIC bus',
	'html-tag': 'emic-dash-panel',
	'attributes':{'direction': 'row'}
}
*/


#setFile plugins/www/header.html
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/dashboard.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/dashboard.js"> </script>
#unSetFile

#setFile wwwroot/JS/dashboard.js
#newRFIcode(_WEB/API/Dashboard/plugins/dashboard.js,name=)
#unSetFile
