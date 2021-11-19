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