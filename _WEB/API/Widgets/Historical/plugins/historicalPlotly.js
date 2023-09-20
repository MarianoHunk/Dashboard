#setFile temp/header.html
<script src="https://cdn.plot.ly/plotly-latest.min.js" type="text/javascript"> </script>
#unSetFile

// Importamos el módulo padre
import { EmicWidget } from "./emicWidget.js";

// Función de utilidad para intentar parsear JSON
function tryParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str; // Si el análisis falla, devolver la cadena original
  }
}

class EmicWidgetHistorical extends EmicWidget {
  static namesList = {};
  myHistorical;

  // Método para obtener un nuevo ID
  getNewID() {
    let i;
    for (i = 1; EmicWidgetHistorical.namesList[`historical-${i}`]; i++);
    EmicWidgetHistorical.namesList[`historical-${i}`] = this;
    return `historical-${i}`;
  }

  // Constructor
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Cuando el elemento es conectado al DOM
  connectedCallback() {
    if (!super.preconnectedCallback("Historical")) {
      return;
    }
  //------- Agregamos atributos---------------
  if (!this.hasAttribute("id")) {
    this.setAttribute("id", this.getNewID());
  }
  if (!this.hasAttribute("label")) {
    // Corrección: Establecer un valor más representativo
    this.setAttribute("label", JSON.stringify(" ")); 
  }
  if (!this.hasAttribute("data-labels")) {
    // Corrección: Establecer un valor más representativo
    this.setAttribute("data-labels", JSON.stringify(" ")); 
  }

  if (!this.hasAttribute("data-values")) {
    // Establecer valores de ejemplo para los atributos
    this.setAttribute("data-values", JSON.stringify([
      [0]]
      // Agregar más conjuntos de datos si es necesario
    ));
  }
  //------- Fin Agregamos atributos---------------
  
    if (typeof Plotly === "undefined") {  // Verificación de Plotly.js
      const img = document.createElement("img");
      img.src = "/dashboard/.{userName}./.{project}./.{userModule}./images/icons/grafica.png";
      img.alt = "imagen Emic";
      img.style = "width:800px; height:250px;";
      this.shadowRoot.appendChild(img);
    }
    else {
      // Crear un div para el gráfico de Plotly
      this.plotDiv = document.createElement("div");
      this.plotDiv.style.width = "800px";
      this.plotDiv.style.height = "250px";
      this.shadowRoot.appendChild(this.plotDiv);
  
      this.createChart(); // Llamamos a la función para crear el gráfico
    }
    super.connectedCallback();
  }
  
  // Función para crear y configurar el gráfico
  createChart() {
    const labels = tryParseJSON(this.getAttribute("data-labels"));
    const datasets = tryParseJSON(this.getAttribute("data-values"));
    const labelNames = tryParseJSON(this.getAttribute("label"));

    // Configuración del gráfico Plotly
    const traceData = datasets.map((data, index) => ({
      type: 'scatter',
      mode: 'lines+markers',
      x: labels,
      y: data,
      name: labelNames[index],
      line: {color: index === 0 ? 'rgb(100, 149, 237)' : `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`}
    }));

    const layout = {
      title: 'Tu Título Aquí',
      xaxis: {
        title: 'Eje X',
        tickvals: labels,
      },
      yaxis: {
        title: 'Eje Y'
      }
    };

    Plotly.newPlot(this.plotDiv, traceData, layout);
  }

  attributeChangedCallback(name, old, now) {
    if (old !== now) {
      let update = {};
      let shouldRestyle = false;
      let shouldRelayout = false;
  
      if (name === "data-labels") {
        const newLabels = tryParseJSON(now);
        update['x'] = [newLabels];
        shouldRestyle = true;
      } 
      else if (name === "data-values") {
        const newValues = tryParseJSON(now);
        update['y'] = [newValues];
        shouldRestyle = true;
      } 
      else if (name === "label") {
        const labelNames = tryParseJSON(now);
        if (Array.isArray(labelNames)) {
          for (let i = 0; i < labelNames.length; i++) {
            update[`data[${i}].name`] = labelNames[i];
          }
          shouldRelayout = true;
        } 
        else {
          console.error("label no es un array válido");
        }
      }
      
      if (shouldRestyle) {
        Plotly.restyle(this.plotDiv, update);
      }
  
      if (shouldRelayout) {
        Plotly.relayout(this.plotDiv, update);
      }
    }
  }
  

  static get observedAttributes() {
    return ["data-labels", "data-values", "label"];
  }

  // Cuando el elemento es desconectado del DOM
  disconnectedCallback() {
    // Limpieza si es necesario
  }
  
}

customElements.define("emic-widget-historical", EmicWidgetHistorical);
