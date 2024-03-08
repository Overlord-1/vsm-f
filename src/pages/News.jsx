import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import axios from "axios";
// import { io } from 'socket.io-client';

const News = () => {
  const token = localStorage.getItem("authToken");
  const [funds, setFunds] = useState(0);
  const [news, setNews] = useState([]);
  const [stock, setStockPrice] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const news = await axios.get(
          "http://localhost:8080/game/info/news",
          config
        );
        setNews(news.data.data);
        const funds = await axios.get(
          "http://localhost:8080/game/info/balance",
          config
        );
        setFunds(funds.data.data.balance);
        const stockPrice = await axios.get(
          "http://localhost:8080/game/info/stocks",
          config
        );
        setStockPrice(stockPrice.data.data);
      } catch {
        console.log("Error");
      }
    };
    fetchData();
  }, [funds, token]);

  const handleFundsUpdate = (newFunds) => {
    setFunds(newFunds);
  };

  const wordArr = Array.from(
    { length: Math.ceil(news.length / 2) },
    (_, i) => news[i * 2].split(" ")[0]
  );

  return (
    <>
      {/* ... other JSX code ... */}
      <div className="max-w-[1240px] mx-auto flex flex-col relative">
        <h1 className="text-[#6cff73] mx-auto rounded-lg font-bold bg-[#1E1F26] p-4 text-2xl my-5 px-5 md:text-4xl sticky top-0 z-10">
          Remaining Funds = $ {funds}
        </h1>
        <div className="row1 flex flex-col md:grid md:grid-cols-2 ">
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

