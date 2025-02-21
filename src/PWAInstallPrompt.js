import React, { useState, useEffect } from "react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault(); // Prevent automatic prompt
      setDeferredPrompt(event);
    };

    const handleAppInstalled = () => {
      setIsPWAInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA install.");
        } else {
          console.log("User dismissed the PWA install.");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      {!isPWAInstalled && deferredPrompt && (
        <button onClick={installPWA} style={styles.button}>
          Install App
        </button>
      )}
    </>
  );
};

const styles = {
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default PWAInstallPrompt;
