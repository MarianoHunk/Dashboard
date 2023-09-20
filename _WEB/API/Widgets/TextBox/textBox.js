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
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @fn string TextBoxGetValue(int textId)
 * @alias TextBoxGetValue
 * @brief Get Value
 * @param textId ID del elemento de texto
 * @return Value Valor del elemento de texto o null si no se encuentra el elemento
 */ 
function TextBoxGetValue(textId){
    var element = document.getElementById(textId);
    if (element) {
        // Si el elemento existe, obtiene el valor 'Value' del atributo 'value'
        var Value = element.getAttribute('value');
        return Value;
    } 
    else {
        console.log("Elemento con id ", textId, " no encontrado");
        return null; // Retorna null si el elemento no se encuentra
    }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @fn void saveToLocalStorage(int keyNameLS, int widgetName, int compareName, int valueToStore)
 * @alias saveToLocalStorage
 * @brief Saves data into Local Storage
 * @param keyNameLS Name of the Local Storage key
 * @param widgetName Name of the widget
 * @param compareName String to compare with the widget name
 * @param valueToStore Widget value
 * @return None
 */ 


function saveToLocalStorage(keyNameLS, widgetName, compareName, valueToStore) {
    // Verifica si los argumentos son válidos
    if (keyNameLS && widgetName && compareName && valueToStore) {
        // Si widgetName y compareName coinciden, guarda valueToStore en localStorage
        if (widgetName === compareName) {
            localStorage.setItem(keyNameLS, valueToStore);
        }
    } else {
        console.error("Argumentos inválidos o incompletos para la función saveToLocalStorage.");
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @fn void loadToLocalStorage(int keyNameLS, int widgetName)
 * @alias loadToLocalStorage
 * @brief Load data from Local Storage
 * @param keyNameLS Name of the Local Storage key
 * @param widgetName Name of the widget
 * @return None
 */ 

function loadToLocalStorage(keyNameLS, widgetName) {
    // Verifica si los argumentos son válidos
    if (keyNameLS && widgetName) {
        // Intenta recuperar el valor del localStorage
        const valueFromStorage = localStorage.getItem(keyNameLS);
        
        // Verifica si el valor existe en localStorage
        if (valueFromStorage !== null) {
            // Encuentra el widget en el DOM utilizando el ID proporcionado (widgetName)
            const element = document.getElementById(widgetName);
            // Verifica si el widget existe en el DOM
            if (element) {
                // Asigna el valor recuperado al widget
                element.setAttribute('value', valueFromStorage);
            } else {
                console.error(`El widget con ID ${widgetName} no se encuentra en el DOM.`);
            }
        } else {
            console.warn(`No hay ningún valor guardado en localStorage con la clave ${keyNameLS}.`);
        }
    } else {
        console.error("Argumentos inválidos o incompletos para la función loadToLocalStorage.");
    }
}
