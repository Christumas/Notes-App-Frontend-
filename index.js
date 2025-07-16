// create an array for notes
let notes = [];

function openNoteBox(){
    const dialogBox = document.querySelector("#noteDialog");
    const titleDescription = document.querySelector("#noteTitle");
    const noteContent = document.querySelector("#noteContent");

    dialogBox.showModal()
    titleDescription.focus()

}