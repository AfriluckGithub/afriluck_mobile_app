import React, { useState } from "react";
import Subheader from "../subheader";

const Subscription = () => {
  // State to manage the toggle for each game
  const [toggles, setToggles] = useState({
    allGames: false,
    nla: [false, false, false, false, false, false, false],
    vag: [false, false, false, false, false, false, false],
  });

  const handleToggle = (category, index) => {
    if (category === "allGames") {
      const newAllGames = !toggles.allGames;
      setToggles({
        allGames: newAllGames,
        nla: toggles.nla.map(() => newAllGames),
        vag: toggles.vag.map(() => newAllGames),
      });
    } else {
      const newToggles = [...toggles[category]];
      newToggles[index] = !newToggles[index];
      setToggles({ ...toggles, [category]: newToggles });
    }
  };

  return (
    <div className="flex flex-col w-full items-center h-screen bg-[#F7F7F7] p-6">
      <Subheader title="Notification Subscription" />
      <div className="flex flex-col items-center w-full h-screen space-y-6 rounded-xl mt-20">
        <div className="flex w-full items-center justify-between p-4 bg-white rounded-xl">
          <p>All Games</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={toggles.allGames}
              onChange={() => handleToggle("allGames")}
              className="sr-only"
            />
            <div
              className={`w-12 h-7 rounded-full shadow-inner transition-colors duration-200 ${
                toggles.allGames ? "bg-[#156064]" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`dot absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ease-in-out`}
              style={{
                transform: toggles.allGames
                  ? "translateX(100%)"
                  : "translateX(0)",
              }}
            ></div>
          </label>
        </div>
        <div className="flex flex-col w-full space-y-4">
          {[
            "Monday Special",
            "Lucky Tuesday",
            "Mid Week",
            "Fortune Thursday",
            "Friday Bonanza",
            "National Weekly",
            "Sunday Aseda",
          ].map((game, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between p-4 bg-white rounded-xl"
            >
              <p>{game}</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={toggles.nla[index]}
                  onChange={() => handleToggle("nla", index)}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-7 rounded-full shadow-inner transition-colors duration-200 ${
                    toggles.nla[index] ? "bg-[#156064]" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`dot absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ease-in-out`}
                  style={{
                    transform: toggles.nla[index]
                      ? "translateX(100%)"
                      : "translateX(0)",
                  }}
                ></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
