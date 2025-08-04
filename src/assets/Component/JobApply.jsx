import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import UseAuth from './UseAuth';
import Swal from 'sweetalert2';

const JobApply = () => {
    const {id} = useParams();
    const {user} = UseAuth();
    const navigate = useNavigate();

    console.log(id, user);

    const submitJobApplication = e =>{
      e.preventDefault();
      const form = e.target;
      const firstName = form.firstName.value;
      const lastName = form.lastName.value;
      const linkedInUrl = form.linkedinURL.value;
      const contactNumber = form.contactNumber.value;
      const answer = form.reason.value;
      const resumeURL = form.resumeUrl.value;
      const gender = form.gender.value;

      console.log(firstName, lastName,linkedInUrl,contactNumber, answer, resumeURL, gender);


      const jobApplication = {
      job_id : id,
      applicant_email : user.email,
      firstName, lastName, linkedInUrl, contactNumber, answer, resumeURL, gender  
      };

      // sending data to database
      fetch('http://localhost:3000/job-applications', {
        method : 'POST',
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify(jobApplication)
      })
        .then(res => res.json())
        .then(data => {
          if(data.success === false){
        Swal.fire({
            title: 'Already Applied!',
            text: 'You have already applied for this job.',
            icon: 'warning',
            confirmButtonText: 'OK'
      });
          }
          if (data.insertedId) {
            Swal.fire({
              title: 'Application Submitted!',
              text: 'Your job application has been submitted. We will notify you soon.',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            form.reset(); 
            navigate('/myApplications')
          }
        });


    }
  return (
    <motion.div
      className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Job Application Form</h2>
      <form onSubmit={submitJobApplication} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <motion.input
              type="text"
              name="firstName"
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <motion.input
              type="text"
              name="lastName"
              className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">LinkedIn URL</label>
          <motion.input
            type="url"
            name="linkedinURL"
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Contact Number</label>
          <motion.input
            type="tel"
            name="contactNumber"
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Why Should We Hire You?</label>
          <motion.textarea
            name="reason"
            rows="4"
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Resume File URL</label>
          <motion.input
            type="url"
            name="resumeUrl"
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            whileFocus={{ scale: 1.02 }}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" value="male" />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" value="female" />
              <span>Female</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="gender" value="other" />
              <span>Other</span>
            </label>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" name="terms" id="terms" />
          <label htmlFor="terms" className="text-sm">
            I agree to the terms and conditions.
          </label>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold mt-4"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Application
        </motion.button>
      </form>
    </motion.div>
  );
};

export default JobApply;
