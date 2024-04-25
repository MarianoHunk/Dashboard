/*RFI JSon
{
	'Nombre': 'gauge',
	'NombreToolBox': 'Gauge',
	'Tipo' : 'Widget',
	'title': 'when it receives a text string on the EMIC bus',
	'InnerHTML':"
		<div id='chart_div' style='width: 400px; height: 400px;'></div>"

}
*/

EMIC:setOutput(TARGET:temp/header.html)
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"> </script>
EMIC:restoreOutput


google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

var dataGauges = google.visualization.arrayToDataTable([
		['Label', 'Value'],
		['Value', 0]
	]);

var optionsGauges = {
	width: 400, height: 400,
	redFrom: 90, redTo: 100,
	yellowFrom:75, yellowTo: 90,
	minorTicks: 5
	};

var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

chart.draw(dataGauges, optionsGauges);


	dataGauges.setValue(0, 1,  1234 / 100);
	chart.draw(dataGauges, optionsGauges);


}