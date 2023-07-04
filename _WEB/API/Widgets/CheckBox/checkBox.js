//RFI TAG:driverName=HTML Widget

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


#setFile plugins/www/header.html
<script type="module"  src="/dashboard/.{userName}./.{project}./.{userModule}./JS/checkBox.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/checkBox.js"> </script>
#unSetFile

#setFile wwwroot/JS/checkBox.js
#newRFIcode(_WEB/API/Widgets/CheckBox/plugins/checkBox.js,name=)
#unSetFile


/*RFI JSon
{
	'Nombre': 'chexkBoxChange',
	'NombreToolBox': 'chexkBoxChange',
	'Tipo' : 'SistemEvt',
	'title': 'when text Box change',
	'instancia':'{
		"NombreWorkBox": "Event.CheckBox.change",
		"definir":"event_textBoxChange_active",
		"parametros": [	{"value":"ChecktBox","title":"ChecktBox name "},{"value":"Value","title":"ChecktBox value"}]
		}'
}
*/