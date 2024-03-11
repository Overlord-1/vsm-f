import React from "react";
import { useNavigate } from "react-router-dom";
const Button = ({ text, txtColor, bgColor }) => {
  const navigate = useNavigate();
  let poss = ["text-[#24FF00]","text-[#FF4545]","bg-[#343434]","text-[#ffffff]"]
const handleClick = () =>{
  navigate('/news')
}
  return (
    <button
      className={`bg-[${bgColor}] text-[${txtColor}] flex justify-center w-max items-center mx-auto mt-6 rounded-full p-3 px-4 md:p-4 md:text-2xl`}
      onClick={handleClick}
    >
      {" "}
      {text}{" "}
    </button>
  );
};

export default Button;
