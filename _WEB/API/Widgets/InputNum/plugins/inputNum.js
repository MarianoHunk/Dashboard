import { EmicWidget } from "./emicWidget.js";

class EmicWidgetInputNum extends EmicWidget {
  // Definimos variables.
  static namesList = {};
  inputNum;

  // Constructor.
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getNewID() {
    var i;
    for (i = 1; EmicWidgetInputNum.namesList[`inputNum-${i}`]; i++);
    EmicWidgetInputNum.namesList[`inputNum-${i}`] = this;
    return `inputNum-${i}`;
  }

  connectedCallback() {
    if (!super.preconnectedCallback("InputNum")) {
      return;
    }
    this.inputNum = document.createElement("input");
    this.inputNum.type = "number";
    this.inputNum.step = "1";
    this.inputNum.maxLength = "2";

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
    this.setAttribute("title", this.getAttribute("id"));

    // Si el elemento no tiene un atributo "value", se le asigna un valor por defecto
    if (!this.hasAttribute("value")) {
      this.setAttribute("value", "0");
    }

    this.shadowRoot.appendChild(this.inputNum);

    this.inputNum.style = "width:40px; height:40px;";

    this.inputNum.addEventListener("change", this.change.bind(this));
    super.connectedCallback();
  }

  change(event) {
    console.log("change", event.target.value);
    if (window.inputNumChange)
      inputNumChange(this.getAttribute("id"), event.target.value);
    this.setAttribute("value", event.target.value); // Actualizamos el atributo "value"
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(name, old, now) {
    if (typeof this.inputNum == "undefined") return;
    switch (name) {
      case "value":
        this.inputNum.value = now;
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

customElements.define("emic-widget-inputnum", EmicWidgetInputNum);
