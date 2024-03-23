// FAQ.js
import React, { useState } from 'react';
import Accordion from './Accordion';
import { motion } from 'framer-motion';
import Header from '../components/Header';

const PowerCard = () => {
 const [expanded, setExpanded] = useState(false);

 const accordionItems = [
    { title: "Muft Ka paisa" },
    { title: "Insider Trading" },
    { title: "Card 3" },
 ];

 return (
    <div>
      {/* <motion.div
      className="flex flex-col items-center justify-center bg-gradient-to-r from-[#6cff73] to-[#1e1f26] text-white p-8 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-4">Power Cards 🃏</h2>
      Add more content here, such as icons or images
    </motion.div> */}

    <Header text={"Power Cards"} />
      <div className=" mt-28 faq-items max-w-[350px] mx-auto bg-black">
        {accordionItems.map((item, i) => (
          <Accordion
            key={i}
            i={i}
            expanded={expanded}
            setExpanded={setExpanded}
            title={item.title}
          />
        ))}
      </div>
    </div>
 );
};

export default PowerCard;
