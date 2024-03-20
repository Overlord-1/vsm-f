import React, { useEffect, useLayoutEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import axios from "axios";
import logo from "../assets/vsmLogo.png";
import portfolio from "../assets/portfolio.svg";
import leaderboard from "../assets/leaderboard.svg";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

// import { io } from 'socket.io-client';

const News = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };
  //       const news = await axios.get(
  //         `${URL}/game/info/news`,
  //         config
  //       );
  //       setNews(news.data.data);
  //       console.log(news.data.data);
  //       const funds = await axios.get(
  //         `${URL}/game/info/balance`,
  //         config
  //       );
  //       setFunds(funds.data.data.balance);
  //       const stockPrice = await axios.get(
  //         `${URL}/game/info/stocks`,
  //         config
  //       );
  //       setStockPrice(stockPrice.data.data);
  //     } catch {
  //       console.log("Error");
  //     }
  //   };
  //   fetchData();
  // },[]);

  const token = localStorage.getItem("authToken");
  const [funds, setFunds] = useState(100000);
  const [pageState, setPageState] = useState(0); 
  const [news, setNews] = useState([
    "AAPL is going to the moon",
    "AAPL is going to fallellllell",
    "GOOGL is going to the moon",
    "GOOGL is going to fallellllell",
    "AMZN is going to the moon",
    "AMZN is going to fallellllell",
    "TSLA is going to the moon",
    "TSLA is going to fallellllell",
  ]);
  const [stock, setStockPrice] = useState([
    { id: "AAPL", value: 100 },
    { id: "GOOGL", value: 100 },
    { id: "AMZN", value: 100 },
    { id: "TSLA", value: 100 },
  ]);
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;

  const handlePortfolio = () => {
    navigate("/portfolio");
  };
  const handleLeaderboard = () => {
    navigate("/leaderboard");
  };

  const handleFundsUpdate = (newFunds) => {
    setFunds(newFunds);
  };

  const handleFooterClick = (e) => {
    console.log(e.target.alt);
    if (e.target.alt === "home") {
      setPageState(0);
    } else if (e.target.alt === "portfolio") {
      setPageState(1);
    } else if (e.target.alt === "leaderboard") {
      setPageState(2);
    }
  }

  // const wordArr = Array.from(
  //   { length: Math.ceil(news.length / 2) },
  //   (_, i) => news[i * 2].split(" ")[0]
  // );
  const wordArr = ["AAPL", "GOOGL", "AMZN", "TSLA", "MSFT"];
  // console.log(wordArr);

  return (
    <>

      <div className="max-w-[1240px] h-screen mx-auto flex flex-col relative">
        
        
        { pageState === 0 &&
        <div className="newsPage">

        
        <h1 className="text-[#6cff73] mx-auto rounded-lg font-bold bg-[#1E1F26] p-4 text-2xl my-5 px-5 md:text-4xl sm:text-2xl sticky top-0 z-10">
          Funds = ₹ {funds.toFixed(2)}
        </h1>

        <div className="row1 flex flex-col md:grid-cols-2 ">
          <Carousel showThumbs={false}>
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
          </Carousel>
        </div>
        </div>}

        {
          pageState === 1 && <div className=" text-white">portfolioPage</div>
        }
        {
          pageState === 2 && <div className=" text-white">Leaderboard</div>
        }



        <div className="footer w-full bg-[#1e1f26] text-white flex px-5 justify-between fixed bottom-0  z-20 rounded-t-2xl">
          <div className={`bg-[${pageState === 0?"#111":"#1e1f26"}] p-5 m-2 rounded-3xl`}>
            <img
              src={logo}
              alt="home"
              className="w-[40px]"
              onClick={(e)=>handleFooterClick(e)}
            />
          </div>
          <div className={`bg-[${pageState === 1?"#111":"#1e1f26"}] p-5 m-2 rounded-3xl`}>
            <img
              src={portfolio}
              alt="portfolio"
              className="w-[40px]"
              onClick={(e)=>handleFooterClick(e)}
            />
          </div>
          <div className={`bg-[${pageState === 2?"#111":"#1e1f26"}] p-5 m-2 rounded-3xl`}>
            <img
              src={leaderboard}
              alt="leaderboard"
              className="w-[40px]"
              onClick={(e)=>handleFooterClick(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
