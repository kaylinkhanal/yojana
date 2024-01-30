const Project = require('../models/projects')

const addNewProjects = async(req,res)=> {
 await Project.create(req.body)
 res.json({msg: 'project created successfully'})
}

const getProjects= async(req,res)=> {
  const projectList=  await Project.find()
 return res.json({projectList})
 }
 

module.exports = {addNewProjects,getProjects}

