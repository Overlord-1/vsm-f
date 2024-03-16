import React from "react";

const PLtracker = ({ invested }) => {
  // #24FF00 green color
  // #FF4545 red color
  // let color = profit>0?"#24FF00":"#FF4545";
  // let poss = ["text-[#24FF00]","text-[#FF4545]","bg-[#343434]","text-[#ffffff]","text-[#24FF00]","text-[#FF4545]","bg-[#24FF00]","bg-[#FF4545]"]
  return (
    <div className="max-w-[1240px] mx-auto w-full">
      <div className="w-[80%] bg-[#343434] p-5 mx-auto rounded-2xl items-center justify-center gap-4">
        <div className="flex p-2 justify-evenly items-center md:justify-evenly md:border-transparent">
          <div className="text-white">
            <h1 className="opacity-80 text-xl md:text-xl">Total Invested</h1>
            <h1 className="text-2xl md:text-xl text-[#6cff73]">₹ {invested.toLocaleString("en-IN")}</h1>
          </div>
          {/* <div className='invested text-white'>
                        <h1 className='opacity-80 text-sm md:text-xl'>Current</h1>
                        <h1 className='text-2xl md:text-3xl'>{current}</h1>
                    </div> */}
        </div>
        {/* <div className="secondRow flex px-2 mt-3 justify-between items-center md:justify-evenly md:border-transparent">
                    <div className='invested text-white'>
                        <h1 className='text-2xl md:text-3xl'>P&L</h1>
                    </div>
                    <div className='rightOfPL flex text-white'>
                        {<h1 className={`text-2xl md:text-3xl text-[${color}] p-2`}>{profit}</h1>}
                        <div className={`text-2xl  ml-1 md:text-3xl text-[${color}] bg-[${color}] bg-opacity-25 p-2 rounded-full`}>{perChg}%</div>
                    </div>
                    
                </div> */}
      </div>
    </div>
  );
};

export default PLtracker;
