import {EmicWidget} from "./emicWidget.js"


    class EmicWidgetIcon extends EmicWidget {
        static namesList = {};
        myDiv;
        getNewID() {
            var i;
            for (i = 1; document.getElementById(`icon-${i}`) !== null; i++);
            return `icon-${i}`;
        }
        static get observedAttributes() {
            return ["value"];
        }
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }

        connectedCallback() {
            if (!super.preconnectedCallback("Icon")) {
                return;
            }

			//const upload = function uploadFile() {
			//	let formData = new FormData();           
			//	//formData.append("file", fileupload.files[0]);
			//	fetch('/Webservice2.asmx/UploadFile', {
			//	  method: "POST", 
			//	  body: formData
			//	});    
			//	alert('The file has been uploaded successfully.');
			//}			

            if (!this.hasAttribute('id')) {
                this.setAttribute('id', this.getNewID());
            }

            //if (!this.hasAttribute('value')) {
            //    this.setAttribute('value', this.getAttribute("id"));
            //}

			
            const div = document.createElement("div");
            const img =  document.createElement("img");
			const form = document.createElement("form");
			const inputPath = document.createElement("input");
			const inputFile = document.createElement("input");

            if (this.hasAttribute('src')) {
                img.src = this.getAttribute('src');
            }
			else {
				img.src = "/dashboard/.{userName}./.{project}./.{userModule}./images/icons/Encendido.png";
			}
			
			this.ondrop = async (e) => {
				e.preventDefault();
				e.stopPropagation();
				let dt = e.dataTransfer
				let files = dt.files
				
				if(files.length > 0)
				{
					inputFile.files = files;

					let response = await fetch('WebService2.asmx/UploadFile', {
						method: 'POST',
						body: new FormData(form)
					});
					
					img.src = "/dashboard/.{userName}./.{project}./.{userModule}./images/icons/" + files[0].name;
					this.setAttribute('src',"/dashboard/.{userName}./.{project}./.{userModule}./images/icons/" + files[0].name);
				}
				//window.location.reload();
			};

			//this.addEventListener('dragover', function 
			//
			//});
			
			
			
			
			inputPath.name = "path";
			inputPath.type = "text";
			inputPath.value = "_USER/My Projects/.{project}./.{userModule}./wwwroot/images/icons";
			inputPath.hidden = true;
			inputFile.name = "filedata";
			inputFile.type = "file";
			inputFile.name="fileupload";
			inputFile.hidden = true;
			
			form.appendChild(inputPath);
			form.appendChild(inputFile);

			div.appendChild(img);
			div.appendChild(form);
			
			//div.appendChild(input);
			//div.appendChild(buton);
						
			this.myDiv = div;
			

			
            const style = document.createElement("style");
            this.shadowRoot.appendChild(div);
            this.shadowRoot.appendChild(style);


            //div.innerHTML = this.getAttribute("value");
            //this.addEventListener('click', this.eventClickListener);
			
			
			//this.myDiv.innerHTML = `<input id="fileupload" type="file" name="fileupload" />
			//					<button id="upload-button" onclick="this.uploadFile()"> Upload </button>`
			
			
            super.connectedCallback();
        }
		

		eventDragoverListener(e) {
			let dt = e.dataTransfer;
			let files = dt.files;
			if (dt.types[0] == "Files")
			//if(files.length > 0)
			{
				e.stopPropagation();
				e.preventDefault();
				e.dataTransfer.dropEffect = 'copy';
				
			}
			else
				super.eventDragoverListener(e);
		}
		

 /*       
        eventClickListener(ev) {

            var input = document.createElement("input");
            input.value = this.getAttribute("value");
            this.myDiv.innerText = "";
            this.myDiv.appendChild(input);
            input.focus();

            input.addEventListener("blur", (e) => {
                e.stopPropagation;
                this.setAttribute("value", e.currentTarget.value)
                this.myDiv.innerHTML = e.currentTarget.value;
				if (window.iconChange)
						iconChange(this.getAttribute("id").substr(7), e.currentTarget.value);
            });
            input.addEventListener("keypress", (e) => {
                e.stopPropagation;
                if (e.key === "Enter") {
                    this.setAttribute("value", e.currentTarget.value)
                    this.myDiv.innerHTML = e.currentTarget.value;
					if (window.iconChange)
						iconChange(this.getAttribute("id").substr(7), e.currentTarget.value);
                }
            });
            input.addEventListener("click", (e) => {
                e.stopPropagation;
            });
        }
*/

        attributeChangedCallback(name, old, now) {

            switch (name) {
                case 'value':
                    //this.myDiv.innerHTML = this.getAttribute("value");
                    break;
            }
        }

        set value(newVal) {
            this.setAttribute('value', newVal);
        }

        get value() {
            return this.getAttribute('value');
        }
    }
    customElements.define("emic-widget-icon", EmicWidgetIcon);
