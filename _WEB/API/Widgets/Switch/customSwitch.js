//RFI TAG:driverName=HTML Widget

/*RFI JSon
{
	'Nombre': 'switch',
	'NombreToolBox': 'Switch',
	'Tipo' : 'Widget',
	'title': 'when it receives a text string on the EMIC bus',
	'html-tag': 'emic-widget-switch'
}
*/


#setFile plugins/www/header.html
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/switch.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/switch.js"> </script>
#unSetFile

#setFile wwwroot/JS/switch.js
#newRFIcode(_WEB/API/Widgets/Switch/plugins/switch.js,name=)
#unSetFile

/*RFI JSon
{
	'Nombre': 'SwitchSetValue',
	'NombreToolBox': 'switchSetValue',
	'Tipo' : 'SistemFnc',
	'title': 'set switch value',

	'InnerHTML':"
		<div class='lineaDeCodigo' originalclass='funcion' originalid='SwitchSetValue' draggable='true' ondragstart='drag_linea(event)'>
			switch.setValue(<div class='parametroDiv'></div> , <div class='parametroDiv'></div>)
		</div>"
}
*/

function SwitchSetValue(switchName,value){
	document.getElementById(`switch-${switchName}`).value = value;
}

/*RFI JSon
{
	'Nombre': 'switchToogle',
	'NombreToolBox': 'switchToogle',
	'Tipo' : 'SistemEvt',
	'title': 'when it receives a text string on the EMIC bus',
	'instancia':'{
		"NombreWorkBox": "Event.Switch.Toogle",
		"definir":"event_switchToogle_active",
		"parametros": [	{"value":"Switch","title":"Switch name "},{"value":"Value","title":"Switch value"}]
		}'
}
*/
//function switchToogle(name,value){

//}

