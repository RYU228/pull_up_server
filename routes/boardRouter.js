const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");

router.post("/write", async (req, res) => {
  try {
    const obj = {
      numId: req.body.numId,
      writer: req.body.writer,
      title: req.body.title,
      content: req.body.content
    };

    const board = new Board(obj);
    await board.save();
    res.json({
      message: "게시글이 업로드 되었습니다.",
      check: true});
  } catch (err) {
    console.log(err);
    res.json({
      message: "게시글 업로드에 실패했습니다.",
      check: false });
  }
});

router.post("/read", async (req, res) => {
  try {
    const amount = req.body.amount;
    const start = amount*(req.body.start-1);
    const board = await Board.find().skip(start).limit(amount).sort({numId:-1});
    console.log(board);
    res.json({
      check: true,
      list: board,
      message: "게시글 로드에 성공했습니다."
    });
  } catch (err) {
    console.log(err);
    res.json({
      check: false,
      message: "게시글 로드에 실패했습니다."
    });
  }
});

router.post("/delete", async (req, res) => {
  try {
    await Board.remove({
      numId: req.body.numId
    });
    res.json({
      message: "게시글이 삭제되었습니다.",
      check: true });
  } catch (err) {
    console.log(err);
    res.json({
      message: "게시글 삭제에 실패했습니다.",
      check: false
      });
  }
});

router.post("/update", async (req, res) => {
  try {
    await Board.update(
      { numId: req.body.numId },
      {
        title: req.body.title,
        content: req.body.content
      }
    );
    res.json({
      message: "게시글이 수정 되었습니다.",
      check: true
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "게시글 수정에 실패했습니다.",
      check: false
    });
  }
});

router.post("/readCount", async (req, res) => {
  try {
    const board = await Board.find().count();
    res.json({
      count: board,
      check: true
    });
  } catch (err) {
    console.log(err);
    res.json({
      check: false
    });
  }
});

router.post("/readViews", async (req, res) => {
  try {
    const board = await Board.find(
      { numId: req.body.numId },
      { _id: 0, views: 1}
    );
    res.json({
      data: board,
      check: true
    });
  } catch (err) {
    console.log(err);
    res.json({
      check: false
    });
  }
});

router.post("/updateViews", async (req, res) => {
  try {
    await Board.update(
      { numId: req.body.numId },
      {
        views: req.body.views
      }
    );
    res.json({
      check: true
    });
  } catch (err) {
    console.log(err);
    res.json({
      check: false
    });
  }
});

module.exports = router;
