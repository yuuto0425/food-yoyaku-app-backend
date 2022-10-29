const Product = require("../models/Product");
const router = require("express").Router(); 
//商品の情報の追加 post
//エンドポイント api/product/post
router.post("/post" ,async (req,res) => {
    try{
        const newProduct = await new Product({
            price:req.body.price,
            productName:req.body.productName,
            desc:req.body.desc,
        });
        const product = await newProduct.save();
        return res.status(200).json(product);
    }catch (err) {
        return res.status(500).json(err);
    }
});

//全ての商品の情報の取得 get
//エンドポイント api/product/get
router.get("/get", async (req, res) => {
    try {
        const productAll = await Product.find();
        return res.status(200).json(productAll);
    }catch(err){
        return res.status(500).json(err);
    }
});

//特定の商品の情報の取得 get
//エンドポイント api/product/get/:id
router.get("/get/:id", async (req, res) => {
    try {
        const productOne = await Product.findById(req.params.id);
        return res.status(200).json(productOne);
    }catch(err){
        return res.status(500).json(err);
    }
});

//商品の情報の削除 delete
//エンドポイント api/product/delete/:id

//商品の情報の更新 put
//エンドポイント api/product/update/:id

//商品の個数を増やす
//商品の個数を減らす

//現在の商品の個数を取得
//現在の商品の合計価格を取得




module.exports = router;