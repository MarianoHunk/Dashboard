//RFI TAG:driverName=HTML Widget



#setFile plugins/www/header.html
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/textview.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/textview.js"> </script>
#unSetFile

#setFile wwwroot/JS/TextView.js
#newRFIcode(_WEB/API/Widgets/TextView/plugins/textview.js,name=)
#unSetFile
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*RFI JSon
{
	'Nombre': 'TextView',
	'NombreToolBox': 'TextView',
	'Tipo' : 'Widget',
	'title': 'Botón sin retención',
	'html-tag': 'emic-widget-textview',
}
*/
//	'instance': '{"component":"emic-widget-textview","attributes":{}}',
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @fn void textSetValue(int textViewName,int Value)
 * @alias textSetValue
 * @brief Set text
 * @param textViewName textViewName
 * @param Value Value
 * @return Nothing
 */ 

function textSetValue(textViewName, value) {
	const textView = document.getElementById(textViewName);
	// Cambia el valor del atributo 'valormedido' del elemento
	textView.setAttribute('text_val', value);
  }
  
  