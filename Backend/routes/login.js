const express = require("express")
const router = express.Router()
const { loginController } = require('../controllers/loginController')

router.route("/").post(loginController)

module.exports = router;