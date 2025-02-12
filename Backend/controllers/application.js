import { applicationModel } from "../DBmodels/application";
import { jobPostingModel } from "../DBmodels/jobPosting"; 

const applyJob = async (req, res) => {

    try{
        const uId =req.id;
        const jId = req.params.id;

        if(!jId){
            return res.status(400).json({
                message: "Job Id is required.",
                success : false
            })
        };

        const existingApplicant = await applicationModel.findOne({job: jId, applicant: uId});

        if(existingApplicant){
            return res.status(400).json({
                message: "You are already registered for this Job.",
                success: false
            });
        }

        const job = await jobPostingModel.findById(jId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        const newApplication = await applicationModel.create({
            job:jId,
            applicant:uId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })

    } 
    catch (error) {
        console.log(error);
    }

};

const getAppliedJobs = async (req,res) => {
    try {
        const uId = req.id;
        const application = await applicationModel.find({applicant:uId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } 
    catch (error) {
        console.log(error);
    }
}

const getApplicants = async (req,res) => {
    try {
        const jId = req.params.id;
        const job = await jobPostingModel.findById(jId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });

        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };

        return res.status(200).json({
            job, 
            succees:true
        });
    } 
    catch (error) {
        console.log(error);
    }
}

const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        const application = await applicationModel.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } 
    catch (error) {
        console.log(error);
    }

}

module.exports = {applyJob, getAppliedJobs, getApplicants, updateStatus};
