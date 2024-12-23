import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true, // Ensures no two subjects have the same name
      },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
  );
  
const Subject = mongoose.model('Subject', subjectSchema);

export default Subject;