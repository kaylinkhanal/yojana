const express = require('express')
const {addNewProjects,getProjects,getAllMembersByProjectId} = require('../controllers/projects')
router = express.Router();

router.post('/projects',addNewProjects )
router.get('/projects',getProjects )
router.get('/members/:projectId',getAllMembersByProjectId )

module.exports = router
