import { EmicWidget } from "./emicWidget.js";

class EmicWidgetInputMinSec extends EmicWidget {
  // Definimos variables.
  static namesList = {};
  inputMinSec;

  // Constructor.
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getNewID() {
    var i;
    for (i = 1; EmicWidgetInputMinSec.namesList[`inputminsec-${i}`]; i++);
    EmicWidgetInputMinSec.namesList[`inputminsec-${i}`] = this;
    return `inputminsec-${i}`;
  }

  connectedCallback() {
    if (!super.preconnectedCallback("InputMinSec")) {
      return;
    }
    this.inputMinSec = document.createElement("input");
    this.inputMinSec.type = "text";
    this.inputMinSec.pattern = "^([0-5][0-9]|60):([0-5][0-9]|60)$";  // Validación para MM:SS

    //############################################################################
    // Aplicamos los estilos directamente al elemento para que coincidan con la gama de colores de la tabla
    this.inputMinSec.style.width = "150px";
    this.inputMinSec.style.height = "40px";
    this.inputMinSec.style.border = "2px solid #008CBA"; // Borde azul para coincidir con la tabla
    this.inputMinSec.style.borderRadius = "1px"; // Borde redondeado para coincidir con la tabla
    this.inputMinSec.style.backgroundColor = "transparent"; // Fondo celeste claro para coincidir con la tabla
    this.inputMinSec.style.fontFamily = "'Courier New', Courier, monospace"; // Tipo de letra para coincidir con la tabla
    this.inputMinSec.style.fontSize = "18px"; // Tamaño de letra de 18px para coincidir con la tabla
    this.inputMinSec.style.cursor = "pointer";

    //############################################################################

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    if (!this.hasAttribute("value")) {
      this.setAttribute("value", "00:00");
    }

    this.shadowRoot.appendChild(this.inputMinSec);

    // Eventos
    this.inputMinSec.addEventListener("change", (event) => {
      // Aquí podría ir validación adicional en JavaScript, si es necesario
      this.setAttribute("value", event.target.value);
      if (window.inputMinSecChange)
        inputMinSecChange(this.getAttribute("id"), event.target.value);
    });

    super.connectedCallback();
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(name, old, now) {
    if (typeof this.inputMinSec == "undefined") return;
    switch (name) {
      case "value":
        this.inputMinSec.value = now;
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

customElements.define("emic-widget-inputminsec", EmicWidgetInputMinSec);
