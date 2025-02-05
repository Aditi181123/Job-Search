import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";

const PostJob = () => {
    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        type: "",
        description: "",
    });

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(job),
            });
            const data = await response.json();
            console.log("Job posted:", data);
        } catch (error) {
            console.error("Error posting job:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white bg-opacity-80 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-c1 mb-4">Let’s hire your next great candidate</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className='my-2'>
                    <Label className='font-bold'>Job Title</Label>
                    <Input type="text" name="title" value={job.title} onChange={handleChange} placeholder="Job Title" />  
                </div>
                <div className='my-2'>
                    <Label className='font-bold'>Company</Label>
                    <Input type="text" name="company" value={job.company} onChange={handleChange} placeholder="Company Name" />
                </div>
                <div className='my-2'>
                    <Label className='font-bold'>Location</Label>
                    <Input type="text" name="location" value={job.location} onChange={handleChange} placeholder="Location" />
                </div>
                <div className='my-2'>
                    <Label className='font-bold'>Salary</Label>
                    <Input type="text" name="salary" value={job.salary} onChange={handleChange} placeholder="Salary" />
                </div> 

                    <select name="type" value={job.type} onChange={handleChange} className="p-2 border rounded">
                        <option value="">Select Job Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Remote">Remote</option>
                    </select>
                <div className='my-2 flex gap-6'>
                    <Label className='font-bold'>Job Description</Label>
                    <textarea name="description" value={job.description} onChange={handleChange} placeholder="Job Description" className="p-2 border rounded"></textarea>
                </div> 
                     <Button type="submit" className="w-full bg-c1 hover:bg-c2">POST JOB</Button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;
