import { EmicWidget } from "./emicWidget.js";

class EmicWidgetComponente extends EmicWidget {
  //-----------------------------------------------------------------------------------
  // Definimos variables.
  //-----------------------------------------------------------------------------------
  static namesList = {};
  componente;

  //-----------------------------------------------------------------------------------
  // Constructor.
  //-----------------------------------------------------------------------------------
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  //-----------------------------------------------------------------------------------
  // Método para obtener un nuevo ID.
  //-----------------------------------------------------------------------------------
  getNewID() {
    var i;
    for (i = 1; EmicWidgetComponente.namesList[`componente-${i}`]; i++);
    EmicWidgetComponente.namesList[`componente-${i}`] = this;
    return `componente-${i}`;
  }

  //-----------------------------------------------------------------------------------
  // Cuando el elemento es conectado al DOM
  //-----------------------------------------------------------------------------------

  connectedCallback() {
    if (!super.preconnectedCallback("Componente")) {
      return;
    }
    // Creamos un nuevo elemento <input>
    this.componente = document.createElement("input");

    // Establecemos el tipo de input

    // Si el elemento no tiene un atributo "id", se le asigna uno nuevo
    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
    // Mostrar identificador
    this.setAttribute("title", this.getAttribute("id"));

    // Si el elemento no tiene un atributo "value", se le asigna un valor por defecto
    if (!this.hasAttribute("value")) {
      this.setAttribute("value", "default value");
    }

    this.shadowRoot.appendChild(this.componente);

    // Agrega aquí la configuración y personalización específica para el componente

    //----------------------------------------------------
    // Se definen las llamadas a los eventos del componente
    this.componente.addEventListener("change", this.change.bind(this));
    //----------------------------------------------------

    super.connectedCallback();
  }

  // Método llamado cuando ocurre el evento "change" en el componente
  change(event) {
    console.log(this.getAttribute("id"), " change ", event.target.value);

    // Si existe una función global "componentChange", se llama a esa función y se le pasa el ID del componente y su nuevo valor
    if (window.componentChange)
      componentChange(this.getAttribute("id"), event.target.value);
    this.setAttribute("value", event.target.value); // Actualizamos el atributo "value"
  }

  //-----------------------------------------------------------------------------------
  // Si hay cambios en tiempo de ejecución.
  //-----------------------------------------------------------------------------------
  // Lista de atributos observados por el elemento
  static get observedAttributes() {
    return ["value"];
  }

  // Método llamado cuando hay cambios en los atributos del elemento
  attributeChangedCallback(name, old, now) {
    // Si el componente no está definido, se retorna
    if (typeof this.componente == "undefined") return;

    switch (name) {
      // Si el atributo cambiado es "value", se actualiza el valor del componente
      case "value":
        this.componente.value = now;
        break;
    }
  }

  //-----------------------------------------------------------------------------------
  // Métodos para obtener y establecer el valor del atributo "value"
  //-----------------------------------------------------------------------------------
  get value() {
    return this.getAttribute("value");
  }

  set value(newVal) {
    this.setAttribute("value", newVal);
  }
}

// Se define el nuevo elemento "emic-widget-componente"
customElements.define("emic-widget-componente", EmicWidgetComponente);
