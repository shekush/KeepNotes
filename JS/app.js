showNotes();
//if the user adds any note, add it to the local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {  //e in this function is an event object
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
});

//function to show elements from the local storage

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class=" delNote btn btn-dark">Delete Note</button>
                </div>
                </div>
                `;
    });
    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to display.`;
    }
}

//function to delete a note

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


//feature to search notes

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    let inputVal = search.value;
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})