class FooterApp extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open" });
        this.shadowRoot.innerHTML = `
        
        <style>
            footer {
                background-color: #898121;
                color: white;
                padding: 10px;
                text-align: center;
                font-weight: bolder;
                width: 100%;
                height: 50px;
                bottom: 0;
            }
        </style>
        <footer>
            <p><slot></slot></p>
        </footer>
        `;

    }
}

customElements.define("footer-app", FooterApp);