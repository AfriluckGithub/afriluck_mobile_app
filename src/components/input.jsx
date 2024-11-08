import React, { useState } from "react";

const Input = ({
  label,
  icon,
  rightIcon,
  className = "",
  type = "text",
  placeholder,
  onRightIconClick,
  value,
  onChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    if (type === "password") {
      setIsPasswordVisible((prev) => !prev);
    }
    if (onRightIconClick) {
      onRightIconClick(); // Call the passed onClick function if provided
    }
  };

  return (
    <label
      className={`input input-bordered flex items-center gap-2 ${className}`}
    >
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      {icon && <img src={icon} alt="icon" className="w-6 h-6" />}
      <input
        type={type === "password" && isPasswordVisible ? "text" : type} // Toggle password visibility
        placeholder={placeholder}
        className={`grow`}
        value={value}
        onChange={onChange}
      />
      {rightIcon && (
        <img
          src={
            type === "password" && isPasswordVisible
              ? "eyeopen.svg"
              : "eyeclose.svg"
          } // Change icon based on visibility
          alt="Toggle visibility"
          className="cursor-pointer"
          onClick={handleTogglePasswordVisibility} // Handle click event
        />
      )}
    </label>
  );
};

export default Input;
