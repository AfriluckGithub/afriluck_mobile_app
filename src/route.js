import { createBrowserRouter } from "react-router-dom";
import SingleGame from "./pages/SingleGame";
import SingleGameSelection from "./pages/SingleGameSelection";
import SingleGamePayment from "./pages/SingleGamePayment";
import SingleGamePaymentCheckStatus from "./pages/SingleGamePaymentCheckStatus";
import App from "./App";
import Home from "./pages/Home";
import Mybet from "./pages/Mybet";
import Draw from "./pages/Draw";
import Profile from "./pages/Profile";
import Policy from "./components/Privacy/policy";
import Terms from "./components/Privacy/terms";
import Customerservice from "./components/Privacy/customerservice";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bet",
        element: <Mybet />,
      },
      {
        path: "/draw",
        element: <Draw />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/privacypolicy",
    element: <Policy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/customerservice",
    element: <Customerservice />,
  },
  {
    path: "single_game",
    element: <SingleGame />,
  },
  {
    path: "single_game_selection",
    element: <SingleGameSelection />,
  },
  {
    path: "single_game_payment",
    element: <SingleGamePayment />,
  },
  {
    path: "single_game_status",
    element: <SingleGamePaymentCheckStatus />,
  },
]);
