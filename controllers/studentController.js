const Student = require("../models/studentModel");

// Create
exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read All
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read One by Regdno
exports.getStudentByRegdno = async (req, res) => {
  try {
    const student = await Student.findOne({ regdno: req.params.regdno });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { regdno: req.params.regdno },
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ regdno: req.params.regdno });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
