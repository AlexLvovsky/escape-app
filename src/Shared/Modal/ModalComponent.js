import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import "./modal.scss";

const ModalComponent = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-wrapper">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.text}
        </Typography>
      </Box>
    </Modal>
  );
};
export default ModalComponent;
