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
import { homeLocationData } from "../store/homeLocation";
import { lastLoccation } from "../store/lastLocation";
import { schoolLoccation } from "../store/schoolLocation";
import { childLocation } from "../store/childLocation";
import { courtLocation } from "../store/courtLocation";
import { baazarLoccation } from "../store/baazarLocation";
import LocationHome from "./LocationHome";
import LocationTennis from "./LocationTennis";
import LastLocation from "./LastLocation";
import LocationBaazar from "./LocationBaazar";
import LocationPark from "./LocationPark";
import LocationSchool from "./LocationSchool";

const MainAppComponent = () => {
  const { currentStep, loader } = useSelector((state) => state);
  console.log(lastLoccation);

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
      case steps.home:
        return <LocationHome data={homeLocationData} />;
      case steps.tennis:
        return <LocationTennis data={courtLocation} />;
      case steps.park:
        return <LocationPark data={childLocation} />;
      case steps.shopping:
        return <LocationBaazar data={baazarLoccation} />;
      case steps.school:
        return <LocationSchool data={schoolLoccation} />;
      case steps.end:
        return <LastLocation data={lastLoccation} />;
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
