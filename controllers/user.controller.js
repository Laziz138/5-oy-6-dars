const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

let postRegister = async (req, res, next) => {
    let data = JSON.parse(req.body.body)
    data.image = "/uploads/users/" + req.file.filename;
    data.password = bcrypt.hashSync(data.password, 12)

    let user = await User.create(data)
    res.status(201).json({name: "user", user})
}

let postLogin = async (req, res, next) => {
    let body = req.body
    
    let data = await User.findOne({name: body.name}).exec()
    if(!data) return res.send("Ism xato!")

    if(!bcrypt.compareSync(body.password, data.password)) return res.send("Parol xato!")


    let rolename = data.name
	const token = jwt.sign({ rolename }, "MenParol", {
		expiresIn: '1d'
	})
    res.status(202).json({message: "Porfilga kirdingiz", data, token})
}

let getProfile = async (req, res, next) => {
    let id = req.params.id;
    let user = await User.findById(id);
    res.status(200).json({ name: "user", user });
}



module.exports = {postRegister, postLogin, getProfile}