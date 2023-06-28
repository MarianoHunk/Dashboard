import { EmicWidget } from "./emicWidget.js";

class EmicWidgetPlot extends EmicWidget {
  static namesList = {};
  myDiv;
  plotContainer; // Agregar una variable para el contenedor del gráfico

  getNewID() {
    var i;
    for (i = 1; document.getElementById(`plot-${i}`) !== null; i++);
    return `plot-${i}`;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    if (!super.preconnectedCallback("Plot")) {
      return;
    }

    this.plotContainer = document.createElement("div"); // Crear el contenedor del gráfico
    this.plotContainer.style.width = "100%"; // Establecer el ancho del contenedor al 100% del componente
    this.plotContainer.style.height = "100%"; // Establecer la altura del contenedor al 100% del componente

    const style = document.createElement("style");
    this.shadowRoot.appendChild(this.plotContainer); // Agregar el contenedor del gráfico al shadow root
    this.shadowRoot.appendChild(style);

    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    if (!this.hasAttribute("data")) {
      this.setAttribute("data", this.getAttribute("id"));
    }
    div.innerHTML = this.getAttribute("data");
    this.addEventListener("click", this.eventClickListener);
    super.connectedCallback();
    this.loadPlotlyLibrary();
  }

  loadPlotlyLibrary() {
    const script = document.createElement("script");
    script.src = "https://cdn.plot.ly/plotly-latest.min.js";
    script.onload = () => {
      this.renderPlot();
    };
    this.shadowRoot.appendChild(script);
  }

  renderPlot() {
    const dataAttr = this.getAttribute("data");
    const plotContainer = this.plotContainer;

    if (dataAttr) {
      try {
        const data = JSON.parse(dataAttr);
        const layout = {
          title: "Gráfico de ejemplo",
          xaxis: {
            title: "X",
          },
          yaxis: {
            title: "Y",
          },
        };
        Plotly.newPlot(plotContainer, data, layout);
      } catch (error) {
        console.error("Error al parsear los datos JSON:", error);
      }
    } else {
      const defaultData = [
        {
          x: [1, 2, 3, 4, 5],
          y: [1, 4, 9, 16, 25],
          type: "scatter",
        },
      ];
      const layout = {
        title: "Gráfico de ejemplo",
        xaxis: {
          title: "X",
        },
        yaxis: {
          title: "Y",
        },
      };
      Plotly.newPlot(plotContainer, defaultData, layout);
    }
  }

  eventClickListener(ev) {
    // Implementa la lógica del evento 'click' del componente web aquí
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(name, old, now) {
    if (name === "data") {
      this.renderPlot();
    }
  }

  get data() {
    return this.getAttribute("data");
  }

  set data(newData) {
    this.setAttribute("data", newData);
  }
}

customElements.define("emic-widget-plot", EmicWidgetPlot);
