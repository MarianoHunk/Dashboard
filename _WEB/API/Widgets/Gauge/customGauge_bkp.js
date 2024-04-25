//RFI TAG:driverName=HTML Widget

/*RFI JSon
{
	'Nombre': 'gauge',
	'NombreToolBox': 'Gauge',
	'Tipo' : 'Widget',
	'title': 'when it receives a text string on the EMIC bus',
	'InnerHTML':"
		<canvas class='EMIC-gauge' numerate='gauge_' onload='onLoadGauge' > </canvas>"

}
*/

EMIC:setOutput(TARGET:pluggins/www/header.html)
<script src="JS/pluggins/gauge.js"> </script>
EMIC:restoreOutput

EMIC:setOutput(TARGET:temp/header.html)
<script src="JS/gauge.js"> </script>
EMIC:restoreOutput

var myGauges = [];
function onLoadGauge(obj){
	console.log(typeof Gauge);
	var target = obj; 
	var gauge = new Gauge(target);

	//document.getElementById("preview-textfield").className = "preview-textfield";
	//gauge.setTextField(document.getElementById("preview-textfield"));

	gauge.maxValue = 3000;
	gauge.setMinValue(0); 
	gauge.set(0);
	gauge.animationSpeed = 32;

	//gauge.setOptions(opts);
	myGauges[0] = gauge;
}


var gauges = document.querySelectorAll(".EMIC-gauge");
for (i = 0; i < gauges.length ; i++)
{
	onLoadGauge(gauges[i]);
}


/*RFI JSon
{
	'Nombre': 'GaugeSetValue',
	'NombreToolBox': 'widgetSetText',
	'Tipo' : 'SistemFnc',
	'title': 'set gauge value',

	'InnerHTML':"
		<div class='lineaDeCodigo' originalclass='funcion' originalid='GaugeSetValue' draggable='true' ondragstart='drag_linea(event)'>
			gauge.setValue(<div class='parametroDiv'></div> , <div class='parametroDiv'></div>)
		</div>"
}
*/

function GaugeSetValue(gaugeName,value){
	myGauges[0].set(value);
}

