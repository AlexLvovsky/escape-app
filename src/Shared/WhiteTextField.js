import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

// Custom styled TextField with white color and border

const OwnTextFieldInput = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "#009bff", // Text color
  },
  "& .MuiOutlinedInput-root": {
    borderColor: "white", // Border color
    maxWidth: 400, // Max width for the input
    width: "100%", // Take up 100% width
    "& fieldset": {
      borderColor: "#009bff", // Border color
    },
  },
  "& .MuiInputLabel-root": {
    color: "#009bff", // Label color
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#009bff", // Placeholder color
  },
  "& .MuiOutlinedInput-root": {
    borderColor: "#009bff", // Border color
    maxWidth: 400, // Max width for the input
    width: "100%", // Take up 100% width
    "& fieldset": {
      borderColor: "#009bff", // Border color
    },
  },
});

const OwnTextField = (props) => {
  return (
    <div className="w-100">
      <OwnTextFieldInput
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        variant="outlined"
      />
    </div>
  );
};

export default OwnTextField;
