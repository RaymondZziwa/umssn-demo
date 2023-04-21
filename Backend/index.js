const express = require('express')
const app = express();
const cors = require("cors")
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const corsOptions = {
    origin: '*'
}
dotenv.config({ path: './.env' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions))
const port = process.env.SERVER_PORT;

//login route for supervisors and admin ---route is tested and it is working as expected
app.use("/login", require("./routes/login"))
//1. Route to import student marks from excel file
app.use('/savestudentresults', require("./routes/savestudentresults"))
//2. Route to fetch student examination results
app.use('/fetchstudentresults', require("./routes/fetchstudentresults"))


//logging out server running string
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})
