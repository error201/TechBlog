const express = require("express");
const router = express.Router();
const { User, Comment } = require("../models");


// Get all comments.
router.get("/", (req, res) => {
  Comment.findAll()
    .then((commentData) => {
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Could not retrieve comments." });
    });
});


// Get a single comment by ID.
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id, {
    include: [User],
  })
    .then((commentData) => {
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Could not retrieve comment." });
    });
});


// Create a comment.
router.post("/", (req, res) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ msg: "You must be logged in to create a comment." });
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
      res.status(500).json({ msg: "Could not create comment" });
    });
});


// Delete a single comment by ID.
router.delete("/:id", (req, res) => {
  if (!req.session.userId) {
    return res
      .status(403)
      .json({ msg: "You must be logged in to delete a comment." });
  }
  Comment.findByPk(req.params.id).then((commentData) => {
    if (!commentData) {
      return res.status(404).json({ msg: "No comment found." });
    } else if (commentData.UserId!== req.session.userId) {
      return res.status(403).json({ msg: "Not authorized to delete comment." });
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
        res.status(500).json({ msg: "Could not delete comment." });
      });
  });
});

module.exports = router;
