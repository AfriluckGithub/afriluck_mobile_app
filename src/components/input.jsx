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
  disabled
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
      className={`input input-bordered flex  items-center gap-2 ${className}`}
    >
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      {icon && (
        <img
          src={icon}
          alt="icon"
          className="flex justify-start items-start w-6 h-6"
        />
      )}
      <input
        tabIndex="-1"
        type={type === "password" && isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        className={` grow-0`}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {/* {rightIcon &&
        type === "date" && ( // Check if type is "date"
          <img
            src="calendar.svg" // Use a calendar icon
            alt="Open calendar"
            className="cursor-pointer"
            onClick={() => document.querySelector('input[type="date"]').focus()} // Focus on the date input
          />
        )} */}
      {rightIcon && type === "password" && (
        <img
          src="eyeclose.svg"
          alt="Toggle password visibility"
          className="cursor-pointer"
          onClick={handleTogglePasswordVisibility}
        />
      )}
    </label>
  );
};

export default Input;
