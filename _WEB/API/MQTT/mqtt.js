//RFI TAG:driverName=MQTT

		
#setFile temp/header.html
<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"> </script>
#unSetFile


var  MQTTsvr;
doCMDstr(MQTTsvr) // IP number of TCP server.

var MQTTport
doCMDstr(MQTTport) // IP port of TCP server.

var CLIENTID;
doCMDstr(CLIENTID) // MQTT Client identifier.

var USERMQTT;
doCMDstr(USERMQTT) // Username for authentication on MQTT broker.

var PASSMQTT;
doCMDstr(PASSMQTT) // Password for authentication on MQTT broker.

var TOPICSUBS;
doCMDstr(TOPICSUBS) // Topic to subscribe immediately after connect to MQTT broker.
/*RFI JSon
{
	'Nombre': 'pMQTT',
	'NombreToolBox': 'publish',
	'Tipo' : 'SistemFnc',
	'title': 'Publish a MQTT topic',
	'returnInfo': {'type':'','tooltip':'Nothing'},
	'parameters': [
					{'name': 'Topic',
					'tooltip': 'Topic to publish',
					'required': 'true',
					'type': 'str'},
					{'name': 'Payload',
					'tooltip': 'Data to publish',
					'required': 'true',
					'type': 'str'}
				  ],
	'InnerHTML':"
		<div class='lineaDeCodigo' originalclass='funcion' originalid='pMQTT' draggable='true' ondragstart='drag_linea(event)'>
			MQTT.Publish(<div class='parametroDiv'></div>,
						<div class='parametroDiv'></div>)
		</div>"
}
*/
function pMQTT(topic,payload){
		message = new Paho.MQTT.Message(payload);
		message.destinationName = topic;
		message.retained = false;
		client.send(message); 
}


/*RFI JSon
{
	'Nombre': 'sMQTT',
	'NombreToolBox': 'subscribe',
	'Tipo' : 'SistemFnc',
	'title': 'Subscribe to a MQTT topic',
	'returnInfo': {'type':'','tooltip':'Nothing'},
	'parameters': [
					{'name': 'Topic',
					'tooltip': 'Topic to subscribe',
					'required': 'true',
					'type': 'str'}
				  ],
	'InnerHTML':"
		<div class='lineaDeCodigo' originalclass='funcion' originalid='sMQTT' draggable='true' ondragstart='drag_linea(event)'>
			MQTT.Subscribe(<div class='parametroDiv'></div>)
		</div>"
}
*/
function sMQTT(topic){
	client.subscribe(topic);
}

/*RFI JSon
{
	'Nombre': 'eMQTT',
	'NombreToolBox': 'topicReceived',
	'Tipo' : 'SistemEvt',
	'title': 'When it receives a string from MQTT broker',
	'returnInfo': {'type':'','tooltip':'Nothing'},
	'parameters': [],
	'instancia':'{
		"NombreWorkBox":"Event.MQTT.Reception",
		"definir":"event_eMQTT_active",
		"parametros": [{"value":"topic","title":"received topic wildcard value"},{"value":"payload","title":"received payload"}]
		}'
}
*/
/*RFI JSon
{
	'Nombre': 'eMQTTCON',
	'NombreToolBox': 'connected',
	'Tipo' : 'SistemEvt',
	'title': 'When the client and broker are connected OK',
	'returnInfo': {'type':'','tooltip':'Nothing'},
	'parameters': [],
	'instancia':'{
		"NombreWorkBox":"Event.MQTT.ConnectedOK",
		"definir":"event_eMQTTCON_active",
		"parametros": []
		}'
}
*/
if (!USERMQTT){
	USERMQTT="";
}
if (!PASSMQTT){
	PASSMQTT="";
}
if (MQTTsvr && MQTTport) {
  //client = new Paho.MQTT.Client("openproject.rfindustrial.com", Number(9090), "clientId"+makeid(10));
  //client = new Paho.MQTT.Client("editor.emic.io", Number(8081), "clientId"+makeid(10));
  client = new Paho.MQTT.Client(MQTTsvr, Number(MQTTport), "clientId" + makeid(10));
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({
    useSSL: true,
    userName: USERMQTT,
    password: PASSMQTT,
    onSuccess: onConnect
  });
}


function onConnect() {
  console.log("onConnect");
  eMQTTCON();
  
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
	var payload =  message.payloadString; // message.toString();
	var value = parseFloat(payload);
	var topic = message.destinationName;
	var topics = topic.split("/");
	eMQTT(topic,payload);
	
}


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   console.log("random:",result );
   return result;
}      
	