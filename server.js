const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5050;
require("dotenv").config();
const UserRouter = require("./router/user");
const ProductRouter = require("./router/product");


app.listen(PORT, console.log("Expressサーバーが起動中・・・"));
mongoose
.connect(process.env.MONGO_HEROKU_URL || process.env.MONGO_DB_URL)
.then(() => console.log("MongoDBに接続中・・・"))
.catch((err) => {
    console.log(err);
});

//ミドルウェア
app.use(express.json());
app.use("/api/users",UserRouter);
app.use("/api/product",ProductRouter);
