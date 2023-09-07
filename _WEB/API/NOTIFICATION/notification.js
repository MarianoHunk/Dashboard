//RFI TAG:driverName=NOTIFICATION
		
#setFile temp/header.html
<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"> </script>
#unSetFile
#setFile temp/header.html
<script src="https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js" type="text/javascript"> </script>
#unSetFile
#setFile temp/header.html
<script src="https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js" type="text/javascript"> </script>
#unSetFile


/*RFI JSon
{
	'Nombre': 'Register_Notification',
	'NombreToolBox': 'Register',
	'Tipo' : 'SistemFnc',
	'title': 'Publish a MQTT topic',
	'returnInfo': {'type':'','tooltip':'Nothing'},
	'parameters': [
					{'name': 'ID',
					'tooltip': 'ID',
					'required': 'true',
					'type': 'str'},
					{'name': 'TOKEN',
					'tooltip': 'TOKEN',
					'required': 'true',
					'type': 'str'}
				  ],
	'InnerHTML':"
		<div class='lineaDeCodigo' originalclass='funcion' originalid='Register_Notification' draggable='true' ondragstart='drag_linea(event)'>
			NOTIFICATION.Register(<div class='parametroDiv'></div>,
						<div class='parametroDiv'></div>)
		</div>"
}
*/
function Register_Notification(ID,payload){
		message = new Paho.MQTT.Message(payload);
		message.destinationName = "Notification/register/" + ID;
		message.retained = true;
		client.send(message); 
}

//-----------------------------------------------------------------------------------------------
/**
 * @fn int getTOKEN(int num)
 * @alias token
 * @brief Set notification text
 * @param num num
 * @return value
 */ 

const firebaseConfig = {
    // Credenciales y configuración de la aplicación
    apiKey: "AIzaSyBaefJaGbvJEcUz4JxWZltRSiXwTlr37cg",
    authDomain: "app-nueva-b3943.firebaseapp.com",
    projectId: "app-nueva-b3943",
    storageBucket: "app-nueva-b3943.appspot.com",
    messagingSenderId: "947440843893",
    appId: "1:947440843893:web:8ddeca8c860e07b67f4c3c",
  };

  // Inicializa Firebase con la configuración proporcionada
  const app = firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  if (messaging){
	console.log(messaging);
  }

  function getTOKEN(num) {
	try {
	  const cachedToken = window.localStorage.getItem("firebaseToken");
	  if (cachedToken) {
		return cachedToken;
	  } else {
		return messaging
		  .getToken({
			vapidKey:
			  "BPRhvp0upPy3JoG6Nocso6QfKZipK2RsFpANKzzL4gSs8b4wru3TsUZuPSj37JWh8RUZF2cBzXH6c1vj8Whi5OU",
		  })
		  .then((currentToken) => {
			if (currentToken) {
			  window.localStorage.setItem("firebaseToken", currentToken);
			  return currentToken;
			  //---- Mas codigo aqui ----
			} else {
			  console.log("no se pudo conseguir el token");
			  return null;
			}
		  })
		  .catch((err) => {
			if (err.code === 'messaging/permission-blocked') {
			  console.error('Permiso de notificación bloqueado por el usuario');
			  // Aquí puedes manejar este caso específico, como mostrar un mensaje al usuario
			  return null; // Puedes retornar un valor específico o manejarlo como desees
			} else {
			  console.log(err);
			  return null;
			}
		  });
	  }
	} catch (error) {
	  console.error(error);
	  return num * 5;
	}
  }
  
  
  
//-----------------------------------------------------------------------------------------------
/**
 * @fn int authorizeNotification(int num)
 * @alias AuthoriceNotification
 * @brief Set notification text
 * @param num num
 * @return Nothing
 */ 


function authorizeNotification(num) {
	Notification.requestPermission().then((permission) => {
	  if (permission === 'granted') {
		// El usuario otorgó permiso, ahora puedes obtener el token
		getTOKEN(num);
	  } else {
		// El usuario no otorgó permiso
		console.log('Permiso de notificación no otorgado');
	  }
	});
  }
  