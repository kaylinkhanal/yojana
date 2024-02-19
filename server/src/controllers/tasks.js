const Task = require('../models/tasks')

const addNewTasks = async (req, res) => {
    try {
      const data=  await Task.create(req.body)
      console.log(data)
       if(data) return res.json({msg: "task created ", id:data._id})
    } catch (err) {
        console.log(err)
    }
}




module.exports = { addNewTasks }



