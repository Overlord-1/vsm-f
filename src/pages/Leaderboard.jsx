import React from "react";
import LeaderboardHeader from "../components/LeaderboardHeader";
import RankList from "../components/RankList";

const Leaderboard = () => {
  return (
    <>
      <div className="max-w-[1240px] mx-auto">
        <LeaderboardHeader />
        <RankList />
      </div>
    </>
  );
};

export default Leaderboard;
