import { useEffect } from "react";
import "preline/preline";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./output.css";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen w-full bg-[#F7F7F7]">
      <Header />
      <div className="flex-1 overflow-y-auto">
        {/* Allow scrolling here */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
