const express = require("express");
const router = express.Router();

//load model
const Post = require("../models/Post");

// hien thi tat ca posts
router.get("/", async (req, res) => {
  const posts = await Post.find().lean().sort({ date: -1 });
  // bai viet cang moi dua len dau
  res.render("posts/index", { posts });
});

// hien thi form tao post
router.get("/add", (req, res) => {
  res.render("posts/add");
});

// Tao post  moi
router.post("/", async (req, res) => {
  // console.log(req.body);
  const { title, text } = req.body; //destructuring

  let errors = [];
  if (!title) errors.push({ msg: "Title is required" });
  if (!text) errors.push({ msg: "Text is required" });

  if (errors.length > 0) {
    res.render("posts/add", { errors, title, text });
  } else {
    const newPostData = { title, text };
    const newPost = new Post(newPostData);
    await newPost.save();
    res.redirect("/posts");
  }
});

// hien thi form de user thay doi bai viet
router.get("/edit/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).lean();
  res.render("posts/edit", { post });
});

// cap nhat thay doi bai viet vao database
router.put("/:id", async (req, res) => {
  const { title, text } = req.body;
  await Post.findOneAndUpdate({ _id: req.params.id }, { title, text });
  res.redirect("/posts");
});

// xoa bai viet
router.delete("/:id", async (req, res) => {
  await Post.findOneAndRemove({ _id: req.params.id });
  res.redirect("/posts");
});

module.exports = router;
