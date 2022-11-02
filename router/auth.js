const User = require("../models/User");
const dotenv = require("dotenv").config();

const CryptoJS = require("crypto-js");
const router = require("express").Router();

// ユーザーの新規登録 post
// エンドポイント /auth/register
router.post("/register", async (req, res) => {
  const newUser = await new User({
    userName: req.body.userName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SEC_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    // console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//ユーザーのログイン get
//エンドポイント /auth/login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) return res.status(404).send("ユーザが見つかりません。");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SEC_KEY
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const password = req.body.password === OriginalPassword;
    if (!password) return res.status(400).json("パスワードが違います。");
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
