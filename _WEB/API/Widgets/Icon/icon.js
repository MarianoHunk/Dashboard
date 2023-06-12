//RFI TAG:driverName=HTML Widget

/*RFI JSon
{
	'Nombre': 'icon',
	'NombreToolBox': 'Icon',
	'Tipo' : 'Widget',
	'title': 'Text Box',
	'html-tag': 'emic-widget-icon',
	'instance': '{"component":"emic-widget-icon","attributes":{}}',
}
*/


#setFile plugins/www/header.html
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/icon.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/icon.js"> </script>
#unSetFile

#setFile wwwroot/JS/icon.js
#newRFIcode(_WEB/API/Widgets/Icon/plugins/icon.js,name=)
#unSetFile

/*RFI JSon
{
	'Nombre': 'IconSetValue',
	'NombreToolBox': 'IconSetValue',
	'Tipo' : 'SistemFnc',
	'title': 'Icon',

	'InnerHTML':"
		<div class='lineaDeCodigo' originalclass='funcion' originalid='IconSetValue' draggable='true' ondragstart='drag_linea(event)'>
			icon.setValue(<div class='parametroDiv'></div> , <div class='parametroDiv'></div>)
		</div>"
}
*/

function IconSetValue(IconName,value){
	document.getElementById(IconName).value = value;
}


/*RFI JSon
{
	'Nombre': 'iconChange',
	'NombreToolBox': 'iconChange',
	'Tipo' : 'SistemEvt',
	'title': 'when text Box change',
	'instancia':'{
		"NombreWorkBox": "Event.Icon.Change",
		"definir":"event_iconChange_active",
		"parametros": [	{"value":"Icon","title":"Icon name "},{"value":"Value","title":"Icon value"}]
		}'
}
*/