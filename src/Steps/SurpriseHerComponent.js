import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "../store/appStore";
import OutlineSubmitButton from "../Shared/Buttons/OutlineSubmitButton";
import ReactPlayer from "react-player";
import { steps, subSteps } from "../store/enum";
import naale from "../media/photoAndVideo/naale.mp4";
import { introduction } from "../store/introduction";
import Typewriter from "../Shared/TypeWritter/TypeWritter";

const SurpriseHerComponent = () => {
  const dispatch = useDispatch();
  const [bottomButton, setBottomButton] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [audio, setAudio] = useState(false);
  const [startWriting, setStartWriting] = useState(false);

  return (
    <div>
      {!startWriting && (
        <div className="surprise-her-wrapper">
          <div>
            {!showVideo && (
              <div className="h-70">
                <div>Екатерина, это самое раннее, что ИИ смог найти о Вас.</div>
                <OutlineSubmitButton
                  onClick={() => setShowVideo(true)}
                  title={"Показать!"}
                  className="w-100"
                />
              </div>
            )}
            {showVideo && !startWriting && (
              <div className="h-55">
                <ReactPlayer
                  url={naale}
                  width="100%"
                  height="100%"
                  controls={true}
                  type="video/mp4"
                  playing={true}
                  onEnded={() => {
                    setAudio(true);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {audio && (
        <div className="welcome-player-button m-0">
          {!startWriting && (
            <h4>
              Екатерина, вы подтверждаете, что это вы представлены на видео?
            </h4>
          )}

          <ReactPlayer
            url={"/introduction/part-5.mp3"}
            width="100%"
            height="1px"
            controls={false}
            playing={true}
            muted={false}
            type="audio/mp3"
            volume={1}
            playIcon={<button className="play">Play</button>}
            light={<OutlineSubmitButton title="Да" />}
            onStart={() => {
              setTimeout(() => {
                setStartWriting(true);
              }, 1000);
            }}
            onEnded={() => {
              setTimeout(() => {
                setBottomButton(true);
              }, 2000);
            }}
          />
        </div>
      )}

      {startWriting && (
        <div className="text">
          <Typewriter text={introduction.text5} delay={60} />
        </div>
      )}
      {bottomButton && (
        <div className="puzzle-item-bottom-button">
          <OutlineSubmitButton
            onClick={() =>
              dispatch(
                setCurrentStep({
                  currentStep: steps.home,
                  subStep: subSteps.about_location,
                })
              )
            }
            title={"Да"}
            className="w-100"
          />
        </div>
      )}
    </div>
  );
};
export default SurpriseHerComponent;
