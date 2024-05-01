const express = require("express");
const router = express.Router();
const { validUser } = require("../middlewares/userValidation");
const Posts = require("../models/postBK");

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find().populate("user").exec();

    res.status(200).send({
      message: "Success Here",
      data: posts,
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      message: "Error: Please review with your SystemAdministrator",
      data: null,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const idReq = req.params.id;
    const post = await Posts.findById(idReq).populate("user").exec();

    res.status(200).send({
      message: "Sucess",
      data: post,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error: Plase contact your system administrator",
      data: null,
    });
  }
});

router.post("/", validUser, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    let post = req.body;
    post.user = user._id;
    console.log("Post:", post);
    const newPost = await Posts.create(post);

    res.status(201).send({
      message: "New Post Created",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error: Please contact your system administrator",
      data: null,
    });
  }
});

router.put("/:postid", validUser, async (req, res) => {
  try {
    const { postid } = req.params;
    const postData = req.body;
    const userIdFromToken = req.user._id;
    const existingPost = await Posts.findById(postid);

    if (!existingPost) {
      return res.status(404).send({
        message: "Post Not Found",
        data: null,
      });
    }

    if (userIdFromToken === existingPost.user) {
      const updatedPost = await Posts.findByIdAndUpdate(postid, postData, {
        new: true,
      });

      res.status(200).send({
        message: "Updated Post",
        data: updatedPost,
      });
    } else {
      res.status(401).send({
        message: "Unauthorized User",
        data: null,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Error: Please contact your system administrator",
      data: null,
    });
  }
});

router.delete("/:id_post", validUser, async (req, res) => {
  try {
    const { id_post } = req.params;
    const userIdFromToken = req.user._id;
    const toDelete = await Posts.findById(id_post);

    if (!toDelete) {
      return res.status(404).send({
        message: "Post Not Found",
        data: null,
      });
    }

    if (userIdFromToken === toDelete.user) {
      await Posts.findByIdAndDelete(id_post);
      res.status(200).send({
        message: "Post deleted",
        data: null,
      });
    } else {
      res.status(401).send({
        message: "Only author can delete a post",
        data: null,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Error: Please contact your system administrator",
      data: null,
    });
  }
});

module.exports = router;
