const User = require('./user');
const Post = require('./post');
const Comment = require('./Comment');

Post.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

module.exports = { User, Comment, Post};