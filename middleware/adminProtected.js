const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

exports.adminProtected = asyncHandler(async (req, res, next) => {
    const { admin } = req.cookies;

    if (!admin) {
        return res.status(401).json({ message: "No Cookie Found" });
    }

    console.log("JWT Token:", admin); // Log the JWT Token

    jwt.verify(admin, process.env.JWT_KEY, (err, decode) => {
        console.log("jwt key", process.env.JWT_KEY);

        if (err) {
            console.error('JWT Verification Error:', err);
            return res.status(401).json({ message: err.message || "JWT ERROR" });
        }
        req.user = decode.userId; 
        next();
    });
});

