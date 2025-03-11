import { useNavigation } from "react-router-dom";

export default function RegistrationComplete() {

  const navigate = useNavigation();

  const loginPage = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
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
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={loginPage}
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
}
