import React, { useEffect, useLayoutEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import axios from "axios";

import logo from "../assets/vsmLogo.png";
import cards from "../assets/cards.svg";
import portfolio from "../assets/portfolio.svg";
import Portfolio from "../pages/Portfolio";
import Leaderboard from "../pages/Leaderboard";
import PowerCard from "../pages/PowerCard";
import leaderboard from "../assets/leaderboard.svg";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import Header from "../components/Header";
import Timer from "../components/Timer";
import CalcRound from "./CalcRound";
import { io } from "socket.io-client";

// import { io } from 'socket.io-client';

const News = () => {

  const token = localStorage.getItem("authToken");
  const [funds, setFunds] = useState(100000);
  const [pageState, setPageState] = useState(0);
  const [news, setNews] = useState([]);
  const [stock, setStockPrice] = useState([]);
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_API_URL;
  const [socket, setSocket] = useState(null);
  const [round, setRound] = useState(0);
  const [connected, setConnected] = useState(false);



  // useEffect(() => {
  // const connectSocket = () => {
  //   const newSocket = io(`${URL}`, {
  //     transportOptions: {
  //       polling: {
  //         extraHeaders: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     },
  //   });

  //   newSocket.on("connect", () => {
  //     console.log("Connected to server");
  //     setConnected(true);
  //   });

  //   newSocket.on("game:stage:TRADING_STAGE", () => {
  //     console.log("Market is open");
  //     setPageState(0);
  //   });

  //   newSocket.on("game:stage:CALCULATION_STAGE", () => {
  //     console.log("Calculation stage");
  //     setPageState(4);
  //   });

  //   newSocket.on("game:end", () => {
  //     console.log("Game ended");
  //     // Disconnect the socket when the game ends
  //     newSocket.disconnect();
  //     setConnected(false);
  //   });

  //   setSocket(newSocket);
  // };

  // connectSocket();

  // // Cleanup function to disconnect the socket when the component unmounts
  // return () => {
  //   if (socket) {
  //     socket.disconnect();
  //   }
  // };


  // }, [token]);
  useEffect(() => {

    const socket = io(`${URL}`, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    });

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.on("game:stage:TRADING_STAGE", (data) => {
        // console.log(data);
        console.log("Market is open", data);
        setRound(round + 1);
        // navigate("/news");
        setPageState(0);
      });

      socket.on("game:stage:CALCULATION_STAGE", () => {
        console.log("Calculation stage");
        // navigate("/calcround");
        setPageState(4);
      });
      socket.on("game:end", () => {
        console.log("Game ended");
        // Disconnect the socket when the game ends
        socket.disconnect();


        // navigate("/leaderboard");

      });
    });
  }, [token]);


  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const funds = await axios.get(
          `${URL}/game/info/balance`,
          config
        );

        setFunds(funds.data.data.balance);
        console.log(funds.data.data.balance);
      }

      catch
      {
        console.log("Error");
      }
    }

    fetchData();
  })

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
        // funds = await axios.get(
        //   `${URL}/game/info/balance`,
        //   config
        // );
        // setFunds(funds.data.data.balance);
        // console.log(funds.data.data.balance);
        const stockPrice = await axios.get(
          `${URL}/game/info/stocks`,
          config
        );
        setStockPrice(stockPrice.data.data);
        // console.log(stockPrice.data.data);
      } catch {
        console.log("Error");
      }
    };
    fetchData();
  }, [token, round]);




  // [
  //   "AAPL is going to the moon",
  //   "AAPL is going to fallellllell",
  //   "GOOGL is going to the moon",
  //   "GOOGL is going to fallellllell",
  //   "AMZN is going to the moon",
  //   "AMZN is going to fallellllell",
  //   "TSLA is going to the moon",
  //   "TSLA is going to fallellllell",
  // ]



  // [
  //   { id: "AAPL", value: 100 },
  //   { id: "GOOGL", value: 100 },
  //   { id: "AMZN", value: 100 },
  //   { id: "TSLA", value: 100 },
  // ]


  // const handlePortfolio = () => {
  //   navigate("/portfolio");
  // };
  // const handleLeaderboard = () => {
  //   navigate("/leaderboard");
  // };

  const handleFundsUpdate = (newFunds) => {
    setFunds(newFunds);
  };

  const handleFooterClick = (e) => {
    console.log(e.target.alt);
    if (e.target.alt === "home" && pageState !== 4) {
      setPageState(0);
    } else if (e.target.alt === "portfolio" && pageState !== 4) {
      setPageState(1);
    }
    else if (e.target.alt === "cards" && pageState !== 4) {
      setPageState(2);
    }
    else if (e.target.alt === "leaderboard" && pageState !== 4) {
      setPageState(3);
    }
  }

  const wordArr = Array.from(
    { length: Math.ceil(news.length / 2) },
    (_, i) => news[i * 2].split(" ")[0]
  );
  // const wordArr = ["AAPL", "GOOGL", "AMZN", "TSLA", "MSFT"];
  console.log(wordArr);

  return (
    <>

      <div className="max-w-[1240px] h-screen mx-auto flex flex-col relative">


        {pageState === 0 &&
          <div className="newsPage">
            <Header text={"VSM"} />

            <h1 className="text-[#6cff73] max-w-[90%] text-center mx-auto rounded-lg font-bold bg-[#1E1F26] p-4 text-2xl my-5 px-5 md:text-4xl sm:text-2xl ">
              Funds = ₹ {funds}
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
              <div className="fixed right-5 bottom-24">


              </div>
            </div>
          </div>}

        {
          pageState === 1 &&

          <Portfolio />

        }
        {
          pageState === 2 &&

          <PowerCard />

        }
        {
          pageState === 3 &&

          <Leaderboard />

        }
        {
          pageState === 4 &&

          <CalcRound />

        }
        <div className="fixed right-3 bottom-24">
          {/* <Timer /> */}

        </div>





        <div className="footer w-full bg-[#1e1f26] text-white flex px-5 justify-between fixed bottom-0  z-20 rounded-t-2xl">
          <motion.div whileTap={{ scale: 0.4 }} className={`${pageState === 0 ? "bg-[#6cff7379]" : "bg-[#1e1f26]"} py-2 px-5 m-2 rounded-3xl`}>
            <img
              src={logo}
              alt="home"
              className="w-[40px]"
              onClick={(e) => handleFooterClick(e)}
            />
          </motion.div>
          <motion.div whileTap={{ scale: 0.5 }} className={`${pageState === 1 ? "bg-[#111]" : "bg-[#1e1f26]"} py-2 px-5 m-2 rounded-3xl`}>
            <img
              src={portfolio}
              alt="portfolio"
              className="w-[40px]"
              onClick={(e) => handleFooterClick(e)}
            />
          </motion.div>
          <motion.div whileTap={{ scale: 0.5 }} className={`${pageState === 2 ? "bg-[#111]" : "bg-[#1e1f26]"} py-2 px-5 m-2 rounded-3xl`}>
            <img
              src={cards}
              alt="cards"
              className="w-[40px]"
              onClick={(e) => handleFooterClick(e)}
            />
          </motion.div>
          <div className={`${pageState === 3 ? "bg-[#111]" : "bg-[#1e1f26]"} py-2 px-5 m-2 rounded-3xl`}>
            <img
              src={leaderboard}
              alt="leaderboard"
              className="w-[40px]"
              onClick={(e) => handleFooterClick(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
