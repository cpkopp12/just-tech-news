//DECLARATIONS: router, express --------------------------
const router = require('express').Router();
const { User, Vote, Post } = require('../../models');

//ROUTES ---------------------------------------
// get users
router.get('/', (req, res) => {
    //user model findAll()
    User.findAll({
      attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch( err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'post_url', 'created_at']
          },
          {
            model: Post,
            attributes: ['title'],
            through: Vote,
            as: 'voted_posts'
          }
        ]
    })
    .then( dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found for this id.' });
            return;
        }
        res.json(dbUserData);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//post user
router.post('/', (req, res) => {
    // expect: {username: '', email: '', password: ''}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// post login route
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user found' });
      return; 
    }
    
    //verify user
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password' });
      return;
    }

    res.json({ user: dbUserData, message: 'You are now logged in' })

  })
});

//update user
router.put('/:id', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  
    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

//delete user
router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


//EXPORT ROUTER ---------------------
module.exports = router;
