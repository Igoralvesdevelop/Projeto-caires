// src/components/Button.jsx
import React from "react";
import "./Button.css";

const Button = ({ text, onClick }) => {
  return (
    <button className="custom-button-cad3" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

