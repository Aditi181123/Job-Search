const express = require("express");
const cookieParsor = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
import connectDB from "./utils/db";
import userRoutes from "./routes/userRoutes";
import companyRoutes from "./routes/companyRoutes";
import jobRoutes from "./routes/jobRoutes";
import applicationRoutes from "./routes/applicationRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParsor());

const corsOp = {
  origin: 'http://localhost:5173',
  credentials: true
}

app.use(cors(corsOp));


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

app.listen(3000 , ()=>{
  connectDB();
  console.log('Server is running at port 3000.');  
})