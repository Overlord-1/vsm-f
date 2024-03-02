import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Logo from "../assets/vsmLogo.png"; 
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const [redirect, setRedirect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());
  let resetVal = 1000;  // value used to call useEffect every 1 second DO NOT ALTER THIS VALUE
  const navigate = useNavigate();
  useEffect(() => {
    const intervalId = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeRemaining(remaining);
      console.log(remaining);
      if (remaining.hours === '00' && remaining.minutes === '00' && remaining.seconds === '00') {
        clearInterval(intervalId);
        // navigate("/news");
        setRedirect(true);
        console.log("Market is open");
      }
    }, resetVal);

    return () => clearInterval(intervalId);
  }, []);

  // there are two navigators useNavigate and the normal Navigate 
  // using either of them breaks the app so dont touch the below code

  useEffect(() => {
    if (redirect) {
      navigate("/news");
    }
  }, [redirect, navigate]);

  function getTimeRemaining() {
    const now = new Date();
    const targetTime = new Date(now);
    targetTime.setHours(12, 56, 0, 0); // Setting the target time to 1 pm , change in 24 hr format only

    let timeDiff = targetTime - now;
    timeDiff = Math.max(0, timeDiff);

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  }

  return (
    <>
      {redirect && <Navigate to="/news" />}
      <div className="flex flex-col w-full items-center justify-center gap-10 text-[#6cff73]" style={{ textAlign: "center", marginTop: "50vh", transform: "translateY(-50%)" }}>
      <div className="text-3xl">⚠️ Market is closed</div>
      <img src={Logo} style={{ animation: "spin 2s linear infinite" }} width="100" height="100" alt="Logo" />
        <div className="text-3xl" style={{ marginTop: "20px" }}>
          <span>{timeRemaining.hours}:</span>
          <span>{timeRemaining.minutes}:</span>
          <span>{timeRemaining.seconds}</span>
        </div>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default Loading;