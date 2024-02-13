const mongoose = require('mongoose')
const { Schema } = mongoose;
// define shape of the User documents in the collection
const projectSchema = new Schema({
  projectName: {type:String}, // String is shorthand for {type: String}
  projectDescription: String,
  projectKey: String,
  projectLead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  projectType: String,
  members: Array,
  organization: String
});


const Project = mongoose.model('Project', projectSchema);
module.exports = Project
