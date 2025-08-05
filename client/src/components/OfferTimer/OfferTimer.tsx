import React, { useState, useEffect } from "react";
import "./OfferTimer.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const OfferTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date("2024-06-30T23:59:59");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
      days: days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="limited-offer-box">
      {/* <div className="limited-offer-text-box"> */}
      <span>FREE SHIPPING</span> on all orders! <div></div>Offer ends in <span> {timeLeft.days}</span> days, <span>{timeLeft.hours}</span> hours, <span>{timeLeft.minutes}</span> minutes,{" "}
      <span>{timeLeft.seconds} </span>
      seconds. 🚚
    </div>
    // </div>
  );
};

export default OfferTimer;
