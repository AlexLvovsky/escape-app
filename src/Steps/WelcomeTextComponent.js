import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "../store/appStore";
import OutlineSubmitButton from "../Shared/Buttons/OutlineSubmitButton";
import Lottie from "lottie-react";
import lock from "../media/animations/lock.json";
import robot from "../media/animations/robot.json";
import work from "../media/animations/work.json";

import { steps } from "../store/enum";

const WelcomeComponent = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="confetti-animation">
        <Lottie animationData={robot} />
      </div>
      <div className="text">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </div>
      <OutlineSubmitButton
        onClick={() => dispatch(setCurrentStep(steps.players))}
        title="Отлично, мы готовы!"
      />
    </div>
  );
};
export default WelcomeComponent;
