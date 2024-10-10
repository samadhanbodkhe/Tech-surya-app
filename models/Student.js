const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true // Ensure email is unique
  },
  password: { 
    type: String, 
    required: true 
  },
  mobile: { 
    type: Number, 
    required: true 
  },
  gender: { 
    type: String, 
    default: null // Admin will set this later
  },
  totalFess: { 
    type: Number, 
    default: 0 // Admin will set this later
  },
  paidFess: { 
    type: Number, 
    default: 0 // Admin will set this later
  },
  address: { 
    type: String, 
    default: null // Admin will set this later
  },
  education: { 
    type: String, 
    default: null // Admin will set this later
  },
  active: { 
    type: Boolean, 
    default: false // Admin will activate the student later
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
  blockReason: { 
    type: String, 
    default: null 
  },
  batch: { 
    type: mongoose.Types.ObjectId, 
    ref: "batch", 
    default: null // Admin will assign a batch later
  }
}, { timestamps: true });

module.exports = mongoose.model("student", studentSchema);
