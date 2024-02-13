const Project = require('../models/projects')

const addNewProjects = async(req,res)=> {
  console.log(req.body)
 const refactoredDetails = {...req.body, projectLead: req.body?.projectLead?.[0] }
 await Project.create(refactoredDetails)
 res.json({msg: 'project created successfully'})
}

const getProjects= async(req,res)=> {
  const projectList=  await Project.find().populate("projectLead")
 return res.json({projectList})
 }
 const getAllMembersByProjectId= async(req,res)=> {
  const projectList=  await Project.findById(req.params.projectId).select('members').populate('members')
 return res.json({projectList})
 }
 

 const deleteProjectsById= async(req,res)=> {
 Project.findByIdAndDelete(req.params.id).then(response=>{
  return res.json({msg: `deleted successfully`})
 })

 }
 

module.exports = {addNewProjects,getProjects,deleteProjectsById,getAllMembersByProjectId}