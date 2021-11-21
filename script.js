let myLibrary = [];

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function addToLibrary(title, author, pages, hasRead) {
    let book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
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
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        deselectBoxes(box);
        box.classList.toggle("selected");
    });
});

function deselectBoxes(selectedBox) {
    boxes.forEach((box) => {
        if(box.classList.contains("selected") && box != selectedBox) {
            box.classList.remove("selected")
        }
    });
}