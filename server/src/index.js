const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
require('dotenv').config()
const userRoute = require('./routes/users')
const projectsRoute = require('./routes/projects')
const sprintsRoute = require('./routes/sprints')
const tasksRoute = require('./routes/tasks')



const connection = require('./db/connection')
connection()
const port = process.env.PORT
app.use(userRoute)
app.use(projectsRoute)
app.use(sprintsRoute)
app.use(tasksRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
