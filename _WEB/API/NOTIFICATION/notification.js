//RFI TAG:driverName=NOTIFICATION
		
#setFile temp/header.html
<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"> </script>
<script src="https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js" type="text/javascript"> </script>
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

/*RFI JSon
{
	'Nombre': 'getTOKEN',
	'NombreToolBox': 'Token',
	'Tipo' : 'SistemFnc',
	'title': 'token',
	'returnInfo': {'type':'','tooltip':'Nothing'},
	'parameters': [],
	'InnerHTML':"
		<div class='lineaDeCodigo' originalclass='funcion' originalid='getTOKEN' draggable='true' ondragstart='drag_linea(event)'>
			NOTIFICATION.Token()
		</div>"
}
*/

function getTOKEN(topic){
	// Asegurarse de que Firebase esté cargado antes de usarlo
window.onload = function () {
	// Configuración de Firebase
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
  
	// Intenta recuperar el token del localStorage
	const cachedToken = window.localStorage.getItem("firebaseToken");
  
	if (cachedToken) {
	  // Token ya existente en caché, solo imprímelo
	  console.log("Token desde el local storage:", cachedToken);
	  
	} else {
	  // Genera el token del dispositivo usando la id pública
	  messaging
		.getToken({
		  // Configuración del token
		  vapidKey:
		  //Modificar
			"BPRhvp0upPy3JoG6Nocso6QfKZipK2RsFpANKzzL4gSs8b4wru3TsUZuPSj37JWh8RUZF2cBzXH6c1vj8Whi5OU",
		})
		.then((currentToken) => {
		  if (currentToken) {
			// Guarda el token en localStorage
			window.localStorage.setItem("firebaseToken", currentToken);

			console.log(currentToken);
			// Enviar el token a MQTT
			message = new Paho.MQTT.Message(currentToken);
			message.destinationName = "Token/register/" + ID;
			message.retained = true;
			client.send(message); 
			
		  } else {
			setTokenSentToServer(false);
		  }
		})
		.catch((err) => {
		  console.log(err);
		  setTokenSentToServer(false);
		});
	}
}

/*RFI JSon
{
	'Nombre': 'AuthNotif',
	'NombreToolBox': 'Authorize',
	'Tipo' : 'SistemFnc',
	'title': 'token...',
	'returnInfo': {'type':'','tooltip':'Nothing'},
	'parameters': [],
	'InnerHTML':"
		<div class='lineaDeCodigo' originalclass='funcion' originalid='AuthNotif' draggable='true' ondragstart='drag_linea(event)'>
			NOTIFICATION.Authorize()
		</div>"
}
*/
function AuthNotif(topic){
	// obtener el token
}