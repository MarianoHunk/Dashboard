//RFI TAG:driverName=HTML Widget


#setFile plugins/www/header.html
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/label.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/label.js"> </script>
#unSetFile

#setFile wwwroot/JS/label.js
#newRFIcode(_WEB/API/Widgets/Label/plugins/label.js,name=)
#unSetFile

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*RFI JSon
{
	'Nombre': 'label',
	'NombreToolBox': 'Label',
	'Tipo' : 'Widget',
	'title': 'Label',
	'html-tag': 'emic-widget-label',
	'instance': '{"component":"emic-widget-label","attributes":{}}',
}
*/