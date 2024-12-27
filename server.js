// Import necessary libraries
const express = require('express');  // Express.js framework for building the server
const bodyParser = require('body-parser');  // Middleware for parsing incoming request bodies
  // MongoDB ODM (Object Data Modeling) for working with MongoDB
const cors = require('cors');  // Middleware to enable Cross-Origin Resource Sharing (CORS)
const studentRoutes = require('./studentRoutes');  // Import student-related routes from a separate module

// Initialize Express app
const app = express();  
const PORT = 5000;  // Set the port where the server will listen

// Middleware setup
app.use(cors());  // Enable CORS for all routes to allow cross-origin requests (important for frontend-backend communication)
app.use(bodyParser.json());  // Use body-parser middleware to parse JSON data in request bodies

// Connect to MongoDB database using Mongoose
const mongoose = require('mongoose');

const uri = 'mongodb+srv://chinnu6749:Manideep2005@cluster0.depwb.mongodb.net/it';
 // Enable debug logs

mongoose.connect(uri)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

 // Log error if there is a connection failure

// Use the studentRoutes module for handling routes starting with /students
app.use('/students', studentRoutes);  // Any request to /students will be handled by studentRoutes

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);  // Log the server running status with the URL
});
