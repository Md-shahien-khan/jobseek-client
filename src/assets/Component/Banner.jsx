import React from 'react';
import { motion } from 'framer-motion';
import bannerImg from '../img/banner2.jpg'
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url(${bannerImg})` }}>
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-4">
        <motion.div
          className="text-center text-white max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Dream Job with JobSeek</h1>
          <p className="text-lg md:text-xl">
            Explore thousands of job listings tailored to your skills and goals. Let us help you get hired faster.
          </p>
          <Link><button className='btn bg-blue-700 text-white mt-4 hover:bg-blue-400'>Explore jobs</button></Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
