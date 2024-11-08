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
import Sharecommission from "./components/Share/sharecommission";
import ShareScreen from "./components/Share/share";
import Subscription from "./components/Accounts/subscription";
import Transactions from "./components/Accounts/transactions";
import LoginScreen from "./components/Auth/login";
import SignupScreen from "./components/Auth/signup";
import VerifyCodeScreen from "./components/Auth/verifycode";
import CreatePassword from "./components/Auth/createpassword";
import PaymentPassword from "./components/Auth/paymentpassword";
import ForgotPassword from "./components/Auth/forgotpassword";
import ResetPassword from "./components/Auth/resetpassword";
import AccountSecurity from "./components/Accounts/accountsecurity";
import ChangePassword from "./components/Accounts/changepassword";
import ChangePaymentPassword from "./components/Accounts/changepaymentpassword";
import ChangeSecurityQuestions from "./components/Accounts/changesecurityquestions";
import DeleteAccount from "./components/Accounts/deleteaccount";
import VerifySecurityCode from "./components/Accounts/verifysecuritycode";
import ProfileScreen from "./components/Auth/profile";

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
  {
    path: "/share_commission",
    element: <Sharecommission />,
  },
  {
    path: "/share",
    element: <ShareScreen />,
  },
  {
    path: "/subscription",
    element: <Subscription />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/signup",
    element: <SignupScreen />,
  },
  {
    path: "/verifycode",
    element: <VerifyCodeScreen />,
  },
  {
    path: "/createpassword",
    element: <CreatePassword />,
  },
  {
    path: "/paymentpassword",
    element: <PaymentPassword />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "/accountsecurity",
    element: <AccountSecurity />,
  },
  {
    path: "/changepassword",
    element: <ChangePassword />,
  },
  {
    path: "/changepaymentpassword",
    element: <ChangePaymentPassword />,
  },
  {
    path: "/changesecurityquestions",
    element: <ChangeSecurityQuestions />,
  },
  {
    path: "/deleteaccount",
    element: <DeleteAccount />,
  },
  {
    path: "/verifysecuritycode",
    element: <VerifySecurityCode />,
  },
  {
    path: "/profilescreen",
    element: <ProfileScreen />,
  },
]);
