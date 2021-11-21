let myLibrary = [];

function Book(title, author, pages, hasRead, background, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.background = background;
    this.index = index;
}

//Modal Handling
const modal = document.querySelector("#modal");
const modalClose = document.querySelector(".close");
const addButton = document.querySelector(".add");

modalClose.addEventListener("click", () => {
    modal.classList.toggle("closed");
    clearInputFields();
    clearBackgrounds();
    generateGrayBackground();
    if(!updateButton.classList.contains("closed")) {
        updateButton.classList.toggle("closed");
        submitButton.classList.toggle("closed");
    }
});

addButton.addEventListener("click", () => {
    modal.classList.toggle("closed");
});

//Background Color Select
let boxes = document.querySelectorAll(".box");
let selectedBackground = "gray-gradient";
boxes.forEach((box) => {
    addBoxListener(box);
});

function addBoxListener(box) {
    box.addEventListener('click', () => {
        deselectBoxes(box);
        box.classList.toggle("selected");
        selectedBackground = box.id;
    });
}

function deselectBoxes(selectedBox) {
    boxes = document.querySelectorAll(".box").forEach((box) => {
        if(box.classList.contains("selected") && box.id != selectedBox.id) {
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
const backgrounds = document.querySelector(".backgrounds");

hasRead.checked = false;

submitButton.addEventListener('click', () => {
    if(validateForm()) {
        addToLibrary();
        clearInputFields();

        clearBackgrounds();
        generateGrayBackground();
        modal.classList.toggle("closed");
    } else {
        alert("Bitch do it Right");
    }
});

hasRead.addEventListener('change', () => {
    clearBackgrounds();
    if(hasRead.checked === true) {
        generateBackgrounds();
    } else {
        generateGrayBackground();
    }
});

function generateBackgrounds() {
    const gradients = ["hot-pink-gradient","fiery-gradient", "ocean-gradient", 
    "purple-pink-gradient", "green-gradient", "pastel-gradient"];

    for(let i = 0; i < gradients.length; i++){
        let div = document.createElement("div");
        div.classList.add(gradients[i], "box");
        div.id = gradients[i];
        backgrounds.appendChild(div);
        addBoxListener(div);
    }
    selectedBackground = "";
}

function clearBackgrounds() {
    while (backgrounds.firstChild) {
        backgrounds.removeChild(backgrounds.lastChild);
    }
}

function generateGrayBackground() {
    let div = document.createElement("div");
    div.classList.add("gray-gradient", "box", "selected");
    div.id = "gray-gradient";
    backgrounds.appendChild(div);
    selectedBackground = "gray-gradient";
}

function addToLibrary() {
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value, 
        hasRead.checked, selectedBackground, myLibrary.length);
    myLibrary.push(book);

    console.log(`User submitted: ${book.title} by ${book.author}, 
    it is ${book.pages} pages long and read status is ${book.hasRead}. They selected 
    the ${book.background} background. It's index is ${book.index}`);

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
    const removeSpan = document.createElement("span");

    //Add Classes and Attributes
    card.classList.add("card", book.background);
    cardContent.classList.add("card-content");
    titleSpan.classList.add("title");
    authorSpan.classList.add("author");
    pageSpan.classList.add("pages");
    optionDiv.classList.add("options");
    editSpan.classList.add("edit");
    editSpan.addEventListener('click', (e) => {
        editModal(e.target);
    });
    removeSpan.classList.add("remove");
    removeSpan.addEventListener("click", (e) => {
        remove(e.target);
    });
    card.setAttribute("data-index", book.index)

    //Add Text
    titleSpan.textContent = book.title;
    authorSpan.textContent = book.author;
    pageSpan.textContent = `${book.pages} Pages`;
    editSpan.textContent = "Edit";
    removeSpan.textContent = "Remove";

    //Append All Elements
    cardContent.append(titleSpan, authorSpan, pageSpan);
    optionDiv.append(editSpan, removeSpan);
    card.append(cardContent, optionDiv);
    cards.appendChild(card);
}

function clearInputFields() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    hasRead.checked = false;
}

//Remove Function
function remove(removeButton) {
        let index = removeButton.parentElement.parentElement.dataset.index;
        myLibrary.splice(index, 1);
        removeButton.parentElement.parentElement.remove();
        updateIndexes();
}

function updateIndexes() {
    //Update Array
    for(let i = 0; i < myLibrary.length; i++) {
        myLibrary[i].index = i;
    }

    //Update Elements
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        card.dataset.index = index;
    });
}

//Edit Button
const updateButton = document.querySelector(".update");
updateButton.addEventListener('click', updateCard);
let selectedCard;

function editModal(e) {
    modal.classList.toggle('closed');
    //Access Object
    let indexValue = e.parentElement.parentElement.dataset.index;
    selectedCard = e.parentElement.parentElement;
    let bookObj = myLibrary[indexValue];
    //Set Up Modal
    titleInput.value = bookObj.title;
    authorInput.value = bookObj.author;
    pagesInput.value = bookObj.pages;
    (bookObj.hasRead) ? hasRead.checked = true : hasRead.checked = false;
    clearBackgrounds();
    if(bookObj.hasRead) {
        generateBackgrounds();
        document.getElementById(bookObj.background).classList.toggle("selected");
    } else {
        generateGrayBackground();
    }
    selectedBackground = bookObj.background;
    submitButton.classList.toggle("closed");
    updateButton.classList.toggle("closed");
}

function updateCard() {
    //Validate Form
    if(!validateForm()) {
        alert("Please fill out the form correctly");
        return;
    }

    //Update Object
    let indexValue = selectedCard.dataset.index;
    let bookObj = myLibrary[indexValue];
    bookObj.title = titleInput.value;
    bookObj.author = authorInput.value;
    bookObj.pages = pagesInput.value;
    bookObj.hasRead = hasRead.checked;
    bookObj.background = selectedBackground;

    //Update Card
    selectedCard.querySelector(".title").textContent = bookObj.title;
    selectedCard.querySelector(".author").textContent = bookObj.author;
    selectedCard.querySelector(".pages").textContent = `${bookObj.pages} Pages`;
    selectedCard.className = "";
    selectedCard.classList.add("card", bookObj.background);

    //Clean Up
    submitButton.classList.toggle("closed");
    updateButton.classList.toggle("closed");
    modal.classList.toggle("closed");
    clearInputFields();
    clearBackgrounds();
    generateGrayBackground();
    selectedBackground = "gray-gradient";
}

//Form Validation
function validateForm() {
    //Check for letters in Pages
    let pattern = /^[0-9]+$/;
    if(!pattern.test(pagesInput.value)) return false;
    
    //Make Sure all options are filled
    if(titleInput.value === "" || author.value === "" || pagesInput.value === "") {
        return false;
    }
    if(selectedBackground === "") return false;

    //If function made it here form is filled out and valid
    return true;
}