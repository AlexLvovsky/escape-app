import * as React from "react";
import { Box, Modal, Typography } from "@mui/material";
import "./modal.scss";
import { modalCauses } from "../../store/enum";
import OutlineSubmitButton from "../Buttons/OutlineSubmitButton";

function ChildModal({ props }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="modal-wrapper-buttons-row">
        <OutlineSubmitButton
          className={
            props.closeParentModalButtonText && props.openChildModalButtonText
              ? "small"
              : ""
          }
          onClick={handleOpen}
          title={props.openChildModalButtonText}
        />

        <OutlineSubmitButton
          className={
            props.closeParentModalButtonText && props.openChildModalButtonText
              ? "small"
              : ""
          }
          onClick={props.handleClose}
          title={props.closeParentModalButtonText}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box className="child-modal-wrapper">
          <h4 id="child-modal-title">{props.childTitle}</h4>
          <p id="child-modal-description">{props.childText}</p>
          <OutlineSubmitButton
            onClick={handleClose}
            title={props.closeChildModalButtonText}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={`modal-wrapper`}>
        {props.parentTitle && (
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.parentTitle}
          </Typography>
        )}
        {props.parentText && (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.parentText}
          </Typography>
        )}
        <ChildModal props={props} />
      </Box>
    </Modal>
  );
}
