const router = require("express").Router()
const userControllers = require("./../controllers/user.controller")

router
      .post("/registerStudent", userControllers.registerStudent)
      .post("/logoutStudent", userControllers.logoutStudent)
      .post("/loginStudent", userControllers.loginStudent)
      .put("/updateStudent/:studentUpdateId", userControllers.updateStudent)
      .get("/getStudent/:id", userControllers.getStudent)
      


module.exports = router