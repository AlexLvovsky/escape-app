import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentStep } from "../store/appStore";
import OutlineSubmitButton from "../Shared/Buttons/OutlineSubmitButton";
import ReactPlayer from "react-player";
import { steps } from "../store/enum";
import naale from "../media/photoAndVideo/naale.mp4";

const SurpriseHerComponent = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <ReactPlayer
        url={naale}
        width="100%"
        height="100%"
        controls={true}
        type="video/mp4"
        playing={true}
      />
    </div>
  );
};
export default SurpriseHerComponent;
