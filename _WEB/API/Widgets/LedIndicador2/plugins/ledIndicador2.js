import {EmicWidget} from "./emicWidget.js"

    class EmicWidgetLedIndicador2 extends EmicWidget {
        static namesList = {};
        getNewID() {
            var i;
            for (i = 1; document.getElementById(`LedIndicador-${i}`) !== null; i++);
            return `LedIndicador-${i}`;
        }
        static get observedAttributes() {
            return ["state"];
        }
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }

        connectedCallback() {
            if (!super.preconnectedCallback("Led2")) {
                return;
            }

            if (!this.hasAttribute('id')) {
                this.setAttribute('id', this.getNewID());
            }

            if (!this.hasAttribute('state')) {
                this.setAttribute('state', '0');
            }
			
			this.shadowRoot.innerHTML=`
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                    width="40" height="20" viewBox="0 0 40 40" >
                    <circle cx="20" cy="20" r="18"
                    stroke-width="4"
                    stroke=#808000 
                    fill=#805000 />
                </svg>`
			
			
            this.style.textAlign="center"
            super.connectedCallback();

            
        }


        attributeChangedCallback(name, old, now) {
            switch (name) {
                case 'state':

            //this.state=now
            if (now=="1"){
                this.shadowRoot.innerHTML=`
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                    width="40" height="40" viewBox="0 0 40 40" >
                    <circle cx="20" cy="20" r="18"
                    stroke-width="4"
                    stroke="blue"
                    fill=#90FF90 />
                </svg>`
            } else{
                this.shadowRoot.innerHTML=`
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                    width="40" height="40" viewBox="0 0 40 40" >
                    <circle cx="20" cy="20" r="18"
                    stroke-width="4"
                    stroke=#808000 
                    fill=#805000 />
                </svg>`
            }

            //this.style.textAlign="center"

                    break;
            }
        }

        set state(newVal) {
            this.setAttribute('state', newVal);
        }
		//
        //get state() {
        //    return this.getAttribute('state');
        //}
    }
    customElements.define("emic-widget-ledindicador2", EmicWidgetLedIndicador2);
