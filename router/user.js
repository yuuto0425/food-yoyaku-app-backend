const router = require("express").Router();
const User = require("../models/User");

// ユーザーの新規登録 post
// エンドポイント　api/users/auth/register
router.post("/auth/register" , async (req,res) => {
    try{    
        const newUser = await new User({
            userName:req.body.userName,
            email:req.body.email,
            password:req.body.password
        });
        const user = await newUser.save();
        return res.status(200).json(user);
    }catch(err) {
        return res.status(500).json(err);
    }
});

//ユーザーのログイン get
//エンドポイント　api/users/auth/login
router.get("/auth/login", async ( req, res ) => {
    try {
        const user = await User.findOne({email:req.body.email});
        if(!user) return res.status(404).send("ユーザが見つかりません。");
        const password = await req.body.password === user.password;
        if(!password) return res.status(400).json("パスワードが違います。");
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
});
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