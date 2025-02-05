import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/jobs")
            .then((res) => res.json())
            .then((data) => setJobs(data))
            .catch((error) => console.error("Error fetching jobs:", error));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <input type="text" placeholder="Search for jobs..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 border rounded mb-4" />
                <div className="grid gap-4">
                    {jobs.filter(job => job.title.toLowerCase().includes(search.toLowerCase())).map((job) => (
                        <div key={job._id} className="p-4 border rounded bg-white shadow-md">
                            <h3 className="text-xl font-bold">{job.title}</h3>
                            <p>{job.company} - {job.location}</p>
                            <p>Salary: ${job.salary}</p>
                            <p>{job.type}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobList;
