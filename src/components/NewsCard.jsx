import axios from "axios";
import React, { useEffect, useState } from "react";

const NewsCard = ({ name, stockprice, funds, news1, news2, onFundsUpdate }) => {
  const token = localStorage.getItem("authToken");
  const [inputValue, setInputValue] = useState("");
  // const maxAvailable = Math.floor(funds / stockprice); //was used befre the error messages came into play
  const [buySucces, setBuySucces] = useState(false);
  const [sellSuccess, setSellSucces] = useState(false);
  const [buyInsuccess, setBuyInsuccess] = useState(false);
  const [sellInsuccess, setSellInsuccess] = useState(false);
  const [sellErrorMsg, setSellErrorMsg] = useState("");
  const [buyErrorMsg, setBuyErrorMsg] = useState("");

  useEffect(() => {
    if (buySucces) {
      const timer = setTimeout(() => {
        setBuySucces(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (sellSuccess) {
      const timer = setTimeout(() => {
        setSellSucces(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (buyInsuccess) {
      const timer = setTimeout(() => {
        setBuyInsuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (sellInsuccess) {
      const timer = setTimeout(() => {
        setSellInsuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [buySucces, sellSuccess, buyInsuccess, sellInsuccess]);

  
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (!isNaN(inputValue) && inputValue >= 0) {
      setInputValue(inputValue);
    } else setInputValue("");
    // event.target.value > maxAvailable
    //   ? setInputValue(maxAvailable)
    //   : event.target.value <= 0
    //   ? setInputValue("")
    //   : setInputValue(event.target.value);
    // event.target.value < 0
    // ? setInputValue(0)
    // : setInputValue(event.target.value);
  };

  const handleBuy = async () => {
    if (inputValue > 0) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.post(
          "http://localhost:8080/game/buy-stock",
          {
            stock: name,
            amount: parseInt(inputValue),
          },
          config
        );
        console.log("Buy successful", response.data);
        if (onFundsUpdate) {
          onFundsUpdate(response.data.data.balance);
        }
        setBuySucces(true);
        setInputValue("");
      } catch (error) {
        console.error("Error buying stock", error);
        setBuyInsuccess(true);
        setBuyErrorMsg("You do not have enough funds to buy");

      }
    }
  };

  const handleSell = async () => {
    if (inputValue > 0) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.post(
          "http://localhost:8080/game/sell-stock",
          {
            stock: name,
            amount: parseInt(inputValue),
          },
          config
        );
        console.log("Sell successful", response.data);
        if (onFundsUpdate) {
          onFundsUpdate(response.data.data.balance);
        }
        setInputValue("");
        setSellSucces(true);
      } catch (error) {
        console.error("Error selling stock", error);
        setSellInsuccess(true);
        setSellErrorMsg("You do not have enough shares to sell");
      }
    }
  };

  // console.log("max available" + maxAvailable);
  return (
    <>
      <div className="card w-[80%] p-5 bg-[#1E1F26] mx-auto mt-6 rounded-lg flex flex-col justify-evenly ">
        <div className="row1 flex justify-between ">
          <div className="name  text-2xl text-white font-bold">{name}</div>
          <div className="name  text-2xl text-white">$ {stockprice}</div>
        </div>
        <div className="row2 flex justify-between  text-white mt-5">
          <div className="ml-4">
            <ul className="list-decimal">
              <li>{news1}</li>
              <li>{news2}</li>
            </ul>
            <label htmlFor="textInput" className="text-xl opacity-50 mr-2">
              Qty:
            </label>
            <input
              type="number"
              id="textInput"
              value={inputValue}
              onChange={handleInputChange}
              className="rounded-lg text-black p-3 w-[60px]"
            />

            <button
              className="text-black font-bold bg-[#6cff73] p-3 rounded-lg px-3 m-5"
              onClick={handleBuy}
            >
              Buy
            </button>
            <button
              className="text-black bg-white  font-bold p-3 rounded-lg px-3 bg-opacity-90 "
              onClick={handleSell}
            >
              Sell
            </button>
            {buySucces && (
              <div className="ml-5 text-[#6cff73] text-lg font-mono">
                Buy Successful
              </div>
            )}
            {sellSuccess && (
              <div className="ml-5 text-white text-lg font-mono">
                Sell Successful
              </div>
            )}
            {buyInsuccess && (
              <div className="ml-5 text-red-500 text-lg font-mono">
                {buyErrorMsg}
              </div>
            )}
            {sellInsuccess && (
              <div className="ml-5 text-red-500 text-lg font-mono">
                {sellErrorMsg}
              </div>
            )}

            <div className="flex items-center">
              <label className="mr-3">Total Cost of shares:</label>
              <div className="text-3xl font-mono">$</div>
              <div className="text-3xl font-mono">
                {" "}
                {inputValue * stockprice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
