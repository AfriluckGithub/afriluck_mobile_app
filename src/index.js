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
import { init } from '@aptabase/web';
import dotenv from 'dotenv';
dotenv.config();

init(process.env.APT_API_KEY, { appVersion: 0.1, isDebug: false });
register();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <AvatarProvider>
          <PersistGate loading={null} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </AvatarProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
//serviceWorkerRegistration.unregister();
reportWebVitals();
