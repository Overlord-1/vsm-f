import React from 'react'
import bgImg from "../assets/leaderboardBg.png";
import rocket from "../assets/rocket.png";

const LeaderboardHeader = () => {
  return (
    <div className="mainFrame mx-auto">
        <div className="header sm:mt-5 rounded-2xl sm:bg-gradient-to-r from-slate-500 to-blue-700">
          <div className="title flex w-full justify-between items-center sm:justify-evenly sm:gap-[300px]">
            <div className="  top-4 sm:top-2 sm:text-5xl sm:relative text-slate-100 text-[40px] p-7 font-bold ">
              Leaderboard
            </div>
            <img
              src={rocket}
              alt=""
              className="mt-3 sm:relative"
            />
          </div>
        </div>
      </div>
  )
}

export default LeaderboardHeader