const Project = require('../models/projects')

const addNewProjects = async(req,res)=> {
 const refactoredDetails = {...req.body, projectLead: req.body?.projectLead[0] }
 await Project.create(refactoredDetails)
 res.json({msg: 'project created successfully'})
}

const getProjects= async(req,res)=> {
  const projectList=  await Project.find().populate("projectLead")
 return res.json({projectList})
 }
 

module.exports = {addNewProjects,getProjects}

