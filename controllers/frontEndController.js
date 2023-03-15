const express = require("express");
const router = express.Router();
const { User, Comment } = require("../models");


router.get("/",(req, res) => {
    Comment.findAll({
        include: [User]
    }).then(commentData => {
        console.log(commentData)
        const hbsComments = commentData.map(comment => comment.toJSON())
        console.log(commentData)
        res.render("home", {
            allComments: hbsComments
        })
    })
})

router.get("/login",(req, res) => {
    res.render("login")
})

router.get("/signup",(req, res) => {
    res.render("signup")
})

router.get("/logout",(req, res) => {
    res.render("login", { logout: true })
})

router.get("/profile",(req, res) => {
    if(!req.session.userId){
        return res.redirect("/login")
    }
    User.findByPk(req.session.userId,{
        include:[Comment]
    }).then(userData => {
        const hbsData = userData.toJSON();
        console.log(hbsData)
        res.render("profile", hbsData)
    })
})


module.exports = router;