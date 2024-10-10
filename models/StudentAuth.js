const mongoose = require("mongoose");

const studentAuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String, // Fixed typo: typeL -> type
    required: true
  },
  mobile: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("StudentAuth", studentAuthSchema);
