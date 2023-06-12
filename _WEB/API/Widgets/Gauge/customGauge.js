//RFI TAG:driverName=HTML Widget

/*RFI JSon
{
	'Nombre': 'gauge',
	'NombreToolBox': 'Gauge',
	'Tipo' : 'Widget',
	'title': 'when it receives a text string on the EMIC bus',
	'html-tag': 'emic-widget-gauge',
}
*/


#setFile plugins/www/header.html
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/gauge.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/gauge.js"> </script>
#unSetFile

#setFile wwwroot/JS/gauge.js
#newRFIcode(_WEB/API/Widgets/Gauge/plugins/gauge.js,name=)
#unSetFile

/*RFI JSon
{
	'Nombre': 'GaugeSetValue',
	'NombreToolBox': 'GaugeSetValue',
	'Tipo' : 'SistemFnc',
	'title': 'set gauge value',

	'InnerHTML':"
		<div class='lineaDeCodigo' originalclass='funcion' originalid='GaugeSetValue' draggable='true' ondragstart='drag_linea(event)'>
			gauge.setValue(<div class='parametroDiv'></div> , <div class='parametroDiv'></div>)
		</div>"
}
*/

function GaugeSetValue(gaugeName,value){
	var gName = gaugeName;
	if ( gaugeName.includes('/')){
		gName = gaugeName.substr(gaugeName.lastIndexOf('/')+1);
	}
	
	
	document.getElementById(gName).value = value;
}

