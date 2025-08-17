import React, { useEffect, useState } from 'react';
import UseAuth from './UseAuth';

const MyApplications = () => {
    const { user } = UseAuth();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/job-application?email=${user.email}`)
                .then(res => res.json())
                .then(data => setJobs(data));
        }
    }, [user.email]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold mb-4">My Applications</h2>

            {jobs.length === 0 ? (
                <p>You haven't applied to any jobs yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 shadow-sm rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border">Title</th>
                                <th className="py-2 px-4 border">Company</th>
                                <th className="py-2 px-4 border">Location</th>
                                {/* <th className="py-2 px-4 border">Salary</th> */}
                                <th className="py-2 px-4 border">Type</th>
                                <th className="py-2 px-4 border">Applied Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job._id} className="text-center">
                                    <td className="py-2 px-4 border">{job.title}</td>
                                    <td className="py-2 px-4 border">{job.company}</td>
                                    <td className="py-2 px-4 border">{job.location}</td>
                                    {/* <td className="py-2 px-4 border">{job.salary}</td> */}
                                    <td className="py-2 px-4 border">{job.jobType}</td>
                                    <td className="py-2 px-4 border">{job.applicant_email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyApplications;
