const User = require("./User");
const Comment = require("./Comment");


Comment.belongsTo(User,
    {
        onDelete: "CASCADE"
    }
);


User.hasMany(Comment)
module.exports = { User, Comment }