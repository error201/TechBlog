const express = require("express");
const router = express.Router();

// user routes import
const userRoutes = require('./userController')
router.use("/api/users", userRoutes);

// comment routes import
const commentRoutes = require('./commentController')
router.use("/api/comments", commentRoutes);

// frontend routes
const loginRoutes = require('./loginController')
router.use("/", loginRoutes);

module.exports = router;