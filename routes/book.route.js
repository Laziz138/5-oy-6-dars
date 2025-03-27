const {
  getAllBooks,
  getBookById,
  addBook,
  deleteBook,
} = require("../controllers/book.controller");
const express = require("express");
const multer = require("multer");
const path = require("path");

let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/books/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.route("/").get(getAllBooks).post(upload.single("file"), addBook);
router.route("/:id").get(getBookById).delete(deleteBook);

module.exports = router;
