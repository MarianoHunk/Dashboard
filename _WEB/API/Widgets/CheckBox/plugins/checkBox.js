import { EmicWidget } from "./emicWidget.js";

class EmicWidgetCheckbox extends EmicWidget {
  //-----------------------------------------------------------------------------------
  // Definimos variables.
  //-----------------------------------------------------------------------------------
  static namesList = {};
  checkbox;

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
    for (i = 1; EmicWidgetCheckbox.namesList[`checkbox-${i}`]; i++);
    EmicWidgetCheckbox.namesList[`checkbox-${i}`] = this;
    return `checkbox-${i}`;
  }

  //-----------------------------------------------------------------------------------
  // Cuando el elemento es conectado al DOM
  //-----------------------------------------------------------------------------------
  connectedCallback() {
    if (!super.preconnectedCallback("Checkbox")) {
      return;
    }
    // Creamos un nuevo elemento <input>
    this.checkbox = document.createElement("input");

    // Establecemos el tipo de input como "checkbox"
    this.checkbox.type = "checkbox";

    // Si el elemento no tiene un atributo "id", se le asigna uno nuevo
    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
    // Mostrar identificador
    this.setAttribute("title", this.getAttribute("id"));

    // Si el elemento no tiene un atributo "checked", se le asigna el valor false
    if (!this.hasAttribute("checked")) {
      this.setAttribute("checked", "0");
    }
    //----------------------------------------------------
    // Agregamos los estilos al shadowRoot
    //----------------------------------------------------
    const style = document.createElement("style");
    style.textContent = `
    /* Eliminar el aspecto por defecto del checkbox */
    input[type="checkbox"] {
      appearance: none;
      width: 20px;
      height: 20px;
      background-color: #e6f7ff;
      border: 3px solid #008CBA;
      cursor: pointer;
    }
    
    /* Diseño cuando el checkbox está seleccionado */
    input[type="checkbox"]:checked {
      background: linear-gradient(to bottom, rgb(110, 159, 243) 40%, #6c79a7);
      border: 3px solid #008CBA;
    }
    
  `;
    this.shadowRoot.appendChild(style);
    //----------------------------------------------------
    this.shadowRoot.appendChild(this.checkbox);

    //----------------------------------------------------
    // Se define las llamadas a los eventos
    this.checkbox.addEventListener("change", this.change.bind(this));
    //----------------------------------------------------
    super.connectedCallback();
  }

  // Método llamado cuando ocurre el evento "change" en el checkbox
  change(event) {
    let checkedValue = event.target.checked ? "1" : "0";
    console.log(this.getAttribute("id"), " change ", checkedValue);

    // Si existe una función global "checkboxChange", se llama a esa función y se le pasa el ID del checkbox y su nuevo valor
    if (window.checkboxChange)
      checkboxChange(this.getAttribute("id"), checkedValue);
    this.setAttribute("checked", checkedValue); // Actualizamos el atributo "checked"
  }
  //-----------------------------------------------------------------------------------
  // Si hay cambios en tiempo de ejecucion.
  //-----------------------------------------------------------------------------------
  // Lista de atributos observados por el elemento
  static get observedAttributes() {
    return ["checked"];
  }

  // Método llamado cuando hay cambios en los atributos del elemento
  attributeChangedCallback(name, old, now) {
    // Si el checkbox no está definido, se retorna
    if (typeof this.checkbox == "undefined") return;

    switch (name) {
      // Si el atributo cambiado es "checked", se actualiza el estado del checkbox
      case "checked":
        this.checkbox.checked = now == "1";
        break;
    }
  }

  //-----------------------------------------------------------------------------------
  // Métodos para obtener el valor de los atributos
  //-----------------------------------------------------------------------------------
  // Método para obtener el valor del atributo "checked"
  get checked() {
    return this.getAttribute("checked") == "1";
  }

  // Método para establecer el valor del atributo "checked"
  set checked(newVal) {
    this.setAttribute("checked", newVal ? "1" : "0");
  }
}

// Se define el nuevo elemento "emic-widget-checkbox"
customElements.define("emic-widget-checkbox", EmicWidgetCheckbox);
