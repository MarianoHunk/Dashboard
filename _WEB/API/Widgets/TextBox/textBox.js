//RFI TAG:driverName=HTML Widget

/*RFI JSon
{
	'Nombre': 'textBox',
	'NombreToolBox': 'TextBox',
	'Tipo' : 'Widget',
	'title': 'Text Box',
	'html-tag': 'emic-widget-textbox',
	'instance': '{"component":"emic-widget-textbox","attributes":{}}',
}
*/


#setFile plugins/www/header.html
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/textBox.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/textBox.js"> </script>
#unSetFile

#setFile wwwroot/JS/textBox.js
#newRFIcode(_WEB/API/Widgets/TextBox/plugins/textBox.js,name=)
#unSetFile

/*RFI JSon
{
	'Nombre': 'TextBoxSetValue',
	'NombreToolBox': 'TextBoxSetValue',
	'Tipo' : 'SistemFnc',
	'title': 'set Text Box value',

	'InnerHTML':"
		<div class='lineaDeCodigo' originalclass='funcion' originalid='TextBoxSetValue' draggable='true' ondragstart='drag_linea(event)'>
			textBox.setValue(<div class='parametroDiv'></div> , <div class='parametroDiv'></div>)
		</div>"
}
*/

function TextBoxSetValue(TextBoxName,Value){
	document.getElementById(TextBoxName).value = Value;
}


/*RFI JSon
{
	'Nombre': 'textBoxChange',
	'NombreToolBox': 'textBoxChange',
	'Tipo' : 'SistemEvt',
	'title': 'when text Box change',
	'instancia':'{
		"NombreWorkBox": "Event.TextBox.Change",
		"definir":"event_textBoxChange_active",
		"parametros": [	{"value":"TextBox","title":"TextBox name "},{"value":"Value","title":"TextBox value"}]
		}'
}
*/