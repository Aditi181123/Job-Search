import { UserModel } from "../DBmodels/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

const register = async (req, res) => {
    try {
        const { name, email, contactNo, password, role } = req.body;
         
        if (!name || !email || !contactNo || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } 
    catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            name: user.fullname,
            email: user.email,
            contactNo: user.contactNo,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } 
    catch (error) {
        console.log(error);
    }
}
const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

const updateProfile = async (req, res) => {
    try {
        const {name, email, contactNo, bio, skillRequired } = req.body;
        
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



        let skillsArray;
        if(skillRequired){
            skillsArray = skillRequired.split(",");
        }
        const userId = req.id; 
        let user = await UserModel.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        if(name) user.name = name
        if(email) user.email = email
        if(contactNo)  user.contactNo = contactNo
        if(bio) user.profile.bio = bio
        if(skillRequired) user.profile.skillRequired = skillRequired
      
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url 
        }


        await user.save();

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            contactNo: user.contactNo,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })

    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { register, login, logout, updateProfile};