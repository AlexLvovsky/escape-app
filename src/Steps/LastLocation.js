import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep, setSubStep } from "../store/appStore";
import { subSteps, steps } from "../store/enum";
import QrCode from "../Shared/QrCode/QrCode";
import SingleTaskPuzzle from "../Shared/Single/SingleTaskPuzzle";
import OutlineSubmitButton from "../Shared/Buttons/OutlineSubmitButton";
import MultiTaskingPuzzle from "../Shared/Multi/MultiTaskingPuzzle";
import Final from "./Final";

const LastLocation = (props) => {
  const dispatch = useDispatch();
  const { subStep } = useSelector((state) => state);

  const renderData = () => {
    switch (subStep) {
      case subSteps.about_location:
        return (
          <MultiTaskingPuzzle
            data={props.data.puzzleAboutLoccation}
            bottomButtonText="В путь!"
            onBottomButtonClick={() => dispatch(setSubStep(subSteps.qr_code))}
          />
        );
      // case subSteps.qr_code:
      //   return (
      //     <QrCode
      //       data={props.data.qRCode}
      //       action={() => dispatch(setSubStep(subSteps.end))}
      //     />
      //   );
      case subSteps.qr_code:
        //case subSteps.end:
        return <Final data={props.data.qRCode} />;
    }
  };
  return <div>{renderData()}</div>;
};
export default LastLocation;
