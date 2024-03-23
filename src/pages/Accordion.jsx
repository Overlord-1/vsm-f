// Accordion.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Accordion = ({ i, expanded, setExpanded, title }) => {
 const isOpen = i === expanded;

 return (
    <>
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isOpen ? "#1e1f26" : "#1e1f26",
        }}
        className='bg-green-500 w-full text-white text-2xl rounded-lg mb-2'
        onClick={() => setExpanded(isOpen ? false : i)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem 4rem",
          cursor: "pointer",
        }}
      >
        {title}
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{
              backgroundColor: "transparent",
              padding: "0 2rem",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur velit possimus doloremque nesciunt non, libero perferendis, culpa architecto molestias ipsum vitae dolorum saepe, cum fugit dolorem repellendus nemo maxime voluptates.
          </motion.section>
        )}
      </AnimatePresence>
    </>
 );
};

export default Accordion;
