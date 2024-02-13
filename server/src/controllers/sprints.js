const Sprint = require('../models/sprint')

const addNewSprints = async(req,res)=> {
 await Sprint.create(req.body)
 res.json({msg: 'Sprint created successfully'})
}


const getAllSpirntsByProjectId = async(req,res)=> {
  const sprintList = await Sprint.find({projectId: req.params.projectId}).select('sprintName projectId').lean()
  const refactoredList = sprintList.map((item)=>{
     return {...item, tasks: [] }
    })
  res.json({sprintList:refactoredList})
   }
module.exports = {addNewSprints,getAllSpirntsByProjectId}



