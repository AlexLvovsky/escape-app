import React from "react";
import { useSelector } from "react-redux";
import {} from "../store/appStore";
import { steps } from "../store/enum";
import PlayersComponent from "./PlayersComponent";
import WelcomeTextComponent from "./WelcomeTextComponent";
import WinnerDataComponent from "./WinnerDataComponent";
import WheelComponent from "./WheelComponent";
import LoaderLetters from "../Shared/LoaderLetters/LoaderLetters";
import SurpriseHerComponent from "./SurpriseHerComponent";
import MultiTaskingPuzzle from "../Shared/Multi/MultiTaskingPuzzle";
import SingleTaskPuzzle from "../Shared/Single/SingleTaskPuzzle";
import { poetryPuzzleData, location1 } from "../store/puzzlesData";
import { homeLocationData } from "../store/homeLocation";
import LocationHome from "./LocationHome";
import LocationTennis from "./LocationTennis";

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
      case steps.surprise_her:
        return <SurpriseHerComponent />;
      // case steps.puzzle_1:
      //   return <MultiTaskingPuzzle data={poetryPuzzleData} />;
      //return <SingleTaskPuzzle data={location1} />;
      case steps.home:
        return <LocationHome data={homeLocationData} />;
      case steps.tennis:
        return <LocationTennis data={homeLocationData} />;

      default:
        console.log(`Sorry, we are out of the game.`);
    }
  };
  return (
    <div className="escape-app-main-wrapper mode-dark">
      {loader ? <LoaderLetters /> : getCurrentStep()}
    </div>
  );
};

export default MainAppComponent;
