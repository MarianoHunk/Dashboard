
class emicWidgetProperties extends HTMLElement  {
	
	data = null;
	config = null;
	atributos = null;

  //****************************************************************************/
  //                               Constructor
  //****************************************************************************/
  // El constructor de la clase. Llama al constructor de la clase padre y crea un Shadow DOM.
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  handleEvent(event) {
    if (event.type === "user:data-message") {
      this.config = event.target.config;
      this.atributos = event.target.attributes;

      this.data = event.detail;
      this.render();
    }
  }
  //****************************************************************************/
  //               Cuando el elemento es conectado al DOM
  //****************************************************************************/
  // Este método se ejecuta cuando el elemento personalizado se conecta al DOM.
  connectedCallback() {
    document.addEventListener("user:data-message", this);
  }



  render() {
    this.shadowRoot.innerHTML = "<ul>";

    for(var i = this.atributos.length - 1; i >= 0; i--) {
      this.shadowRoot.innerHTML += `<li>  ${this.atributos[i].name} : <input value=${this.atributos[i].value} /> </li>`;
    }

    this.shadowRoot.innerHTML += "</ul>";

    //for(const [key, value] of Object.entries(this.a)){
    //  this.shadowRoot.innerHTML += `${key}:${value}`;
    //}
    
  }
}

// Se registra el elemento personalizado en el navegador. 
/* 
* El custom element: "emic-widget-properties" *
* Debe contener al menos un guion (-).
* No puede contener letras en mayúscula.
* Debe tener al menos un carácter que no sea un guion.
*/
customElements.define("emic-widget-properties", emicWidgetProperties);
