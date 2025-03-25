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
  onSuccess,
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
        <div className="fixed inset-0 z-50 bg-gray-200 bg-opacity-50 flex items-center justify-center">
          <dialog id="my_modal_1" className="modal " open>
            <div className={`modal-box ${sizeClasses[size]} bg-white`}>
              {type === "success" ? (
                <div className="flex flex-col items-center bg-white">
                  <div
                    className={`w-16 h-16 bg-[${imgBg}] rounded-full flex items-center justify-center mb-4`}
                  >
                    <img src={imageSrc} alt="Modal Icon" className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl">{title}</h3>
                  <p className="py-2 text-base text-text-muted">{subtitle}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 bg-[${imgBg}] rounded-full flex items-center justify-center mb-4`}
                  >
                    <img src={imageSrc} alt="Modal Icon" className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg">{title}</h3>
                  <p className="py-2 text-base text-text-muted">{subtitle}</p>
                </div>
              )}
              <div className="modal-action">
                {/* <form method="dialog">
                  <button
                    type="button"
                    className="btn"
                    onClick={onClose} // Close modal on button click
                  >
                    Close
                  </button>
                </form> */}
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
                    className={`w-full py-4 px-4 text-lg font-semibold bg-primary text-white rounded-lg hover:bg-primary hover:text-white`}
                    onClick={onSuccess}
                  >
                    {buttonText}
                  </button>
                )}
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default Modal;
