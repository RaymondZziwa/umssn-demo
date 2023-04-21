const express = require("express")
const router = express.Router()
const { fetchStudentResultsController } = require('../controllers/fetchStudentResultsController')

router.route("/").post(fetchStudentResultsController)

module.exports = router;