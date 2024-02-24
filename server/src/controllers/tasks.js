const Task = require('../models/tasks')
const Sprint = require('../models/sprint')
const User = require('../models/user')
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "kyalin.khanal@gmail.com",
        pass: "dnqf atvb bmbd ddtq",
      },
  });
  

const addNewTasks = async (req, res) => {
    try {
      const data=  await Task.create(req.body)
      console.log(req.body)
      const sprint = await Sprint.findById(req.body.sprint)
      sprint.tasks=[...sprint.tasks, data._id]
      sprint.save()
       if(data) return res.json({msg: "task created ", id:data._id})
    } catch (err) {
        console.log(err)
    }
}


const editTaskDetails = async (req, res) => {
    try {
        const {summary, description, assignee,issueType} = req.body
        const user = await User.findById(req.body.assignee)
        const recepientEmail = user.email
        const senderEmail = 'kaylin.khanal@gmail.com'
        const emailRes= await transporter.sendMail({
            from: senderEmail, 
            to: recepientEmail, 
            subject: "Tasks has been assigned: "+ summary, 
            text: description, 
            html: "<p>"+description+ issueType+"</p>", 
          });
        
          if(emailRes){
            console.log("email sent")
          }
    
     
        const task = await Task.findById(req.params.taskId)
        task.description = description
        task.summary= summary
        task.save()
        res.json({msg: "task updated"})
      
    } catch (err) {
        console.log(err)
    }
}



module.exports = { addNewTasks,editTaskDetails }



