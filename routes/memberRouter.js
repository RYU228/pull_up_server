const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
//const crypto = require("crypto");

//회원가입
router.post("/join", async (req, res) => {
  try {
    obj = {
        nickname: req.body.nickname,
        password: req.body.password
    };
    user = new User(obj);
    await user.save();
    res.json({ message: "회원가입 되었습니다!"});
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    //이메일 값으로 아이디가 존재하는지 확인
    await User.findOne({ nickname: req.body.nickname }, async (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (user) {
          const obj = {
            nickname: req.body.nickname,
            password: req.body.password
          };
          const user2 = await User.findOne(obj);

          if (user2) {
            // 있으면 로그인 처리
            
            //req.session.nickname = user.nickname;
            res.json({
              message: "로그인 되었습니다!",
              _id: user2._id
            });
          }

        } else {
          res.json({ message: "아이디나 패스워드가 일치하지 않습니다." });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "로그인 실패" });
  }
});

module.exports = router;
