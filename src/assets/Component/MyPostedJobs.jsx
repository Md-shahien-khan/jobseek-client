import React, { useEffect, useState } from 'react';
import UseAuth from './UseAuth';

const MyPostedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = UseAuth();

    useEffect(() => {
        if (!user?.email) return; // prevent fetching if user is not loaded
        fetch(`http://localhost:3000/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => setJobs(data))
            .catch(err => console.error("Error fetching jobs:", err));
    }, [user?.email]);

    return (
        <div>
            <h2>My Posted Jobs</h2>
            <h2>{jobs.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Job title</th>
        <th>Application deadline</th>
        <th>Application Count</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     {
        jobs.map((job, index) =>  <tr>
        <th>{index + 1}</th>
        <td>{job.title}</td>
        <td>{job.applicationDeadline}</td>
        <td>{job.applicationCount}</td>
      </tr>)
     }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyPostedJobs;
