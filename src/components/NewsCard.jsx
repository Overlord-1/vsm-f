import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';

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
  const URL = process.env.REACT_APP_API_URL;

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

  const fetchBal = async () => {
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

      onFundsUpdate(funds.data.data.balance);
      // console.log(funds.data.data.balance);
    }

    catch
    {
      console.log("Error");
    }
  }

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
          `${URL}/game/buy-stock`,
          {
            stock: name,
            amount: parseInt(inputValue),
          },
          config
        );
        console.log("Buy successful", response.data);
        if (onFundsUpdate) {
          // console.log("balance = ",response);
          // onFundsUpdate(response.data.data.balance);
          fetchBal();
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
          `${URL}/game/sell-stock`,
          {
            stock: name,
            amount: parseInt(inputValue),
          },
          config
        );
        console.log("Sell successful", response.data);
        if (onFundsUpdate) {
          // console.log("balance = ",response.data.data);
          fetchBal();
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
      <div className="card w-[80%] p-5 bg-[#1E1F26] mx-auto mt-auto rounded-xl flex flex-col justify-evenly mb-[-1rem]">
        <div className="row1 flex justify-between mt-3">
          <div className="name  text-3xl text-white font-bold">{name}</div>
          <div className="name  text-3xl text-white">₹ {stockprice}</div>
        </div>
        <div className="row2 flex justify-between text-white mt-20">
          <div className="ml-2">
            <div className="newsList">
              <ul className="list-decimal mb-5">
                <li>{news1}</li>
                {/* <li className="mt-3">{news2}</li> */}
              </ul>
            </div>
            <label htmlFor="textInput" className="text-xl opacity-50 mr-2 -ml-4 mt-4">
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
              className="text-black font-bold bg-[#6cff73] p-3 rounded-lg px-3 m-3"
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

            <div className="flex items-center m-[2.25rem] totaldiv">
              {/* <label className="mr-3">Total Cost of shares:</label> */}
              <div className="text-2xl font-mono mr-2 text-[#6cff73]">₹</div>
              <div className="text-2xl font-mono  text-[#6cff73]">
                {" "}
                {(inputValue * stockprice).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
