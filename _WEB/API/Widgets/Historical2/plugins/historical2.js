#setFile temp/header.html
<script src="https://code.highcharts.com/highcharts.js" type="text/javascript"> </script>
#unSetFile

import { EmicWidget } from "./emicWidget.js";

// Función de utilidad para intentar parsear JSON
function tryParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str; // Si el análisis falla, devolver la cadena original
  }
}

class EmicWidgetHistorical2 extends EmicWidget {
  static namesList = {};
  myHistorical2;

  getNewID() {
      let i;
      for (i = 1; EmicWidgetHistorical2.namesList[`historical2-${i}`]; i++);
      EmicWidgetHistorical2.namesList[`historical2-${i}`] = this;
      return `historical2-${i}`;
  }

  constructor() {
      super();
      this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!super.preconnectedCallback("Historical2")) {
        return;
    }

    // Crear el contenedor div principal
    const mainDiv = document.createElement("div");
    mainDiv.style.width = "840px";  // Considerando el padding
    mainDiv.style.padding = "20px";
    mainDiv.style.border = "1px solid #ddd";
    mainDiv.style.backgroundColor = "#f9f9f9";
    mainDiv.style.boxShadow = "2px 2px 12px rgba(0, 0, 0, 0.1)";
    this.shadowRoot.appendChild(mainDiv);

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

    if (typeof Highcharts === "undefined") {  
        const img = document.createElement("img");
        img.src = "/dashboard/.{userName}./.{project}./.{userModule}./images/icons/grafica.png";
        img.alt = "imagen Emic";
        img.style = "width:800px; height:250px; display: block; margin: 0 auto;";
        mainDiv.appendChild(img);
    } else {
      this.plotDiv = document.createElement("div");
      this.plotDiv.style.width = "800px";
      this.plotDiv.style.height = "250px";
      mainDiv.appendChild(this.plotDiv);
      this.createChart();
  }

    // Estilos CSS internos
    const style = document.createElement('style');
    style.textContent = `
        img {
            max-width: 100%;
            display: block;
            margin: 0 auto;
        }
    `;
    this.shadowRoot.appendChild(style);

    super.connectedCallback();
}


    // Función para crear y configurar el gráfico utilizando Highcharts
    createChart() {
      const labels = tryParseJSON(this.getAttribute("data-labels"));
      const datasets = tryParseJSON(this.getAttribute("data-values"));
      const labelNames = tryParseJSON(this.getAttribute("label"));
  
      const seriesData = datasets.map((data, index) => ({
          name: labelNames[index],
          data: data
      }));
  
      this.chart = Highcharts.chart(this.plotDiv, {
          chart: {
              type: 'line',
              zoomType: 'xy',  // Activar zoom en ambos ejes
              panning: true,   // Habilitar el desplazamiento después del zoom
              panKey: 'shift', // Usar la tecla shift para desplazar
              resetZoomButton: {
                  position: {
                      align: 'right',
                      verticalAlign: 'top',
                      x: -10,
                      y: 10
                  },
                  theme: {
                      fill: 'white',
                      stroke: 'silver',
                      r: 0,
                      states: {
                          hover: {
                              fill: '#ddd',
                              style: {
                                  color: 'black'
                              }
                          }
                      }
                  }
              }
          },
          title: {
              text: 'Historical2 Data'
          },
          xAxis: {
              categories: labels,
              title: {
                  text: 'Labels'
              },
              // Puedes ajustar estas propiedades si quieres controlar el zoom
              // minZoom: 0.5,  // Por ejemplo, zoom mínimo de 50%
              // maxZoom: 5     // Por ejemplo, zoom máximo de 500%
          },
          yAxis: {
              title: {
                  text: 'Values'
              }
          },
          plotOptions: {
              series: {
                  turboThreshold: 5000 // Ajusta según tus necesidades
              }
          },
          series: seriesData
      });
  }
  


  attributeChangedCallback(name, old, now) {
    if (old !== now) {
        if (name === "data-labels") {
            const newLabels = tryParseJSON(now);
            this.chart.xAxis[0].setCategories(newLabels); // Actualizar las categorías del eje X

        } else if (name === "data-values") {
            const newValues = tryParseJSON(now);
            if (Array.isArray(newValues) && newValues.length > 0) {
                newValues.forEach((data, index) => {
                    if (this.chart.series[index]) {
                        this.chart.series[index].setData(data); // Actualizar los datos de la serie
                    }
                });
            }

        } else if (name === "label") {
            const labelNames = tryParseJSON(now);
            if (Array.isArray(labelNames)) {
                labelNames.forEach((label, index) => {
                    if (this.chart.series[index]) {
                        this.chart.series[index].update({ name: label }); // Actualizar el nombre de la serie
                    }
                });
            } else {
                console.error("label no es un array válido");
            }
        }
        // Refrescar o redibujar el gráfico
        this.chart.redraw();
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

customElements.define("emic-widget-historical2", EmicWidgetHistorical2);
