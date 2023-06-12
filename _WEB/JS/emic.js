
if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker
			.register("./serviceWorker.js")
			.then(res => console.log("service worker registered"))
			.catch(err => console.log("service worker not registered", err));
	});
}


client = new Paho.MQTT.Client("openproject.rfindustrial.com", Number(9090), "clientId"+makeid(10));
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({onSuccess:onConnect});


function onConnect() {
  console.log("onConnect");
  client.subscribe('clientid/vivero/config/#');
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

/////	document.getElementById('selector-tabla-sensores-moisture').addEventListener('change', (event) => {
/////		var e = document.getElementById('selector-tabla-sensores-moisture');
/////		var val = e.options[e.selectedIndex].textContent;
/////		message = new Paho.MQTT.Message(val);
/////		message.destinationName = 'clientid/vivero/config/moist_matrix';
/////		message.retained = true;
/////		client.send(message); 
/////	});
/////
/////
/////
/////	var ckek = document.getElementsByClassName('check-dia');
/////	for (i = 0 ; i < ckek.length ; i++)
/////	{
/////		ckek[i].addEventListener('change', (event) => {
/////			var value = (event.currentTarget.checked) ?"1":"0";
/////			var topic = event.currentTarget.getAttribute('id');
/////			message = new Paho.MQTT.Message(value);
/////			message.destinationName = 'clientid/vivero/config/' + topic;
/////			message.retained = true;
/////			client.send(message); 
/////		});
/////	}
/////	
/////	
/////	inputs = document.getElementsByClassName('emic-config');
/////	for (i = 0 ; i < inputs.length ; i++)
/////	{
/////		inputs[i].addEventListener('change', (event) => {
/////			var value = (event.currentTarget.value)
/////			var topic = event.currentTarget.getAttribute('id').replace("-","/");
/////			message = new Paho.MQTT.Message(value);
/////			message.destinationName = 'clientid/vivero/' + topic;
/////			message.retained = true;
/////			client.send(message); 
/////		});
/////	}
/////	
	
	


function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
	var payload =  message.payloadString; // message.toString();
	var value = parseFloat(payload);
	var topic = message.destinationName;
	var topics = topic.split("/");
    switch (topics[2])
    {
    	case ("sensor"):
    	    
			if (document.getElementById("sensor_"+topics[3]))
			{
				document.getElementById("sensor_"+topics[3]).textContent= value;
			}
		break;
		case "config":
			//client2.subscribe('clientid/vivero/sensor/#');
			
			switch (topics[3])
			{
				case ("moist_matrix"):
					
					var e = document.getElementById('selector-tabla-sensores-moisture');
					var val = e.options[e.selectedIndex].textContent;

					
					if (payload !== val)
					{
						var optio = document.getElementById("selector-tabla-sensores-moisture-"+payload);
						optio.setAttribute('selected','selected');
					}
					
					var val = payload.split("x");
					
					var column = val[0];
					var fila = val[1];
					
					var tbodyRef = document.getElementById('tabla-sensores-moisture');
					document.getElementById('tabla-sensores-moisture').innerHTML = "";
					for (i = 0; i <column ; i++)
					{
						var newRow = tbodyRef.insertRow();
						for( j = 0 ; j < fila ; j++)
						{
							var newCell = newRow.insertCell();
							var newDiv = document.createElement('div'); 
							newDiv.setAttribute("id", "sensor_moist_" + (i+1) +"_"+ (j+1));
							newDiv.setAttribute("style", "width: auto;display: contents;");
							newDiv.setAttribute("class", "digital_30");
							var newText = document.createTextNode('---');
							newDiv.appendChild(newText);
							newCell.appendChild(newDiv);
							newRow.appendChild(newCell);
						}
						tbodyRef.appendChild(newRow);
					}
					client.subscribe('clientid/vivero/sensor/#');
				break;

				case "check-dia-lun":
				case "check-dia-mar":
				case "check-dia-mie":
				case "check-dia-jue":
				case "check-dia-vie":
				case "check-dia-sab":
				case "check-dia-dom":
				if (document.getElementById(topics[3]).checked != (payload == "1"))
				{
						document.getElementById(topics[3]).checked = (payload == "1");
				}
				break;
				default:
					if (document.getElementById("config-"+topics[3]) && document.getElementById("config-"+topics[3]).value !== payload )
					{
						document.getElementById("config-"+topics[3]).value= payload;
					}
				break;

				
			
			}
		break;
    }
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

function xSele(...args)
{
	for (i = 1; i < args.length; i+= 2)
	{
		if (args[i] == '*' || args[i] == args[0])
		{
			return eval(args[i + 1]);
		}
	}
}