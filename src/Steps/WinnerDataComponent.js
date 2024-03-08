import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setCurrentStep,
  setShouldUpdateStep,
  openModal,
} from "../store/appStore";
import { Box, Button } from "@mui/material";
import { steps, modalCauses } from "../store/enum";
import OwnTextFieldInput from "../Shared/WhiteTextField";
import ModalComponent from "../Shared/Modal/ModalComponent";

const WinnerDataComponent = () => {
  const dispatch = useDispatch();
  const { loader, shouldUpdateStep, modal } = useSelector((state) => state);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");

  useEffect(() => {
    // Update the current step after loader is set to false
    if (shouldUpdateStep) {
      dispatch(setCurrentStep({ currentStep: steps.surprise_her }));

      dispatch(setShouldUpdateStep(false)); // Reset the state
    }
  }, [shouldUpdateStep]);
  const areAllFieldsFilled = () => {
    return (
      input1.trim() !== "" &&
      input2.trim() !== "" &&
      input3.trim() !== "" &&
      input4.trim() !== ""
    );
    // Add additional checks for other fields if needed
  };

  const handleClick = () => {
    if (!areAllFieldsFilled()) {
      // Add logic to handle validation error (e.g., show an error message)
      dispatch(openModal(true));
      return;
    }

    dispatch(setLoading(true));

    // Set it back to false after 20 seconds
    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(setShouldUpdateStep(true));
    }, 3000);
  };

  return (
    <div className="centered">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "320px" },
        }}
        autoComplete="off"
      >
        <OwnTextFieldInput
          id="outlined-basic"
          label="Дата Рождения"
          variant="outlined"
          onChange={(e) => setInput1(e.target.value)}
          value={input1}
        />
        <OwnTextFieldInput
          id="outlined-basic"
          label="Где Вы родились?"
          variant="outlined"
          onChange={(e) => setInput2(e.target.value)}
          value={input2}
        />
        <OwnTextFieldInput
          id="outlined-basic"
          label="Где Вы сейчас находитесь?"
          variant="outlined"
          onChange={(e) => setInput3(e.target.value)}
          value={input3}
        />
        <OwnTextFieldInput
          id="outlined-basic"
          label="хххххх"
          variant="outlined"
          onChange={(e) => setInput4(e.target.value)}
          value={input4}
        />

        <br />

        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            handleClick();
          }}
        >
          Send
        </Button>
      </Box>
      <ModalComponent
        open={modal}
        handleClose={() => dispatch(openModal(false))}
        title={"Пожалуйста заполните все поля"}
        cause={modalCauses.error}
        //text={errorData?.text}
      />
    </div>
  );
};
export default WinnerDataComponent;
