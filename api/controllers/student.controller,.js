import bcryptjs from 'bcryptjs';
import Student from "../models/studentRegister.model.js";
import { errorHandler } from "../utils/error.js";


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
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if student exists
        const existingStudent = await Student.findOne({ email });
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Verify password
        const isPasswordValid = bcryptjs.compareSync(password, existingStudent.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Successful login response
        res.status(200).json({
            message: 'Sign-In Successful',
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
