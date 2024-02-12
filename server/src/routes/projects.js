const express = require('express')
const {addNewProjects,getProjects,getAllMembersByProjectId,deleteProjectsById} = require('../controllers/projects')
router = express.Router();

router.post('/projects',addNewProjects )
router.delete('/projects/:id', deleteProjectsById)
router.get('/projects',getProjects )
router.get('/members/:projectId',getAllMembersByProjectId )

module.exports = router
