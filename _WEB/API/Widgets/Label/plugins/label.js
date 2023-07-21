import {EmicWidget} from "./emicWidget.js"
    class EmicWidgetLabel extends EmicWidget {
        static namesList = {};
        myDiv;
        getNewID() {
            var i;
            for (i = 1; document.getElementById(`label-${i}`) !== null; i++);
            return `label-${i}`;
        }
        static get observedAttributes() {
            return ["value"];
        }
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }

        connectedCallback() {
            if (!super.preconnectedCallback("Label")) {
                return;
            }
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
            this.addEventListener('click', this.eventClickListener);
            super.connectedCallback();
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
                    this.setAttribute("value", e.currentTarget.value);
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
                    // Si existe una función global "labelChange", se llama a esa función y se le pasa el ID del label y su nuevo valor
                    if (window.labelChange) {
                        labelChange(this.getAttribute("id"), now);
                    }
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
    customElements.define("emic-widget-label", EmicWidgetLabel);
