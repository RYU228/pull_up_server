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
    await Plan.remove({
      id: req.body.id,
      content: req.body.content
    });
    res.json({
      message: "목표가 삭제되었습니다.",
      check: true });
  } catch (err) {
    console.log(err);
    res.json({
      message: "목표 삭제에 실패했습니다.",
      check: false
      });
  }
});

router.post("/update", async (req, res) => {
  try {
    for(let i=0; i<req.body.content.length; i++) {
      await Plan.update(
        { id: req.body.id, content: req.body.content[i] },
        {
          curCount: req.body.curCount[i], count: req.body.count[i]
        }
      );
    }
    
    res.json({
      message: "목표가 수정 되었습니다.",
      check: true
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "목표 수정에 실패했습니다.",
      check: false
    });
  }
});

module.exports = router;
