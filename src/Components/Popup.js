import React, { useEffect, useRef } from "react";

const Popup = (props) => {
  const boxRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        props.handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    if (boxRef.current) {
      boxRef.current.focus();
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [props]);

  return (
    <div className="popup-box" onClick={props.handleClose}>
      <div
        className="box"
        role="dialog"
        aria-modal="true"
        ref={boxRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-icon"
          aria-label="Close"
          onClick={props.handleClose}
        >
          x
        </button>
        <div className="box-content">
          {props.content}
        </div>
      </div>
    </div>
  );
};

export default Popup;
