import { EmicWidget } from "./emicWidget.js";

class EmicWidgetPrueba extends EmicWidget {
  static namesList = {};
  myDiv;

  //****************************************************************************/
  //                   Método para obtener un nuevo ID
  //****************************************************************************/
  // Este método se utiliza para generar un nuevo ID único para el elemento.
  getNewID() {
    var i;
    for (i = 1; document.getElementById(`prueba-${i}`) !== null; i++);
    return `prueba-${i}`;
  }

  //****************************************************************************/
  //                               Constructor
  //****************************************************************************/
  // El constructor de la clase. Llama al constructor de la clase padre y crea un Shadow DOM.
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  //****************************************************************************/
  //               Cuando el elemento es conectado al DOM
  //****************************************************************************/
  // Este método se ejecuta cuando el elemento personalizado se conecta al DOM.
  connectedCallback() {
    if (!super.preconnectedCallback("Prueba")) {
      return;
    }
    //-----------------------------------------------------------------
    // Se crea un nuevo elemento div usando document.createElement y se guarda en la variable div.
    const div = document.createElement("div");
    // Se asigna el elemento div recién creado a la propiedad myDiv del objeto actual (instancia de EmicWidgetPrueba).
    this.myDiv = div;
    // Crea un nuevo elemento HTML <style> y lo asigna a la variable 'style'
    const style = document.createElement("style");
    // Se agrega el elemento div como hijo del Shadow DOM del elemento actual (instancia de EmicWidgetPrueba).    
    this.shadowRoot.appendChild(div);
    // Agrega el elemento 'style' como hijo del Shadow DOM de este componente
    this.shadowRoot.appendChild(style);
    //-----------------------------------------------------------------
    
    // Si el elemento no tiene el atributo "id", se le asigna un nuevo ID generado.
    if (!this.hasAttribute("id")) {
      this.setAttribute("id", this.getNewID());
    }

    // Si el elemento no tiene el atributo "ValorMedido", se le asigna el mismo valor que su ID.
    if (!this.hasAttribute("ValorMedido")) {
      this.setAttribute("ValorMedido", this.getAttribute("id"));
    }
    //----------------------------------------------------------------
    // Aqui se genera la etiqueta.
    // Se establece el contenido del div con el valor del atributo "ValorMedido".
    div.innerHTML = this.getAttribute("ValorMedido");
    //----------------------------------------------------------------
    // Se agrega un event listener para el evento "click" al elemento.
    this.addEventListener("click", this.eventClickListener);
    super.connectedCallback();
  }

  //****************************************************************************/
  //                            Cuando se hace click
  //****************************************************************************/
  // Este método se ejecuta cuando se hace clic en el elemento personalizado.
  eventClickListener(ev) {
    // Aquí puedes implementar la lógica del evento 'click' del Web Component
  }

  //****************************************************************************/
  //                               Si hay cambios
  //****************************************************************************/
  // Este método define los atributos que se deben observar para detectar cambios.
  static get observedAttributes() {
    return ["ValorMedido"];
  }

  // Este método se ejecuta cuando hay cambios en los atributos observados.
  attributeChangedCallback(name, old, now) {
    // Aquí puedes implementar la lógica de los atributos observados
  }

  // Setter para el atributo "ValorMedido".
  set ValorMedido(newVal) {
    this.setAttribute("ValorMedido", newVal);
  }

  // Getter para el atributo "ValorMedido".
  get ValorMedido() {
    return this.getAttribute("ValorMedido");
  }
}

// Se registra el elemento personalizado en el navegador.
customElements.define("emic-widget-prueba", EmicWidgetPrueba);
