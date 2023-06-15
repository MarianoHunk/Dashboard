import {EmicWidget} from "./emicWidget.js"
   
class EmicWidgetButton extends EmicWidget {
        
        static namesList = {};
        myDiv;
        
		TinicioClick;  
		TfinClick;     
        TDuracionClick;
		
		getNewID() {
            var i;
            for (i = 1; document.getElementById(`Button-${i}`) !== null; i++);
            return `Button-${i}`;
        }
        static get observedAttributes() {
            return ["value"];
        }
        constructor() {
         
            super();
            this.attachShadow({ mode: "open" }); 
                
        }

        connectedCallback() {
            
            if (!super.preconnectedCallback("Button")) {
                return;
            }
           

            const img = document.createElement("img");
            img.src ="/dashboard/.{userName}./.{project}./.{userModule}./images/icons/btn.png";
            img.alt ="imagen pulsador emic";
            this.shadowRoot.appendChild(img);

            if (!this.hasAttribute('id')) {
                this.setAttribute('id', this.getNewID());
            }
             
            img.style = "width:80px; height:80px;";
            //img.addEventListener('click', this.presionado);
            img.addEventListener('mousedown',this.presionado);
            img.addEventListener('mouseup',this.soltado);
            super.connectedCallback();
        }
        
		presionado() {
            this.TinicioClick = new Date();
            console.log("presionado");
			
		if (window.buttonPress)
			buttonPress(this.getAttribute("id"));

			
		}
        soltado(){
            this.TfinClick = new Date();
            this.TDuracionClick = this.TfinClick - this.TinicioClick;
            console.log("soltado en :"+ this.TDuracionClick+ "[ms]");

		if (window.buttonRelease)
			buttonRelease(this.getAttribute("id"),this.TDuracionClick);


        }

    
    }
    customElements.define("emic-widget-button", EmicWidgetButton);
