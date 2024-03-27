import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const CalcRound = () => {
  return (
    <div>
      <div className="flex flex-col justify-center max-h-72 mt-40">
        <ClimbingBoxLoader color="#6cff73" loading={true} size={15} className="mx-auto mt-6" />
        <div className="text-2xl animate-pulse mt-24 text-[#6cff73] mx-auto">Please Wait </div>
        <div className="text-2xl animate-pulse mx-auto">Game is getting ready for the</div>
        <div className="text-4xl animate-pulse text-[#6cff73] mx-auto">Next Round</div>
      </div>
    </div>
  );
};

export default CalcRound;
