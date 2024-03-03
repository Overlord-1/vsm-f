import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import axios from "axios";

const News = ({}) => {
  const token = localStorage.getItem("authToken");
  const [funds,setFunds] = useState(0);
  const [news, setNews] = useState([]);
  const [stockPrice, setStockPrice] = useState([]);
//   const allNews = Array.from({ length: 4 }, (_, index) =>
//        allNews.slice(index * 2, index * 2 + 2)
// );

// let firstGrp = allNews.slice(0, 2);
// let secondGrp = allNews.slice(2, 4);

// console.log(firstGrp);  // [ [1, 2], [3, 4] ]
// console.log(secondGrp); // [ [3, 4], [5, 6] ]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const news = await axios.get("http://localhost:8080/game/info/news", config);
        // console.log(news.data.data);
        setNews(news.data.data);
        const funds = await axios.get("http://localhost:8080/game/info/balance", config);
        setFunds(funds.data.data.balance);
        // console.log(funds.data.data.balance);
        const stockPrice = await axios.get("http://localhost:8080/game/info/stocks", config);
        // console.log(stockPrice.data.data)
        setStockPrice(stockPrice.data.data);
      } catch {
        console.log("Error");
      }
    };
    fetchData();
  }, [funds]);

  const wordArr = Array.from({ length: Math.ceil(news.length / 2) }, (_, i) => news[i * 2].split(" ")[0]);// just to get the first word of the news which is the stock label
  // console.log( "wordarr "+wordArr);
  // const firstWord = news[0].split(" ")[0]; 
  // console.log( firstWord);

 
  return (
    <>
      {/* <div className="newsHeader w-[80%] max-w-[1240px] p-5 bg-[#1E1F26] mx-auto mt-6 rounded-lg md:mt-10">
        <h1 className="text-white font-bold text-opacity-70 text-2xl md:text-4xl ">
          NEWS 📰
        </h1>
        <p className="text-white mt-4 font-light text-xl md:text-3xl">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
          provident minima deleniti aliquam minus, unde expedita molestiae! Quo
          provident, eaque libero voluptatibus minus nobis unde officia. Ut odio
          non assumenda.
        </p>
      </div> */}
      <div className="max-w-[1240px] mx-auto flex flex-col relative">
        <h1 className="text-[#6cff73] mx-auto rounded-lg font-bold bg-[#1E1F26] p-4 text-2xl my-5 px-5 md:text-4xl sticky top-0 z-10">
          Remaining Funds = $ {funds}
        </h1>
        <div className="row1 flex flex-col md:grid md:grid-cols-2 ">

          {wordArr.map((word, index) => (
            <NewsCard name={word} stockprice={stockPrice[index]} funds={funds} news1={news[index*2]} news2={news[index*2+1]}/>
          ))}
          {/* <NewsCard name={wordArr[0]} stockprice={2323} funds={funds} news1={news[0]} news2={news[1]}/>
          <NewsCard name={wordArr[1]} stockprice={2323} funds={funds}  news1={news[2]} news2={news[3]}/>
          <NewsCard name={wordArr[2]} stockprice={2323} funds={funds} news1={news[4]} news2={news[5]} />
          <NewsCard name={wordArr[3]} stockprice={2323} funds={funds} news1={news[6]} news2={news[7]} /> */}
        </div>
        {/* <div className="row2 flex flex-col md:grid md:grid-cols-2">
          <NewsCard name={wordArr[2]} stockprice={2323} funds={funds} news1={news[4]} news2={news[5]} />
          <NewsCard name={wordArr[3]} stockprice={2323} funds={funds} news1={news[6]} news2={news[7]} />
        </div> */}
      </div>
    </>
  );
};

export default News;
