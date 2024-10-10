const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student"); // Use the unified schema

exports.registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const studentExists = await Student.findOne({ email });
  if (studentExists) {
    return res.status(400).json({ message: "Student already registered with this email" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newStudent = new Student({
    name,
    email,
    password: hashedPassword,
    mobile
  });

  await newStudent.save();

  res.status(201).json({ 
    message: "Student registered successfully", 
    student: { id: newStudent._id, name: newStudent.name, email: newStudent.email } 
  });
});

exports.updateStudent = asyncHandler(async (req, res) => {
  const { studentUpdateId } = req.params;

  await Student.findByIdAndUpdate(studentUpdateId, req.body);

  res.status(200).json({ message: "Student update success" });
});

exports.getStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Student ID is required" });
  }

  const studentData = await Student.findById(id);

  if (!studentData) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json({ message: "Student data fetched successfully", student: studentData });
});

// Student login function
exports.loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log('Login Request Body:', req.body);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and Password are required' });
  }

  const student = await Student.findOne({ email });

  if (!student) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const isMatch = await bcrypt.compare(password, student.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: student._id }, process.env.JWT_KEY, { expiresIn: '1d' });

  res.json({
    message: 'Login Success',
    token,
    student: {
      id: student._id,
      name: student.name,
      email: student.email,
    },
  });
});


exports.logoutStudent = asyncHandler(async (req, res) => {
  res.clearCookie("token"); // If you are using cookies
  res.status(200).json({ message: "Logout Success" });
});
