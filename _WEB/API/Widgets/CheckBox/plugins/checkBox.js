import {EmicWidget} from "./emicWidget.js"

    class EmicWidgetCheckBox extends EmicWidget {
        static namesList = {};
        myDiv;
        getNewID() {
            var i;
            for (i = 1; document.getElementById(`checkBox-${i}`) !== null; i++);
            return `checkBox-${i}`;
        }
        static get observedAttributes() {
            // return ["value"];
            return ["text"];
        }
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
            this.text="chan1"
        }

        connectedCallback() {

            
            if (!super.preconnectedCallback("CheckBox")) {
                return;
            }

            this.shadowRoot.innerHTML=`<div>          
            <input type="checkbox"  id="check"></div>`
            var checkbox = this.shadowRoot.getElementById('check');




            const div = document.createElement("div");
            this.myDiv = div
            const style = document.createElement("style");
            this.shadowRoot.appendChild(div);
            this.shadowRoot.appendChild(style);

            if (!this.hasAttribute('id')) {
                this.setAttribute('id', this.getNewID());
            }

            if (!this.hasAttribute('value')) {
                this.setAttribute('value', this.getAttribute("id"));
            }

            div.innerHTML = this.getAttribute("value");
            // this.addEventListener('click', this.eventClickListener);
            super.connectedCallback();
           
            let elemento=this.getAttribute("value")
            checkbox.addEventListener( 'change', function(e) {
                //if(this.checked) {
                //    alert(elemento +' esta seleccionado');
                //}
				
				if (window.chexkBoxChange)
					chexkBoxChange(this.getAttribute("id").substr(7), (e.currentTarget.checked)?"1":"0");
				
            });
            this.style.textAlign="center"
    
        }
        
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
    }
    customElements.define("emic-widget-checkbox", EmicWidgetCheckBox);
