import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "../store/appStore";
import OutlineSubmitButton from "../Shared/Buttons/OutlineSubmitButton";
import Lottie from "lottie-react";
import lock from "../media/animations/lock.json";
import robot from "../media/animations/robot.json";
import work from "../media/animations/work.json";
import { steps } from "../store/enum";
import ReactPlayer from "react-player";
import audioHello from "../media/audio/hello.mp3";
import Typewriter from "../Shared/TypeWritter/TypeWritter";
import { introduction } from "../store/introduction";

const WelcomeComponent = () => {
  const dispatch = useDispatch();
  const [startWriting, setStartWriting] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [secondIntroduction, setSecondIntroduction] = useState(false);
  const [startWriting2, setStartWriting2] = useState(false);

  return (
    <div className="welcome-wrapper">
      {!startWriting && (
        <div className="animation">
          <Lottie animationData={robot} />
        </div>
      )}
      {startWriting && !startWriting2 && (
        <div className="text">
          <Typewriter text={introduction.text1} delay={60} />
        </div>
      )}
      {startWriting2 && (
        <div className="text">
          <Typewriter text={introduction.text2} delay={60} />
        </div>
      )}
      {!nextStep && !startWriting2 && (
        <div className="welcome-player-button">
          {!startWriting && (
            <div>
              <h2>Включите звук телефона погромче!</h2>
              <h4>Вы готовы начать?</h4>
            </div>
          )}
          <ReactPlayer
            url={"/introduction/part-1.mp3"}
            width="100%"
            height="1px"
            controls={false}
            playing={true}
            muted={false}
            type="audio/mp3"
            volume={1}
            playIcon={<button className="play">Play</button>}
            light={<OutlineSubmitButton title="Да!" />}
            onStart={() => {
              setTimeout(() => {
                setStartWriting(true);
              }, 1000);
            }}
            onEnded={() => {
              setTimeout(() => {
                setSecondIntroduction(true);
              }, 2000);
            }}
          />
        </div>
      )}

      {!nextStep && secondIntroduction && (
        <div className="welcome-player-button">
          <ReactPlayer
            url={"/introduction/part-2.mp3"}
            width="100%"
            height="1px"
            controls={false}
            playing={true}
            muted={false}
            type="audio/mp3"
            volume={1}
            playIcon={<button className="play">Play</button>}
            light={<OutlineSubmitButton title="Далее" />}
            onStart={() => {
              setTimeout(() => {
                setStartWriting2(true);
              }, 1000);
            }}
            onEnded={() => {
              setTimeout(() => {
                setNextStep(true);
              }, 2000);
            }}
          />
        </div>
      )}

      {nextStep && (
        <div className="welcome-start-button">
          <OutlineSubmitButton
            onClick={() =>
              dispatch(setCurrentStep({ currentStep: steps.players }))
            }
            title="Далее"
          />
        </div>
      )}
    </div>
  );
};
export default WelcomeComponent;
