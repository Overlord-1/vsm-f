import React from 'react';
import logo from '../assets/vsmLogo.png';
import { motion, useScroll, useTransform } from 'framer-motion';


const Header = ({ text }) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0]);
 
  return (
     <motion.div
       className='w-full mx-auto max-w-[1240px] p-7 mb-5 flex justify-between items-center bg-gradient-to-r from-[#6cff7334] to-midnight-900 shadow-lg'
       style={{ scale }}
     >
       <h1 className='text-4xl text-white md:text-6xl font-bold' style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}>{text}</h1>
       <img src={logo} alt="vsm logo" className='w-[60px] h-[60px]' />
     </motion.div>
  );
 };
 
 export default Header;
