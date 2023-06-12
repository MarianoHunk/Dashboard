   
   class EmicWidgetButtonSr extends EmicWidget {
        
        static namesList = {};
        myDiv;
        
        getNewID() {
            var i;
            for (i = 1; document.getElementById(`ButtonSr-${i}`) !== null; i++);
            return `ButtonSr-${i}`;
        }
        static get observedAttributes() {
            return ["value"];
        }
        constructor() {
         
            super();
            this.attachShadow({ mode: "open" }); 
                
        }

        connectedCallback() {
            
            if (!super.preconnectedCallback("ButtonSr")) {
                return;
            }
           

            const img = document.createElement("img");
            img.src ="/dashboard/.{userName}./.{project}./.{userModule}./images/icons/btn.png";
            img.alt ="imagen pulsador emic";
            this.shadowRoot.appendChild(img);

            if (!this.hasAttribute('id')) {
                this.setAttribute('id', this.getNewID());
            }
             
            img.style = "width:40px; height:40px;";
            img.addEventListener('click', this.presionado);
            super.connectedCallback();
        }
        
		presionado() {
            
           console.log("presionado");
		}

     
		/*
        eventClickListener(ev) {

            var input = document.createElement("input");
            input.value = this.getAttribute("value");
            this.myDiv.innerText = "";
            this.myDiv.appendChild(input);
            input.focus();

            input.addEventListener("blur", (e) => {
                e.stopPropagation;
                this.setAttribute("value", e.currentTarget.value)
                this.myDiv.innerHTML = e.currentTarget.value;
            });
            input.addEventListener("keypress", (e) => {
                e.stopPropagation;
                if (e.key === "Enter") {
                    this.setAttribute("value", e.currentTarget.value)
                    this.myDiv.innerHTML = e.currentTarget.value;

                }
            });
            input.addEventListener("click", (e) => {
                e.stopPropagation;
            });
        }


        attributeChangedCallback(name, old, now) {

            switch (name) {
                case 'value':
                    
                    break;
            }
        }

        set value(newVal) {
            this.setAttribute('value', newVal);
        }

        get value() {
            return this.getAttribute('value');
        }
        */
    }
    customElements.define("emic-widget-buttonsr", EmicWidgetButtonSr);
