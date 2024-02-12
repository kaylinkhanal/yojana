const express = require('express')
const {registerNewUser,loginUser,getAllUsers,getUserDetailsById} = require('../controllers/users')
router = express.Router();
router.post('/register',registerNewUser )
router.post('/login',loginUser )
router.get('/users',getAllUsers )
router.get('/users/:id',getUserDetailsById )
module.exports = router
