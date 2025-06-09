//import { useEffect } from "react";
import "preline/preline";
//import { useLocation } from "react-router-dom";
import { Outlet, useLocation } from "react-router-dom";
//import Header from "./components/header";
//import Footer from "./components/footer";
import PWAInstallPrompt from "./PWAInstallPrompt";
import { useAptabase } from "@aptabase/react";
import { useEffect } from "react";
import { Suspense, lazy } from "react";
import TagManager from "react-gtm-module";
import * as Sentry from "@sentry/react";

const tagManagerArgs = {
  gtmId: "GTM-5Q9QP597",
};

const Header = lazy(() => import("./components/header"));
const Footer = lazy(() => import("./components/footer"));

function App() {
  const { trackEvent } = useAptabase();

  const location = useLocation();
  useEffect(() => {
    //window.HSStaticMethods.autoInit();
    //trackEvent("started_app");
    try {
      Sentry.setUser({
        ip_address: location.ip,
        geo: {
          country_code: location.countryCode,
          region: location.region,
          city: location.city,
        },
        
      });
    } catch (error) {
      console.error("Error initializing HSStaticMethods:", error);
    }
    TagManager.initialize(tagManagerArgs);
  }, [trackEvent, location]);

  return (
    <div className="bg-[#F7F7F7] h-screen flex flex-col">
      <PWAInstallPrompt />
      <Suspense
        fallback={
          <div className="flex justify-center items-center">Loading...</div>
        }
      >
        <Header />
      </Suspense>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center">Loading...</div>
        }
      >
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
