import React from "react";
import LeaderboardHeader from "../components/LeaderboardHeader";
import RankList from "../components/RankList";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/news");
  };
  return (
    <>
      <div className="max-w-[1240px] mx-auto flex flex-col">
        <LeaderboardHeader />
        <button
            className="text-[#6cff73] font-bold bg-[#1E1F26] p-3 rounded-lg px-3 m-5 max-w-[1200px] mx-auto"
            onClick={handleClick}
          >
            Back to News
          </button>
        <RankList />
      </div>
    </>
  );
};

export default Leaderboard;
