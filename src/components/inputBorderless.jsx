import React, { useState } from "react";

const InputBorderless = ({
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
      className={`input flex items-center gap-2 ${className}`}
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
      {/* {rightIcon &&
        type === "date" && ( // Check if type is "date"
          <img
            src="calendar.svg" // Use a calendar icon
            alt="Open calendar"
            className="cursor-pointer"
            onClick={() => document.querySelector('input[type="date"]').focus()} // Focus on the date input
          />
        )} */}
      {rightIcon &&
        type === "password" && ( // Check if type is "password"
          <img
            src="eyeclose.svg" // Use an eye icon for toggling password visibility
            alt="Toggle password visibility"
            className="cursor-pointer"
            onClick={handleTogglePasswordVisibility} // Call the toggle function
          />
        )}
    </label>
  );
};

export default InputBorderless;
