import React, { useState } from "react";

const Avatar = () => {
  const [image, setImage] = useState("default.svg"); // Default image

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the selected image
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file (jpeg, png, jpg).");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="avatar relative w-32 h-32 rounded-full overflow-hidden  border-gray-300">
        <img src={image} alt="avatar" className="w-full h-full object-cover" />
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleImageChange}
          className="hidden" // Hide the default file input
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="absolute bottom-0 left-0 right-0 text-center bg-[#B5DDD9] text-primary font-medium py-1 rounded-t-lg cursor-pointer"
        >
          EDIT
        </label>
      </div>
    </div>
  );
};

export default Avatar;
