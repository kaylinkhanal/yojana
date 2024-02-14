const express = require('express')
const {addNewTasks} = require('../controllers/tasks')
router = express.Router();

router.post('/tasks',addNewTasks )

module.exports = router
