import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setCurrentStep,
  setShouldUpdateStep,
} from "../store/appStore";
import { Box, Button } from "@mui/material";
import { steps } from "../store/enum";
import OwnTextFieldInput from "../Shared/WhiteTextField";

const WinnerDataComponent = () => {
  const dispatch = useDispatch();
  const { loader, shouldUpdateStep } = useSelector((state) => state);

  const handleClick = () => {
    dispatch(setLoading(true));

    // Set it back to false after 20 seconds
    setTimeout(() => {
      dispatch(setLoading(false));
      dispatch(setShouldUpdateStep(true));
    }, 3000);
  };

  useEffect(() => {
    // Update the current step after loader is set to false
    if (shouldUpdateStep) {
      dispatch(setCurrentStep(steps.surprise_her));
      dispatch(setShouldUpdateStep(false)); // Reset the state
    }
  }, [shouldUpdateStep]);

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
          onChange={() => console.log()}
          value={""}
        />
        <OwnTextFieldInput
          id="outlined-basic"
          label="Где Вы родились?"
          variant="outlined"
          onChange={() => console.log()}
          value={""}
        />
        <OwnTextFieldInput
          id="outlined-basic"
          label="Где Вы сейчас находитесь?"
          variant="outlined"
          onChange={() => console.log()}
          value={""}
        />
        <OwnTextFieldInput
          id="outlined-basic"
          label="хххххх"
          variant="outlined"
          onChange={() => console.log()}
          value={""}
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
    </div>
  );
};
export default WinnerDataComponent;
