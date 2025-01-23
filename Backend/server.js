const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const companyRoutes = require('./routes/companyRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const UserModel = require('./models/user');
const cookieParser = require('cookie-parser');
const companyModel = require('./models/company');
const applicationModel = require('./models/application');
const JobPostingModel = require('./models/jobPosting');

dotenv.config();
const app = express();


app.use(express.json())
app.use(cookieParser());  
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, // Allow cookies to be sent
}));

mongoose.connect("mongodb://localhost:27017/Users");

app.use("/user", userRoutes);
app.use("/company", companyRoutes); 
app.use("/application", applicationRoutes);
app.use("/job", jobRoutes);

app.listen(3452,()=>{
    console.log("Server is running on port 3452");
})