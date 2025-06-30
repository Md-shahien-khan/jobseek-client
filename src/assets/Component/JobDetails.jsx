import React, { useEffect, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBill, FaEnvelope, FaBuilding, FaLayerGroup, FaHeart } from 'react-icons/fa';
import JobsCard from './JobsCard';

const JobDetails = () => {
  const {
    _id,
    title,
    location,
    jobType,
    category,
    applicationDeadline,
    salaryRange,
    description,
    company,
    requirements,
    responsibilities,
    hr_email,
    hr_name,
    company_logo
  } = useLoaderData();

  const [moreJobs, setMoreJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/jobs')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(job => job._id !== _id).slice(0, 4);
        setMoreJobs(filtered);
      });
  }, [_id]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded-xl p-6 md:p-10"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
          <img src={company_logo} alt="Company Logo" className="w-20 h-20 object-cover rounded-full border" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <FaBuilding className="text-blue-500" /> {company}
            </p>
          </div>
        </div>

        {/* Job Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-6">
          <p><FaMapMarkerAlt className="inline mr-2 text-rose-500" /> {location}</p>
          <p><FaBriefcase className="inline mr-2 text-yellow-600" /> {jobType}</p>
          <p><FaLayerGroup className="inline mr-2 text-green-600" /> {category}</p>
          <p><FaMoneyBill className="inline mr-2 text-emerald-600" /> {salaryRange?.min} - {salaryRange?.max} {salaryRange?.currency?.toUpperCase()}</p>
        </div>

        {/* Description */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xl font-semibold">Job Description</h3>
          <p className="text-gray-700">{description}</p>
        </div>

        {/* Requirements */}
        {requirements && (
          <div className="space-y-2 mb-6">
            <h3 className="text-xl font-semibold">Requirements</h3>
            <ul className="list-disc list-inside text-gray-700">
              {requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Responsibilities */}
        {responsibilities && (
          <div className="space-y-2 mb-6">
            <h3 className="text-xl font-semibold">Responsibilities</h3>
            <ul className="list-disc list-inside text-gray-700">
              {responsibilities.map((res, idx) => (
                <li key={idx}>{res}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact & Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 gap-4">
          <div>
            <p className="text-sm text-gray-500">Apply before: <strong>{applicationDeadline}</strong></p>
            <p className="text-sm text-gray-500 flex items-center gap-2"><FaEnvelope /> {hr_email}</p>
            <p className="text-sm text-gray-500">HR: {hr_name}</p>
          </div>

          <div className="flex gap-4">
            <Link to={`/jobApply/${_id}`}><button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition">Apply Now</button></Link>
            <button className="text-red-500 border border-red-400 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-100 transition">
              <FaHeart /> Save
            </button>
          </div>
        </div>
      </motion.div>

      {/* More Jobs Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-800">More Jobs You May Like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {moreJobs.map(job => (
            <JobsCard key={job._id} jobs={job} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetails;


// import React, { useEffect, useState } from 'react';
// import { useLoaderData, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaMapMarkerAlt, FaBriefcase, FaMoneyBill, FaEnvelope, FaBuilding, FaLayerGroup, FaHeart } from 'react-icons/fa';
// import JobsCard from './JobsCard';
// import UseAuth from './UseAuth'; // Import your auth hook

// const JobDetails = () => {
//   const {
//     _id,
//     title,
//     location,
//     jobType,
//     category,
//     applicationDeadline,
//     salaryRange,
//     description,
//     company,
//     requirements,
//     responsibilities,
//     hr_email,
//     hr_name,
//     company_logo
//   } = useLoaderData();

//   const { user } = UseAuth();
//   const [moreJobs, setMoreJobs] = useState([]);
//   const [alreadyApplied, setAlreadyApplied] = useState(false);

//   useEffect(() => {
//     // Fetch more jobs
//     fetch('http://localhost:3000/jobs')
//       .then(res => res.json())
//       .then(data => {
//         const filtered = data.filter(job => job._id !== _id).slice(0, 4);
//         setMoreJobs(filtered);
//       });

//     // Check if user has already applied
//     if (user?.email && _id) {
//       fetch(`http://localhost:3000/job-application/check?job_id=${_id}&email=${user.email}`)
//         .then(res => res.json())
//         .then(data => setAlreadyApplied(data.applied));
//     }
//   }, [_id, user?.email]);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white shadow-md rounded-xl p-6 md:p-10"
//       >
//         {/* Header */}
//         <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
//           <img src={company_logo} alt="Company Logo" className="w-20 h-20 object-cover rounded-full border" />
//           <div>
//             <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
//             <p className="text-gray-600 flex items-center gap-2">
//               <FaBuilding className="text-blue-500" /> {company}
//             </p>
//           </div>
//         </div>

//         {/* Job Info */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-6">
//           <p><FaMapMarkerAlt className="inline mr-2 text-rose-500" /> {location}</p>
//           <p><FaBriefcase className="inline mr-2 text-yellow-600" /> {jobType}</p>
//           <p><FaLayerGroup className="inline mr-2 text-green-600" /> {category}</p>
//           <p><FaMoneyBill className="inline mr-2 text-emerald-600" /> {salaryRange?.min} - {salaryRange?.max} {salaryRange?.currency?.toUpperCase()}</p>
//         </div>

//         {/* Description */}
//         <div className="space-y-3 mb-6">
//           <h3 className="text-xl font-semibold">Job Description</h3>
//           <p className="text-gray-700">{description}</p>
//         </div>

//         {/* Requirements */}
//         {requirements && (
//           <div className="space-y-2 mb-6">
//             <h3 className="text-xl font-semibold">Requirements</h3>
//             <ul className="list-disc list-inside text-gray-700">
//               {requirements.map((req, idx) => (
//                 <li key={idx}>{req}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Responsibilities */}
//         {responsibilities && (
//           <div className="space-y-2 mb-6">
//             <h3 className="text-xl font-semibold">Responsibilities</h3>
//             <ul className="list-disc list-inside text-gray-700">
//               {responsibilities.map((res, idx) => (
//                 <li key={idx}>{res}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Contact & Buttons */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 gap-4">
//           <div>
//             <p className="text-sm text-gray-500">Apply before: <strong>{applicationDeadline}</strong></p>
//             <p className="text-sm text-gray-500 flex items-center gap-2"><FaEnvelope /> {hr_email}</p>
//             <p className="text-sm text-gray-500">HR: {hr_name}</p>
//           </div>

//           <div className="flex gap-4">
//             {alreadyApplied ? (
//               <button
//                 className="bg-gray-400 cursor-not-allowed text-white px-5 py-2 rounded-md"
//                 disabled
//               >
//                 Already Applied
//               </button>
//             ) : (
//               <Link to={`/jobApply/${_id}`}>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition">
//                   Apply Now
//                 </button>
//               </Link>
//             )}
//             <button className="text-red-500 border border-red-400 px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-100 transition">
//               <FaHeart /> Save
//             </button>
//           </div>
//         </div>
//       </motion.div>

//       {/* More Jobs Section */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.4 }}
//       >
//         <h3 className="text-2xl font-bold mb-4 text-gray-800">More Jobs You May Like</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
//           {moreJobs.map(job => (
//             <JobsCard key={job._id} jobs={job} />
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default JobDetails;

