import express from "express";
import authenticated from "../middleware/authenticate";
import { postJob, AllJobs, getJob } from "../controllers/jobPosting";

const router = express.Router();

router.route("/post", authenticated, postJob);

router.route("/get", authenticated, AllJobs);

router.route("/get/:id", authenticated, getJob);

export default  router;