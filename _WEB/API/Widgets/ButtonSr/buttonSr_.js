//RFI TAG:driverName=HTML Widget

/*RFI JSon
{
	'Nombre': 'ButtonSr',
	'NombreToolBox': 'ButtonSr',
	'Tipo' : 'Widget',
	'title': 'Botón sin retención',
	'html-tag': 'emic-widget-ButtonSr',
	'instance': '{"component":"emic-widget-buttonsr","attributes":{}}',
}
*/


#setFile plugins/www/header.html
<!--script src="/JS/plugins/EMIC/web/widget/ButtonSr/buttonSr.js"> </script-->
<script src="/dashboard/.{userName}./.{project}./.{userModule}./JS/buttonSr.js"> </script>
#unSetFile

#setFile temp/header.html
<script src="./JS/buttonSr.js"> </script>
#unSetFile

#setFile wwwroot/JS/ButtonSr.js
#newRFIcode(_WEB/API/Widgets/ButtonSr/plugins/buttonSr.js,name=)
#unSetFile

