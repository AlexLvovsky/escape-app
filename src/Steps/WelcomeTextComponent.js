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
import aa from "../media/audio/hello.mp3";
import Typewriter from "../Shared/TypeWritter/TypeWritter";

const WelcomeComponent = () => {
  const dispatch = useDispatch();
  const [startWriting, setStartWriting] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  let c = `Добрый день! Спасибо, что согласились протестировать наш квест. Этот квест командный и cегодня все команды стартуют 
    ровно в 16:00. Следуйте инструкциям на экране. Искуственный интеллект выберет одного из вас попросит ввести личные данные.
     Не беспокойтесь, ваши личные данные будут надёжно защищены. На основе этих данных искуственный интеллект простроит ваш 
     индивидуальный маршрут, который позволит не пересекаться с другими командами. 
     Выиграет та команда, которая раньше других успешно завершит свой маршрут.`;

  const text = "Your text goes here"; // Replace
  return (
    <div className="welcome-wrapper">
      <div className="animation">
        <Lottie animationData={robot} />
      </div>

      {startWriting && (
        <div className="text">
          <Typewriter text={c} delay={75} />
        </div>
      )}
      {!nextStep && (
        <div className="welcome-player-button">
          <ReactPlayer
            url={aa}
            width="100%"
            height="1px"
            controls={false}
            playing={true}
            muted={false}
            type="audio/mp3"
            volume={1}
            playIcon={<button className="play">Play</button>}
            light={<OutlineSubmitButton title="Старт ?? ?" />}
            onStart={() => {
              setTimeout(() => {
                setStartWriting(true);
              }, 1000);
            }}
            onEnded={() => {
              console.log("ended");
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
            onClick={() => dispatch(setCurrentStep(steps.players))}
            title="Далее"
          />
        </div>
      )}
    </div>
  );
};
export default WelcomeComponent;
