const mongoose = require('mongoose')
const { Schema } = mongoose;
// define shape of the User documents in the collection
const sprintSchema = new Schema({
  sprintName: String,
  isStarted:{ type: Boolean, default: false},
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  startDate: Date,
  endDate: Date
},{
  timestamps:true
});


const Sprint = mongoose.model('Sprint', sprintSchema);
module.exports = Sprint
