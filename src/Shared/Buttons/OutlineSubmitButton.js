import React from "react";
import Button from "@mui/material/Button";
import "./outlineSubmitButton.scss";

const OutlineSubmitButton = (props) => {
  return (
    <Button
      className={`my-own-button ${props.className ? props.className : ""}`}
      variant="outlined"
      color="primary"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.title}
    </Button>
  );
};
export default OutlineSubmitButton;
