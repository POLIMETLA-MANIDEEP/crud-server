// Import required dependencies
const express = require('express');  // Import the Express framework to create routes and handle requests
const Student = require('./studentModel');  // Import the Student model to interact with the MongoDB database

// Initialize the Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// POST route for registering a new student
app.post('/register', async (req, res) => {
  try {
    // Destructure the data from the request body
    const { regno, name, email, department, phoneno } = req.body;
    
    // Create a new student instance using the data from the request
    const student = new Student({ regno, name, email, department, phoneno });

    // Save the student instance to the database
    await student.save();
    
    // Respond with the created student and a status code of 201 (Created)
    res.status(201).json(student);
  } catch (error) {
    // In case of an error, respond with a status code of 500 (Internal Server Error) and the error message
    res.status(500).json({ error: error.message });
  }
});

// GET route for retrieving all students
app.get('/', async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await Student.find();
    
    // Respond with the list of students and a status code of 200 (OK)
    res.status(200).json(students);
  } catch (error) {
    // In case of an error, respond with a status code of 500 and the error message
    res.status(500).json({ error: error.message });
  }
});

// GET route for retrieving a student by their registration number
app.get('/:id', async (req, res) => {
  try {
    // Log the parameters from the URL (for debugging purposes)
    console.log(req.params);
    
    // Get the registration number from the URL parameters
    const regno = req.params.id;
    
    // Find a student using the regno
    const stud = await Student.findOne({ regno });

    // If no student is found, return a 404 (Not Found) error
    if (!stud) return res.status(404).json({ error: 'Student not found' });

    // Find the student by their MongoDB _id
    const student = await Student.findById(stud._id);

    // If no student is found, return a 404 (Not Found) error
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // Respond with the student details and a status code of 200 (OK)
    res.status(200).json(student);
  } catch (error) {
    // In case of an error, respond with a status code of 500 and the error message
    res.status(500).json({ error: error.message });
  }
});

// PUT route for updating a student's details by registration number
app.put('/:id', async (req, res) => {
  try {
    // Get the registration number from the URL
    const regno = req.params.id;
    
    // Get the updated data from the request body
    const updatedData = req.body;

    // Find the student by regno and update their details
    const updatedStudent = await Student.findOneAndUpdate(
      { regno },  // Find the student by regno
      updatedData,  // Update with the provided data
      { new: true }  // Return the updated student object
    );

    // If no student is found, return a 404 (Not Found) error
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Respond with the updated student details and a status code of 200 (OK)
    res.status(200).json(updatedStudent);
  } catch (error) {
    // In case of an error, respond with a status code of 500 and the error message
    res.status(500).json({ error: error.message });
  }
});

// DELETE route for deleting a student by their registration number
app.delete('/:regno', async (req, res) => {
  try {
    // Get the registration number from the URL parameters
    const regno = req.params.regno;

    // Find and delete the student by regno
    const deletedStudent = await Student.findOneAndDelete({ regno });

    // If no student is found, return a 404 (Not Found) error
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Respond with a success message and a status code of 200 (OK)
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    // In case of an error, respond with a status code of 500 and the error message
    res.status(500).json({ error: error.message });
  }
});

// Export the app to be used by the main server file
module.exports = app;
