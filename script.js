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

  listNotes = listStorage;

  listNotes.forEach(note => addNoteToList(note));
}

window.addEventListener("unload", saveNotesToStorage);

window.addEventListener("load", loadNotesFromStorage);

const removeNote = (event, texdNoteToRemove) => {
  const noteToRemove = event.target.parentNode;
  sectionListNotes.removeChild(noteToRemove);

  listNotes = listNotes.filter(note => note !== texdNoteToRemove); //[nota1, nota2, nota3] = [nota1, nota3]
}

const createNewNoteElement = (newNote) => {
  const newNoteElement = document.createElement("article");
  const pElement = document.createElement("p");
  pElement.textContent = newNote;
  newNoteElement.appendChild(pElement);

  const trashElement = document.createElement("span");
  trashElement.className = "material-icons";
  trashElement.textContent = "delete_forever";

  trashElement.addEventListener("click", (event) => removeNote(event, newNote));

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

  //recuperar a nota digitada pelo usuário
  const textNewNote = inputCpf.value;

  addNoteToList(textNewNote);

  listNotes.push(textNewNote);

  cleanForm();

  //atualizar o localStorage
}

form.addEventListener("submit", handleSubmit);
