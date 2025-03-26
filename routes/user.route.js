const {postRegister, postLogin, getProfile} = require("../controllers/user.controller")
const express = require("express")
const multer = require("multer")
const path = require("path")

let router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/users/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})


router.route("/register").post(upload.single("file"), postRegister)
router.route("/login").post(postLogin)
router.route("/profile/:id").get(getProfile)

module.exports = router