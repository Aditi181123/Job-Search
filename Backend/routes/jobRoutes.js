const express = require('express');
const JobPosting = require('../DBmodels/jobPosting.js');
const { authenticate } = require('../middleware/authenticate.js');

const router = express.Router();

// Post a job
router.post('/newJob', authenticate, async(req, res) => {
    const{ title, 
        description, 
        skillRequired, 
        salary, 
        experienceLevel, 
        location,
        jobType, 
        position, 
        company, 
        posted_by, 
        applicants = []
    } = req.body;

    try{
        const newJob = new JobPosting({
            description, 
            skillRequired, 
            salary, 
            experienceLevel, 
            location,
            jobType, 
            position, 
            company, 
            posted_by, 
            applicants
        });

        await newJob.save();
        res.status(201).json(newJob);
    }
    catch(error){
        res.status(500).json({message: 'Error posting job'});
    }
});

// Get all jobs
router.get('/allJobs', async(req, res) => {
    try{
        const jobs = await JobPosting.find().populate('company posted_by applicants');
        res.status(200).json(jobs);
    }
    catch(error){
        res.status(500).json({message: 'Error fetching jobs'});
    }
});

module.exports = router;