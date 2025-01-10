import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            'Please enter a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
    photo:{
        type: String,
        default: '',
    }
}, {
    timestamps: true,
});

// Encrypt password before saving
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Student = mongoose.model('Student', studentSchema);

export default Student;