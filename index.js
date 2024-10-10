const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Ensure this is correct
const path = require("path");
const { adminProtected } = require("./middleware/adminProtected");
const cookieParser = require("cookie-parser");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

app.use("/api/tech-surya/student", require("./routes/user.routes"));
app.use("/api/tech-surya/teacher", require("./routes/teacher.routes"));
app.use("/api/tech-surya/auth", require("./routes/admin.auth.route"));
app.use("/api/tech-surya", adminProtected, require("./routes/admin.routes"));

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
});

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT, () => console.log("SERVER RUNNING"));
});
