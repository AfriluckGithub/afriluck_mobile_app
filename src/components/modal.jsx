import React from "react";

const Modal = ({
  isOpen,
  onClose,
  size = "sm",
  title,
  subtitle,
  buttonText,
  imageSrc,
  imgBg,
  type, // New prop for type
}) => {
  // Determine the modal size classes based on the size prop
  const sizeClasses = {
    sm: "sm:max-w-lg",
    md: "md:max-w-2xl",
    lg: "lg:max-w-4xl",
  };

  return (
    <div>
      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 size-full"
          role="dialog"
          aria-labelledby="modal-label"
        >
          <div
            className={`bg-white rounded-2xl shadow-lg p-6 ${sizeClasses[size]} m-4`}
          >
            <div className="flex flex-col items-center space-y-2">
              {imageSrc && (
                <div
                  className={`w-20 h-20 mb-4 rounded-full flex flex-col items-center justify-evenly`}
                  style={{ backgroundColor: imgBg }} // Apply the background color here
                >
                  <img src={imageSrc} alt="Modal Icon" className="w-10 h-10" />
                </div>
              )}
              <h3 className="font-medium text-2xl text-center">{title}</h3>
              <p className="text-[#676767] text-lg text-center mt-2">
                {subtitle}
              </p>
            </div>
            <div className="flex w-full justify-between mt-4">
              {type === "failure" ? (
                <div className="w-full flex flex-row justify-between">
                  <button
                    type="button"
                    className="w-full py-4 px-4 mr-5 border border-[#156064] rounded-xl text-[#156064] text-lg font-semibold hover:bg-gray-100"
                    onClick={onClose}
                  >
                    No, Cancel
                  </button>
                  <button
                    type="button"
                    className="w-full py-4 px-4 bg-[#FFEFEF] text-[#FF0000] text-lg font-semibold rounded-xl hover:bg-[#FF0000] hover:text-white"
                    onClick={() => {
                      // Add your failure logic here
                      onClose();
                    }}
                  >
                    {buttonText}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className={` w-full py-4 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700`}
                  onClick={() => {
                    // Add your success logic here
                    onClose();
                  }}
                >
                  {buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
