//if(customElements.get("emic-widget") === undefined)  {

export class EmicWidget extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        //this.addEventListener('drop', (e) => {
        //    this.mostrar();
        //});
        this.addEventListener('dragover', this.eventDragoverListener);

        this.addEventListener('dragstart', (e) => {
            e.stopPropagation();
            document.miDrag = this;
            this.style.opacity = "0.1";
        })
        this.addEventListener('dragend', (e) => {
            e.stopPropagation();
            document.miDrag = null;
            this.style.opacity = "1";
        })
        this.draggable = true;
        this.style.border = "0pt solid #1F030C";
        this.style.alignSelf = "center";
        // Mostrar identificador
        this.setAttribute("title", this.getAttribute("id"))
    }
    //--------------------------------------------------------------------------------------------------------------------------------
    // Este método hace varios ajustes a la instancia de EmicWidget dependiendo de su posición en el DOM y de ciertas características.
    //--------------------------------------------------------------------------------------------------------------------------------
    preconnectedCallback(name) {

        if (this.closest("emic-dashboard") && this.classList.contains("herramienta")) {
            this.classList.remove("herramienta");
            this.shadowRoot.innerHTML = "";
            this.setAttribute('id', this.getNewID());
            document.miDrag = this;
            document.miDragAction = 'move';
            this.style.opacity = "0.1";

        }
        else if (this.shadowRoot.innerHTML !== "") {
            return false;
        }

        if (!this.closest("emic-dashboard")) {
            this.classList.add("herramienta");
            this.shadowRoot.innerHTML = name;
            this.draggable = true;
            this.addEventListener('dragstart', (e) => {
                document.miDrag = this;
                document.miDragAction = 'create';
            });
            this.addEventListener('dragend', (e) => {
                document.miDrag.style.opacity = "1";
                e.dataTransfer.setData("text", null);
                document.miDrag = null;
                this.style.opacity = "1";

            })
            return false;
        }
        return true;
    }

    /*
    dragElement(event) {
        this.addEventListener('mousedown', (e) => {
            console.log(this);
            let coords = this.getBoundingClientRect();
            let Y = Math.round(coords.top);
            let X = Math.round(coords.left);
            let Ancho = coords.width
            let Alto = coords.height
            var mirrow = document.createElement("div");
            mirrow.xx = e.clientX - X;
            mirrow.yy = e.clientY - Y;
            mirrow.origen = this;
            console.log(`X:${X} Y:${Y} xx:${mirrow.xx} yy:${mirrow.yy}`)
            mirrow.style = `
  position: absolute;
  top: ${Y}px;
  left: ${X}px;
  margin: 0;
  cursor: move;
  z-index: 10;
  border: 1pt solid #1F030C;
  height: ${Alto}px;
  width: ${Ancho}px;
`;
            this.style.opacity = 0.3;
            this.closest("emic-dashboard").appendChild(mirrow);
            mirrow.addEventListener("mouseup", (e) => {
                mirrow.origen.style.opacity = 1;
                mirrow.outerHTML = "";
                mirrow = null;
            });


            mirrow.addEventListener("mousemove", (e) => {
                var ClientRect = mirrow.getBoundingClientRect();
                let x = Math.round(e.clientX);
                let y = Math.round(e.clientY);
                let x1 = Math.round(ClientRect.left);
                let y1 = Math.round(ClientRect.top);
                console.log(`x:${x} y:${y}  x1:${x1}  y:${y1}`)

                mirrow.style.top = (y - mirrow.yy) + "px";
                mirrow.style.left = (x - mirrow.xx) + "px";
            })
        })
    }

    elementDrag(event) {
        event = event || window.event
        this.moveWindow(event.clientX, event.clientY)
    }

*/

    eventDragoverListener(event) {
        event.stopPropagation();

        var nd = document.miDrag;
        if (this == nd) {
            return;
        }

        if (nd instanceof EmicWidget ) {
            if (this.parentElement.getAttribute("direction") === "column") {
                if (event.offsetY < (this.clientHeight / 2)) {
                    this.parentElement.insertBefore(nd, this);
                }
                else {
                    this.parentElement.insertBefore(nd, this.nextSibling);
                }
            }
            else {
                if (event.offsetX < (this.clientWidth / 2)) {
                    this.parentElement.insertBefore(nd, this);
                }
                else {
                    this.parentElement.insertBefore(nd, this.nextSibling);
                }

            }
        }
    }
}

    customElements.define("emic-widget", EmicWidget);

//}