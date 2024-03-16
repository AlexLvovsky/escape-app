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
      input4.trim() !== "" &&
      input5.trim() !== ""
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
    }, 15000);
  };

  return (
    <div className="centered winner-data-wrapper">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "320px" },
        }}
        autoComplete="off"
        className="w-100"
      >
        <OwnTextFieldInput
          label="Дата Рождения"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          variant="outlined"
          type="tel"
          inputMode="numeric"
          maxLength={10}
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
          label="Ваш профиль в Facebook "
          variant="outlined"
          onChange={(e) => setInput3(e.target.value)}
          value={input3}
        />
        <OwnTextFieldInput
          id="outlined-basic"
          label="Сфера вашей деятельности"
          variant="outlined"
          onChange={(e) => setInput4(e.target.value)}
          value={input4}
        />
        <OwnTextFieldInput
          id="outlined-basic"
          label="Ваш email"
          variant="outlined"
          onChange={(e) => setInput5(e.target.value)}
          value={input5}
          type="email"
        />

        <br />

        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            handleClick();
          }}
        >
          поделиться
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
