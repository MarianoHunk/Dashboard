import { EmicWidget } from "./emicWidget.js";

class EmicWidgetGrid extends EmicWidget {

  // Definimos variables.
  static namesList = {};
  myDiv;

  // Constructor
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  
  // Método para obtener un nuevo ID.
  getNewID() {
    var i;
    for (i = 1; document.getElementById(`grid-${i}`) !== null; i++);
    return `grid-${i}`;
  }

  //-----------------------------------------------------------------------------------
  // Cuando el elemento es conectado al DOM
  //-----------------------------------------------------------------------------------
  connectedCallback() {
    if (!super.preconnectedCallback("Grid")) {
      return;
    }

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }
    // Mostrar identificador
    this.setAttribute("title", this.getAttribute("id"));

    //INICIO ELEMENTO

    //propiedades internas
    this.altoGrilla="300px";
    this.anchoGrilla="300px";

    this.altoCelda = "40px";
    this.anchoCelda = "150px";

    this.cantidadFilas = 10;

    this.nombresColumnas = ["columna 1", "columna 2", "columna 3"];

    //cargo estilo
    let estilo = `<style>
    *{
      margin: 0;
      padding: 0;
      gap:0;
      box-sizing: border-box;
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    }

    .div-principal{
      background-color: rgb(0, 200, 100);
      border: solid 1px black;
      overflow: auto;
      display: grid;
      }
    
    .etiqueta-columna{
      background-color:cornflowerblue;
      position: sticky;
      top: 0px;
      font-weight: bold;
    }

    .celda{
      background-color:chartreuse;
      }
    
    .centrado{
      width: 1fr;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: 1px solid black;
      overflow: hidden;
    }
    </style>`
    this.shadowRoot.innerHTML = estilo + `<div class="div-principal"></div>`

    this.redibujar();

    //----------------------------------------------------
    // Se define las llamadas a los eventos

    //img.addEventListener('click', this.presionado);
    //img.addEventListener("mousedown", this.presionado.bind(this));
    //img.addEventListener("mouseup", this.soltado.bind(this));
    //----------------------------------------------------

    super.connectedCallback();
  }

  redibujar(){
    let contenedor = this.shadowRoot.querySelector(".div-principal");

    //establezco el size de la grilla
    contenedor.style.width = this.anchoGrilla;
    contenedor.style.height = this.altoGrilla;
    
    //establezco el ancho de las columnas
    contenedor.style.gridTemplateColumns = `repeat(${ this.nombresColumnas.length }, ${ this.anchoCelda })`;

    //establezco el alto de las filas
    contenedor.style.gridTemplateRows = `repeat(${ this.cantidadFilas + 1 }, min-content`;

    //agrego los titulos
    this.nombresColumnas.forEach(nombre => {
      let div = document.createElement("div");
      div.classList.add("etiqueta-columna", "centrado");
      div.style.height = "25px";//alto fijo
      div.innerText = nombre;
      contenedor.appendChild(div);
    });
  
    //agrego las celdas
    for (let contador = 0; contador != (this.nombresColumnas.length * this.cantidadFilas); contador++){
      let div = document.createElement("div");
      div.classList.add("celda", "centrado");
      div.style.height = this.altoCelda;
      div.innerText="texto"
      contenedor.appendChild(div);
    };
  }

  presionado() {
    this.TinicioClick = new Date();
    console.log(this.getAttribute("id"), "presionado");

    if (window.buttonPress) buttonPress(this.getAttribute("id"));
  }
  soltado() {
    this.TfinClick = new Date();
    this.TDuracionClick = this.TfinClick - this.TinicioClick;
    console.log(this.getAttribute("id"), "soltado en :" + this.TDuracionClick + "[ms]");

    if (window.buttonRelease)
      buttonRelease(this.getAttribute("id"), this.TDuracionClick);
  }
  //-----------------------------------------------------------------------------------
  // Si hay cambios en tiempo de ejecucion.
  //-----------------------------------------------------------------------------------
  static get observedAttributes() {
    return ["value"];
  }
}

customElements.define("emic-widget-grid", EmicWidgetGrid);
