import React from "react";

const Button = ({
  label,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  variant = "primary", // You can set default variant
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`} // Use DaisyUI button classes
    >
      {label}
    </button>
  );
};

export default Button;
