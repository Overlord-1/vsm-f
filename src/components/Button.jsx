import React from "react";

const Button = ({ text, txtColor, bgColor }) => {
  let poss = ["text-[#24FF00]","text-[#FF4545]","bg-[#343434]","text-[#ffffff]"]
  return (
    <button
      className={`bg-[${bgColor}] text-[${txtColor}] flex justify-center w-max items-center mx-auto mt-6 rounded-full p-3 px-4 md:p-4 md:text-2xl`}
    >
      {" "}
      {text}{" "}
    </button>
  );
};

export default Button;
