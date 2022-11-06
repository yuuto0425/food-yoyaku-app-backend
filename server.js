const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5050;
require("dotenv").config();
const cors = require("cors");
const UserRouter = require("./router/user");
const ProductRouter = require("./router/product");
const AuthRouter = require("./router/auth");
const CartRouter = require("./router/cart");


app.listen(process.env.PORT || PORT, console.log("Expressサーバーが起動中・・・"));
mongoose
.connect(process.env.MONGO_HEROKU_URL || process.env.MONGO_DB_URL)
.then(() => console.log("MongoDBに接続中・・・"))
.catch((err) => {
    console.log(err);
});

//cors対策
const corsOptions = {
    // origin:"http://localhost:3000/"|| process.env.CORS_ORIGIN_URL,
    origin:"http://localhost:3000/",
}
// app.use(cors(corsOptions));
app.use(cors());

//ミドルウェア
app.use(express.json());
app.use("/api/users",UserRouter);
app.use("/api/product",ProductRouter);
app.use("/api/auth",AuthRouter);
app.use("/api/cart",CartRouter);

app.get("/api/text",(req,res) => {
    res.status(200).send("ok");
})
