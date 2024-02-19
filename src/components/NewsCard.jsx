import React, { useState } from "react";

const NewsCard = ({ name, stockprice, funds }) => {
  const [inputValue, setInputValue] = useState("");
  const maxAvailable = Math.floor(funds / stockprice);

  const handleInputChange = (event) => {
    event.target.value > maxAvailable
      ? setInputValue(maxAvailable)
      : setInputValue(event.target.value);
  };
  console.log(maxAvailable);
  return (
    <>
      <div className="card w-[80%] p-5 bg-[#1E1F26] mx-auto mt-6 rounded-lg">
        <div className="row1 flex justify-between ">
          <div className="name  text-2xl text-white">{name}</div>
          <div className="name  text-2xl text-white">💸{stockprice}</div>
        </div>
        <div className="row2 flex justify-between  text-white mt-5">
          <div>
            <label htmlFor="textInput" className="text-xl opacity-50 mr-3">
              Qty:
            </label>
            <input
              type="number"
              id="textInput"
              value={inputValue}
              onChange={handleInputChange}
              className="rounded-lg text-black p-2 w-[60px]"
            />

            <button className="text-black bg-[#6cff73] p-3 rounded-xl px-5 m-5">
              Buy
            </button>
            <button className="text-black bg-white p-3 rounded-xl px-5 bg-opacity-90 ">
              Sell
            </button>
            <div className="flex items-center">
              <label className="mr-4">Total Cost of shares:</label>
              <div className="text-3xl">💸{inputValue * stockprice}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
