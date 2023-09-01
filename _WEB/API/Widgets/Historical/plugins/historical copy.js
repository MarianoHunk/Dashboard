#setFile temp/header.html
<script src="https://cdn.jsdelivr.net/npm/chart.js" type="text/javascript"> </script>
#unSetFile

import { EmicWidget } from "./emicWidget.js";

class EmicWidgetHistorical extends EmicWidget {
  static namesList = {};
  myHistorical;
  chartCheckInterval;

  //****************************************************************************/
  //                   Método para obtener un nuevo ID
  //****************************************************************************/
  getNewID() {
    let i;
    for (i = 1; EmicWidgetHistorical.namesList[`historical-${i}`]; i++);
    EmicWidgetHistorical.namesList[`historical-${i}`] = this;
    return `historical-${i}`;
  }

  //****************************************************************************/
  //                               Constructor
  //****************************************************************************/
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  //****************************************************************************/
  //               Cuando el elemento es conectado al DOM
  //****************************************************************************/
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
      this.setAttribute("label", " "); 
    }
    if (!this.hasAttribute("data-labels")) {
      // Corrección: Establecer un valor más representativo
      this.setAttribute("data-labels", " "); 
    }
  
    if (!this.hasAttribute("data-values")) {
      // Establecer valores de ejemplo para los atributos
      this.setAttribute("data-values", JSON.stringify([
        [0]]
        // Agregar más conjuntos de datos si es necesario
      ));
    }
    //------- Fin Agregamos atributos---------------
  
    if (typeof Chart === "undefined") {  // Verificación de Chart.js
      const img = document.createElement("img");
      img.src = "/dashboard/.{userName}./.{project}./.{userModule}./images/icons/grafica.png";
      img.alt = "imagen Emic";
      this.shadowRoot.appendChild(img);
    }
    else {
      // Crear un canvas para el gráfico
      this.canvas = document.createElement("canvas");
  
      // Aplicar estilo al canvas para agregar un recuadro
      this.canvas.style.border = "1px solid black";
      this.canvas.style.padding = "10px";
      this.canvas.style.backgroundColor = "white";
      this.canvas.style.width = "600px"; // Puedes ajustar esto a tus necesidades
      this.canvas.style.height = "350px"; // Puedes ajustar esto a tus necesidades
  
      this.shadowRoot.appendChild(this.canvas);
  
      this.createChart(); // Llamamos a la función para crear el gráfico
    }
    super.connectedCallback();
  }
  
  // Función para crear y configurar el gráfico utilizando los valores de los atributos
  createChart() {
    const labels = this.getAttribute("data-labels");  // Cambiado aquí
    const datasets = JSON.parse(this.getAttribute("data-values"));
    const canvas = this.canvas; // Usamos el canvas previamente creado
    const labelNames = this.getAttribute("label");
  
  // Asegurar que el número de conjuntos de datos coincida con el número de etiquetas
  while (datasets.length < labelNames.length) {
    datasets.push([]);
  }
  datasets.length = labelNames.length; // Si hay más conjuntos, truncar la cantidad

    this.chart = new Chart(canvas.getContext("2d"), {
      type: "line",
      data: {
        labels: labels,
        datasets: datasets.map((data, index) => ({
          label: labelNames[index], // Usar el nombre correspondiente
          data: data,
          fill: false,
          borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
          tension: 0.1,
        })),
      },
      options: {
        scales: {
          x: [
            {
              ticks: {
                autoSkip: true,
                maxRotation: 45, // Rotar las etiquetas en un ángulo de 45 grados
                minRotation: 0,
              },
            },
          ],
        },
      },
    });
  }
  
  
  //****************************************************************************/
  //                               Si hay cambios
  //****************************************************************************/
  attributeChangedCallback(name, old, now) {
    if (old !== now && this.chart) {
      if (name === "data-labels") {
        this.chart.data.labels = JSON.parse(now);
      }
      else if (name === "data-values") {
        const newValues = JSON.parse(now);
        const labelNames = JSON.parse(this.getAttribute("label"));
  
        // Reconfiguramos la longitud de this.chart.data.datasets.
        this.chart.data.datasets = newValues.map((data, index) => ({
          label: labelNames[index],
          data: data,
          fill: false,
          borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
          tension: 0.1,
        }));
      } 
      else if (name === "label") {
        const labelNames = JSON.parse(now);
        this.chart.data.datasets.forEach((dataset, index) => {
          dataset.label = labelNames[index];
        });
      }
      this.chart.update();
    }
  }
  
  static get observedAttributes() {
    return ["data-labels", "data-values", "label"];
  }
  
  //****************************************************************************/
  //               Cuando el elemento es desconectado del DOM
  //****************************************************************************/
  disconnectedCallback() {
    clearInterval(this.chartCheckInterval);  // Detener el intervalo
  }
  
}

customElements.define("emic-widget-historical", EmicWidgetHistorical);
