import React from "react";
import OutlineSubmitButton from "./Buttons/OutlineSubmitButton";

const QrCode = (props) => {
  return (
    <div className="qr_code-wrapper">
      <div className="qr-code-image">
        <img src={props.data.fileName} />
      </div>
      <OutlineSubmitButton
        onClick={props.action}
        title="Приехали? Нажмите для авторизации"
      />
    </div>
  );
};

export default QrCode;
