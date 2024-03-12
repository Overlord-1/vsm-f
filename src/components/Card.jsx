import React from "react";

const Card = ({ name, avg, quantity}) => {
  
  // let color = profit > 0 ? "#24FF00" : "#FF4545";
  let color = '#24FF00'
  // let poss = ["text-[#24FF00]","text-[#FF4545]"]
  // console.log(color)
  return (
    <div className=" max-w-[1240px] mx-auto text-white w-full bg-transparent border-t-2 border-b-1 border-slate-300 p-7 flex flex-col justify-between">
      <div className="firstRow text-white flex">
        <div className="quantity flex">
          <div className="opacity-70">Qty:</div>
          <div className="opacity-50 px-1">{quantity}</div>
        </div>
      </div>
      <div className="secondRow flex justify-between">
        <div className="stockName text-3xl mt-2 font-bold">{name}</div>
        <div className={`stockName text-2xl mt-2 text-white font-bold`}>
          {(quantity*avg).toFixed(2)}
        </div>
      </div>
      <div className="third mt-3 text-white flex justify-between">
        <div className="quantity flex">
          <div className="opacity-70">Avg:</div>
          <div className="opacity-50 px-2">{avg}</div>
        </div>
        {/* <div className="LTP flex">
          <div className="opacity-70">LTP:</div>
          <div className="opacity-50 px-2">{quantity*avg}</div>
        </div> */}
        
      </div>
    </div>
  );
};

export default Card;
