const Sprint = require('../models/sprint')

const addNewSprints = async(req,res)=> {
 await Sprint.create(req.body)
 res.json({msg: 'Sprint created successfully'})
}

module.exports = {addNewSprints}



