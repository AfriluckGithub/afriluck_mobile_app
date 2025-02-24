//import { useEffect } from "react";
import "preline/preline";
//import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./output.css";
import Header from "./components/header";
import Footer from "./components/footer";
import PWAInstallPrompt from "./PWAInstallPrompt";
import { useAptabase } from '@aptabase/react';

function App() {
  const { trackEvent } = useAptabase();
  trackEvent('started_app');
  // const location = useLocation();
  // useEffect(() => {
  //    //window.HSStaticMethods.autoInit();
  // }, [trackEvent]);

  return (
    <div className="bg-[#F7F7F7] h-screen flex flex-col">
      <PWAInstallPrompt />
      <Header />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
