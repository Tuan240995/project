import React from "react";

const Modal = ({ setShow }) => {
    return (
      <div className="modal-wrapper">
        <div className="modal-content">
          <button className="close-modal" onClick={() => setShow("close")}>
            X
          </button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo co
          </p>
        </div>
      </div>
    );
  };

export default Modal;
