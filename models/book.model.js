const {default : mongoose} = require("mongoose")

const bookSchema = new mongoose.Schema({
    title : {type: String, required : true, unique: true},
    author : {type: String, required: true},
    genre : {type: String, required: true},
    description : {type: String},
    status : {type: String, enum: ["Mavjud", "Band"], default: "Mavjud"},
    image : {type: String}
})

let book = mongoose.model("Book", bookSchema)

module.exports = book