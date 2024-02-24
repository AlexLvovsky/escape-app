import React from "react";
import { useSelector } from "react-redux";
import {} from "../store/appStore";
import { steps } from "../store/enum";
import PlayersComponent from "./PlayersComponent";
import WelcomeTextComponent from "./WelcomeTextComponent";
import WinnerDataComponent from "./WinnerDataComponent";
import WheelComponent from "./WheelComponent";
import LoaderLetters from "../Shared/LoaderLetters/LoaderLetters";
import MediaComponent from "./MediaComponent";

const MainAppComponent = () => {
  const { currentStep, loader } = useSelector((state) => state);

  const getCurrentStep = () => {
    switch (currentStep) {
      case steps.welcome:
        return <WelcomeTextComponent />;
      case steps.players:
        return <PlayersComponent />;
      case steps.wheel:
        return <WheelComponent />;
      case steps.winner_data:
        return <WinnerDataComponent />;
      case steps.media:
        return <MainAppComponent />;

      default:
        console.log(`Sorry, we are out of game.`);
    }
  };
  return (
    <div className="escape-app-main-wrapper mode-dark">
      {loader ? <LoaderLetters /> : getCurrentStep()}
    </div>
  );
};

export default MainAppComponent;
