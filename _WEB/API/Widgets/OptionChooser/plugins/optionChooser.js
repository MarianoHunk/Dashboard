// Importamos la clase EmicWidget
import { EmicWidget } from "./emicWidget.js";

// Clase EmicWidgetOptionChooser que hereda de EmicWidget
class EmicWidgetOptionChooser extends EmicWidget {
  //-----------------------------------------------------------------------------
  // Variables estáticas y miembros de la clase
  //-----------------------------------------------------------------------------
  static namesList = {};
  optionChooser;
  panel;  // Variable para el panel añadida

  //-----------------------------------------------------------------------------
  // Constructor
  //-----------------------------------------------------------------------------
  constructor() {
    super(); // Llamada al constructor padre
    this.attachShadow({ mode: "open" });
  }

  //-----------------------------------------------------------------------------
  // Método para obtener un nuevo ID único
  //-----------------------------------------------------------------------------
  getNewID() {
    var i;
    for (i = 1; EmicWidgetOptionChooser.namesList[`optionChooser-${i}`]; i++);
    EmicWidgetOptionChooser.namesList[`optionChooser-${i}`] = this;
    return `optionChooser-${i}`;
  }

  //-----------------------------------------------------------------------------
  // Método que se ejecuta cuando el componente se conecta al DOM
  //-----------------------------------------------------------------------------
  connectedCallback() {
    // Comprobar si la preconexión fue exitosa antes de continuar
    if (!super.preconnectedCallback("OptionChooser")) {
      return;
    }
  
    // Crear el panel para contener el optionChooser
    this.panel = document.createElement("div");
    this.panel.className = "emic-dash-panel";
  
    // Crear el elemento optionChooser (select) y asignarle una clase
    this.optionChooser = document.createElement("select");
    this.optionChooser.className = "form-control";
  
    // Llamar al método para llenar el contenido del optionChooser
    this.generateOptionChooserContent();
  
    // Asignar un ID si no hay uno definido
    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
    
    // Verificar si el elemento tiene un atributo 'text', de no ser así, se asigna uno nuevo
    if (!this.hasAttribute("text")) {
      this.setAttribute("text", "Sensor 1"); ;
    }

    // Verificar si el elemento tiene un atributo 'value', de no ser así, se asigna uno nuevo
    if (!this.hasAttribute("value")) {
      this.setAttribute("value", "?");
    }
    // Añadir el optionChooser al panel
    this.panel.appendChild(this.optionChooser);
  
    // Añadir el panel al Shadow DOM del componente
    this.shadowRoot.appendChild(this.panel);
  
    // Añadir evento para detectar cambios en el optionChooser
    this.optionChooser.addEventListener("change", this.change.bind(this));
    super.connectedCallback();
  }
  
  //-----------------------------------------------------------------------------
  // Método para llenar el contenido del optionChooser
  //-----------------------------------------------------------------------------
  generateOptionChooserContent() {
    // Añadir una opción por defecto al optionChooser
    const defaultOption = document.createElement("option");
    defaultOption.text = "Sensor 1";
    defaultOption.value = "?";
    defaultOption.selected = false;
    this.optionChooser.appendChild(defaultOption);
  }
  
  //-----------------------------------------------------------------------------
  // Método que se ejecuta cuando hay un cambio en el optionChooser
  //-----------------------------------------------------------------------------
  change(event) {
    console.log(this.getAttribute("id"), "change", event.target.value);
    console.log(this.getAttribute("id"), "change", event.target.text);
    if (window.optionChooserChange) {
      window.optionChooserChange(this.getAttribute("id"), event.target.value);
    }
  }

  //-----------------------------------------------------------------------------
  // Método para añadir una nueva opción al optionChooser
  //-----------------------------------------------------------------------------
  addOption(label, value) {
    const option = document.createElement("option");
    option.text = label;
    option.value = value;
    this.optionChooser.appendChild(option);
  }

  //-----------------------------------------------------------------------------
  // Atributos observados por el componente
  //-----------------------------------------------------------------------------
  static get observedAttributes() {
    return ["value", "text"];
  }

  //-----------------------------------------------------------------------------
  // Método que se ejecuta cuando hay cambios en los atributos del componente
  //-----------------------------------------------------------------------------
  attributeChangedCallback(name, old, now) {
    if (typeof this.optionChooser === "undefined") return;
    switch (name) {
      case "value":
        this.optionChooser.value = now;
        break;
      case "text":
        // Suponiendo que el primer elemento es siempre el defaultOption
        this.optionChooser.querySelector("option").text = now;
        break;
    }
  }

  //-----------------------------------------------------------------------------
  // Métodos get y set para los atributos del componente
  //-----------------------------------------------------------------------------
  // Métodos get y set para los atributos del componente
  get value() {
    return this.getAttribute("value");
  }

  set value(newVal) {
    this.setAttribute("value", newVal);
    // Actualizar en el DOM
    if (this.optionChooser) {
      this.optionChooser.value = newVal;
    }
  }

  // Nuevo getter y setter para "text"
  get text() {
    return this.getAttribute("text");
  }

  set text(newText) {
    this.setAttribute("text", newText);
    // Actualizar en el DOM
    if (this.optionChooser) {
      const defaultOption = this.optionChooser.querySelector("option");
      defaultOption.text = newText;
    }
  }
}
// Registro del nuevo elemento personalizado "emic-widget-optionChooser"
customElements.define("emic-widget-optionchooser", EmicWidgetOptionChooser);
