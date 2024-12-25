import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import Subject from "../models/subject.model.js";
import Exam from "../models/exam.model.js";


export const updateAdmin= async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only update your own account!'));
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 14);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
} 


// add subject

export const addSubject=async(req,res,next)=>{
  const {name}=req.body;

  try{
    const existingSubject=await Subject.findOne({name});
    if(existingSubject){
      return res.status(400).json({ message: "Subject already exists!" });
    }
    const newSubject=new Subject({name});
    await newSubject.save();
    return res.status(201).json({
      message: "Subject added successfully!",
      subject: newSubject,
    });
  } catch(error){
    next(error);
  }
}

// get all subject

export const getAllSubjects = async (req, res, next) => {
  try {
    const subject = await Subject.find(); // Fetch all subjects from the database

    // Check if there are any subjects
    if (subject.length === 0) {
      return res.status(404).json({ message: "No subject found!" });
    }

    // Return the list of subjects
    return res.status(200).json({
      message: "Subjects retrieved successfully!",
      subject: subject,
    });

  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};


// delete subject

export const deleteSubject = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find and delete the subject by ID
    const subject = await Subject.findByIdAndDelete(id);

    // If the subject is not found, return an error
    if (!subject) {
      return res.status(404).json({ message: "Subject not found!" });
    }

    // If successful, return a success message
    return res.status(200).json({ message: "Subject deleted successfully!" });
  } catch (error) {
    next(error); // Pass any errors to the error handler middleware
  }
};


// add exam

export const addExam = async (req, res, next) => {
  const { name, description, level, totalQuestions, totalMarks, passMarks } = req.body;

  try {
    const existingExam = await Exam.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    if (existingExam) {
      return res.status(400).json({ message: "Exam already exists!" });
    }
    const newExam = new Exam({
      name,
      description,
      level,
      totalQuestions,
      totalMarks,
      passMarks
    });
    await newExam.save();
    return res.status(201).json({
      message: "Exam added successfully!",
      exam: newExam,
    });
  } catch (error) {
    next(error);
  }
};


// get all exam

export const getAllExam = async (req, res, next) => {
  try {
    const exam = await Exam.find(); // Fetch all exam from the database

    // Check if there are any exam
    if (exam.length === 0) {
      return res.status(404).json({ message: "No exam found!" });
    }

    // Return the list of subjects
    return res.status(200).json({
      message: "Exam retrieved successfully!",
      exam: exam,
    });

  } catch (error) {
    next(error); // Pass errors to the error handler middleware
  }
};

// delete exam

export const deleteExam = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Find and delete the exam by ID
    const exam = await Exam.findByIdAndDelete(id);

    // If the exam is not found, return an error
    if (!exam) {
      return res.status(404).json({ message: "Exam not found!" });
    }

    // If successful, return a success message
    return res.status(200).json({ message: "Exam deleted successfully!" });
  } catch (error) {
    next(error); // Pass any errors to the error handler middleware
  }
};