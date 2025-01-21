import { useLocation } from "react-router-dom";
import "../output.css";

const Header = () => {
  const location = useLocation();

  // Function to get the title based on the current route
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/bet":
        return "My Bets";
      case "/draw":
        return "Draw Results";
      case "/profile":
        return "Profile";
      default:
        return "Home"; // Default title
    }
  };

  // Function to determine which icon to display
  const getIcon = () => {
    switch (location.pathname) {
      case "/bet":
        return <img src="filter.svg" alt="Filter" className="w-6 h-6" />;
      case "/profile":
        return <img src="bell.png" alt="Notifications" className="w-6 h-6" />;
      default:
        return <img src="bell.png" alt="Notifications" className="w-6 h-6" />;
    }
  };

  return (
    <div className="flex flex-row justify-between items-center w-full h-auto bg-[#F7F7F7] fixed py-6  top-0 left-0 right-0 z-50">
      {/* Conditionally render the KF div */}
      {location.pathname !== "/profile" && (
        <div className="ml-6">
          <div
            style={{ backgroundColor: "#156064" }}
            className="flex flex-wrap h-12 w-auto text-center text-white rounded-full font-semibold justify-center items-center"
          >
            <p className="flex justify-center items-center p-3">KF</p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap w-full text-center font-medium text-xl justify-center items-center">
        <p>{getTitle()}</p>
      </div>
      <div className="flex flex-wrap w-auto justify-center items-center mr-6">
        <p className="flex flex-wrap w-12 h-12 justify-center items-center">{getIcon()}</p>
      </div>
    </div>
  );
};

export default Header;
