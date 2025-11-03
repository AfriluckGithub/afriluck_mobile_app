import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { BsXCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@heroui/button";
import { useSelector, useDispatch } from "react-redux";

import {
  addTransactionData,
  clearTransactionData,
} from "../store/transactionSlice";
import Subheader from "../components/subheader";

const SingleGameSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const transaction =
    useSelector((state) => state.transaction?.transactions) || {};

  const numbers =
    String(transaction.numbers).length > 1
      ? String(transaction.numbers).split(/( )/)
      : transaction.numbers;
  const amount = transaction.betAmount;
  const game = transaction.game;
  //const type = transaction.type;
  const typePicked = transaction.typePicked;
  const movedPastPayment = transaction.movedPastPayment;
  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  console.log("Mem user -> ", memoizedUser);

  
  useEffect(() => {
    const calculatePermAmount = async () => {
      if (movedPastPayment) {
        setTotal(amount);
        return;
      }
      try {
        const requestBody = JSON.stringify({
          amount: Number(amount),
          selected_numbers: numbers.join(", "),
          bet_type_code: game,
          bet_type: typePicked.toLowerCase(),
        });

        console.log(requestBody);

        const response = await fetch(
          "https://app-api.afriluck.com/api/V1/app/bet-amount",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${memoizedUser?.token}`,
              "Content-Type": "application/json",
            },
            body: requestBody,
          }
        );

        if (response.status !== 200) {
          setShowModal(true);

          // toast.error("Auth Error: Kindly login to continue with this game.", {
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: false,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "colored",
          //   autoClose: 2000,
          //   position: "top-center",
          // });
        } else {
          const json = await response.json();
          console.log(json);

          const total = Number(json.total);
          console.log(`Amount received from API -> GHS ${total}`);

          setTotal(total);
        }
      } catch (error) {
        console.log(error);
      }
    };
    calculatePermAmount();
  }, [
    amount,
    numbers,
    total,
    typePicked,
    movedPastPayment,
    game,
    memoizedUser?.token,
  ]);

  const back = () => {
    navigate(-1);
  };

  const handlePaymentScreen = () => {
    if (typePicked === "Perm" || typePicked === "Banker") {
      dispatch(
        addTransactionData({
          numbers: transaction.numbers,
          betAmount: total,
          game: transaction.game,
          type: transaction.type,
          typePicked: transaction.typePicked,
          movedPastPayment: true,
        })
      );
    }
    navigate("/single_game_payment");
  };

  const handleClear = () => {
    dispatch(clearTransactionData());
    back();
  };

  const handleDeleteSingle = (numberToDelete) => {
    const updatedNumbers = numbers.filter((num) => num !== numberToDelete);

    dispatch(
      addTransactionData({
        ...transaction,
        numbers: updatedNumbers,
      })
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[#F7F7F7] w-screen">
      {/*Start of the modal*/}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(150, 150, 150, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 150,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
            className="flex flex-col justify-center items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="64"
              height="64"
              color="#a5a5a5ff"
              fill="none"
            >
              <path
                d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                stroke="#a5a5a5ff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M14.9994 15L9 9M9.00064 15L15 9"
                stroke="#a5a5a5ff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <p
              className="p-5"
              style={{ color: "#717171", fontSize: 17, textAlign: "center" }}
            >
              Kindly login to continue with this game.
            </p>

            <Button
              onPress={() => navigate("/login")}
              className=""
              color="primary"
              size="lg"
            >
              Login
            </Button>
          </div>
        </div>
      )}
      {/*End of the modal*/}

      <div className="bg-white h-auto py-6 px-4 md:px-12 lg:px-48 border-b border-border-default md:mb-5 lg:mb-5">
        <Subheader title="Selections" />
      </div>
      <div className="flex h-screen flex-col mx-4 md:mx-12 lg:mx-48 my-12 mt-16">
        <div className="flex flex-col bg-white rounded-2xl border border-border-default">
          <div className=" flex   items-center px-6 py-4  border-b border-border-default">
            <p className="text-black text-xl font-normal ">Selections</p>
          </div>
          <div className="h-auto flex flex-col justify-between">
            <div className="h-full flex flex-col w-full  p-6 space-y-6">
              <div
                style={{ backgroundColor: "#F6FCFD" }}
                className="flex flex-row w-full h-auto justify-between  px-6 py-2 rounded-xl items-center border border-border-default"
              >
                <div className="flex flex-col w-full">
                  <p className="w-full font-medium text-xl break-words whitespace-normal mb-5">
                    {numbers}
                  </p>
                  <p className="text-gray-400">{`${typePicked} | GHS ${
                    typePicked === "Perm" || typePicked === "Banker"
                      ? total
                      : amount
                  }.00`}</p>
                </div>
                <div onClick={handleDeleteSingle} className="cursor-pointer">
                  <BsXCircleFill size={24} color="#c1c0c0" />
                </div>
              </div>
              <div className="flex w-full  justify-end space-x-6 items-center ">
                <Button
                  style={{ backgroundColor: "#FFEFEF" }}
                  onPress={handleClear}
                  variant="flat"
                  size="lg"
                  startContent={<FontAwesomeIcon icon={faTrash} color="red" />}
                >
                  <p className=" text-red ">Clear All</p>
                </Button>
                {/* <Button
                  disabled={total === 0 || amount === 0? true: false}
                  onPress={handlePaymentScreen}
                  className="bg-primary text-white  "
                  size="lg"
                  variant="primary"
                >
                  Place Bet
                </Button> */}
                <Button
                  disabled={total === 0 || amount === 0}
                  onPress={handlePaymentScreen}
                  className={`${
                    total === 0 || amount === 0
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-primary text-white"
                  }`}
                  size="lg"
                  variant="primary"
                >
                  Place Bet
                </Button>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGameSelection;
