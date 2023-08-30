import { EmicWidget } from "./emicWidget.js";

class EmicWidgetHistorical extends EmicWidget {
    static namesList = {};
    chart;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    getNewID() {
        var i;
        for (i = 1; EmicWidgetHistorical.namesList[`historical-${i}`]; i++);
        EmicWidgetHistorical.namesList[`historical-${i}`] = this;
        return `historical-${i}`;
    }

    connectedCallback() {
        if (!super.preconnectedCallback("Historical")) {
            return;
        }
    
        // Si el elemento no tiene un atributo "id", se le asigna uno nuevo
        if (!this.hasAttribute("id")) {
            this.setAttribute("id", this.getNewID());
        }
    
        // Crear un contenedor div para el gráfico
        this.plotContainer = document.createElement("div");
        this.plotContainer.style.width = "100%"; // Establecer el ancho del contenedor al 100% del componente
        this.plotContainer.style.height = "100%"; // Establecer la altura del contenedor al 100% del componente
    
        // Crear un elemento de imagen y establecer su fuente
        this.placeholderImage = document.createElement("img");
        this.placeholderImage.src = "/dashboard/.{userName}./.{project}./.{userModule}./images/icons/btn.png";
        this.placeholderImage.style.width = "400px"; // Puedes ajustar esto a tus necesidades
        this.placeholderImage.style.height = "300px"; // Puedes ajustar esto a tus necesidades
    
        // Añadir la imagen al contenedor div
        this.plotContainer.appendChild(this.placeholderImage);
    
        // Crear un canvas para el gráfico dentro del contenedor div
        this.canvas = document.createElement("canvas");
    
        // Aplicar estilo al canvas para agregar un recuadro
        this.canvas.style.border = "1px solid black";
        this.canvas.style.padding = "10px";
        this.canvas.style.backgroundColor = "white";
        this.canvas.style.width = "400px"; // Puedes ajustar esto a tus necesidades
        this.canvas.style.height = "300px"; // Puedes ajustar esto a tus necesidades
    
        // Añadir el canvas al contenedor div
        this.plotContainer.appendChild(this.canvas);
    
        // Añadir el contenedor div al shadowRoot
        this.shadowRoot.appendChild(this.plotContainer);
    
        // Configurar el gráfico
        this.chart = new Chart(this.canvas.getContext("2d"), {
            type: "line",
            data: {
                labels: ["Punto 1", "Punto 2", "Punto 3", "Punto 4", "Punto 5", "Punto 6", "Punto 7", "Punto 8"], // Etiquetas para los puntos
                datasets: [
                    {
                        label: "Historical Data",
                        data: [10, 20, 30, 40, 50, 60, 70, 80],
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1,
                    },
                ],
            },
        });
    
        super.connectedCallback();
    }
    

    // Método para agregar datos
    addData(data) {
        this.chart.data.datasets[0].data = data;
        this.chart.update();
    }

    static get observedAttributes() {
        return ["data"];
    }

    attributeChangedCallback(name, old, now) {
        // Puedes manejar los cambios en los atributos aquí
        if (name === "data") {
            // Actualizar los datos del gráfico si el atributo 'data' cambia
            this.addData(JSON.parse(now));
        }
    }
}

customElements.define("emic-widget-historical", EmicWidgetHistorical);