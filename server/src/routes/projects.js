const express = require('express')
const {addNewProjects,getProjects} = require('../controllers/projects')
router = express.Router();

router.post('/projects',addNewProjects )
router.get('/projects',getProjects )


module.exports = router
