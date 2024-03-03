import React, { useState } from "react";

const NewsCard = ({ name, stockprice, funds ,news1,news2 }) => {
  const [inputValue, setInputValue] = useState("");
  const maxAvailable = Math.floor(funds / stockprice);

  const handleInputChange = (event) => {
    event.target.value > maxAvailable
      ? setInputValue(maxAvailable)
      : event.target.value <= 0
      ? setInputValue(0)
      : setInputValue(event.target.value);
      // event.target.value < 0
      // ? setInputValue(0)
      // : setInputValue(event.target.value);
  };

  
  console.log(maxAvailable);
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

            <button className="text-black font-bold bg-[#6cff73] p-3 rounded-lg px-3 m-5">
              Buy
            </button>
            <button className="text-black bg-white  font-bold p-3 rounded-lg px-3 bg-opacity-90 ">
              Sell
            </button>
            <div className="flex items-center">
              <label className="mr-3">Total Cost of shares:</label>
              <div className="text-3xl font-mono">$</div>
              <div className="text-3xl font-mono"> {inputValue * stockprice}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
