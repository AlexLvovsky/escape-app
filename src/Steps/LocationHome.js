import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentStep, setSubStep } from "../store/appStore";
import { subSteps, steps } from "../store/enum";
import QrCode from "../Shared/QrCode/QrCode";
import SingleTaskPuzzle from "../Shared/Single/SingleTaskPuzzle";
import OutlineSubmitButton from "../Shared/Buttons/OutlineSubmitButton";

const LocationHome = (props) => {
  const dispatch = useDispatch();
  const { currentSubStep } = useSelector((state) => state);

  const renderData = () => {
    switch (currentSubStep) {
      case subSteps.about_location:
        return (
          <SingleTaskPuzzle
            data={props.aboutLocation}
            bottomButtonText="В путь!"
            onBottomButtonClick={setSubStep(subSteps.qr_code)}
          />
        );
      case subSteps.qr_code:
        return (
          <QrCode
            data={props.qrCode}
            action={setSubStep(subSteps.puzzle_prev_main)}
          />
        );
      case subSteps.puzzle_prev_main:
        return (
          <SingleTaskPuzzle
            data={props.prevPuzzle}
            bottomButtonText="Далее"
            onBottomButtonClick={setSubStep(subSteps.puzzle_main)}
          />
        );
      case subSteps.puzzle_main:
        return (
          <div>
            <SingleTaskPuzzle
              data={props.mainPuzzle}
              bottomButtonText="Хочу знать куда ехать дальше"
              onBottomButtonClick={() =>
                dispatch(
                  setCurrentStep({
                    currentStep: steps.tennis,
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
export default LocationHome;
