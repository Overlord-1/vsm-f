import React, { useEffect, useLayoutEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { io } from 'socket.io-client';

const News = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const news = await axios.get(
          `${URL}/game/info/news`,
          config
        );
        setNews(news.data.data);
        console.log(news.data.data);
        const funds = await axios.get(
          `${URL}/game/info/balance`,
          config
        );
        setFunds(funds.data.data.balance);
        const stockPrice = await axios.get(
          `${URL}/game/info/stocks`,
          config
        );
        setStockPrice(stockPrice.data.data);
      } catch {
        console.log("Error");
      }
    };
    fetchData();
  },[]);

  const token = localStorage.getItem("authToken");
  const [funds, setFunds] = useState(0);
  const [news, setNews] = useState([]);
  const [stock, setStockPrice] = useState([]);
  const navigate = useNavigate();
  const URL  = process.env.REACT_APP_API_URL;

  const handlePortfolio = () => {
    navigate("/portfolio");
  };
  const handleLeaderboard = () => {
    navigate("/leaderboard");
  };

  
  const handleFundsUpdate = (newFunds) => {
    setFunds(newFunds);
  };

  const wordArr = Array.from(
    { length: Math.ceil(news.length / 2) },
    (_, i) => news[i * 2].split(" ")[0]
  );
   console.log(wordArr);

  return (
    <>
      <div className="max-w-[1240px] mx-auto flex flex-col relative">
        <h1 className="text-[#6cff73] mx-auto rounded-lg font-bold bg-[#1E1F26] p-4 text-2xl my-5 px-5 md:text-4xl sticky top-0 z-10">
          Remaining Funds = ₹ {funds.toFixed(2)}
        </h1>
        <div className="flex">
          <button
            className="text-[#6cff73] font-bold bg-[#1E1F26] p-3 rounded-lg px-3 m-5 max-w-[1200px] mx-auto"
            onClick={handlePortfolio}
          >
            View Portfolio
          </button>
          <button
            className="text-[#6cff73] font-bold bg-[#1E1F26] p-3 rounded-lg px-3 m-5 max-w-[1200px] mx-auto"
            onClick={handleLeaderboard}
          >
            View Leaderboard
          </button>
        </div>
        <div className="row1 flex flex-col md:grid-cols-2 ">
          {wordArr.map((word, index) => {
            const stockItem = stock.find((item) => item.id === word);
            if (stockItem) {
              return (
                <NewsCard
                  key={index}
                  name={word}
                  stockprice={stockItem.value}
                  funds={funds}
                  news1={news[index * 2]}
                  news2={news[index * 2 + 1]}
                  onFundsUpdate={handleFundsUpdate}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </>
  );
};

export default News;
