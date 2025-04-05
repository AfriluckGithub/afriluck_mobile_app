import { useNavigate } from "react-router-dom";
import Button from "../button";
import { login } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

export default function RegistrationComplete() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
    const memoizedUser = useMemo(() => {
      return user ? { ...user } : null;
    }, [user]);

  const loginPage = () => {
    memoizedUser.verifiedUser = true;
    dispatch(login(memoizedUser));
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center h- w-full bg-white">
      <div className="flex flex-col bg-white p-8 text-center h-full w-full">
        <svg
          className="w-16 h-16 text-green-500 mx-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <h1 className="text-2xl font-bold text-gray-700 mt-4">
          Registration Complete!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for signing up. You can now access your account.
        </p>
        <Button
          label={"Go to Home Page"}
          className="mt-6 px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-600 transition"
          onClick={loginPage}
        >
        </Button>
      </div>
    </div>
  );
}
