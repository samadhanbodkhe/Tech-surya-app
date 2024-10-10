const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Teacher = require('../models/Teacher'); // Assuming you have a Teacher model

// Login Teacher
exports.loginTeacher = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and Password are required' });
    }

    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, teacher.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: teacher._id }, process.env.JWT_KEY, { expiresIn: '1d' });

    // Set cookie for the teacher
    res.cookie('teacher', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({
        message: 'Login Success',
        token,
        teacher: {
            id: teacher._id,
            name: teacher.name,
            email: teacher.email,
            subject: teacher.subject,
        },
    });
});



exports.logoutTeacher = asyncHandler(async (req, res) => {
    res.clearCookie("teacher")
    res.json({ message: "Teacher Logout success" })

})
