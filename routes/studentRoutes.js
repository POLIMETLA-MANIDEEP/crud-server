const express = require("express");
const router = express.Router();
const {
  addStudent,
  getAllStudents,
  getStudentByRegdno,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

router.post("/students", addStudent);
router.get("/students", getAllStudents);
router.get("/students/:regdno", getStudentByRegdno);
router.put("/students/:regdno", updateStudent);
router.delete("/students/:regdno", deleteStudent);

module.exports = router;
