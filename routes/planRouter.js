const express = require("express");
const router = express.Router();
const Plan = require("../schemas/plan");

router.post("/create", async (req, res) => {
  try {
    const obj = {
      id: req.body.id,
      content: req.body.content,
      count: req.body.count
    };

    const plan = new Plan(obj);
    await plan.save();
    res.json({
      message: "목표가 추가 되었습니다.",
      check: true});
  } catch (err) {
    console.log(err);
    res.json({
      message: "목표 추가에 실패했습니다.",
      check: false });
  }
});

router.post("/read", async (req, res) => {
  try {
    const plan = await Plan.find({id: req.body.id});
    res.json({
      check: true,
      list: plan,
      message: "목표 로드에 성공했습니다."
    });
  } catch (err) {
    console.log(err);
    res.json({
      check: false,
      message: "목표 로드에 실패했습니다."
    });
  }
});

router.post("/delete", async (req, res) => {
  try {
    await Comment.remove({
      numId: req.body.numId
    });
    res.json({
      message: "댓글이 삭제되었습니다.",
      check: true });
  } catch (err) {
    console.log(err);
    res.json({
      message: "댓글 삭제에 실패했습니다.",
      check: false
      });
  }
});

router.post("/update", async (req, res) => {
  try {
    await Comment.update(
      { numId: req.body.numId },
      {
        content: req.body.content
      }
    );
    res.json({
      message: "댓글이 수정 되었습니다.",
      check: true
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "댓글 수정에 실패했습니다.",
      check: false
    });
  }
});

module.exports = router;
