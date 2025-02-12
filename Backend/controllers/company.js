import { companyModel } from "../DBmodels/company.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        let company = await companyModel.findOne({ name: companyName });

        if (company) {
            return res.status(400).json({
                message: "You can't register for the same company.",
                success: false
            })
        };

        company = await companyModel.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })

    } 
    catch (error) {
        console.log(error);
    }
}

const getCompany = async (req, res) => {
    try {
        const userId = req.id; 
        const companies = await companyModel.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await companyModel.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })

    } 
    catch (error) {
        console.log(error);
    }
}


const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location, logo };

        const company = await companyModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {registerCompany, getCompany, getCompanyById, updateCompany};