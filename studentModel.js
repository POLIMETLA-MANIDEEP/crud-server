// Import Mongoose, which is used to interact with MongoDB
const mongoose = require('mongoose');

// Define a Mongoose schema for the student collection
const studentSchema = new mongoose.Schema({
  // Registration number of the student (unique and required)
  regno: { type: String, required: true, unique: true },

  // Name of the student (required)
  name: { type: String, required: true },

  // Email address of the student (unique and required)
  email: { type: String, required: true, unique: true },

  // Department the student belongs to (required)
  department: { type: String, required: true },

  // Phone number of the student (unique and required)
  phoneno: { type: Number, required: true, unique: true },
});
// Export the student model, which is based on the studentSchema
module.exports = mongoose.model('Student', studentSchema);
