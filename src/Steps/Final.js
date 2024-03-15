import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentStep } from '../store/appStore';
import OutlineSubmitButton from '../Shared/Buttons/OutlineSubmitButton';
import Lottie from 'lottie-react';
import lock from '../media/animations/lock.json';
import robot from '../media/animations/robot.json';
import work from '../media/animations/work.json';
import Confetti from '../Shared/Lottie/Confetti';
import con from '../media/animations/confetti.json';
import { steps } from '../store/enum';
import ReactPlayer from 'react-player';
import audioHello from '../media/audio/hello.mp3';
import Typewriter from '../Shared/TypeWritter/TypeWritter';
import { introduction } from '../store/introduction';

const Final = () => {
  const dispatch = useDispatch();
  const [startWriting, setStartWriting] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  let c = `А теперь бухать!!!`;

  return (
    <div className="welcome-wrapper">
      <div className="animation">
        <Lottie animationData={con} />
      </div>

      {startWriting && (
        <div className="text">
          <Typewriter text={introduction.final} delay={75} />
        </div>
      )}
      {!nextStep && (
        <div className="welcome-player-button">
          <ReactPlayer
            url={'/introduction/part-8.mp3'}
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
      )}
    </div>
  );
};
export default Final;
