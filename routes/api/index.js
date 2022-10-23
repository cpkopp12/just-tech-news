//DECLARATIONS: router ------------------------
const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);

//EXPORT ROUTER --------
module.exports = router;