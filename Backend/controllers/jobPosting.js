import { jobPostingModel } from "../DBmodels/jobPosting";

const postJob = async (req, res) => {
    try {
        const { title, description, skillRequired, salary, experienceLevel, location, jobType, positions, company, posted_by, applicants } = req.body;
        const uId = req.id;

        if (!title || !description || !skillRequired || !salary || !experienceLevel || !location || !jobType  || !positions || !company || !posted_by) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };

        const job = await jobPostingModel.create({
            title,
            description,
            skillRequired: skillRequired.split(","),
            salary: Number(salary),
            experienceLevel: experience,
            location,
            jobType,
            positions,
            company: companyId,
            posted_by_by: uId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } 
    catch (error) {
        console.log(error);
    }
}

 const AllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

const getJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await jobPostingModel.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    }
     catch (error) {
        console.log(error);
    }
}

// export const getAdminJobs = async (req, res) => {
//     try {
//         const adminId = req.id;
//         const jobs = await Job.find({ created_by: adminId }).populate({
//             path:'company',
//             createdAt:-1
//         });
//         if (!jobs) {
//             return res.status(404).json({
//                 message: "Jobs not found.",
//                 success: false
//             })
//         };
//         return res.status(200).json({
//             jobs,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

module.exports = {postJob, AllJobs, getJob};