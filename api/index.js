import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routers/auth.router.js';
import adminRouter from './routers/admin.router.js'
import cookieParser from 'cookie-parser';




dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to Mongodb!');
}).catch((err) => {
    console.log(err)
});



const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(3000, () => {
    console.log('Server is running on port 3000!');
})

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);






app.use((err, req, res, next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})