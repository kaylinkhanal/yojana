const mongoose = require('mongoose')
const { Schema } = mongoose;
// define shape of the User documents in the collection
const taskSchema = new Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  issueType: {
    type: String,
    enum : ['Feature', 'Bug'],
    default: 'Feature'
    },
    summary: String,
    description: String,
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    sprint:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprint"
    },
    reporter:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
},{
  timestamps:true
});


const Task = mongoose.model('Task', taskSchema);
module.exports = Task
