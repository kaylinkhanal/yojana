const express = require('express')
const {addNewSprints,getAllSpirntsByProjectId} = require('../controllers/sprints')
router = express.Router();

router.post('/sprints',addNewSprints )
router.get('/sprints/:projectId',getAllSpirntsByProjectId )



module.exports = router
