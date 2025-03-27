const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Foydalanuvchini ro'yxatdan o'tkazish
let postRegister = async (req, res, next) => {
  try {
    // req.body ni tekshirish
    if (!req.body) {
      return res.status(400).json({ error: "Body not provided" });
    }

    let data = req.body;

    // req.file ni tekshirish
    if (!req.file || !req.file.filename) {
      return res.status(400).json({ error: "Image file not provided" });
    }

    data.image = "/upload/users/" + req.file.filename;

    // Parolni xesh qilish
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 12);
    } else {
      return res.status(400).json({ error: "Password not provided" });
    }

    let user = await User.create(data);
    return res.status(201).json({ name: "user", user });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

let postLogin = async (req, res, next) => {
  try {
    let body = req.body;

    let data = await User.findOne({ name: body.name }).exec();
    // console.log(data);
    if (!data) return res.status(404).send("Ism xato!");

    if (!bcrypt.compareSync(body.password, data.password)) {
      return res.status(401).send("Parol xato!");
    }

    let rolename = data.name;
    const token = jwt.sign({ rolename }, "MenParol", {
      expiresIn: "1d",
    });
    res.status(202).json({ message: "Profilga kirdingiz", data, token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Foydalanuvchi profili
let getProfile = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ name: "user", user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { postRegister, postLogin, getProfile };
