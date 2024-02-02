const express = require('express')
const {addNewSprints} = require('../controllers/sprints')
router = express.Router();

router.post('/sprints',addNewSprints )



module.exports = router
