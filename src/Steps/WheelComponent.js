import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentStep,
  setSpin,
  setShowText,
  setConfetti,
  setShowWheel,
  setDeleteWheel,
} from "../store/appStore";
import { TextField, Button } from "@mui/material";
import { steps } from "../store/enum";
import OutlineSubmitButton from "../Shared/Buttons/OutlineSubmitButton";
import Confetti from "../Shared/Lottie/Confetti";

const WheelComponent = () => {
  const dispatch = useDispatch();
  const {
    playersObject,
    winnerIndex,
    segColors,
    winnerName,
    spin,
    showText,
    confetti,
    showWheel,
    deleteWheel,
  } = useSelector((state) => state);

  const onStopSpinning = () => {
    dispatch(setConfetti(true));
    setTimeout(() => {
      dispatch(setShowWheel(false));
      setTimeout(() => {
        dispatch(setDeleteWheel(true));
        setTimeout(() => {
          dispatch(setShowText(true));
        }, 2000);
      }, 2000);
    }, 7000);
  };

  return (
    <div className="wheel-step centered">
      {confetti && <Confetti />}
      {!deleteWheel && (
        <div className={`wheel-wrapper ${!showWheel ? "fade-out" : ""}`}>
          <div>
            <Wheel
              mustStartSpinning={spin}
              prizeNumber={winnerIndex}
              data={playersObject}
              backgroundColors={segColors}
              textColors={["#ffffff"]}
              onStopSpinning={onStopSpinning}
            />
          </div>

          <div>
            <OutlineSubmitButton
              disabled={spin}
              onClick={() => {
                dispatch(setSpin(true));
              }}
              title="Поехали!"
            />
          </div>
        </div>
      )}
      {showText && (
        <div className="text fade-in">
          <div className="text-title">{winnerName}</div>
          <div className="text-description">
            Bla bla bla bla bla
            <br />
            Вы должны быть предельно честны и т д
          </div>
          <div>
            <OutlineSubmitButton
              onClick={() => {
                dispatch(setCurrentStep({ currentStep: steps.winner_data }));
              }}
              title="Я согласен быть избранным!"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default WheelComponent;
