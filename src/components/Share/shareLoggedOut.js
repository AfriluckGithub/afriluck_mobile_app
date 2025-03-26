
import React, { useMemo, useState } from "react";
import Subheader from "../subheader";
import { useSelector } from "react-redux";
import SocialShare from "../SocialShare";

const ShareScreenLoggedOut = () => {
  const [openModal, 
    //setOpenModal
  ] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);
  const linkToCopy = `${window.location.origin}/signup`; // Link to copy

  console.log("user => ", memoizedUser);
  

  console.log("link to copy => ",linkToCopy);

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
        <div className="flex flex-col justify-center items-center bg-white w-full border rounded-xl p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Share your link:
          </label>
          <SocialShare url={linkToCopy}/>
        </div>
      </div>
      <Modal isOpen={openModal} />
    </div>
  );
};

export default ShareScreenLoggedOut;
