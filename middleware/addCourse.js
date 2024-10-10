const { body, validationResult } = require('express-validator');
const Course = require('../models/Course');

exports.addCourse = [
  // Validate fields
  body('name').notEmpty().withMessage('Name is required'),
  body('image').notEmpty().withMessage('Image is required'),
  body('duration').notEmpty().withMessage('Duration is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('fees').isNumeric().withMessage('Fees must be a number'),
 

  // Handle request
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, image, duration, content, fees } = req.body;

    // Create the course in the database
    const course = await Course.create({ name, image, duration, content, fees, });
    res.json({ message: "Course Added Successfully", course });
  })
];
