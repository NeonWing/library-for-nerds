let myLibrary = [];

function Book(title, author, pages, hasRead, background) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.background = background;
}

//Modal Handling
const modal = document.querySelector("#modal");
const modalClose = document.querySelector(".close");
const addButton = document.querySelector(".add");

modalClose.addEventListener("click", () => {
    modal.classList.toggle("closed");
});

addButton.addEventListener("click", () => {
    modal.classList.toggle("closed");
});

//Background Color Select
const boxes = document.querySelectorAll(".box");
let selectedBackground;
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        deselectBoxes(box);
        box.classList.toggle("selected");
        selectedBackground = box.id;
    });
});

function deselectBoxes(selectedBox) {
    boxes.forEach((box) => {
        if(box.classList.contains("selected") && box != selectedBox) {
            box.classList.remove("selected")
        }
    });
}

//Add Books Functionality
const submitButton = document.querySelector(".submit");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const hasRead = document.getElementById("hasRead");
const cards = document.querySelector(".cards");

submitButton.addEventListener('click', () => {
    addToLibrary();
    clearInputFields();

    modal.classList.toggle("closed");
});

function addToLibrary() {
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value, 
        hasRead.checked, selectedBackground);
    myLibrary.push(book);

    console.log(`User submitted: ${book.title} by ${book.author}, 
    it is ${book.pages} pages long and read status is ${book.hasRead}. They selected 
    the ${book.background} background`);

    generateBookCard(book);
}

function generateBookCard(book) {
    //Create Elements
    const card = document.createElement("div");
    const cardContent = document.createElement("div");
    const titleSpan = document.createElement("span");
    const authorSpan = document.createElement("span");
    const pageSpan = document.createElement("span");
    const optionDiv = document.createElement("div");
    const editSpan = document.createElement("span");

    //Add Classes
    card.classList.add("card", book.background);
    cardContent.classList.add("card-content");
    titleSpan.classList.add("title");
    authorSpan.classList.add("author");
    pageSpan.classList.add("pages");
    optionDiv.classList.add("options");
    editSpan.classList.add("edit");

    //Add Text
    titleSpan.textContent = book.title;
    authorSpan.textContent = book.author;
    pageSpan.textContent = `${book.pages} Pages`;
    editSpan.textContent = "Edit";

    //Append All Elements
    cardContent.append(titleSpan, authorSpan, pageSpan);
    optionDiv.appendChild(editSpan);
    card.append(cardContent, optionDiv);
    cards.appendChild(card);
}

function clearInputFields() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    hasRead.checked = false;
}

