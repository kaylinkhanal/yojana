const express = require('express')
const {registerNewUser} = require('../controllers/users')
router = express.Router();
router.post('/register',registerNewUser )
module.exports = router
