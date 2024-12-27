import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: {
      a: { type: String, required: true },
      b: { type: String, required: true },
      c: { type: String, required: true },
      d: { type: String, required: true },
    },
    correctAnswer: { type: String, required: true },
    examName: { type: String, required: true },
    marks: { type: Number, required: true },
  },{ timestamps: true }
);
  
const Question = mongoose.model('Question', questionSchema);

export default Question;