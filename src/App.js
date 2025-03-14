//import { useEffect } from "react";
import "preline/preline";
//import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
//import Header from "./components/header";
//import Footer from "./components/footer";
import PWAInstallPrompt from "./PWAInstallPrompt";
import { useAptabase } from "@aptabase/react";
import { useEffect } from "react";
import { Suspense, lazy } from "react";
import TagManager from "react-gtm-module";
const tagManagerArgs = {
  gtmId: "GTM-5Q9QP597"
};

const Header = lazy(() => import("./components/header"));
const Footer = lazy(() => import("./components/footer"));

function App() {
  const { trackEvent } = useAptabase();

  // const location = useLocation();
  useEffect(() => {
    //window.HSStaticMethods.autoInit();
    //trackEvent("started_app");
    TagManager.initialize(tagManagerArgs);
  }, [trackEvent]);

  return (
    <div className="bg-[#F7F7F7] h-screen flex flex-col">
      <PWAInstallPrompt />
      <Suspense fallback={<div className="flex justify-center items-center">Loading...</div>}>
        <Header />
      </Suspense>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <Suspense fallback={<div className="flex justify-center items-center">Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
