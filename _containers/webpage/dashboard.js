import {EmicDashPanel} from './panel.js'

export class EmicDashboard extends HTMLElement {
    gauge;
    static namesList = {};
    getNewID() {
        var i;
        for (i = 1; document.querySelector(`#Dashboard-${i}`); i++);
        //EmicDashboard.namesList[`Dashboard-${i}`] = this;
        return `Dashboard-${i}`;
    }
    static get observedAttributes() {
        return ['direction'];
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    //            else if(origen.classList.contains("HtmlPanel")) {
    //}

    connectedCallback() {

        //  const parent = this.parentElement;
        //  const tabs = parent.closest(".tabs");
        //  tabs.appendChild(this);
        
        const nuevoDiv = document.createElement("div");
        nuevoDiv.style = "height: 100%;";
        const style = document.createElement("style");
        style.innerHTML = `:host(:hover) {border : 1px solid;} section.show {min-height: 10px;opacity: 1;padding: 0px;} section.hide {min-height: 0px;  opacity: 0;padding: 0px;}                `;

        this.shadowRoot.appendChild(style);
        //const boton = document.createElement("button");
        //boton.onclick = function () {
        //    this.nextElementSibling.classList.toggle("show");
        //    this.nextElementSibling.classList.toggle("hide");
        //}
        //boton.style = "width:100%;";
        //boton.innerText = "Dashboard:";
        //nuevoDiv.appendChild(boton);

        var seccion = document.createElement("section");
        //seccion.classList.add('show');
        seccion.style = "border: 1px solid;height: 100%;"; // display: flex;flex-direction: row;justify-content: space-evenly;flex-wrap: wrap;align-items: stretch;";
        seccion.appendChild(document.createElement("slot"));

        this.seccion = seccion;
        nuevoDiv.appendChild(seccion);
        this.shadowRoot.appendChild(nuevoDiv);


        // --------------------- EVENTS ---------------- en este caso this referncia a "EmicDashboard"
        this.seccion.addEventListener('dragover', (e) => {
            e.stopPropagation();
            var nd = document.miDrag;
            if (document.miDrag != null && nd instanceof EmicDashPanel) {
                
                if (this == nd) {
                    return;
                }
                if (document.miDragAction === 'create') {
                    document.miDragAction = 'move';
                    nd = nd.cloneNode(true);
                }
                const chields = this.children;
                let i = 0;
                for (; i < chields.length; i++) {
                    if (this.getAttribute('direction') === 'row') {
                        let x0 = this.getBoundingClientRect().left;
                        let x1 = chields[i].getBoundingClientRect().left; let x3 = (chields[i].offsetWidth / 2);
                        let x2 = e.offsetX;
                        if (x1 - x0 + x3 > x2) {
                            if (nd != chields[i] && nd != this) {
                                this.insertBefore(nd, chields[i]);
                            }
                            break;
                        }
                    }
                    else {
                        let x0 = this.getBoundingClientRect().top;
                        let x1 = chields[i].getBoundingClientRect().top; let x3 = (chields[i].offsetHeight / 2);
                        let x2 = e.offsetY;
                        if (x1 - x0 + x3 > x2) {
                            if (nd != chields[i] && nd != this) {
                                this.insertBefore(nd, chields[i]);
                            }
                            break;
                        }
                    }
                }
                if (i >= chields.length) {
                    if (nd != this && nd != this)
                        this.appendChild(nd);
                }
            }
        });
    }

    attributeChangedCallback(name, old, now) {
        switch (name) {
            case 'direction':
                this.seccion.style["flex-direction"] = now;
                break;
        }
    }
}

customElements.define("emic-dashboard", EmicDashboard);
