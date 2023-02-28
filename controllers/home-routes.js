const router = require('express').Router();
const {Post,Comment,User} =require('../models/javascript');
const withAuth = require('../utils/auth');

var handlebars = require('handlebars');
handlebars.registerHelper('loggedIn',options => {
    handlebars.logIn(options);
});

router.get('/',(req,res)=> {
    Post.findAll({
        include: [User],
    })
    .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true}));

        res.render("all-posts",{posts});
    })
    .catch ((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/post/:id", (req, res) => {
    Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    })
    .then((dbPostData) => {
        if (dbPostData) {
          const post = dbPostData.get({ plain: true });
  
          res.render("single-post", { post });
        } else {
          res.status(404).end();
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });

  router.get("/login", (req,res) => {
    if (req.session.logged_in) {
        res.redirect("/profile");
        return;
    }

    res.render("login")
  });

  router.get("/signup", (req,res) => {
    if (req.session.logged_in) {
        res.redirect("/");
        return;
    }

    res.render("signup");
  })
  module.exports = router;
  
            