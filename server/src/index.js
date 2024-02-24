const express = require('express')
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const app = express();
const server = createServer(app);
const io = new Server(server,{
  cors: {
    origin: '*',
  }
});
// express=-> serverr
// socket---> server



io.on('connection', (socket) => {

  socket.on('chatInfo', (chatInfo) => {
    console.log(chatInfo)
    io.emit('chatInfo', chatInfo)
  });

});

const cors = require('cors')
app.use(cors())

app.use(express.json())
require('dotenv').config()
const userRoute = require('./routes/users')
const projectsRoute = require('./routes/projects')
const sprintsRoute = require('./routes/sprints')
const tasksRoute = require('./routes/tasks')

app.use('/uploads',express.static('uploads'))


const connection = require('./db/connection')
connection()
const port = process.env.PORT
app.use(userRoute)
app.use(projectsRoute)
app.use(sprintsRoute)
app.use(tasksRoute)

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
