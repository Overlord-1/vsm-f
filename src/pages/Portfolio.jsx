import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PLtracker from "../components/PLtracker";
import MiddleRow from "../components/MiddleRow";
import Card from "../components/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const token = localStorage.getItem("authToken");
  const URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const portfolio = await axios.get(
          `${URL}/game/info/portfolio`,
          config
        );
        console.log(portfolio.data.data.portfolio);
        setPortfolio(portfolio.data.data.portfolio);
      } catch {
        console.log("Error");
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleClick = () =>{
    navigate('/news')
  }
  const total = portfolio.reduce((acc, cur) => acc + cur.value, 0);
  return (
    <div className="flex flex-col">
      <Header text={"Portfolio"} />
      <PLtracker invested={total} />
      <button
            className="text-[#6cff73] font-bold bg-[#1E1F26] p-3 rounded-lg px-3 m-5 max-w-[1200px] mx-auto"
            onClick={handleClick}
          >
            Back to News
          </button>

      <MiddleRow />
      {portfolio.map((parameter) => (
        <Card
          name={parameter.name}
          key={parameter.name}
          avg={parameter.value / parameter.volume}
          quantity={parameter.volume}
        />
      ))}
    </div>
  );
};

export default Portfolio;
