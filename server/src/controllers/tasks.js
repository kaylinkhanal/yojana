const Task = require('../models/tasks')

const addNewTasks = async (req, res) => {
    try {
      const data=  await Task.create(req.body)
       if(data) return res.json({msg: "task created "})
    } catch (err) {
        console.log(err)
    }
}




module.exports = { addNewTasks }



