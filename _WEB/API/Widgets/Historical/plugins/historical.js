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

    if (!this.hasAttribute("sub-topic")) {
      this.setAttribute("sub-topic", "");
    }
    else if (this.getAttribute("sub-topic") !== "") {
      this.subTopic = this.getAttribute("sub-topic")
      document.addEventListener(`user:subscribe:${this.subTopic}`,this.reciveData); 
    }

    if (!this.hasAttribute("widthGraph")) {
      this.setAttribute("widthGraph", "800px");
    }
    if (!this.hasAttribute("heightGraph")) {
      this.setAttribute("heightGraph", "250px");
    }

    if (!this.hasAttribute("label")) {
      this.setAttribute("label", JSON.stringify(" "));
    }

    if (!this.hasAttribute("data-labels")) {
      this.setAttribute("data-labels", JSON.stringify(" "));
    }

    if (!this.hasAttribute("data-values")) {
      this.setAttribute("data-values", ""); //JSON.stringify([[0]]));
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
  // Función para descargar el gráfico


  createChart() {
    const labels = tryParseJSON(this.getAttribute("data-labels"));
    const datasets = tryParseJSON(this.getAttribute("data-values"));
    const labelNames = tryParseJSON(this.getAttribute("label"));
    const chartDiv = this.chartDiv;

    this.chart = Highcharts.chart(chartDiv, {
      chart: {
        type: 'line',
        zoomType: 'x', // Habilitar el zoom y paneo
        panKey: 'shift',
        panning: true,
        // Agregar la configuración para mover el botón 'Reset Zoom'
        resetZoomButton: {
          position: {
            align: 'left', 
            verticalAlign: 'top', 
            x: 700,
            y: 210
          },
          relativeTo: 'chart'
        }
      },
      exporting: { // Habilitar botones de exportación
        enabled: true,
        buttons: {
          contextButton: { // Configuración del botón contextual
            menuItems: [
              'printChart', // Imprimir gráfico
              'separator', // Separador
              'downloadPNG', // Descargar como PNG
              'downloadJPEG', // Descargar como JPEG
              'downloadPDF', // Descargar como PDF
              'downloadSVG' // Descargar como SVG
            ]
          }
        }
      },
      title: {
        text: null // Eliminar el título
      },
      xAxis: {
        type: 'datetime'
    },
      //xAxis: {
      //  categories: labels,
      //  labels: {
      //    rotation: -30, // Ángulo de rotación a 0
      //    useHTML: true, // Permitir el uso de HTML para mayor control
      //    style: {
      //      "white-space": "normal" // Permitir saltos de línea
      //    }
      //  }
      //},
      yAxis: {
        title: {
          text: 'Valores'
        }
      },
      exporting: { // Habilitar botones de exportación
        enabled: true
      },
      //legend: { // Leyenda interactiva
      //  layout: 'vertical',
      //  align: 'right',
      //  verticalAlign: 'middle',
      //  borderWidth: 0,
      //  useHTML: true,
      //  labelFormatter: function() {
      //    return `<div onclick="alert('${this.name}')">${this.name}<div>`;
      //  }
      //},
      series: datasets.map((data, index) => ({
        name: labelNames[index], 
        data: data
      })),
      //plotOptions: {
      //  line: {
      //    dataLabels: {
      //      enabled: true
      //    },
      //    enableMouseTracking: true,
      //    animation: false 
      //  }
      //},
      //tooltip: { // Tooltip personalizado
      //  formatter: function() {
      //    return `<b>${this.series.name}</b><br>${this.x}: ${this.y}`;
      //  }
      //}
    });

  }

  reciveData =  (e) => {
    console.log(e);
    this.addPoint(e.detail.message)
  }

  
  addPoint = (point) => {
    let X;
    let Y;

    if (point instanceof Object) {
      
      if (('X' in point)){
        X = point.X
      } else {
        X = (new Date()).getTime();
      }
      Y = parseFloat(point.Y);
    }
    else{

      X = (new Date()).getTime();
      Y = parseFloat(point);
    }
    if (this.chart) {
      this.chart.series[0].addPoint([X,parseFloat(Y)], true, false);
    }
  }

  attributeChangedCallback(name, old, now) {
    if (old !== now && this.chart) {
      if (name === "sub-topic"){

        if (old !== ""){
          document.removeEventListener(`user:subscribe:${old}`);
        }

        //this.subTopic = `user:subscribe:${now}`
        document.addEventListener(`user:subscribe:${now}`, this.reciveData); 
      }

      // Verifica si 'widthGraph' ha cambiado
      if (name === "widthGraph") {
        // Actualiza el ancho del canvas
        if (this.canvas) {
          this.canvas.style.width = `${now}px`; // Suponiendo que 'now' contiene un valor numérico
        }
        // Actualiza el ancho de la imagen, si existe
        const img = this.shadowRoot.querySelector("img");
        if (img) {
          img.style.width = `${now}px`;
        }
      }
      
      // Verifica si 'heightGraph' ha cambiado
      if (name === "heightGraph") {
        // Actualiza la altura del canvas
        if (this.canvas) {
          this.canvas.style.height = `${now}px`; // Suponiendo que 'now' contiene un valor numérico
        }
        // Actualiza la altura de la imagen, si existe
        const img = this.shadowRoot.querySelector("img");
        if (img) {
          img.style.height = `${now}px`;
        }
      }
      if (name === "data-labels" || name === "data-values" || name === "label") {
        this.createChart(); // Simplemente volvemos a crear el gráfico
      }
    }
  }

  static get observedAttributes() {
    return ["data-labels", "data-values", "label", "widthGraph", "heightGraph", "sub-topic"];
  }
  
  disconnectedCallback() {
    // No es necesario detener el intervalo en Highcharts
  }
}

customElements.define("emic-widget-historical", EmicWidgetHistorical);