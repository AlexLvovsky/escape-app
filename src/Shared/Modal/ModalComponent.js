import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import "./modal.scss";
import { modalCauses } from "../../store/enum";
import OutlineSubmitButton from "../Buttons/OutlineSubmitButton";

const ModalComponent = (props) => {
  const getModalClass = () => {
    let modal_class = "info";
    switch (props.cause) {
      case modalCauses.warning:
        modal_class = "warning";
        break;
      case modalCauses.error:
        modal_class = "error";
        break;
      default:
        modal_class = "info";
        break;
    }
    return modal_class;
  };
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={`modal-wrapper ${getModalClass()}`}>
        {props.title && (
          <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.title}
            </Typography>
          </div>
        )}
        {props.text && (
          <div>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.text}
            </Typography>
          </div>
        )}
        {(props.button || props.extraButton) && (
          <div className="modal-wrapper-buttons-row">
            {props.button && (
              <div>
                <OutlineSubmitButton
                  className={props.button && props.extraButton ? "small" : ""}
                  onClick={props.onButtonClick}
                  title={props.buttonText}
                />
              </div>
            )}
            {props.extraButton && (
              <div>
                <OutlineSubmitButton
                  className={props.button && props.extraButton ? "small" : ""}
                  onClick={props.onExtraButtonClick}
                  title={props.extraButtonText}
                />
              </div>
            )}
          </div>
        )}
      </Box>
    </Modal>
  );
};
export default ModalComponent;
