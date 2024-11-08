import React, { useState } from "react";
// Update with the correct path to your icon

const Dropdown = ({ items, defaultText = "Select an option" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultText); // Default text

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item); // Update the selected item
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative">
      <div
        className="input input-bordered bg-[#F5F5F7] flex items-center justify-between gap-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="label-text">{selectedItem}</span>
        <img
          src={"chevrondown.svg"}
          alt="Toggle dropdown"
          className="w-6 h-6 ml-auto"
        />
      </div>
      {isOpen && (
        <ul className="absolute z-10 bg-white w-full rounded-lg shadow-lg  mt-1">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer "
              onClick={() => handleItemClick(item)} // Handle item click
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
