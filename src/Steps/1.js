import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setCurrentStep,
  setCount,
  findWinner,
  openModal,
  setError,
  setTeemName,
} from "../store/appStore";
import { TextField, Box } from "@mui/material";
import { steps } from "../store/enum";
import OwnTextFieldInput from "../Shared/WhiteTextField";
import ModalComponent from "../Shared/Modal/ModalComponent";
import OutlineSubmitButton from "../Shared/Buttons/OutlineSubmitButton";
import Lottie from "lottie-react";
import bike from "../media/animations/bike.json";
import ReactPlayer from "react-player";
import Typewriter from "../Shared/TypeWritter/TypeWritter";
import { introduction } from "../store/introduction";

const PlayersComponent = () => {
  const dispatch = useDispatch();
  const { count, names, winnerName, error, errorData, modal, teemName } =
    useSelector((state) => state);
  const [playerCountInput, setPlayerCountInput] = useState(count);
  const [confirmed, setConfirmed] = useState(false);
  const [showConfirmedButton, setShowConfirmedButton] = useState(false);
  const [startWritingLastDescription, setStartWritingLastDescription] =
    useState(false);

  useEffect(() => {
    if (winnerName) {
      dispatch(setCurrentStep({ currentStep: steps.wheel }));
    }
  }, [winnerName]);

  useEffect(() => {
    if (error) {
      dispatch(openModal(true));
    }
  }, [error]);

  const handleCountChange = (e) => {
    const newCount = parseInt(e.target.value, 10) || null;
    setPlayerCountInput(newCount);
    dispatch(setCount(newCount));
  };

  const handleNameChange = (e, index) => {
    const newName = e.target.value;
    dispatch(setName({ index, name: newName }));
  };
  const handleClose = () => {
    dispatch(openModal(false));
    dispatch(setError({ error: false }));
  };

  return (
    <div className="">
      <div className="bike-animation">
        <Lottie animationData={bike} />
      </div>

      <div className="players-component-form">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "320px" },
          }}
          autoComplete="off"
        >
          <div>
            <TextField
              className="my-own"
              id="outlined-required"
              label="Введите название команды"
              onChange={setTeemName}
              value={teemName}
              required
            />
          </div>
          <div>
            <TextField
              className="my-own"
              id="outlined-required"
              label="Введите число участников"
              onChange={handleCountChange}
              value={playerCountInput}
              required
            />
          </div>
          {playerCountInput && !confirmed && startWritingLastDescription && (
            <div className="text">
              <Typewriter text={introduction.text6} delay={60} />
            </div>
          )}

          {playerCountInput && (
            <div className="welcome-player-button">
              <ReactPlayer
                url={introduction.audio6}
                width="100%"
                height="1px"
                controls={false}
                playing={true}
                muted={false}
                type="audio/mp3"
                volume={1}
                playIcon={<button className="play">Play</button>}
                light={<OutlineSubmitButton title="Далее" className="w-100" />}
                onStart={() => {
                  setTimeout(() => {
                    setStartWritingLastDescription(true);
                  }, 1000);
                }}
                onEnded={() => {
                  setTimeout(() => {
                    setShowConfirmedButton(true);
                  }, 1000);
                }}
              />
            </div>
          )}
        </Box>
        {showConfirmedButton && !confirmed && (
          // <div className="puzzle-item-bottom-button">
          <OutlineSubmitButton
            onClick={() => setConfirmed(true)}
            title={"OK"}
            className=""
          />
          // </div>
        )}

        {playerCountInput && confirmed && (
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "320px" },
            }}
            //autoComplete="off"
          >
            <div>
              {Array.from({ length: count }, (_, index) => (
                <div>
                  <OwnTextFieldInput
                    key={index}
                    label={`Игрок ${index + 1}:`}
                    variant="outlined"
                    value={names[index] || ""}
                    onChange={(e) => handleNameChange(e, index)}
                    required
                    id="margin-normal"
                  />
                </div>
              ))}
              <OutlineSubmitButton
                onClick={() => {
                  dispatch(findWinner());
                }}
                title="Send"
              />
            </div>
          </Box>
        )}
      </div>
      <ModalComponent
        open={modal}
        handleClose={handleClose}
        title={errorData?.title}
        text={errorData?.text}
      />
    </div>
  );
};
export default PlayersComponent;
