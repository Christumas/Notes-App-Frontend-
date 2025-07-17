// Dropdown menu

function toggleDropDown(){
    const dropDown = document.querySelector(".dropdownMenu");
    dropDown.classList.toggle("active")
    console.log(dropDown.classList)
}

let editingNoteID = null;

//handles both adding a new note as well as editing an existing note
function openNoteBox(noteID){
    const dialogBox = document.querySelector("#noteDialog");
    const titleDescription = document.querySelector("#noteTitleEnter"); //sets the keyboard focus inside the title input section
    const noteContent = document.querySelector("#noteContentEnter");
    const noteHeaderTitle = document.querySelector("#dialogTitle")

    if(noteID){
        editingNoteID = noteID;
        const notetoEdit = notes.find(n => n.id == noteID);
        //change note header title to edit note when in edit mode
        noteHeaderTitle.textContent = "Edit your note";  
        titleDescription.value = notetoEdit.title;
        noteContent.value = notetoEdit.content;

    }

    else{
        noteHeaderTitle.textContent = "Add new note";
        titleDescription.value = '';
        noteContent.value = '';

    }
    dialogBox.showModal()
    titleDescription.focus()

    
}

function closeDialogBox(){
    const dialogBox = document.querySelector("#noteDialog")
    dialogBox.close()

}



// create an array for notes
let notes = [];

function saveNote(event){
    event.preventDefault()
    const noteTitle = document.querySelector("#noteTitleEnter").value.trim();
    const noteContent = document.querySelector("#noteContentEnter").value.trim();

    if(editingNoteID){

    }

    else{
         //should only happen when you add new notes
        const note = {
        id : Date.now().toString(),
        title: noteTitle,
        content: noteContent
    }
        notes.unshift(note)

    }
   

    saveNotes();
    renderNotes();
    closeDialogBox();
}

//we use saveNotes to ensure it is in the local storage, to then render the notes on to the html
function saveNotes(){
    localStorage.setItem('myNotes', JSON.stringify(notes))
}

function renderNotes(){
    const notesContainer = document.querySelector("#notesContainer");
    //if there are no notes present, we should show a box that displays no notes are available
    if(notes.length === 0){

        const startWriting = `
        <div class="startWriting" >
            <h3>No notes here yet. Start writing!</h3>
            <button id="startWritingBtn" class="add-note-btn"  onclick="openNoteBox()">+ Add Note</button>
        </div>`

        notesContainer.innerHTML = startWriting;
        return
    }

    //if there are notes present, we render them on to the container
    notesContainer.innerHTML = notes.map(note => 
        `<div class="noteCard">
            <div class="noteHeader">
                <h3 id="noteTitle">${note["title"]}</h3>
                <div class="noteActions">
                    <button id="editNoteBtn" onclick="openNoteBox(${note.id})">🖊</button>
                    <button id="deleteNoteBtn" onclick="deleteNote(${note.id})">🗑</button>
                </div>
            </div>
            <p id="noteContent">${note["content"]}</p>

        </div>`).join('') 
    
}

function loadNotes(){
    const savedNotes = localStorage.getItem('myNotes')
    return savedNotes ? JSON.parse(savedNotes) : [];
}

document.addEventListener('DOMContentLoaded', () => {

    notes = loadNotes();
    renderNotes();

    //to ensure clicking outside of the pop up note window results in the window closing
    const dialogBox = document.querySelector("#noteDialog");
    dialogBox.addEventListener('click', function(event){
        if(event.target == this){
            closeDialogBox();
        }
    })

    //this should result in the note saving after a submit request takes place
    const noteForm = document.querySelector("#noteForm");
    noteForm.addEventListener('submit', saveNote) 

    const dropdownMenu = document.querySelector(".dropdownMenu");
  
    let themeLinks = document.querySelectorAll(".dropdownMenu a");
    changeTheme(themeLinks);


})

function deleteNote(noteID){
    //should delete the node from the notes array
    notes = notes.filter(note => note.id != noteID);
    //save the notes and render them again. Dont need to manually remove them from html because the render
    //function renders only what is inside the notes array
    saveNotes();
    renderNotes();

}

function changeTheme(availableThemes){
    // add eventlistener to the theme links onclick
    //ensure upon click the website doesnt referesh
    //get the selected theme from the attribute data-theme
    //get the document body
    //remove any existing theme classes from the body
    //if a theme is selected, then add that to body class list
    
    availableThemes.forEach(theme => {
        theme.addEventListener("click", (event)=>{
            event.preventDefault();
            let selectedTheme = theme.getAttribute("data-theme");
            console.log(selectedTheme)
            let body = document.body;
            console.log(body.classList)
            body.classList.remove(
                "spring-theme",
                "summer-theme",
                "autumn-theme",
                "winter-theme",
                "dark-theme"
            )

            if (selectedTheme){
                body.classList.add(selectedTheme);
                console.log(body.classList)
            }
        })
        
    });

}