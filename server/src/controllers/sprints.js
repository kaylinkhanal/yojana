const Sprint = require('../models/sprint')

const addNewSprints = async (req, res) => {
    try {
       const data = await Sprint.create(req.body)
        res.json({ msg: 'Sprint created successfully'})
    } catch (err) {
        console.log(err)
    }
}


const getAllSprintsByProjectId = async (req, res) => {
    try{
        const sprintList= await Sprint.find({projectId:req.params.projectId}).populate('tasks')
        res.json({sprintList})
    }catch(err){
        console.log(err)
    }
}

module.exports = { addNewSprints, getAllSprintsByProjectId }



