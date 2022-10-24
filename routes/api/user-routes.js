//DECLARATIONS: router, express --------------------------
const router = require('express').Router();
const { User } = require('../../models');

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
        }
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
