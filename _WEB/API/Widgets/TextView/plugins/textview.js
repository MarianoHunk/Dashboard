import { EmicWidget } from "./emicWidget.js";

class EmicWidgetTextView extends EmicWidget {
  static namesList = {};
  myTextView;

  //****************************************************************************/
  //                   Método para obtener un nuevo ID
  //****************************************************************************/
  // Este método se utiliza para generar un nuevo ID único para el elemento.
  getNewID() {
    var i;
    for (i = 1; document.getElementById(`textview-${i}`) !== null; i++);
    return `textview-${i}`;
  }

  //****************************************************************************/
  //                               Constructor
  //****************************************************************************/
  // El constructor de la clase. Llama al constructor de la clase padre y crea un Shadow DOM.
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  //****************************************************************************/
  //               Cuando el elemento es conectado al DOM
  //****************************************************************************/
  // Este método se ejecuta cuando el elemento personalizado se conecta al DOM.
  connectedCallback() {
    if (!super.preconnectedCallback("TextView")) {
        return;
    }
    const div = document.createElement("div");
    div.textContent = this.getAttribute("ValorMedido");
    this.myTextView = div;
    const style = document.createElement("style");
    this.shadowRoot.appendChild(div);
    this.shadowRoot.appendChild(style);

    if (!this.hasAttribute('id')) {
        this.setAttribute('id', this.getNewID());
    }

    if (!this.hasAttribute('ValorMedido')) {
        this.setAttribute('ValorMedido', this.getAttribute("id"));
    }

    div.textContent = this.getAttribute("ValorMedido");
    this.addEventListener('click', this.eventClickListener);
    super.connectedCallback();
}


  //****************************************************************************/
  //                            Cuando se hace click
  //****************************************************************************/
  // Este método se ejecuta cuando se hace clic en el elemento personalizado.
  eventClickListener(ev) {
    // Aquí puedes implementar la lógica del evento 'click' del Web Component
  }

  //****************************************************************************/
  //                               Si hay cambios
  //****************************************************************************/
  // Este método define los atributos que se deben observar para detectar cambios.
  static get observedAttributes() {
    return ["ValorMedido"];
  }

  // Este método se ejecuta cuando hay cambios en los atributos observados.
  attributeChangedCallback(name, old, now) {
    // Aquí puedes implementar la lógica de los atributos observados
  }

  // Setter para el atributo "ValorMedido".
  set ValorMedido(newVal) {
    this.setAttribute("ValorMedido", newVal);
  }

  // Getter para el atributo "ValorMedido".
  get ValorMedido() {
    return this.getAttribute("ValorMedido");
  }
}

// Se registra el elemento personalizado en el navegador. 
/* 
* El custom element: "emic-widget-textview" *
* Debe contener al menos un guion (-).
* No puede contener letras en mayúscula.
* Debe tener al menos un carácter que no sea un guion.
*/
customElements.define("emic-widget-textview", EmicWidgetTextView);
