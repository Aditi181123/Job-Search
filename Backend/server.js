import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//Server Check
app.get('/home',(req,res)=>{
    res.send("home Page");
})
//API
app.get("/job",(req,res)=>{
    return res.status(200).json({
        message:"I am from backend",
        success:true
    })
});


//MiddleWare

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOption={
    origin:'http//localhost:5173',
    credentials:true
}
app.use(cors(corsOption));

//Port 
const port=3000;
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})