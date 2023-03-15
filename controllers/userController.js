const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, Comment } = require("../models");

// get all users.
router.get("/", (req, res) => {
    User.findAll()
        .then((userData) => {
            res.json(userData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "Problem with getting all user data", err });
        });
});

// logout controller
router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/logout")
});

// get one user's info and comments
router.get("/:id", (req, res) => {
    User.findByPk(req.params.id, {
        include: [Comment],
    })
        .then((userData) => {
            res.json(userData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "Problem with getting all user data", err });
        });
});

// create a user
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    })
        .then((userData) => {
            req.session.userId = userData.id;
            req.session.username = userData.username
            res.json(userData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "Problem with creating a user", err });
        });
});

// User login
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        },
    })
        .then((userData) => {
            if (!userData) {
                return res.status(401).json({ msg: "incorrect username/password combo" });
            } else {
                if (bcrypt.compareSync(req.body.password, userData.password)) {
                    req.session.userId = userData.id;
                    req.session.username = userData.username;
                    return res.json(userData);
                } else {
                    return res.status(401).json({ msg: "incorrect username/password combo" });
                }
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "Problem with creating a user", err });
        });
});



module.exports = router;
