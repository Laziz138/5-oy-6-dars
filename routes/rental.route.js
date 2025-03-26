const {getBorrows, getRequests, postRequest} = require("../controllers/rental.controller")
const express = require("express")

let router = express.Router()


router.route("/requests").get(getRequests)
router.route("/my-borrows").get(getBorrows)
router.route("/borrow/:bookId").post(postRequest)

module.exports = router