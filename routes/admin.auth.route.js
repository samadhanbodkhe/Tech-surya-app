const router = require("express").Router()
const authController = require("./../controllers/admin.auth.controller")

router
    // admin authentication
    .post("/adminRegister", authController.registerAdmin)
    .post("/adminLogin", authController.loginAdmin)
    .post("/adminLogout", authController.logoutAdmin)      
    .post("/verifyOTP", authController.verifyOTP)      
    .get("/getAdmin/:id", authController.getAdmin)      
    .put("/updateAdmin/:id", authController.updateAdmin)      
        



module.exports = router