import { EmicWidget } from "./emicWidget.js";

class EmicWidgetDropdown extends EmicWidget {
  static namesList = {};
  dropdown;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getNewID() {
    var i;
    for (i = 1; EmicWidgetDropdown.namesList[`dropdown-${i}`]; i++);
    EmicWidgetDropdown.namesList[`dropdown-${i}`] = this;
    return `dropdown-${i}`;
  }

  connectedCallback() {
    if (!super.preconnectedCallback("Dropdown")) {
      return;
    }

    this.dropdown = document.createElement("select");
    this.dropdown.className = "form-control";
    
    // Añadir una opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.text = "Sensor 1";  // Corregido: Cambiar "Options" a "Option"
    defaultOption.value = "?";
    defaultOption.selected = true;
    this.dropdown.appendChild(defaultOption);  // Corregido: Usar appendChild en lugar de add

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    this.shadowRoot.appendChild(this.dropdown);

    this.dropdown.addEventListener("change", this.change.bind(this));  // Corregido: Agregar .bind(this)
    super.connectedCallback();
  }

  change(event) {
    console.log(this.getAttribute("id"), "change", event.target.value);
    if (window.dropdownChange) {
      window.dropdownChange(this.getAttribute("id"), event.target.value);
    }
  }

  addOption(label, value) {
    const option = document.createElement("option");
    option.text = label;
    option.value = value;
    this.dropdown.appendChild(option);  // Corregido: Usar appendChild en lugar de add
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(name, old, now) {
    if (typeof this.dropdown === "undefined") return;  // Corregido: Usar === en lugar de ==
    switch (name) {
      case "value":
        this.dropdown.value = now;
        break;
    }
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(newVal) {
    this.setAttribute("value", newVal);
  }
}

customElements.define("emic-widget-dropdown", EmicWidgetDropdown);
