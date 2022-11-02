const router = require("express").Router();
const User = require("../models/User");


//特定のユーザー情報の取得 get //使用シーン:会員情報ページ
//エンドポイント api/users/get/:id
// router.get("/get/:id", async (req,res)  => {
//     try {
//         if( req.params.id ) {
//             const user = await User.find();
//             const {_id , password , ...other} = user._doc;
//             return res.status(200).json(other);
//         }
//     }catch (err) {
//         return res.status(500).json(err);
//     }
// });

//ユーザー情報の削除 delete
//エンドポイント　api/users/delete/:id

//ユーザー情報の更新 put
//エンドポイント　api/users/update/:id



// router.post();

module.exports = router;