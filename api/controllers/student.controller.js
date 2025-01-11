import bcryptjs from 'bcryptjs';
import Student from "../models/studentRegister.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Student register
export const studentRegister = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const newStudent = new Student({ name, email, password });

    try {
        await newStudent.save();
        res.status(201).json('Student Registered Successfully!');
    } catch (error) {
        next(error);
    }
};

// Student login
export const studentLogIn = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingStudent = await Student.findOne({ email });
        if (!existingStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        const isPasswordValid = bcryptjs.compareSync(password, existingStudent.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: existingStudent._id },
            process.env.JWT_SECRET || "your_secret_key",
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Sign-In Successful",
            token,
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

// Logout
export const studentLogout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
};

// Student details
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

// Update student
export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const updateData = { name, email };

        const updatedStudent = await Student.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.status(200).json({ success: true, data: updatedStudent });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
};
