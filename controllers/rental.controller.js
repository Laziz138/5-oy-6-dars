const Rental = require("../models/rental.model");

let getRequests = async (req, res) => {
  let requests = await Rental.find();
  res.status(200).json({ name: "requests", requests });
};

let getBorrows = async (req, res) => {
  let data = await Rental.find({ userId: req.params.id });
  res.status(200).json({ message: "Borrows", data });
};

let postRequest = async (req, res) => {
  let data = req.body;
  data.bookId = req.params.bookId;

  let request = await Rental.create(data);
  res.status(201).json({ message: "Success", request });
};

module.exports = { getRequests, getBorrows, postRequest };
