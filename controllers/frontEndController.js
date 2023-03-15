const express = require("express");
const router = express.Router();
const { User, Comment } = require("../models");


router.get("/", (req, res) => {
    Comment.findAll({
        include: [User]
    }).then(commentData => {
        const hbsComments = commentData.map(comment => comment.toJSON())
        res.render("home", {
            allComments: hbsComments
        })
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "There was a problem retrieving data.", err });
    });
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.get("/logout", (req, res) => {
    res.render("login", { logout: true })
})

router.get("/profile", (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login")
    }
    User.findByPk(req.session.userId, {
        include: [Comment]
    }).then(userData => {
        const hbsData = userData.toJSON();
        console.log(hbsData)
        res.render("profile", hbsData)
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "Couldn't retrieve User data.", err });
    });
})


module.exports = router;