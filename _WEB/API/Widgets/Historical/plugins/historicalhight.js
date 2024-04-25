EMIC:setOutput(TARGET:temp/header.html)
<script src="https://code.highcharts.com/highcharts.js" type="text/javascript"> </script>
EMIC:restoreOutput

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

  getNewID() {
    let i;
    for (i = 1; EmicWidgetHistorical.namesList[`historical-${i}`]; i++);
    EmicWidgetHistorical.namesList[`historical-${i}`] = this;
    return `historical-${i}`;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!super.preconnectedCallback("Historical")) {
      return;
    }

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    if (!this.hasAttribute("label")) {
      this.setAttribute("label", JSON.stringify(" "));
    }

    if (!this.hasAttribute("data-labels")) {
      this.setAttribute("data-labels", JSON.stringify(" "));
    }

    if (!this.hasAttribute("data-values")) {
      this.setAttribute("data-values", JSON.stringify([[0]]));
    }

    if (typeof Highcharts === "undefined") {  // Verificación de Highcharts
      const img = document.createElement("img");
      img.src = "/dashboard/.{userName}./.{project}./.{userModule}./images/icons/grafica.png";
      img.alt = "imagen Emic";
      img.style = "width:800px; height:250px;";
      this.shadowRoot.appendChild(img);
    }
    else {
      // Crear un div para el gráfico
      this.chartDiv = document.createElement("div");
      this.chartDiv.style.width = "800px"; 
      this.chartDiv.style.height = "250px"; 
      this.shadowRoot.appendChild(this.chartDiv);
  
      this.createChart(); // Llamamos a la función para crear el gráfico
    }
    super.connectedCallback();
  }

  createChart() {
  const labels = tryParseJSON(this.getAttribute("data-labels"));
  const datasets = tryParseJSON(this.getAttribute("data-values"));
  const labelNames = tryParseJSON(this.getAttribute("label"));
  const chartDiv = this.chartDiv;

  this.chart = Highcharts.chart(chartDiv, {
    chart: {
      type: 'line',
      zoomType: 'xy', // Habilitar el zoom y paneo
      panKey: 'shift',
      panning: true
    },
    title: {
      text: null // Eliminar el título
    },
    xAxis: {
      categories: labels,
      labels: {
        rotation: 0, // Ángulo de rotación a 0
        useHTML: true, // Permitir el uso de HTML para mayor control
        style: {
          "white-space": "normal" // Permitir saltos de línea
        }
      }
    },
    yAxis: {
      title: {
        text: 'Valores'
      }
    },
    exporting: { // Habilitar botones de exportación
      enabled: true
    },
    legend: { // Leyenda interactiva
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0,
      useHTML: true,
      labelFormatter: function() {
        return `<div onclick="alert('${this.name}')">${this.name}<div>`;
      }
    },
    series: datasets.map((data, index) => ({
      name: labelNames[index], 
      data: data
    })),
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: true // Deshabilitar el seguimiento del ratón
      }
    },
    tooltip: { // Tooltip personalizado
      formatter: function() {
        return `<b>${this.series.name}</b><br>${this.x}: ${this.y}`;
      }
    }
  });
}


  attributeChangedCallback(name, old, now) {
    if (old !== now && this.chart) {
      if (name === "data-labels" || name === "data-values" || name === "label") {
        this.createChart(); // Simplemente volvemos a crear el gráfico
      }
    }
  }

  static get observedAttributes() {
    return ["data-labels", "data-values", "label"];
  }
  
  disconnectedCallback() {
    // No es necesario detener el intervalo en Highcharts
  }
}

customElements.define("emic-widget-historical", EmicWidgetHistorical);