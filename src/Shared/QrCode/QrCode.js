import React from "react";
import OutlineSubmitButton from "../Buttons/OutlineSubmitButton";

const QrCode = (props) => {
  return (
    <div className="qr_code-wrapper">
      <div className="qr-code-image">
        <img src={props.data.filePath} />
      </div>
      <h2>Приехали?</h2>
      <OutlineSubmitButton
        onClick={props.action}
        title=" Нажмите для авторизации"
      />
    </div>
  );
};

export default QrCode;
