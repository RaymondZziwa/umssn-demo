const express = require("express")
const router = express.Router()
const { saveStudentResultsController } = require('../controllers/saveStudentResultsController')

router.route("/").post(saveStudentResultsController)

module.exports = router;