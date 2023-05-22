// Popup.js

import React, { useEffect } from "react";

const Popup = ({ message, className, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={`alert alert-${className} position-fixed top-0 end-0 mt-4 me-4`}
      role="alert"
    >
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
};

export default Popup;
