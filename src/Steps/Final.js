import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsRunning, setIsCompleted } from "../store/appStore";
import OutlineSubmitButton from "../Shared/Buttons/OutlineSubmitButton";
import Lottie from "lottie-react";
import lock from "../media/animations/lock.json";
import robot from "../media/animations/robot.json";
import work from "../media/animations/work.json";
import Confetti from "../Shared/Lottie/Confetti";
import con from "../media/animations/confetti.json";
import { steps } from "../store/enum";
import ReactPlayer from "react-player";
import audioHello from "../media/audio/hello.mp3";
import Typewriter from "../Shared/TypeWritter/TypeWritter";
import { introduction } from "../store/introduction";

const Final = (props) => {
  const dispatch = useDispatch();
  const [startWriting, setStartWriting] = useState(false);

  return (
    <div className="welcome-wrapper">
      {startWriting && (
        <div className="animation final">
          <Lottie animationData={con} />
        </div>
      )}

      <div className="qr_code-wrapper">
        {!startWriting && (
          <div>
            <div className="qr-code-image">
              <img src={props.data.filePath} />
            </div>
            <h2>Приехали?</h2>
          </div>
        )}

        <div className="welcome-player-button">
          <ReactPlayer
            url={"/introduction/part-8.mp3"}
            width="100%"
            height="1px"
            controls={false}
            playing={true}
            muted={false}
            type="audio/mp3"
            volume={1}
            playIcon={<button className="play">Play</button>}
            light={<OutlineSubmitButton title="Нажмите для авторизации" />}
            onStart={() => {
              dispatch(setIsRunning(false));
              dispatch(setIsCompleted(true));
              setTimeout(() => {
                setStartWriting(true);
              }, 1000);
            }}
          />
        </div>
      </div>

      {startWriting && (
        <div className="text">
          <Typewriter text={introduction.final} delay={75} />
        </div>
      )}
      {/* {!nextStep && (
        <div className="welcome-player-button">
          <ReactPlayer
            url={"/introduction/part-8.mp3"}
            width="100%"
            height="1px"
            controls={false}
            playing={true}
            muted={false}
            type="audio/mp3"
            volume={1}
            playIcon={<button className="play">Play</button>}
            light={<OutlineSubmitButton title="Нажми сюда" />}
            onStart={() => {
              setTimeout(() => {
                setStartWriting(true);
              }, 1000);
            }}
          />
        </div>
      )} */}
    </div>
  );
};
export default Final;
