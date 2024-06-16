import Utils from "../utils.js";
import NotesApi from "../data/remote/notes-api.js";

const script = () => {
  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteQueryWaitingElement =
    noteListContainerElement.querySelector(".query-waiting");
  const noteLoadingElement =
    noteListContainerElement.querySelector(".search-loading");
  const noteListElement = noteListContainerElement.querySelector("card-list");

  const noteArchivedListContainerElement = document.querySelector(
    "#noteArchivedListContainer",
  );
  const notearchivedListElement =
    noteArchivedListContainerElement.querySelector("archived-list");

  const onAddNoteHandler = (event) => {
    const { title, body } = event.detail;

    const newNote = {
      title,
      body,
    };

    NotesApi.createNote(newNote.title, newNote.body)
      .then((createdNote) => {
        console.log("berhasil membuat notes:", createdNote);
        showNote();
      })
      .catch((error) => {
        console.error("kesalahan membuat notes:", error);
      });
  };

  document
    .querySelector("card-form")
    .addEventListener("submit", onAddNoteHandler);
  const showNote = (query) => {
    showLoading();
    NotesApi.getNotes(query)
      .then((result) => {
        displayResult(result);
        showNoteList();
      })
      .catch((error) => {
        console.error("gagal mengambil notes:", error);
      });
  };

  const showNotearchivedNotes = () => {
    showLoading();
    NotesApi.getArchivedNotes()
      .then((result) => {
        displayNotearchivedResult(result);
        showNotearchivedList();
      })
      .catch((error) => {
        console.error("gagal mengambil notes tersimpan:", error);
      });
  };

  const onDeleteNoteHandler = (event) => {
    const noteId = event.detail.noteId;
    NotesApi.deleteNote(noteId)
      .then(() => {
        const noteItem = document.querySelector(
          `card-item[data-id="${noteId}"]`,
        );
        const notearchivedItem = document.querySelector(
          `archived-item[data-id="${noteId}"]`,
        );

        if (noteItem) {
          noteItem.remove();
        }

        if (notearchivedItem) {
          notearchivedItem.remove();
        }
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
        alert("Failed to delete note. Please try again.");
      });
  };

  const onUnarchiveNoteHandler = (event) => {
    const noteId = event.detail.noteId;
    NotesApi.unarchiveNote(noteId)
      .then(() => {
        const notearchivedItem = document.querySelector(
          `archived-item[data-id="${noteId}"]`,
        );
        if (notearchivedItem) {
          notearchivedItem.remove();
          showNotearchivedNotes();
        }
      })
      .catch((error) => {
        console.error("Error unarchiving note:", error);
        alert("Failed to unarchive note. Please try again.");
      });
  };

  const displayResult = (notes) => {
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("card-item");
      noteItemElement.note = note;
      noteItemElement.addEventListener("deleteNote", onDeleteNoteHandler);

      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };

  const displayNotearchivedResult = (notearchivedNotes) => {
    const notearchivedItemElements = notearchivedNotes.map(
      (notearchivedNote) => {
        const notearchivedItemElement =
          document.createElement("archived-item");
        notearchivedItemElement.note = notearchivedNote;
        notearchivedItemElement.addEventListener(
          "unarchiveNote",
          onUnarchiveNoteHandler,
        );

        return notearchivedItemElement;
      },
    );

    Utils.emptyElement(notearchivedListElement);
    notearchivedListElement.append(...notearchivedItemElements);
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  const showNotearchivedList = () => {
    Array.from(noteArchivedListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(notearchivedListElement);
  };

  const showLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteLoadingElement);
  };

  const showQueryWaiting = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteQueryWaitingElement);
  };

  showQueryWaiting();
  showNotearchivedNotes();
  showNote();
};

export default script;