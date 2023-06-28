import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button, { ButtonProps } from "./Button";
import "./Modal.less";

interface ModalProps {
  visible?: boolean;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  buttons?: Array<ButtonProps>;
  onClose: () => void;
}

const Modal = ({ title, children, buttons, onClose }: ModalProps) => {
  buttons = buttons || [{ text: "OK", theme: true, onClick: onClose }];
  return (
    <div className="c-modal-content">
      {title && <div className="c-modal-header">{title}</div>}
      <Button icon="c-modal-closable" onClick={onClose} />
      <div className="c-modal-body">{children}</div>
      <div className="c-modal-footer">
        {buttons.map((button, index) => (
          <Button key={"button-" + index} {...button} />
        ))}
      </div>
    </div>
  );
};

let uuid = 0;
function Wrapper({ visible, ...rest }: ModalProps) {
  const [id, setId] = useState(uuid);

  useEffect(() => {
    if (visible) {
      setId(uuid++);
    }
  }, [visible]);

  if (visible) {
    return ReactDOM.createPortal(
      <div id={"modal-" + id} className="c-modal">
        <div className="c-modal-backdrop"></div>
        <Modal {...rest} />
      </div>,
      document.body
    );
  }
  return null;
}

export default Wrapper;
