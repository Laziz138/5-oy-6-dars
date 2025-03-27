const Book = require("../models/book.model");

let getAllBooks = async (req, res, next) => {
  let books = await Book.find();
  res.status(200).json({ name: "books", books });
};

let getBookById = async (req, res, next) => {
  let id = req.params.id;
  let book = await Book.findById(id);
  res.status(200).json({ name: "book", book });
};

let addBook = async (req, res, next) => {
  let data = req.body;
  data.image = "/uploads/books/" + req.file.filename;

  let book = await Book.create(data);
  res.status(201).json({ name: "book", book });
};

let deleteBook = async (req, res, next) => {
  let id = req.params.id;
  await Book.findByIdAndDelete(id);
  res.status(203).json({ name: "book" });
};

module.exports = { getAllBooks, getBookById, addBook, deleteBook };
