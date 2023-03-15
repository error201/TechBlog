const express = require("express");
const router = express.Router();
const { User, Comment } = require("../models");

// get all comments
router.get("/", (req, res) => {
  Comment.findAll()
    .then((commentData) => {
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Problem with getting all comments", err });
    });
});

// get one comment with user
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id, {
    include: [User],
  })
    .then((commentData) => {
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Problem with getting all comments", err });
    });
});

// create a comment
router.post("/", (req, res) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ msg: "You must be logged in to create a post", err });
  }
  Comment.create({
    comment: req.body.comment,
    UserId: req.session.userId,
  })
    .then((commentData) => {
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Problem with creating a comment", err });
    });
});

// Delete Comment
router.delete("/:id", (req, res) => {
  if (!req.session.userId) {
    return res
      .status(403)
      .json({ msg: "You are not authorized to delete this post", err });
  }
  Comment.findByPk(req.params.id).then((commentData) => {
    if (!commentData) {
      return res.status(404).json({ msg: "No such comment exists" });
    } else if (commentData.UserId!== req.session.userId) {
      return res.status(403).json({ msg: "You cannot delete this comment" });
    }
    Comment.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((commentData) => {
        res.json(commentData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "Problem with deleting this comment", err });
      });
  });
});

module.exports = router;
