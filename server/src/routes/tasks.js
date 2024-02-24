const express = require('express')
const {addNewTasks,editTaskDetails} = require('../controllers/tasks')
router = express.Router();

router.post('/tasks',addNewTasks )
router.put('/tasks/:taskId',editTaskDetails )

module.exports = router
