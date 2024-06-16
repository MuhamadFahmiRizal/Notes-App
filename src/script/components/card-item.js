import NotesApi from "../data/remote/notes-api.js";

class CardItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = "";
  }

  set note(value) {
    this._note = value;

    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `

    .card {
      background-color:  #E8751A;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 20px;
      border-color:  #FDA403;
      width: 80%;
      height: 90%;
    }

    .note-info {
      padding: 10px;
    }

    .title h2 {
      font-weight: bold;
      color: white;
    }

    .body p {
      margin-bottom: 0;
      font-weight: 500;
      color: white;
      margin-bottom: 10px;
    }

    .delete-button {
      padding: 8px;
      margin: 2px 10px;
      border: #E8751A;
      border-radius: 5px;
      font-weight: bold;
      color: #E8751A;
    }

    .delete-button:hover {
      font-weight: bold;
      background-color: #898121;
      color: white;
    }

    .archive-button {
      padding: 8px;
      margin: 2px 10px;
      border: #E8751A;
      border-radius: 5px;
      font-weight: bold;
      color: #E8751A;
    }

    .archive-button:hover {
      font-weight: bold;
      background-color: #898121;
      color: white;
    }
    `;
  }

  _addDeleteButton() {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Hapus Notes";
    deleteButton.addEventListener("click", () => this._deleteButtonClicked());
    this._shadowRoot.querySelector(".note-info").appendChild(deleteButton);
  }

  _deleteButtonClicked() {
    const confirmation = confirm("Notes ini akan dihapus?");

    if (confirmation) {
      NotesApi.deleteNote(this._note.id)
        .then(() => {
          this.remove();
        })
    }
  }

  _addArchiveButton() {
      const archiveButton = document.createElement("button");
      archiveButton.classList.add("archive-button");
      archiveButton.textContent = "Simpan Notes";
      archiveButton.addEventListener("click", () =>
        this._archiveButtonClicked(),
      );
      this._shadowRoot.querySelector(".note-info").appendChild(archiveButton);
  }

  _archiveButtonClicked() {
    const confirmation = confirm("arsipkan note ini?");

    if (confirmation) {
      NotesApi.archiveNote(this._note.id)
        .then(() => {
          this.remove();
        })
    }
  }
  render() {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="card">
        <div class="note-info">
          <div class="title">
            <h2>${this._note.title}</h2>
          </div>
          <div class="body">
            <p>${this._note.body}</p>
            <p>${this._note.createdAt}</p>
            <p>${this._note.archived}</p>
          </div>
        </div>
      </div>
    `;
    this._addDeleteButton();
    this._addArchiveButton();
  }
}

customElements.define("card-item", CardItem);