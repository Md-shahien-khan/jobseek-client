import React from 'react';
import { motion } from 'framer-motion';
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaLayerGroup,
  FaBriefcase,
  FaMoneyBillWave,
  FaCheckCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobsCard = ({ jobs }) => {
  const {
    _id,
    title,
    company,
    company_logo,
    requirements,
    description,
    location,
    salaryRange,
    jobType,
    category,
  } = jobs;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-5 flex flex-col h-full justify-between border"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={company_logo}
            alt={`${company} logo`}
            className="w-16 h-16 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              <FaBuilding className="text-blue-500" /> {company}
            </p>
          </div>
        </div>

        {/* Job Info */}
        <div className="text-sm text-gray-700 space-y-2 mb-4">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-rose-500" /> {location}
          </p>
          <p className="flex items-center gap-2">
            <FaLayerGroup className="text-green-500" /> {category}
          </p>
          <p className="flex items-center gap-2">
            <FaBriefcase className="text-yellow-500" /> {jobType}
          </p>
          <p className="flex items-center gap-2">
            <FaMoneyBillWave className="text-emerald-500" />
            {salaryRange?.min} - {salaryRange?.max} {salaryRange?.currency?.toUpperCase()}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 min-h-[60px]">
          {description}
        </p>

        {/* Requirements */}
        {requirements?.length > 0 && (
          <div className="mb-4">
            <p className="font-semibold text-gray-800 text-sm mb-1 flex items-center gap-2">
              <FaCheckCircle className="text-indigo-500" /> Skills Required:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto ">
        <Link to={`/jobs/${_id}`}>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300">
          Details
        </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default JobsCard;
