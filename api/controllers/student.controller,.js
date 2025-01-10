import bcryptjs from 'bcryptjs';
import Student from "../models/studentRegister.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from 'path';


// student register
export const studentRegister = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Create a new student instance
    const newStudent = new Student({
        name,
        email,
        password, // Pass the plain password; it will be hashed by the pre-save hook
    });

    try {
        // Save the student to the database
        await newStudent.save();
        res.status(201).json('Student Registered Successfully!');
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};


// Student login
export const studentLogIn = async (req, res, next) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if student exists
        const existingStudent = await Student.findOne({ email });
        if (!existingStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Verify password
        const isPasswordValid = bcryptjs.compareSync(password, existingStudent.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: existingStudent._id },
            process.env.JWT_SECRET || "your_secret_key", // Use a secure key in production
            { expiresIn: "1h" }
        );

        // Successful login response
        res.status(200).json({
            message: "Sign-In Successful",
            token, // Include token in the response
            student: {
                id: existingStudent._id,
                name: existingStudent.name,
                email: existingStudent.email,
            },
        });
    } catch (error) {
        next(error);
    }
};


//logout
export const studentLogout = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  };


// student details
  export const studentDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);
  
      if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }
  
      res.status(200).json({ success: true, data: student });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
  };

// update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updateData = { name, email };

    // If a photo is uploaded, handle the file and save its path
   if (req.file) {
      updateData.photo = req.file.path; // Save the uploaded photo path
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: updatedStudent });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};