const baseUrl = "https://notes-api.dicoding.dev/v2";

class NotesApi{
    static getNotes() {
        return fetch(`${baseUrl}/notes`)
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              return response.json();
            } else {
              return Promise.reject(new Error(`Terkendala masalah!`));
            }
          })
          .then((result) => {
            const data = result.data;
            console.log(data);
            if (data.length > 0) {
              return Promise.resolve(data);
            } else {
              return Promise.reject(new Error(`Tidak terdapat notes!`));
            }
          });
      }

      static createNote(title, body) {
        const data = new URLSearchParams();
        data.append("title", title);
        data.append("body", body);
    
        return fetch(`${baseUrl}/notes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: data,
        })
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              return response.json();
            } else {
              throw new Error(`gagal membuat note`);
            }
          })
          .then((result) => result.data)
          .catch((error) => {
            console.error("terjadi kesalahan saat membuat note:", error);
            throw error;
          });
      }
    
      static deleteNote(noteId) {
        return fetch(`${baseUrl}/notes/${noteId}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              return response.json();
            } else {
              throw new Error(`gagal menghapus note`);
            }
          })
          .then((result) => {
            console.log("berhasil menghapus note:", result);
            return result;
          })
          .catch((error) => {
            console.error("terjadi kesalahan saat menghapus note:", error);
            throw error;
          });
      }
    
      static archiveNote(noteId) {
        return fetch(`${baseUrl}/notes/${noteId}/archive`, {
          method: "POST",
        })
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              return response.json();
            } else {
              throw new Error(`gagal mengarsipkan note`);
            }
          })
          .then((result) => {
            console.log("berhasil mengarsipkan note:", result);
            return result;
          })
          .catch((error) => {
            console.error("terjadi kesalahan saat mengarsipkan note:", error);
            throw error;
          });
      }
    
      static getArchivedNotes() {
        return fetch(`${baseUrl}/notes/archived`)
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              return response.json();
            } else {
              return Promise.reject(new Error(`terkendala masalah`));
            }
          })
          .then((result) => {
            const data = result.data;
            console.log(data);
            if (data.length > 0) {
              return Promise.resolve(data);
            } else {
              return Promise.reject(new Error(`tidak ada note arsip yang tersedia`));
            }
          });
      }
    
      static unarchiveNote(noteId) {
        return fetch(`${baseUrl}/notes/${noteId}/unarchive`, {
          method: "POST",
        })
          .then((response) => {
            if (response.status >= 200 && response.status < 300) {
              return response.json();
            } else {
              throw new Error(`gagal melakukan pembatalan arsip`);
            }
          })
          .then((result) => {
            console.log("berhasil melakukan pembatalan arsip:", result);
            return result;
          })
          .catch((error) => {
            console.error("terjadi kesalahan saat melakukan pembatalan arsip:", error);
            throw error;
          });
      }
}

export default NotesApi;