const asyncHandler = require("express-async-handler");
const { generateOTP } = require("../utils/generateOTP");
const Admin = require("../models/Admin");
const { checkEmpty } = require("../utils/checkEmpty");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/email");
const { default: mongoose } = require("mongoose");

// Admin 8
// ______________________________
exports.registerAdmin = asyncHandler(async (req, res) => {
    console.log("Admin Register", req.body);

    const { name, email, password, mobile, gender, address } = req.body;

    const { isError, error } = checkEmpty({ name, email, password, mobile, gender, address });
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error });
    }

    const hash = await bcrypt.hash(password, 10);

    await Admin.create({
        name,
        email,
        password: hash,
        mobile,
        gender,
        address
    });

    res.json({ message: "Super Admin Register Success", result: email });
});

exports.loginAdmin = asyncHandler(async (req, res) => {
    const { password, userName } = req.body;

    const { isError, error } = checkEmpty({ userName, password });
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error });
    }

    const result = await Admin.findOne({ email: userName });
    if (!result) {
        return res.status(400).json({ message: "Invalid Credential - Email Not Found" });
    }

    const verify = await bcrypt.compare(password, result.password);
    if (!verify) {
        return res.status(400).json({ message: "Invalid Credential - Password Do Not Match" });
    }

    const otp = generateOTP();
    await Admin.findByIdAndUpdate(result._id, { otp });
    await sendEmail(result.email, "Login OTP", ` ${otp} Is Your OTP`);

    res.json({ message: "Admin Login OTP SEND Success", result: userName });
});

exports.verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const { isError, error } = checkEmpty({ otp });
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error });
    }

    const result = await Admin.findOne({ email });
    if (result.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    const token = jwt.sign(
        { userId: result._id },
        process.env.JWT_KEY,
        { expiresIn: "1d" }
    );

    console.log("check token", token);

    res.cookie("admin", token, {
        maxAge: 86400000, httpOnly: true, secure: false, sameSite: 'None',
    });
    res.json({ message: "Login Success", result });
});

exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("admin");
    res.json({ message: "Admin Logout Success" });
});



// Get admin details
exports.getAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if the ID is valid
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Admin ID" });
    }

    // Fetch admin details
    const admin = await Admin.findById(id).select('-password');
    if (!admin) {
        return res.status(404).json({ message: "Admin Not Found" });
    }

    res.json({ message: "Admin Details Retrieved Successfully", admin });
});


// Update Admin Details
exports.updateAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, gender, address } = req.body;

    // Check for empty fields, excluding fields that may not need to be updated
    const { isError, error } = checkEmpty({ name, email, mobile, gender, address });
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error });
    }

    // Update the admin details
    const updatedAdmin = await Admin.findByIdAndUpdate(id, { name, email, mobile, gender, address }, { new: true }).select('-password');

    if (!updatedAdmin) {
        return res.status(404).json({ message: "Admin Not Found" });
    }

    res.json({ message: "Admin Details Updated Successfully", admin: updatedAdmin });
})