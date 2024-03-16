import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { parse, isValid } from 'date-fns';

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
  const formatDateAndValidate = (value) => {
    if (!value) return { formattedDate: "", isValid: false };

    // Remove all non-digits and slice to appropriate length
    const numbers = value.replace(/[^\d]/g, '').slice(0, 8);

    // Split into components
    const chars = numbers.split('');
    if (chars.length > 2) chars.splice(2, 0, '/');
    if (chars.length > 5) chars.splice(5, 0, '/');
    const formattedDate = chars.join('');

    // Validate the date using date-fns
    const date = parse(formattedDate, 'dd/MM/yyyy', new Date());
    const dateIsValid = formattedDate.length === 10 && isValid(date);

    return { formattedDate, isValid: dateIsValid };
  };

  const handleOnChange = (e) => {
    // Only if it's the date field
    if (props.type === 'tel') {
      const { formattedDate, isValid } = formatDateAndValidate(e.target.value);
      e.target.value = formattedDate;
      // Here you can use isValid to show an error message or enable/disable submission
    }
    props.onChange(e);
  };

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const isValidEmail = (email) => {
    return emailRegex.test(email);
  };

  return (
    <div className="w-100">
      <OwnTextFieldInput
        label={props.label}
        value={props.value}
        onChange={handleOnChange}
        variant="outlined"
        type={props.type}
        inputMode={props.inputMode}
        error={props.type === 'email' && props.value && !isValidEmail(props.value)}
        helperText={props.type === 'email' && props.value && !isValidEmail(props.value) ? 'Введите корректный адрес электронной почты' : ''}
        InputProps={{
          inputProps: {
            maxLength: props.maxLength,
          },
        }}
      />
    </div>
  );
};

export default OwnTextField;
