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
import ReactPlayer from "react-player";
import Typewriter from "../Shared/TypeWritter/TypeWritter";
import { introduction } from "../store/introduction";

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
  const [showPlayerButton, setShowPlayerButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);
  const [startWritingLastDescription, setStartWritingLastDescription] =
    useState(false);

  // const onStopSpinning = () => {
  //   dispatch(setConfetti(true));
  //   setTimeout(() => {
  //     dispatch(setShowWheel(false));
  //     setTimeout(() => {
  //       dispatch(setDeleteWheel(true));
  //       setTimeout(() => {
  //         //dispatch(setShowText(true));
  //         setShowPlayerButton(true);
  //       }, 2000);
  //     }, 2000);
  //   }, 7000);
  // };
  const onStopSpinning = () => {
    dispatch(setConfetti(true));
    setTimeout(() => {
      // dispatch(setShowWheel(false));
      setShowPlayerButton(true);
      // setTimeout(() => {
      //   dispatch(setDeleteWheel(true));
      //   setTimeout(() => {
      //     //dispatch(setShowText(true));
      //     setShowPlayerButton(true);
      //   }, 2000);
      // }, 2000);
    }, 5000);
  };

  return (
    <div
      className={`wheel-step ${
        !startWritingLastDescription ? "centered1" : ""
      }`}
    >
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
          {!showPlayerButton && (
            <OutlineSubmitButton
              disabled={spin}
              onClick={() => {
                dispatch(setSpin(true));
              }}
              title="Поехали!"
            />
          )}
        </div>
      )}
      {showPlayerButton && (
        <div className="">
          <ReactPlayer
            url={introduction.audio7}
            width="100%"
            height="1"
            controls={false}
            playing={true}
            muted={false}
            type="audio/mp3"
            volume={1}
            playIcon={<button className="play">Play</button>}
            light={<OutlineSubmitButton title="Далее" className="w-100" />}
            onStart={() => {
              setTimeout(() => {
                dispatch(setDeleteWheel(true));
                setStartWritingLastDescription(true);

                // dispatch(setShowWheel(false));
              }, 1000);
            }}
            onEnded={() => {
              setTimeout(() => {
                setShowBottomButton(true);
              }, 2000);
            }}
          />
        </div>
      )}

      <div>
        {startWritingLastDescription && (
          <div className="text">
            <Typewriter text={introduction.text7} delay={60} />
          </div>
        )}
      </div>
      {showBottomButton && (
        <OutlineSubmitButton
          onClick={() => {
            dispatch(setCurrentStep({ currentStep: steps.winner_data }));
          }}
          title="приступим"
        />
      )}
      {/* {showText && (
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
      )} */}
    </div>
  );
};
export default WheelComponent;
