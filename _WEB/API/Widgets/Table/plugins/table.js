import { EmicWidget } from "./emicWidget.js";

class EmicWidgetTable extends EmicWidget {
  static namesList = {};
  myDiv;
  getNewID() {
    var i;
    for (i = 1; document.getElementById(`table-${i}`) !== null; i++);
    return `table-${i}`;
  }
  static get observedAttributes() {
    return [];
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!super.preconnectedCallback("Table")) {
      return;
    }
    const table = document.createElement("table");
    this.myDiv = table;
    const style = document.createElement("style");
    this.shadowRoot.appendChild(table);
    this.shadowRoot.appendChild(style);

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    this.generateTableContent();

    this.addEventListener("click", this.eventClickListener);
    super.connectedCallback();
  }

  generateTableContent() {
    const table = this.myDiv;
    table.innerHTML = "";

    let counter = 1;
    for (let i = 0; i < 4; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 4; j++) {
        const cell = document.createElement("td");
        cell.textContent = counter++;
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  }

  eventClickListener(ev) {
    // Event listener logic goes here
  }

  attributeChangedCallback(name, old, now) {
    // Attribute change callback logic goes here
  }

  set value(newVal) {
    // Setter for the "value" attribute goes here
  }

  get value() {
    // Getter for the "value" attribute goes here
  }
}

customElements.define("emic-widget-table", EmicWidgetTable);


/*

import { EmicWidget } from "./emicWidget.js";
import { EmicWidget } from "./emicWidget.js";
class EmicWidgetTable extends EmicWidget {
class EmicWidgetTable extends EmicWidget {
  static namesList = {};
  static namesList = {};
  myDiv;
  getNewID() {
    var i;
    for (i = 1; document.getElementById(`table-${i}`) !== null; i++);
  table;
    return `table-${i}`;
  }
  // Constructor
  static get observedAttributes() {
    return [];
  }
  constructor() {
  constructor() {
    super();
    super();
    this.attachShadow({ mode: "open" });
    this.attachShadow({ mode: "open" });
  }
  }
  // Método para obtener un nuevo ID
  getNewID() {
    var i;
    for (i = 1; EmicWidgetTable.namesList[`table-${i}`]; i++);
    EmicWidgetTable.namesList[`table-${i}`] = this;
    return `table-${i}`;
  }
  // Cuando el elemento es conectado al DOM
  connectedCallback() {
  connectedCallback() {
    if (!super.preconnectedCallback("Table")) {
    if (!super.preconnectedCallback("Table")) {
      return;
      return;
    }
    }
    const table = document.createElement("table");
    this.myDiv = table;
    const style = document.createElement("style");
    this.shadowRoot.appendChild(table);
    this.shadowRoot.appendChild(style);
    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
    this.render();
    this.generateTableContent();
    this.addEventListener("click", this.eventClickListener);
    super.connectedCallback();
  }
  }
  render() {
  generateTableContent() {
    this.table = document.createElement("template");
    const table = this.myDiv;
    const div = document.createElement("div");
    this.table=div
    const style = document.createElement("style");
    this.shadowRoot.appendChild(div);
    this.shadowRoot.appendChild(style);
    this.table.innerHTML = `
    table.innerHTML = "";
    let counter = 1;
    for (let i = 0; i < 4; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 4; j++) {
        const cell = document.createElement("td");
        cell.textContent = counter++;
        row.appendChild(cell);
      <div>
      }
        <label for="largo">Largo:</label>
      table.appendChild(row);
        <input type="number" id="largo" min="1" value="4">
      </div>
      <div>
        <label for="alto">Alto:</label>
        <input type="number" id="alto" min="1" value="4">
      </div>
      <label for="valor">Medidores:</label>
      <input type="number" id="valor" min="1" value="1">
      <button id="generar">Generar Tabla</button>
      <div id="resultado"></div>
    `;
    }
    this.shadowRoot.appendChild(this.table.content.cloneNode(true));
    // Obtener referencias a los elementos del DOM
    const generarBtn = this.shadowRoot.getElementById("generar");
    generarBtn.addEventListener("click", () => this.generarTabla());
    this.largoInput = this.shadowRoot.getElementById("largo");
    this.altoInput = this.shadowRoot.getElementById("alto");
    this.valorInput = this.shadowRoot.getElementById("valor");
    this.resultadoDiv = this.shadowRoot.getElementById("resultado");
  }
  }
  generarTabla() {
  eventClickListener(ev) {
    // Obtener dimensiones y valor ingresados por el usuario
    // Event listener logic goes here
    const largo = parseInt(this.largoInput.value);
  }
    const alto = parseInt(this.altoInput.value);
    const valor = parseInt(this.valorInput.value);
    let tablaHtml = "<table>";
  attributeChangedCallback(name, old, now) {
    let contador = 1; // Contador para el valor ascendente
    // Attribute change callback logic goes here
  }
    // Generar filas y columnas de la tabla
  set value(newVal) {
    for (let i = 0; i < alto; i++) {
    // Setter for the "value" attribute goes here
      tablaHtml += "<tr>";
      for (let j = 0; j < largo; j++) {
        if (contador <= valor) {
          tablaHtml += "<td>" + contador + "</td>";
          contador++; // Incrementar el valor ascendente
        } else {
          tablaHtml += "<td></td>"; // Celda vacía para los elementos excedentes
        }
      }
      tablaHtml += "</tr>";
    }
  }
    tablaHtml += "</table>";
    // Mostrar la tabla generada en el elemento <div> resultadoDiv
  get value() {
    this.resultadoDiv.innerHTML = tablaHtml;
    // Getter for the "value" attribute goes here
  }
  }
}
}
customElements.define("emic-widget-table", EmicWidgetTable);
customElements.define("emic-widget-table", EmicWidgetTable);
function createEmicWidgetTableSection() {
  const section = document.createElement("section");
  const emicWidgetTable = document.createElement("emic-widget-table");
  section.appendChild(emicWidgetTable);
  return section;
}
const emicWidgetTableSection = createEmicWidgetTableSection();
document.body.appendChild(emicWidgetTableSection);

*/