import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep, setSubStep } from "../store/appStore";
import { subSteps, steps } from "../store/enum";
import QrCode from "../Shared/QrCode/QrCode";
import SingleTaskPuzzle from "../Shared/Single/SingleTaskPuzzle";
import OutlineSubmitButton from "../Shared/Buttons/OutlineSubmitButton";

const LocationTennis = (props) => {
  const dispatch = useDispatch();
  const { subStep } = useSelector((state) => state);

  const renderData = () => {
    switch (subStep) {
      case subSteps.about_location:
        return (
          <SingleTaskPuzzle
            data={props.data.puzzleAboutLoccation}
            bottomButtonText="В путь!"
            onBottomButtonClick={() => dispatch(setSubStep(subSteps.qr_code))}
          />
        );
      case subSteps.qr_code:
        return (
          <QrCode
            data={props.data.qRCode}
            action={() => dispatch(setSubStep(subSteps.puzzle_prev_main))}
          />
        );
      case subSteps.puzzle_prev_main:
        return (
          <SingleTaskPuzzle
            data={props.data.puzzlePrevMain}
            bottomButtonText="Далее"
            onBottomButtonClick={() => setSubStep(subSteps.puzzle_main)}
          />
        );
      case subSteps.puzzle_main:
        return (
          <div>
            <SingleTaskPuzzle
              data={props.data.puzzleMain}
              bottomButtonText="Хочу знать куда ехать дальше"
              onBottomButtonClick={() =>
                dispatch(
                  setCurrentStep({
                    currentStep: steps.park,
                    subStep: subSteps.about_location,
                  })
                )
              }
            />
          </div>
        );
    }
  };
  return <div>{renderData()}</div>;
};
export default LocationTennis;
