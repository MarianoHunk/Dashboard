import { EmicWidget } from "./emicWidget.js";

class EmicWidgetLabel extends EmicWidget {
  static namesList = {};
  myLabel;
  config = [
    {
      name: "font",
      type: "list",
      options: ["arial", "sansserif"],
    },
    {
      name: "color",
    },
  ];

  //-----------------------------------------------------------------------------------
  //                   Método para obtener un nuevo ID
  //-----------------------------------------------------------------------------------
  // Este método se utiliza para generar un nuevo ID único para el elemento.
  getNewID() {
    var i;
    for (i = 1; document.getElementById(`label-${i}`) !== null; i++);
    return `label-${i}`;
  }

  //-----------------------------------------------------------------------------------
  //                               Constructor
  //-----------------------------------------------------------------------------------
  // El constructor de la clase. Llama al constructor de la clase padre y crea un Shadow DOM.
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  //-----------------------------------------------------------------------------------
  //               Cuando el elemento es conectado al DOM
  //-----------------------------------------------------------------------------------
  // Este método se ejecuta cuando el elemento personalizado se conecta al DOM.
  connectedCallback() {
    if (!super.preconnectedCallback("Label")) {
      return;
    }
    const div = document.createElement("div");
    div.innerText = this.getAttribute("text_val");
    this.myLabel = div;
    const style = document.createElement("style");
    this.shadowRoot.appendChild(div);
    this.shadowRoot.appendChild(style);
    //############################################################################
    // Aplicamos los estilos directamente al elemento para que coincidan con la gama de colores de la tabla
    this.myLabel.style.height = "40px";
    this.myLabel.style.lineHeight = "40px"; // Centra el texto verticalmente al hacerlo igual a la altura
    //this.myLabel.style.border = "1px solid #008CBA"; // Borde azul para coincidir con la tabla
    this.myLabel.style.borderRadius = "1px"; // Borde redondeado para coincidir con la tabla
    this.myLabel.style.backgroundColor = "transparent"; // Fondo celeste claro para coincidir con la tabla
    this.myLabel.style.fontFamily = "'Courier New', Courier, monospace"; // Tipo de letra para coincidir con la tabla
    this.myLabel.style.fontSize = "18px"; // Tamaño de letra de 18px para coincidir con la tabla
    //############################################################################

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    if (!this.hasAttribute("text_val")) {
      this.setAttribute("text_val", this.getAttribute("id")); // Se setea el contenido de texto igual que el nombre del widget
    }

    div.textContent = this.getAttribute("text_val");
    this.addEventListener("click", this.eventClickListener);
    super.connectedCallback();
  }

  //-----------------------------------------------------------------------------------
  //                            Cuando se hace click
  //-----------------------------------------------------------------------------------
  // Este método se ejecuta cuando se hace clic en el elemento personalizado.
  eventClickListener(ev) {
    // Aquí puedes implementar la lógica del evento 'click' del Web Component
  }

  //-----------------------------------------------------------------------------------
  //                               Si hay cambios
  //-----------------------------------------------------------------------------------
  // Este método define los atributos que se deben observar para detectar cambios.
  static get observedAttributes() {
    return ["text_val"];
  }

  // Se ejecuta cuando hay cambios en los atributos observados
  attributeChangedCallback(name, old, now) {
    if (name === "text_val" && this.myLabel) {
      //this.myLabel.text_val = now;(error)
      this.myLabel.textContent = now;
    }
  }

  // Setter para el atributo "text_val".
  set text_val(newVal) {
    this.setAttribute("text_val", newVal);
  }

  // Getter para el atributo "text_val".
  get text_val() {
    return this.getAttribute("text_val");
  }
}

// Se registra el elemento personalizado en el navegador.
/*
 * El custom element: "emic-widget-label" *
 * Debe contener al menos un guion (-).
 * No puede contener letras en mayúscula.
 * Debe tener al menos un carácter que no sea un guion.
 */
customElements.define("emic-widget-label", EmicWidgetLabel);
