import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    level: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    passMarks: {
        type: Number,
        required: true
    },
},
{ timestamps: true } );

const Exam = mongoose.model('Exam', examSchema);

export default Exam;