const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
//const crypto = require("crypto");

//회원가입
router.post("/join", async (req, res) => {
  try {
    obj = {
      id: req.body.id,
      nickname: req.body.nickname,
      password: req.body.password
    };
    let user = new User(obj);
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
    await User.findOne({ id: req.body.id }, async (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (user) {
          const obj = {
            id: req.body.id
          };
          const loadedUser = await User.findOne(obj);

          if (loadedUser) {
            // 있으면 로그인 처리
            res.json({
              message: "로그인 되었습니다!",
              _id: loadedUser.id,
              _nickname: loadedUser.nickname,
              check: true
            });
          }

        } else {
          res.json({
            message: "아이디나 패스워드가 일치하지 않습니다.",
            check: false });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "로그인 실패" });
  }
});

router.post("/updateNick", async (req, res) => {
  try {
    await User.updateOne({
      id: req.body.id
    }, {
      nickname: req.body.nickname
    });
    
    res.json({ message: "변경되었습니다.",
    check: true,
    _nickname: req.body.nickname});
  } catch (err) {
    console.log(err);
    res.json({ message: "변경에 실패했습니다." });
  }
});

router.post("/updatePwd", async (req, res) => {
  try {
    await User.updateOne({
      id: req.body.id
    }, {
      password: req.body.password
    });
    
    res.json({ message: "변경되었습니다.",
      check: true});
  } catch (err) {
    console.log(err);
    res.json({ message: "변경에 실패했습니다." });
  }
});

router.post("/delete", async (req, res) => {
  try {
    await User.remove({
      id: req.body.id
    });
    
    res.json({ message: "삭제되었습니다.",
      check: true});
  } catch (err) {
    console.log(err);
    res.json({ message: "삭제하지 못했습니다." });
  }
});

module.exports = router;
