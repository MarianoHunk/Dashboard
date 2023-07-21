//RFI TAG:driverName=HTML Widget

#setFile plugins/www/header.html
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/textBox.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/textBox.js"> </script>
#unSetFile

#setFile wwwroot/JS/textBox.js
#newRFIcode(_WEB/API/Widgets/TextBox/plugins/textBox.js,name=)
#unSetFile

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @fn void TextBoxSetValue(int textId,int Value)
 * @alias TextBoxSetValue
 * @brief Set Value
 * @param textId textId
 * @param Value Value
 * @return Nothing
 */ 
function TextBoxSetValue(textId, Value){
    var tName = textId;
    if (textId.includes('/')) {
        tName = textId.substr(textId.lastIndexOf('/') + 1);
    }
    var element = document.getElementById(tName);
    if (element) {
        // Si el elemento existe, le asigna el valor 'Value'
        element.setAttribute('value', Value);
    } 
    else {
        console.log("Elemento con id ", tName, " no encontrado");
    }
}

