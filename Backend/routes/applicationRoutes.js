import express from "express";
import { authenticated } from "../middleware/authenticate.js";
import { applyJob, getAppliedJobs, getApplicants, updateStatus } from "../controllers/application.js";

const router = express.Router();


router.post("/apply/:id", authenticated, applyJob);


router.get("/getJobs", authenticated, getAppliedJobs);

router.get("/:id/applicants", authenticated, getApplicants);


router.put("/status/:id", authenticated, updateStatus);

export default router;
