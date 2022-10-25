//DECLARATIONS: User, Post, Vote ----------------------------
const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

//CREATE ASSOCIATIONS --------------------------------
//user to post
User.hasMany(Post, {
    foreignKey: 'user_id'
});

//post to user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

//post to user through vote
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

//user to post through vote
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

//Vote to User
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

//Vote to Post
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

//User to Vote
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

//Post to Vote
Post.hasMany(Vote, {
    foreignKey: 'post_id'
})


//EXPORTS: models: user, post -----------
module.exports = { User, Post, Vote };