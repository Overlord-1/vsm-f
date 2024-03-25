import React from "react";
import LeaderboardHeader from "../components/LeaderboardHeader";
import RankList from "../components/RankList";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Leaderboard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/news");
  };
  return (
    <>
      <Header text={"Leaderboard 🏅"} />
      <RankList />
    </>
  );
};

export default Leaderboard;
