const router = require("express").Router();
const Cart = require("../models/Cart");
const User = require("../models/User");
const Product = require("../models/Product");

//新しいカートを追加。
router.post("/", async (req, res) => {
  try {
    const newCart = await new Cart(req.body);
    const saveCart = await newCart.save();
    const product = await Product.findById(req.body.productId);
    if (!product)
      return res
        .status(404)
        .json({ message: "productIdをbodyに登録してください。" });
    if (req.body.products[0].quantity < 1)
      return res.status(403).json({ message: "1つ以上追加してください" });
    if (product.price !== req.body.products[0].price)
      return res.status(404).json({ message: "不正な商品価格です。" });
    res.status(200).json(saveCart);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//現在のカートの内容を更新
router.put("/update/:id", async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userId: req.body.userId,
          products: req.body.products,
        },
      },
      { new: true }
    );
    const product = await Product.findById(req.body.productId);
    if (!updateCart)
      return res.status(404).json("あなたはすでにカートを使用済みです。");
    if (!product)
      return res
        .status(404)
        .json({ message: "productIdをbodyに登録してください。" });
    if (req.body.products[0].quantity < 1)
      return res.status(403).json({ message: "1つ以上追加してください" });
    if (product.price !== req.body.products[0].price)
      return res.status(404).json({ message: "不正な商品価格です。" });
    return res.status(200).json(updateCart);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
//特定のカートの商品個数を増減。
router.put("/quantity", async (req, res) => {
  try {
    const products = req.body.products;
    const { productId, quantity, price } = products[0];
    const idQuery = req.query.cartId;
    const pQuery = req.query.productId;
    if (!products) return res.status(404).json(`productsが${products}です。`);
    const quantityCart = await Cart.findById(idQuery);
    if (!quantityCart)
      return res.status(404).json("該当のカートがありません。");
    const filter = { _id: ObjectId(pQuery) };
    const resultCart = await quantityCart
      .updateOne(filter, {
        $set: {
          products: {
            productId: productId,
            quantity: quantity,
            price: price,
          },
        },
      })
      .catch((error) => {
        console.log(error);
      });
    return res.status(200).json(resultCart);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
//現在のカートの商品を削除
router.put("/delete", async (req, res) => {
  try {
    const productId = req.body.products[0].productId;
    const idQuery = req.query.id;
    const deleteCart = await Cart.findById(idQuery);
    if (!deleteCart) return res.status(404).json("該当のカートがありません。");
    console.log(productId);
    const d = deleteCart.products.filter((p) => p.productId === productId);
    if (d.length === 0) {
      return res
        .status(404)
        .json(`${productId}は、該当しない為削除できません。`);
    }
    const deleteResult = await deleteCart.updateOne(
      {
        $pull: {
          products: {
            productId: productId,
          },
        },
      }
    );
    console.log(deleteResult);
    return res.status(200).json(deleteResult);
    // if(deleteCart)
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//現在のカートの内容を全て削除
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteCart = await Cart.findByIdAndDelete(req.params.id);
    if (!deleteCart)
      return res
        .status(404)
        .json(`${req.params.id}の商品の削除に失敗しました。`);
    return res.status(200).json(`${req.params.id}の商品を削除しました。`);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//特定のユーザーの商品カートを取得
router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//userIdの現在の商品の購入数の合計と合計金額を取得
router.get("/amount", async (req, res) => {
  const idQuery = req.query.id;
  try {
    if (!idQuery) {
      return res.status(404).json("");
    }
    const cart = await Cart.findOne({ userId: idQuery });
    if (!cart)
      return res
        .status(404)
        .json(`そのユーザID:${idQuery}のカートは存在しません。`);
    const { products, ...other } = cart._doc;
    let obj = {};
    let p = 0;
    let q = 0;
    products.map(
      (product) =>
        (obj = {
          p: (p += product.quantity * product.price),
          q: (q += product.quantity),
        })
    );
    // const amount = p;
    return res.status(200).json({
      obj: obj,
      products: products,
      message: `合計金額:${obj.p}円,合計個数:${obj.q}個`,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
