//RFI TAG:driverName=HTML Widget



EMIC:setOutput(TARGET:plugins/www/header.html)
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/icon.js"> </script>
EMIC:restoreOutput

EMIC:setOutput(TARGET:temp/header.html)
<script type="module" src="./JS/icon.js"> </script>
EMIC:restoreOutput

EMIC:setOutput(TARGET:wwwroot/JS/icon.js)
EMIC:setInput(DEV:_WEB/API/Widgets/Icon/plugins/icon.js)
EMIC:restoreOutput

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*xRFI JSon
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
/**
 * @fn void IconSetValue(int IconName,int value)
 * @alias IconSetValue
 * @brief Icon value
 * @param IconName IconName
 * @param value value
 * @return Nothing
 */ 

function IconSetValue(IconName,value){
	document.getElementById(IconName).value = value;
}