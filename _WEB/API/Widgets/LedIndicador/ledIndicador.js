//RFI TAG:driverName=HTML Widget

/*RFI JSon
{
	'Nombre': 'ledIndicador',
	'NombreToolBox': 'LedIndicador',
	'Tipo' : 'Widget',
	'title': 'Led Indicador',
	'html-tag': 'emic-widget-ledindicador',
}
*/

//	

EMIC:setOutput(TARGET:plugins/www/header.html)
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/ledIndicador.js"> </script>
EMIC:restoreOutput

EMIC:setOutput(TARGET:temp/header.html)
<script type="module" src="./JS/ledIndicador.js"> </script>
EMIC:restoreOutput

EMIC:setOutput(TARGET:wwwroot/JS/ledIndicador.js)
EMIC:setInput(DEV:_WEB/API/Widgets/LedIndicador/plugins/ledIndicador.js)
EMIC:restoreOutput

/*RFI JSon
{
	'Nombre': 'LedIndicadorSetValue',
	'NombreToolBox': 'LedIndicadorSetValue',
	'Tipo' : 'SistemFnc',
	'title': 'set Text Box value',

	'InnerHTML':"
		<div class='lineaDeCodigo' originalclass='funcion' originalid='LedIndicadorSetValue' draggable='true' ondragstart='drag_linea(event)'>
			LedIndicador.setValue(<div class='parametroDiv'></div> , <div class='parametroDiv'></div>)
		</div>"
}
*/

function LedIndicadorSetValue(LedIndicadorName, Value) {
    var tName = LedIndicadorName;
    if (LedIndicadorName.includes('/')) {
        tName = LedIndicadorName.substr(LedIndicadorName.lastIndexOf('/') + 1);
    }
    var element = document.getElementById(tName);
    if (element) {
        // Si el elemento existe, le asigna el valor 'Value' a su atributo 'state'
        element.setAttribute('state', Value);
    } 
    else {
        console.log("Led Indicador con id ", tName, " no encontrado");
    }
}



