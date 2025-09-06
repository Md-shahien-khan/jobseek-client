import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "./UseAuth";

const AddJob = () => {
  const navigate = useNavigate();
  const {user} = UseAuth();
  // collect form data
  const handleAddJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    console.log(initialData);
    const {min, max, ...newJob} = initialData;
    console.log(initialData);
    newJob.salaryRange = {min, max}
    console.log(newJob); //it will show data like salary range, inside u will see min and max
    newJob.requirements = newJob.requirements.split('\n'); // it will split all the requirements in array
    newJob.responsibilities = newJob.responsibilities.split('\n')
    console.log(newJob);


    // posting job to backend
    fetch('http://localhost:3000/jobs', {
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(newJob)
    })
    .then(res => res.json())
    .then(data =>{
      if(data.insertedId){
        Swal.fire({
        title: "Job Posted Succesfully",
        icon: "success",
        draggable: true
      });
      navigate('/myPostedJobs')
      }
    })
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Post a Job</h2>
      <form
        onSubmit={handleAddJob}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow-md rounded-2xl p-6"
      >
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="border p-2 rounded-lg w-full"
          required
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border p-2 rounded-lg w-full"
          required
        />

        {/* Job Type */}
        <select name="jobType" className="border p-2 rounded-lg w-full" required>
          <option value="">Select Job Type</option>
          <option value="Onsite">Onsite</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="border p-2 rounded-lg w-full"
        />

        {/* Application Deadline */}
        <input
          type="date"
          name="applicationDeadline"
          className="border p-2 rounded-lg w-full"
          required
        />

        {/* Salary Range */}
        <div className="flex gap-2 md:col-span-2">
          <input
            type="number"
            name="min"
            placeholder="Min Salary"
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="number"
            name="max"
            placeholder="Max Salary"
            className="border p-2 rounded-lg w-full"
          />
        </div>

        {/* Company */}
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          className="border p-2 rounded-lg w-full"
        />

        {/* HR Email */}
        <input
          type="email"
          defaultValue={user.email}
          name="hr_email"
          placeholder="HR Email"
          className="border p-2 rounded-lg w-full"
          required
        />

        {/* HR Name */}
        <input
          type="text"
          name="hr_name"
          placeholder="HR Name"
          className="border p-2 rounded-lg w-full"
        />

        {/* Company Logo (Object) */}
        <div className="flex flex-col md:col-span-2 gap-2">
          <input
            type="url"
            name="url"
            placeholder="Company Logo URL"
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            name="alt"
            placeholder="Alt text for Logo"
            className="border p-2 rounded-lg w-full"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Job Description"
          className="border p-2 rounded-lg w-full md:col-span-2 h-24"
        />

        {/* Requirements */}
        <textarea
          name="requirements"
          placeholder="Requirements (comma separated)"
          className="border p-2 rounded-lg w-full md:col-span-2 h-20"
        />

        {/* Responsibilities */}
        <textarea
          name="responsibilities"
          placeholder="Responsibilities (comma separated)"
          className="border p-2 rounded-lg w-full md:col-span-2 h-20"
        />

        {/* Status */}
        <select name="status" className="border p-2 rounded-lg w-full">
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg md:col-span-2"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;



// {
//     e.preventDefault()
// 👉 form-এর default behavior হলো submit করলে browser পুরো পেজ reload করে।
// কিন্তু React-এ আমরা চাই single page app-এর মতো আচরণ করুক। তাই e.preventDefault() ব্যবহার করা হচ্ছে, যেন পেজ reload না হয়।

// new FormData(e.target)
// 👉 এখানে e.target হলো পুরো <form> element।
// 👉 FormData হল একটা built-in browser API যেটা form-এর ভেতরে থাকা সব input field-এর name আর value automatically collect করে।

// উদাহরণ:

// <form>
//   <input name="title" value="Software Engineer" />
//   <input name="location" value="Chittagong" />
// </form>


// তাহলে new FormData(e.target) থেকে পাওয়া ডেটা হবে:

// title → "Software Engineer"
// location → "Chittagong"


// formData.entries()
// 👉 এটা FormData-এর সব ডেটাকে key-value pair আকারে বের করে আনে।
// উদাহরণ:

// [ ["title", "Software Engineer"], ["location", "Chittagong"] ]


// Object.fromEntries(formData.entries())
// 👉 এটা ওই key-value pair-এর array-কে একটা JavaScript object-এ convert করে দেয়।
// মানে উপরের data হবে:

// {
//   title: "Software Engineer",
//   location: "Chittagong"
// }


// console.log(initialData)
// 👉 এখন তুমি form submit করলে পুরো ডেটা object আকারে console-এ দেখতে পাবে।
// }