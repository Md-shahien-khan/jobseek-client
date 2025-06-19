import React, { useEffect, useState } from 'react';
import JobsCard from './JobsCard';
import { motion } from 'framer-motion';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/jobs')
            .then(res => res.json())
            .then(data => {
                setJobs(data);
            })
            .catch(error => console.error("Failed to fetch jobs:", error));
    }, []); // ✅ Fix: Dependency array was incorrectly inside `.then()`

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Explore Top Job Opportunities</h2>
                <p className="text-lg text-gray-600">Discover jobs tailored to your skills and passion — updated daily.</p>
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {jobs.map((job, index) => (
                    <motion.div
                        key={job._id || index}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <JobsCard jobs={job} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Jobs;
