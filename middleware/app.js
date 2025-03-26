const express = require("express");
let app = express();

let bookRouter = require("../routes/book.route");
let userRouter = require("../routes/user.route")
let rentalRouter = require("../routes/rental.route")

app.use(express.json());
app.use('/uploads', express.static('./uploads'))
app.use(express.urlencoded({ extended: true }))


app.use("/api/books", bookRouter);
app.use("/api", userRouter)
app.use("/api", rentalRouter)

app.get("*", (req, res, next) => {
  res.send("Working");
});

module.exports = app;
