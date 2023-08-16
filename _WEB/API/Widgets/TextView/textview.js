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
  
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @fn void notify(int Value1 ,int Value2)
 * @alias notify
 * @brief Set notification text
 * @param Value1 Value1
 * @param Value2 Value2
 * @return Nothing
 */ 


// Definimos la función de notificación
function notify(value1, value2) {
    // Solicitamos permiso para mostrar notificaciones
    Notification.requestPermission().then(perm => {
        // Verificamos si el permiso ha sido concedido
        if (perm === "granted") {
            // Creamos una nueva notificación con el título y el cuerpo especificados
            // Aquí utilizamos "value1" para el título y "value2" para el cuerpo de la notificación
            const notification = new Notification(value1, {
                body: value2,
                icon: "Logo.png",
            });

            // Agregamos un evento de escucha para el cierre de la notificación
            notification.addEventListener("close", (e) => {
                // Cuando la notificación se cierra, mostramos información en la consola
                console.log("Notification closed:", e);
            });
        } else {
            // Si el permiso no ha sido concedido, mostramos un mensaje en la consola
            console.log("Permission for notifications was not granted");
        }
    });
}

