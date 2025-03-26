const { default: mongoose } = require("mongoose");
const { type } = require("os");

const rentalSchema = new mongoose.Schema({
  userId : { type: mongoose.Types.ObjectId, ref: "users" },
  bookId : { type: mongoose.Types.ObjectId, ref: "books" },
  date : {type: Date, default: Date.now()}
});

let rental = mongoose.model("Rental", rentalSchema);

module.exports = rental;
