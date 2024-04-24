import {EmicWidget} from "./emicWidget.js"

class EmicWidgetSwitch extends EmicWidget {
        //static namesList = {};

        config = { backgrown:"green" };

        getNewID() {
            var i;

            for (i = 1; document.getElementById(`switch-${i}`) !== null; i++);
            //EmicWidgetSwitch.namesList[`switch-${i}`] = this;
            return `switch-${i}`;
        }
        static get observedAttributes() {
            return ["value"];
        }
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }
        /*
        <label class="switch switch-green">
              <input type="checkbox" class="switch-input" checked>
              <span class="switch-label" data-on="On" data-off="Off"></span>
              <span class="switch-handle"></span>
            </label>
        
        */
    connectedCallback() {

        if (!super.preconnectedCallback("Switch")) {
            return;
        }
        const label = document.createElement("label");
        label.classList.add("switch", "switch-green");

        let input = document.createElement("input");
        input.classList.add("switch-input");
        input.setAttribute("type", "checkbox");
        input.addEventListener("change", (e) => {
            let status = e.target.checked;
			if (window.switchToogle)
				switchToogle(this.getAttribute("id").substr(7), (status) ? "1" : "0");
        });

        label.appendChild(input);


        let span1 = document.createElement("span");
        span1.classList.add("switch-label");
        span1.setAttribute("data-on", "On");
        span1.setAttribute("data-off", "Off");
        label.appendChild(span1);

        let span2 = document.createElement("span");
        span2.classList.add("switch-handle");
        span2.setAttribute("data-on", "On");
        span2.setAttribute("data-off", "Off");
        label.appendChild(span2);



        //this.appendChild(element);
        const style = document.createElement("style");
        this.shadowRoot.appendChild(label);
        style.innerHTML =
            `
			html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

.about {
  margin: 70px auto 40px;
  padding: 8px;
  width: 260px;
  font: 10px/18px 'Lucida Grande', Arial, sans-serif;
  color: #bbb;
  text-align: center;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.3);
  background: #383838;
  background: rgba(34, 34, 34, 0.8);
  border-radius: 4px;
  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  -webkit-box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2), 0 0 6px rgba(0, 0, 0, 0.4);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2), 0 0 6px rgba(0, 0, 0, 0.4);
}
.about a {
  color: #eee;
  text-decoration: none;
  border-radius: 2px;
  -webkit-transition: background 0.1s;
  -moz-transition: background 0.1s;
  -o-transition: background 0.1s;
  transition: background 0.1s;
}
.about a:hover {
  text-decoration: none;
  background: #555;
  background: rgba(255, 255, 255, 0.15);
}

.about-links {
  height: 30px;
}
.about-links > a {
  float: left;
  width: 100%;
  line-height: 30px;
  font-size: 12px;
}

.about-author {
  margin-top: 5px;
}
.about-author > a {
  padding: 1px 3px;
  margin: 0 -1px;
}

/*
 * Copyright (c)  DesignBombs
 * http://www.designbombs.com
 *
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */
body {
  font: 13px/20px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #404040;
  background: white;
}

.container {
  margin: 50px auto;
  width: 280px;
  text-align: center;
}
.container > .switch {
  display: block;
  margin: 12px auto;
}

.switch {
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 56px;
  height: 20px;
  padding: 3px;
  background-color: white;
  border-radius: 18px;
  box-shadow: inset 0 -1px white, inset 0 1px 1px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  background-image: -webkit-linear-gradient(top, #eeeeee, white 25px);
  background-image: -moz-linear-gradient(top, #eeeeee, white 25px);
  background-image: -o-linear-gradient(top, #eeeeee, white 25px);
  background-image: linear-gradient(to bottom, #eeeeee, white 25px);
}

.switch-input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.switch-label {
  position: relative;
  display: block;
  height: inherit;
  font-size: 10px;
  text-transform: uppercase;
  background: #eceeef;
  border-radius: inherit;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.15);
  -webkit-transition: 0.15s ease-out;
  -moz-transition: 0.15s ease-out;
  -o-transition: 0.15s ease-out;
  transition: 0.15s ease-out;
  -webkit-transition-property: opacity background;
  -moz-transition-property: opacity background;
  -o-transition-property: opacity background;
  transition-property: opacity background;
}
.switch-label:before, .switch-label:after {
  position: absolute;
  top: 50%;
  margin-top: -.5em;
  line-height: 1;
  -webkit-transition: inherit;
  -moz-transition: inherit;
  -o-transition: inherit;
  transition: inherit;
}
.switch-label:before {
  content: attr(data-off);
  right: 11px;
  color: #aaa;
  text-shadow: 0 1px rgba(255, 255, 255, 0.5);
}
.switch-label:after {
  content: attr(data-on);
  left: 11px;
  color: white;
  text-shadow: 0 1px rgba(0, 0, 0, 0.2);
  opacity: 0;
}
.switch-input:checked ~ .switch-label {
  background: #47a8d8;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15), inset 0 0 3px rgba(0, 0, 0, 0.2);
}
.switch-input:checked ~ .switch-label:before {
  opacity: 0;
}
.switch-input:checked ~ .switch-label:after {
  opacity: 1;
}

.switch-handle {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  background-image: -webkit-linear-gradient(top, white 40%, #f0f0f0);
  background-image: -moz-linear-gradient(top, white 40%, #f0f0f0);
  background-image: -o-linear-gradient(top, white 40%, #f0f0f0);
  background-image: linear-gradient(to bottom, white 40%, #f0f0f0);
  -webkit-transition: left 0.15s ease-out;
  -moz-transition: left 0.15s ease-out;
  -o-transition: left 0.15s ease-out;
  transition: left 0.15s ease-out;
}
.switch-handle:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -6px 0 0 -6px;
  width: 12px;
  height: 12px;
  background: #f9f9f9;
  border-radius: 6px;
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.02);
  background-image: -webkit-linear-gradient(top, #eeeeee, white);
  background-image: -moz-linear-gradient(top, #eeeeee, white);
  background-image: -o-linear-gradient(top, #eeeeee, white);
  background-image: linear-gradient(to bottom, #eeeeee, white);
}
.switch-input:checked ~ .switch-handle {
  left: 40px;
  box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.2);
}

.switch-green > .switch-input:checked ~ .switch-label {
  background: #4fb845;
}

                `;

        this.shadowRoot.appendChild(style);

        if (!this.hasAttribute('id')) {
            this.setAttribute('id', this.getNewID());
        }

        this.setAttribute("title", this.getAttribute("id"))

        if (!this.hasAttribute('value')) {
            this.setAttribute('value', 0);
        }
        super.connectedCallback();
        //this.addEventListener('drop', this.eventDropListener);
        //this.addEventListener('dragover', this.eventDragoverListener);
        //this.addEventListener('dragleave', this.eventDragleaveListener);

    }

        attributeChangedCallback(name, old, now) {
            if (typeof this.gauge == "undefined")
                return;

            switch (name) {
                case 'value':
                    this.gauge.set(now);
                    break;
            }


        }

        set value(newVal) {
            this.setAttribute('value', newVal);
        }

        get value() {
            return this.getAttribute('value');
        }

    /*

        eventDragoverListener(event) {
            event.stopPropagation();
            event.preventDefault();

            if (this.parentElement.getAttribute("direction") === "column") {
                if (event.offsetY < (this.clientHeight / 2)) {
                    this.style.borderTop = "3px solid red";
                    this.style.borderBottom = "1px solid black";
                }
                else {
                    this.style.borderBottom = "3px solid red";
                    this.style.borderTop = "1px solid black";
                }
            }

            if (this.parentElement.getAttribute("direction") === "row") {

                if (event.offsetX < (this.clientWidth / 2)) {
                    this.style.borderLeft = "3px solid red";
                    this.style.borderRight = "1px solid black";
                }
                else {
                    this.style.borderRight = "3px solid red";
                    this.style.borderLeft = "1px solid black";
                }
            }
        }

        eventDragleaveListener(event) {
            event.stopPropagation();
            event.preventDefault();
            this.style.border = "1px solid black";
        }

        eventDropListener(event) {
            event.stopPropagation();
            var data = event.dataTransfer.getData("text");
            const origen = document.getElementById(data);
            if (origen.hasAttribute("instance")) {
                const instance = JSON.parse(origen.getAttribute("instance"));
                var nd = document.createElement(instance.component);
                if (this.parentElement.getAttribute("direction") === "column") {
                    if (event.offsetY < (this.clientHeight / 2)) {
                        this.parentElement.insertBefore(nd, this);
                    }
                    else {
                        this.parentElement.insertBefore(nd, this.nextSibling);
                    }
                }
                else {
                    if (event.offsetX < (this.clientWidth / 2)) {
                        this.parentElement.insertBefore(nd, this);
                    }
                    else {
                        this.parentElement.insertBefore(nd, this.nextSibling);
                    }

                }
                this.style.border = "1px solid black";

                for (var [key, value] of Object.entries(instance.attributes)) {
                    nd.setAttribute(key, value);
                }
            }
        }
        */

    }




    customElements.define("emic-widget-switch", EmicWidgetSwitch);


//}