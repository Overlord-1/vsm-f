import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import PLtracker from "../components/PLtracker";
import Button from "../components/Button";
import MiddleRow from "../components/MiddleRow";
import Card from "../components/Card";
import axios from "axios";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const portfolio = await axios.get(
          "http://134.209.159.172:8080/game/info/portfolio",
          config
        );
        console.log(portfolio.data.data.portfolio);
        setPortfolio(portfolio.data.data.portfolio);
      } catch {
        console.log("Error");
      }
    };
    fetchData();
  }, [token]);

  // const data = [
  //   {
  //     name: "HDFC",
  //     avg: 93.87,
  //     quantity: 3,
  //     LTP: 81.25,
  //     profit: 434,
  //   },
  //   {
  //     name: "ONGC",
  //     avg: 93.87,
  //     quantity: 3,
  //     LTP: 81.25,
  //     profit: 434,
  //   },
  //   {
  //     name: "JIOFIN",
  //     avg: 93.87,
  //     quantity: 14,
  //     LTP: 81.25,
  //     profit: 434,
  //   },
  //   {
  //     name: "HDFC",
  //     avg: 93.87,
  //     quantity: 3,
  //     LTP: 81.25,
  //     profit: 434,
  //   },
  //   {
  //     name: "INFY",
  //     avg: 1293.87,
  //     quantity: 3,
  //     LTP: 81.25,
  //     profit: -151,
  //   }

  // ];
  const total = portfolio.reduce((acc, cur) => acc + cur.value, 0);
  return (
    <>
      <Header text={"Portfolio"} />
      <PLtracker invested={total} />
      <Button text={"Back to news"} txtColor={"#ffffff"} bgColor={"#343434"} />
      <MiddleRow />
      {portfolio.map((parameter) => (
        <Card
          name={parameter.name}
          avg={parameter.value / parameter.volume}
          quantity={parameter.volume}
        />
      ))}
    </>
  );
};

export default Portfolio;
