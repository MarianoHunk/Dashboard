//RFI TAG:driverName=HTML Widget

/*RFI JSon
{
	'Nombre': 'Button',
	'NombreToolBox': 'Button',
	'Tipo' : 'Widget',
	'title': 'Botón sin retención',
	'html-tag': 'emic-widget-Button',
	'instance': '{"component":"emic-widget-buttonsr","attributes":{}}',
}
*/


#setFile plugins/www/header.html
<!--script src="/JS/plugins/EMIC/web/widget/Button/button.js"> </script-->
<script src="/dashboard/.{userName}./.{project}./.{userModule}./JS/button.js"> </script>
#unSetFile

#setFile temp/header.html
<script src="./JS/button.js"> </script>
#unSetFile

#setFile wwwroot/JS/Button.js
#newRFIcode(_WEB/API/Widgets/Button/plugins/button.js,name=)
#unSetFile

