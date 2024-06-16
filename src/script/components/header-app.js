class HeaderApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open" });
        this.shadowRoot.innerHTML = `
            
        <style>
            header{
             background-color: #898121;
             color: white;
             padding: 10px;
             text-align: center;
             width : 100%;
             height : 50px;
             top : 0;
            }

            h1 {
             margin: 0;
             line-height: 50px;
            }
        </style>
        <header>
             <h1><slot></slot></h1>
        </header>
        `;
    }
}

customElements.define("header-app", HeaderApp);