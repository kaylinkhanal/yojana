const mongoose = require('mongoose')
const { Schema } = mongoose;
// define shape of the User documents in the collection
const userSchema = new Schema({
  email: String, // String is shorthand for {type: String}
  password: String,
  role: {
    type: String,
    enum : ['Project Manager', 'Developer', 'Designer', 'Staff', 'Software Engineer'],
    default: 'Staff'
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User
