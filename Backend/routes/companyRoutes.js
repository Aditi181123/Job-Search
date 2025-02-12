import express from "express";
import authenticated from "../middleware/authenticate";
import {registerCompany, getCompany, getCompanyById, updateCompany } from "../controllers/company";
import { singleUpload } from "../middleware/mutler";

const router = express.Router();

router.route("/register", authenticated, registerCompany);

router.route("/getCompany", authenticated, getCompany);

router.route("/get/:id", authenticated, getCompanyById);

router.route("/update/:id", authenticated, singleUpload, updateCompany);

export default router;
