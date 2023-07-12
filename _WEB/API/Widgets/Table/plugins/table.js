import { EmicWidget } from "./emicWidget.js";

class EmicWidgetTable extends EmicWidget {
  static namesList = {};
  myDiv;

  //****************************************************************************/
  //                   Método para obtener un nuevo ID
  //****************************************************************************/
  // Este método se utiliza para generar un nuevo ID único para el elemento.
  getNewID() {
    var i;
    for (i = 1; EmicWidgetTable.namesList[`table-${i}`]; i++);
    EmicWidgetTable.namesList[`table-${i}`] = this;
    return `table-${i}`;
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
    // Verificar si se ha preconectado correctamente antes de continuar
    if (!super.preconnectedCallback("Table")) {
      return;
    }

    // Crea un nuevo elemento HTML <table> y lo asigna a la variable 'table'
    const table = document.createElement("table");
    // Asigna el elemento 'table' al atributo 'myDiv' de la instancia actual de la clase
    this.myDiv = table;
    // Crea un nuevo elemento HTML <style> y lo asigna a la variable 'style'
    const style = document.createElement("style");
    // Agrega el elemento 'table' como hijo del Shadow DOM de este componente
    this.shadowRoot.appendChild(table);
    // Agrega el elemento 'style' como hijo del Shadow DOM de este componente
    this.shadowRoot.appendChild(style);

    // Establecer un nuevo ID si no se ha proporcionado uno
    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    // Generar el contenido de la tabla
    this.generateTableContent();

    // Agregar estilos CSS para el borde de la tabla
    style.textContent = `
    table {
      border: 1px solid black;
      border-collapse: collapse;
    }
    
    td {
      border: 1px solid black;
      padding: 5px;
    }
  `;

    // Agregar un event listener para el clic
    this.addEventListener("click", this.eventClickListener);
    super.connectedCallback();
  }

  generateTableContent() {
    const table = this.myDiv;
    table.innerHTML = "";

    for (let i = 0; i < 2; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 2; j++) {
        const cell = document.createElement("td");
        cell.textContent = "";
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  }
  //****************************************************************************/
  //                            Cuando se hace click
  //****************************************************************************/
  // Este método se ejecuta cuando se hace clic en el elemento personalizado.
  eventClickListener(ev) {
    // Lógica del listener del evento de clic va aquí
  }
  //****************************************************************************/
  //                               Si hay cambios
  //****************************************************************************/
  // Este método define los atributos que se deben observar para detectar cambios.
  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name, old, now) {
    // Lógica del callback para cambios de atributos va aquí
  }

  set value(newVal) {
    // Setter para el atributo "value" va aquí
  }

  get value() {
    // Getter para el atributo "value" va aquí
  }
}

customElements.define("emic-widget-table", EmicWidgetTable);
