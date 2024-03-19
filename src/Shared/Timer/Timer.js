import React, { useState, useEffect } from "react";
import "./timer.scss";
import { useSelector, useDispatch } from "react-redux";
import { setTime } from "../../store/appStore";

const Timer = () => {
  const dispatch = useDispatch();
  const { time, isRunning, place } = useSelector((state) => state);

  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        dispatch(setTime());
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isRunning]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="timer">
      <div className="result">
        <div className="time">{formatTime(time)}</div>
        <div>Место: {place}/3</div>
      </div>
    </div>
  );
};

export default Timer;
