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
      // Establecer valores de ejemplo para el atributo label
      this.setAttribute("label", JSON.stringify(["humedad", "temperatura"]));
    }
    if (!this.hasAttribute("data-labels")) {
      // Establecer valores de ejemplo para los atributos
      this.setAttribute("data-labels", JSON.stringify(["25-11-2023", "26-11-2023", "27-11-2023", "28-11-2023", "29-11-2023", "30-11-2023", "01-12-2023", "02-12-2023"]));
    }
  
    if (!this.hasAttribute("data-values")) {
      // Establecer valores de ejemplo para los atributos
      this.setAttribute("data-values", JSON.stringify([
        [10, 20, 30, 40, 50, 60, 70, 80], // Datos para Historical Data 1
        [15, 25, 35, 45, 55, 65, 75, 85], // Datos para Historical Data 2
        // Agregar más conjuntos de datos si es necesario
      ]));
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
      this.canvas.style.width = "400px"; // Puedes ajustar esto a tus necesidades
      this.canvas.style.height = "300px"; // Puedes ajustar esto a tus necesidades
  
      this.shadowRoot.appendChild(this.canvas);
  
      this.createChart(); // Llamamos a la función para crear el gráfico
    }
  
    super.connectedCallback();
  }
  
  // Función para crear y configurar el gráfico utilizando los valores de los atributos
  createChart() {
    const labels = JSON.parse(this.getAttribute("data-labels"));
    const datasets = JSON.parse(this.getAttribute("data-values"));
    const canvas = this.canvas; // Usamos el canvas previamente creado
    const labelNames = JSON.parse(this.getAttribute("label")); // Obtener los nombres de las etiquetas
  
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
    if (old !== now) {
      if (name === "data-labels") {
        this.myHistorical.data.labels = JSON.parse(now);
      } else if (name === "data-values") {
        this.myHistorical.data.datasets[0].data = JSON.parse(now);
      }
      this.myHistorical.update();
    }
    super.attributeChangedCallback(name, old, now); // Llamada al método de la clase base
  }

  static get observedAttributes() {
    return ["data-labels", "data-values"];
  }

  //****************************************************************************/
  //               Cuando el elemento es desconectado del DOM
  //****************************************************************************/
  disconnectedCallback() {
    clearInterval(this.chartCheckInterval);  // Detener el intervalo
  }
}

customElements.define("emic-widget-historical", EmicWidgetHistorical);
