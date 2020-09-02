// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
// UI Constructor
function UI() {}

//Add book to list
UI.prototype.addBookToList = function (book) {
  //   console.log(book);
  const list = document.getElementById("book-list");
  //Create tr element
  const row = document.createElement("tr");
  //   console.log(row);
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;
  //Append to list
  list.appendChild(row);
};
//Show Alerts
UI.prototype.showAlert = function (message, className) {
  //Construnct the elements
  //Create div
  const div = document.createElement("div");
  //Add class
  div.className = `alert ${className}`;
  //Add Text
  div.appendChild(document.createTextNode(message));
  //Insert into dom
  //Get parent
  const container = document.querySelector(".container");
  //Get form
  const form = document.querySelector("#book-form");
  //Insert alert
  container.insertBefore(div, form);

  //Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};
//Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    //a => td => tr
    target.parentElement.parentElement.remove();
    const ui = new UI();

    ui.showAlert("Book Removed !", "success");
  }
};
//Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

//Event Listeners for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value;
  author = document.getElementById("author").value;
  isbn = document.getElementById("isbn").value;
  //Instanciate book
  const book = new Book(title, author, isbn);

  //Instanciate UI
  const ui = new UI();
  //   console.log(ui);

  //Validate
  if (title === "" || author === "" || isbn === "") {
    //Error Alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    //Success Alert
    ui.showAlert("Book Added !", "success");

    //Add book to list
    ui.addBookToList(book);

    //Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});
//Event Listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  //Instanciate UI
  const ui = new UI();
  // Delete Book
  ui.deleteBook(e.target);
  //Show Alert
  //   ui.showAlert("Book Removed !", "success");
  e.preventDefault();
});
