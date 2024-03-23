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
      <div className="max-w-[1240px] mx-auto flex flex-col max-h-screen">
        <LeaderboardHeader />
        <RankList />
      </div>
    </>
  );
};

export default Leaderboard;
