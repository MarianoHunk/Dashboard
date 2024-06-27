var client;

export function pMQTT(topic,payload){
		message = new Paho.MQTT.Message(payload);
		message.destinationName = topic;
		message.retained = true;
		client.send(message); 
}


export function sMQTT(topic){
	client.subscribe(topic);
}


export function connectMQTT (MQTTsvr , MQTTport) {
  if (!globalThis.USERMQTT){
    globalThis.USERMQTT = "";
  }
  
  if (!globalThis.PASSMQTT){
    globalThis.PASSMQTT = "";
  }
  client = new Paho.MQTT.Client(MQTTsvr, Number(MQTTport), "clientId" + makeid(10));
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({
    useSSL: true,
    userName: globalThis.USERMQTT,
    password: globalThis.PASSMQTT,
    onSuccess: onConnect
  });
}


function onConnect() {
  console.log("onConnect");
  EMIC:ifdef(usedEvent.eMQTTCON)
  globalThis.script.eMQTTCON();
  EMIC:endif
  
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
	EMIC:ifdef(usedEvent.eMQTTDISCON)
	globalThis.script.eMQTTDISCON();
	EMIC:endif
  }
}

function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
	var payload =  message.payloadString; // message.toString();
	var value = parseFloat(payload);
	var topic = message.destinationName;
	var topics = topic.split("/");
	EMIC:ifdef(usedEvent.eMQTT)
	globalThis.script.eMQTT(topic,payload);
	EMIC:endif
	
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
	