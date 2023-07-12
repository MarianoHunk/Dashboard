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
    div.innerText = this.getAttribute("text_val");
    this.myTextView = div;
    const style = document.createElement("style");
    this.shadowRoot.appendChild(div);
    this.shadowRoot.appendChild(style);

    if (!this.hasAttribute('id')) {
        this.setAttribute('id', this.getNewID());
    }

    if (!this.hasAttribute('text_val')) {
        this.setAttribute('text_val', this.getAttribute("id")); // Se setea el contenido de texto igual que el nombre del widget
    }

    div.textContent = this.getAttribute("text_val");
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
    return ["text_val"];
  }

  // Se ejecuta cuando hay cambios en los atributos observados
  attributeChangedCallback(name, old, now) {
    if (name === 'text_val' && this.myTextView) {
      //this.myTextView.text_val = now;(error)
      this.myTextView.textContent = now;
    }
  }

  // Setter para el atributo "text_val".
  set text_val(newVal) {
    this.setAttribute('text_val', newVal);
  }

  // Getter para el atributo "text_val".
  get text_val() {
    return this.getAttribute("text_val");
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
