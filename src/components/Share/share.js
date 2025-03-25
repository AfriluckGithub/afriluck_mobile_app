import React, { useMemo, useState } from "react";
import Subheader from "../subheader";
import { useSelector } from "react-redux";
import SocialShare from "../SocialShare";

const ShareScreen = () => {
  let linkToCopy = null;
  const [openModal, setOpenModal] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);
  try{
    linkToCopy = `${window.location.origin}/signup?ref=${memoizedUser.share_code}`; // Link to copy
  }catch(e){
    console.log(e)
  }

  console.log("user => ", memoizedUser);
  

  console.log("link to copy => ",linkToCopy);
  

  const handleCopy = () => {
    console.log("Copy button clicked"); // Debugging: Check if the function is called
    // Check if the clipboard API is available
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(linkToCopy)
        .then(() => {
          console.log("Link copied to clipboard:", linkToCopy); // Debugging
          setOpenModal(true); // Show the modal
          setTimeout(() => {
            setOpenModal(false); // Hide the modal after 2 seconds
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err); // Debugging
        });
    } else {
      console.error("Clipboard API not available"); // Debugging
    }
  };

  const Modal = ({ isOpen }) => {
    if (!isOpen) return null; // Don't render if not open

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-lg font-semibold">Success</h2>
          <p>Link copied to clipboard!</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48 py-32 space-y-6">
      <Subheader title="Share" />
      <div className="flex flex-col w-full space-y-4 justify-between px-4 py-4 bg-white rounded-xl border border-border-default">
        <h1 className="text-xl font-semibold text-center my-4">
          Share Afriluck with your friends & colleagues
        </h1>
        <p className="text-lg text-center text-gray-700 mb-6">
          We want our customers to have fun when they play our games, and we
          strive to create a lighthearted and enjoyable experience.
        </p>
        <div className="flex flex-col justify-center items-center bg-white w-full border rounded-xl p-6 xl:w-[50%]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share your link:
          </label>
          <div className="flex h-auto items-center justify-center space-x-2">
            <input
              type="text"
              value={linkToCopy}
              readOnly
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
            />
            <div
              className="flex w-auto items-center space-x-2 bg-[#156064] rounded-lg p-2 mb-4 cursor-pointer"
              onClick={handleCopy} // Attach handleCopy to the click event
            >
              <img src="copy.svg" alt="Copy" />
            </div>
          </div>
          <SocialShare url={linkToCopy}/>
        </div>
      </div>
      <Modal isOpen={openModal} />
    </div>
  );
};

export default ShareScreen;
