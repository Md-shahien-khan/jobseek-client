import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewApplications = () => {
    const applications = useLoaderData();
    const handleStatusUpdate = (e, id) =>{
        console.log(e.target.value, id);
        const data = {
            status : e.target.value
        }
        fetch(`http://localhost:3000/job-applications/${id}`, {
            method : "PATCH",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <div>
            <h2>application length :  {applications.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
        <thead>
        <tr>
            <th></th>
            <th>Email</th>
            <th>Status</th>
            <th>Update Status</th>
        </tr>
        </thead>
        <tbody>
        {
            applications.map((application, index) => <tr key={application._id}>
            <th>{index + 1}</th>
            <td>{application.applicant_email}</td>
            <td>Quality Control Specialist</td>
            <td>
                <select onChange={(e)=> handleStatusUpdate(e, application._id)} defaultValue={application.status || "change"} className="select">
                <option value="change" disabled>Change Status</option>
                <option value="Under Review">Under Review</option>
                <option value="Selected">Selected</option>
                <option value="Not Selected">Not Selected</option>
                </select>
            </td>
        </tr>)
        }
        </tbody>
  </table>
</div>
        </div>
    );
};

export default ViewApplications;