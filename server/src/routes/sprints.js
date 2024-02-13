const express = require('express')
const {addNewSprints, getAllSprintsByProjectId} = require('../controllers/sprints')
router = express.Router();

router.post('/sprints',addNewSprints )
router.get('/sprints/:projectId', getAllSprintsByProjectId)



module.exports = router
