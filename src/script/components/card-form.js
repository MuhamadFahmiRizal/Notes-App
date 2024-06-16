class CardForm extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
  
      this._shadowRoot.innerHTML = `
        <style>
        .card {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            width: 100%;
        }

        .fillcard {
            font-weight: 700;
            color: white;
            margin: 10px;
        }

        .cardbutton {
            text-align: end;
        }

         .inputcard {
            background-color:  #E8751A;
            border-radius: 5px;
            padding: 20px;
            border-style: solid;
            border-color: #FDA403;
            width: 80%;
            display: flex;
            justify-content: center;
         }

         input {
            width: 200px;
            padding: 8px;
            margin-top: 5px;
            border: #E8751A;
            border-radius: 5px;
        }

        textarea {
            padding: 8px;
            margin-top: 5px;
            width: 200px;
            height: 100px;
            border: #E8751A;
            border-radius: 5px;
        }

        button {
            padding: 8px;
            margin: 2px 10px;
            border: #E8751A;
            border-radius: 5px;
            font-weight: bold;
            color: #E8751A;
            
        }

        button:hover {
            font-weight: bold;
            background-color: #898121;
            color: white;
        }

        .spinnerload {
            display: flex;
            justify-content: center;
        }

        #loading {
            margin: 20px;
            border: 20px solid #EAF0F6;
            border-radius: 50%;
            border-top: 20px solid #898121;
            width: 20px;
            height: 20px;
            animation: spinner 1s linear infinite;
        }

        @keyframes spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .submitLoading {
            display: none;
            top: 20%;
            left: 20%; 
            text-align: center;
            transform: translate(-50%, -50%);
        }
        </style>
        
        <div class="card">
        <div class="inputcard">
        <form id="cardForm" class="card-form">
          <div class="fillcard">
            <label for="title">Judul:</label></br>
            <input type="text" id="title" name="title" required />
          </div>
  
          <div class="fillcard">
            <label for="body">Isi Catatan:</label></br>
            <textarea id="body" name="body" rows="4" required></textarea>
          </div>
          <div class="spinnerload">
          <div id="loading" class="submitLoading"></div>
          </div>
          <div class="cardbutton">
              <button type="submit">Tambahkan Note</button>
          </div>

        </form>
        </div>
        </div>
      `;
  
    this._formElement = this._shadowRoot.querySelector("#cardForm");
    this._loading = this._shadowRoot.querySelector("#loading");
    }
  
    connectedCallback() {
      this._formElement.addEventListener("submit", this._onSubmit.bind(this));
      this._confirmButton.addEventListener(
        "click",
        this._closeConfirmation.bind(this),
      );
    }
  
    disconnectedCallback() {
      this._formElement.removeEventListener("submit", this._onSubmit.bind(this));
      this._confirmButton.removeEventListener(
        "click",
        this._closeConfirmation.bind(this),
      );
    }
  
    _onSubmit(event) {
      event.preventDefault();
  
      const titleInput = this._shadowRoot.querySelector("#title");
      const bodyInput = this._shadowRoot.querySelector("#body");
      const eventDetail = { title: titleInput.value,body: bodyInput.value,};
  
      this._loading.style.display = "block";
      this.dispatchEvent(new CustomEvent("submit", { detail: eventDetail }));
  
      setTimeout(() => {
        this._loading.style.display = "none";
      }, 1000);
  
      titleInput.value = "";
      bodyInput.value = "";
    }
  }
  
  customElements.define("card-form", CardForm);
  