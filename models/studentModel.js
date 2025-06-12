const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  regdno: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  currentSemester: { type: Number, required: true },
  phone: { type: String, required: true },
  overallGPA: { type: Number, default: null },
});

module.exports = mongoose.model("Student", studentSchema);
