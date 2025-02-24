import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { router } from "./route";
import { AuthProvider } from "./context/AuthContext";
import { AvatarProvider } from "./context/AvatarContext";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { register } from "./serviceWorkerRegistration";
import { init } from "@aptabase/web";
import { AptabaseProvider } from "@aptabase/react";

register();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AptabaseProvider appKey="A-US-1350173163">
      <Provider store={store}>
        <AuthProvider>
          <AvatarProvider>
            <PersistGate loading={null} persistor={persistor}>
              <RouterProvider router={router} />
            </PersistGate>
          </AvatarProvider>
        </AuthProvider>
      </Provider>
    </AptabaseProvider>
  </React.StrictMode>
);
//serviceWorkerRegistration.unregister();
reportWebVitals();
