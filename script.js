/**
 * Vamos estrututar as nossas notas
 * Daqui pra frente elas terão id e a data de inclusão
 */

const form = document.querySelector("#form-notes");
const inputCpf = document.querySelector("#input-cpf");
const sectionListNotes = document.querySelector("#list-notes");

const KEY_STORAGE = "@NotesAvanade";

let listNotes = [];

const saveNotesToStorage = () =>
  localStorage.setItem(KEY_STORAGE, JSON.stringify(listNotes));

const loadNotesFromStorage = () => {
  const listStorage = JSON.parse(localStorage.getItem(KEY_STORAGE));

  listNotes = listStorage || [];

  listNotes.forEach(note => {
    note.date = new Date(note.date); //convertendo a data string para Date()
    addNoteToList(note);
  });
}

window.addEventListener("unload", saveNotesToStorage);

window.addEventListener("load", loadNotesFromStorage);

const removeNote = (event, idNoteToRemove) => {
  const noteToRemove = event.target.parentNode;
  sectionListNotes.removeChild(noteToRemove);

  listNotes = listNotes.filter(note => note.id !== idNoteToRemove);
}

const formatDate = (date) => Intl.DateTimeFormat(navigator.language, { dateStyle: "short", timeStyle: "short" }).format(date);

const createNewNoteElement = (newNote) => {
  const newNoteElement = document.createElement("article");

  const pDateElement = document.createElement("p");
  pDateElement.textContent = formatDate(newNote.date);
  newNoteElement.appendChild(pDateElement);

  const pElement = document.createElement("p");
  pElement.textContent = newNote.text;
  newNoteElement.appendChild(pElement);

  const trashElement = document.createElement("span");
  trashElement.className = "material-icons";
  trashElement.textContent = "delete_forever";

  trashElement.addEventListener("click", (event) => removeNote(event, newNote.id));

  newNoteElement.appendChild(trashElement);

  return newNoteElement;
}

const addNoteToList = (newNote) => {
  const newNoteElement = createNewNoteElement(newNote);

  sectionListNotes.appendChild(newNoteElement);
}

const cleanForm = () => form.reset();

const handleSubmit = (event) => {
  event.preventDefault();

  const dateNow = new Date();

  const newNote = {
    id: dateNow.getTime(),
    date: dateNow,
    text: inputCpf.value
  }

  addNoteToList(newNote);

  listNotes.push(newNote);

  cleanForm();
}

form.addEventListener("submit", handleSubmit);
