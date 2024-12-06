const mongoose = require('mongoose');

// Define the admin schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: String, 
    required: false 
  },
  bio: {
    type: String,
    required: false 
  }
});

// Create a model based on the schema
const Admin = mongoose.model('Admin', adminSchema);

// Export the model to use it in other parts of the application
module.exports = Admin;