import React from "react";
import confetti from "../../media/animations/confetti.json";
import Lottie from "lottie-react";

const Confetti = () => {
  const myStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    width: "100%",
  };
  return (
    <div className="confetti-animation" style={myStyle}>
      <Lottie animationData={confetti} />
    </div>
  );
};
export default Confetti;
