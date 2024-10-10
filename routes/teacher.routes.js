const router = require("express").Router()
const teacherController = require("./../controllers/teacher.controller")
const teacherAuth = require("./../controllers/teacher.auth.controller")


router
    .get("/get-all-form", teacherController.getAllForm)
    .get("/get-one-form/:id", teacherController.getSingleForm)
    .delete("/delete-one-form/:id", teacherController.deleteSingleForm)
    .put("/update-form/:id", teacherController.updateForm)
    .post("/add-form", teacherController.addForm)
    .post("/submit-form", teacherController.submitForm)
    .post("/compare-question", teacherController.compareForm)
    .get("/get-all-question/:id", teacherController.getAllQuestion)
    // .get("/get-result", )
    .get("/get-result", teacherController.getAdminResult)



    .post("/loginTeacher", teacherAuth.loginTeacher)
    .post("/logoutTeacher", teacherAuth.logoutTeacher)


module.exports = router