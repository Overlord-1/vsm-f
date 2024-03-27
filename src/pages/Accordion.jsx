// // Accordion.js
// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const Accordion = ({ i, expanded, setExpanded, title, content }) => {
//   const isOpen = i === expanded;

//   return (
//     <>
//       <motion.div
//         initial={false}
//         animate={{
//           backgroundColor: isOpen ? "#6cff73" : "#1e1f26",
//         }}
//         className={`bg-green-500 w-full font-bold ${isOpen ? "text-black" : "text-white"} text-2xl rounded-lg mb-2`}
//         onClick={() => setExpanded(isOpen ? false : i)}
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "2rem 4rem",
//           cursor: "pointer",
//         }}
//       >
//         {title}
//       </motion.div>

//       <AnimatePresence initial={false}>
//         {isOpen && (
//           <motion.section
//             initial="collapsed"
//             animate="open"
//             exit="collapsed"
//             variants={{
//               open: { opacity: 1, height: "auto" },
//               collapsed: { opacity: 0, height: 0 },
//             }}
//             transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
//             style={{
//               backgroundColor: "transparent",
//               padding: "0 2rem",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             {content}

//             {
//               title === "Market Gambit" 
//               ? <div className='flex'>
//                 <button className="block text-black font-bold bg-[#6cff73] p-3 rounded-lg px-3 m-3">UP</button>
                
//                 <input type="number" placeholder="Amount" className="block text-black font-bold bg-white p-3 rounded-lg w-[100px] m-3"/>
//                 <button className="block text-black font-bold bg-[#6cff73] p-3 rounded-lg px-3 m-3">DOWN</button>
//                  </div> 
//               : <button className="block text-black font-bold bg-[#6cff73] p-3 rounded-lg px-10 m-3">USE</button>

//             }

//           </motion.section>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Accordion;



// Accordion.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Accordion = ({ i, expanded, setExpanded, title, content }) => {
  const isOpen = i === expanded;
  const [isLoading, setIsLoading] = useState(false);
  const [newContent, setContent] = useState(content);
  const [usedOnce, setUsedOnce] = useState(false);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("authToken");
  const handleUsePowerUp = async (powerUpTitle) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setIsLoading(true);

      const response  = await axios.post(`http://localhost:8080/game/powerup/${encodeURIComponent(powerUpTitle)}`,{},config);
      setIsLoading(false);
      setUsedOnce(true);
      // If title is "insider trading", update content with response
      if (title === "Insider Trading") {
        const updatedContent = { ...content };
        updatedContent.data = response.data.data; // Update content with actual response
        console.log(response.data.data);
        setContent(response.data.data);
        setUsedOnce(true);
      }
    } catch (error) {
      console.error("Error while using power up:", error);
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isOpen ? "#6cff73" : "#1e1f26",
        }}
        className={`bg-green-500 w-full font-bold ${isOpen ? "text-black" : "text-white"} text-2xl rounded-lg mb-2`}
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

      {/* <AnimatePresence initial={false}>
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
              display: "flex",
              flexDirection: "column",
            }}
          >
            {newContent}

            {title === "Muft Ka Paisa" ? (
              <button
                className="block text-black font-bold bg-[#6cff73] p-3 rounded-lg px-10 m-3"
                onClick={() => handleUsePowerUp("muft-ka-paisa")}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Use"}
              </button>
            ) : title === "Insider Trading" ? (
              <button
                className="block text-black font-bold bg-[#6cff73] p-3 rounded-lg px-10 m-3"
                onClick={() => handleUsePowerUp("insider-trading")}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Use"}
              </button>
            ) : null}
          </motion.section>
        )}
      </AnimatePresence> */}
      

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
              display: "flex",
              flexDirection: "column",
            }}
          >
            {newContent}
            {
              error && <p className="text-red-500">Error while using power up</p>
            }

            {
              title === "Market Gambit" 
              ? <div className='flex'>
                <button className="block text-black font-bold bg-[#6cff73] p-3 rounded-lg px-3 m-3">UP</button>
                
                <input type="number" placeholder="Amount" className="block text-black font-bold bg-white p-3 rounded-lg w-[100px] m-3"/>
                <button className="block text-black font-bold bg-[#6cff73] p-3 rounded-lg px-3 m-3">DOWN</button>
                 </div> 
              : title === "Muft Ka paisa"
              ? <button onClick={() => handleUsePowerUp("muft-ka-paisa")} disabled={isLoading} className="block text-black font-bold bg-[#6cff73] p-3 rounded-lg px-10 m-3">
                {isLoading ? "Loading..." : "Use"}
              </button>
              : <button onClick={() => handleUsePowerUp("insider-trading")} disabled={isLoading} className="block text-black font-bold bg-[#6cff73] p-3 rounded-lg px-10 m-3">
                {isLoading ? "Loading..." : "Use"}
              </button>

            }

          </motion.section>
        )}
      </AnimatePresence>

    </>
  );
};

export default Accordion;
