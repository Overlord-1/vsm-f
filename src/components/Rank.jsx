import React from "react";

const Rank = ({ color, topRank, rank, name, score }) => {
  //   const posss = ["bg-[#FFD700]","bg-[#C0C0C0]","bg-[#CD7F32]","bg-[#686870]","bg-","[#1E1F26]"]
  return (
    <div
      className={`plate bg-[${
        topRank ? color : "#1E1F26"
      }] p-5 mt-5 w-[95%] mx-auto flex items-center justify-between rounded-[18px]  border-[${
        topRank ? "none" : "none"
      } opacity-50]`}
    >
      <div className="flex justify-start gap-5 ml-5 sm:ml-10 items-center ">
        {topRank ? (
          <div className="rank w-8 h-8 rounded-[50%] flex justify-center items-center bg-slate-500 p-2">
            {rank}
          </div>
        ) : (
          <div className="rank w-8 h-8 rounded-[50%] flex justify-center items-center bg-black p-2">
            {rank}
          </div>
        )}

        {topRank ? (
          <div className="name font-bold text-opacity-70 text-black">
            {name}
          </div>
        ) : (
          <div
            className="name 
         text-white font-semibold text-opacity-70"
          >
            {name}
          </div>
        )}
      </div>

      {topRank ? (
        <div className="score mr-5 font-bold text-black">{score.toFixed(2)}</div>
      ) : (
        <div className="score mr-5 font-bold text-white">{score.toFixed(2)}</div>
      )}
    </div>
  );
};

export default Rank;
