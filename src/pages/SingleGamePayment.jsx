import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import Input from "../components/input";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@heroui/button";
import { useSelector, useDispatch } from "react-redux";
import { addTransactionData } from "../store/transactionSlice";
import Subheader from "../components/subheader";
import { trackPurchase } from "../utils/datalayer";

const SingleGamePayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedNetwork, setSelectedNetwork] = useState([]);
  const [network, setNetwork] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidMobile, setIsValidMobile] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const transaction =
    useSelector((state) => state.transaction?.transactions) || {};

  const user = useSelector((state) => state.user?.user);

  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  const amount = transaction.betAmount;
  const numbers = transaction.numbers;
  var game_type = transaction.type;
  const game_picked = transaction.typePicked;

  const getFormattedDate = () => {
    const date = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[date.getDay()];
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} ${dayOfMonth}/${month}/${year}`;
  };

  const placeBet = async () => {
    setLoading(true);

    if (network === "" || (mobileNumber === "" && selectedNetwork !== 4)) {
      toast.error(
        network === ""
          ? "Kindly provide a channel"
          : mobileNumber === ""
          ? "Kindly provide a valid mobile number"
          : "Kindly provide a channel",
        {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          autoClose: 2000,
        }
      );
      setLoading(false);
      return;
    }

    const formattedNumber = `233${Number(mobileNumber)}`;

    if (game_type === "6/57") {
      game_type = "657";
    } else if (game_type === "Midday") {
      game_type = "mid";
    } else if (game_type === "Afriluck 6/57") {
      game_type = "657";
    }

    console.log("Game => ", game_type);

    const requestBody = {
      msisdn:
        selectedNetwork === 4 ? memoizedUser.phone_number : formattedNumber,
      total_amount: Number(amount),
      bet_type_code: transaction.game,
      bet_type: game_picked.toString().toLowerCase(),
      game: game_type.toString().toLowerCase(),
      selected_numbers: String(numbers),
      channel: network,
      discounted_amount: "",
      use_wallet: selectedNetwork === 4 ? true : false,
      medium: "app",
    };

    console.log("Request Body => ", requestBody);

    try {
      const res = await axios.post(
        "https://app-api.afriluck.com/api/V1/app/place-bet",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${memoizedUser?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setLoading(false);
        //trackEvent("payment_request", requestBody);

        dispatch(
          addTransactionData({
            numbers: transaction.numbers,
            betAmount: amount,
            game: transaction.game,
            type: transaction.type,
            typePicked: transaction.typePicked,
            movedPastPayment: true,
            mobileNumber: mobileNumber,
          })
        );

        trackPurchase({
          transaction_id:
            res.data?.data?.transaction_id || Date.now().toString(),
          value: Number(amount),
          currency: "GHS",
          items: [
            {
              item_name: transaction.type,
              item_category: transaction.typePicked,
              price: Number(amount),
              quantity: 1,
              phone_number:
                selectedNetwork === 4
                  ? memoizedUser.phone_number
                  : formattedNumber,
            },
          ],
        });
        const isWalletPayment = selectedNetwork === 4 ? true : false;
        moveToCheckPaymentStatuds(isWalletPayment);
      }
    } catch (error) {
      try {
        const errorMessage = error.response.data.error;
        //const channelMessage = errorMessage.channel;
        console.error("Error:", error);

        toast.error(errorMessage, {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          autoClose: 2000,
          position: "top-center",
        });
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    if (memoizedUser) {
      var mobile = String(memoizedUser.phone_number).substring(3, 13);
      setMobileNumber(`0${mobile}`);
      setIsValidMobile(true);
    }
  }, [memoizedUser]);

  console.log("Selected Network => ", selectedNetwork);

  const selectNetwork = (id) => {
    const selectedNetwork = networks.find((network) => network.id === id);
    setNetwork(selectedNetwork.desc);
    setSelectedNetwork(id);
  };

  const handleInputChange = (event) => {
    setMobileNumber(event.target.value);
    if (mobileNumber.toString().length >= 9) {
      setIsValidMobile(true);
      localStorage.setItem("mobileNumber", mobileNumber);
    } else {
      setIsValidMobile(false);
    }
  };

  // const back = () => {
  //   navigate(-1);
  // };

  const moveToCheckPaymentStatuds = (isWalletPayment) => {
    if (isWalletPayment) {
      navigate("/single_game_status", {
        state: {
          locationStatusText: "Okay",
          locationStatusImage: "success-status.svg",
          locationStatusInfoText:
            "Your payment was successful. Kindly check your transaction history for details.",
          locationStatus: "Paid",
          mobileNumber: mobileNumber,
        },
      });
    } else {
      navigate("/single_game_status");
    }
  };

  const networks = [
    {
      id: 1,
      name: "MTN Momo",
      image: "mtn_momo.svg",
      desc: "mtn",
      placeholder: "MTN",
    },
    {
      id: 2,
      name: "Telecel Cash",
      image: "telecel_logo.svg",
      desc: "telecel",
      placeholder: "Telecel",
    },
    {
      id: 3,
      name: "AT Money",
      image: "AirtelTigo.svg",
      desc: "airteltigo",
      placeholder: "AT Money",
    },
    {
      id: 4,
      name: "Wallet",
      image: "afriluck_lg.png",
      desc: "airteltigo",
      placeholder: "Wallet",
    },
  ];

  return (
    <>
      <div className="h-[800px] flex flex-col bg-[#F7F7F7] w-screen">
        <div className="bg-white h-auto py-6 px-4 md:px-12 lg:px-48 border-b border-border-default md:mb-5 lg:mb-5">
          <Subheader title="Payment" />
        </div>
        <div className="mx-4 md:mx-12 lg:mx-48 py-6 mt-10">
          <div className=" bg-white border border-border-default rounded-2xl">
            <div className="flex flex-row justify-center items-center  w-full p-6 rounded-t-2xl">
              <span className="font-xs text-lg  text-black">
                <p>{game_type}</p>
                <p className="text-xs text-black"></p>
              </span>
              <span className="font-medium text-md font-Poppins ml-auto text-black">
                {getFormattedDate()}
              </span>
            </div>
            <div
              className="bg-white h-auto w-full rounded-b-2xl"
              style={{ backgroundColor: "#f6fcfd" }}
            >
              <div className="flex flex-col text-gray-800 justify-center items-center p-3">
                <p className="font-Poppins text-sm mb-2">
                  <p>You will be charged</p>
                </p>
                <p className="font-bold text-xl">{`GHS ${amount}.00`}</p>
              </div>
            </div>
          </div>
          <ToastContainer />
          <div className="flex flex-col bg-white h-auto w-full p-6 rounded-2xl mt-5 border border-border-default">
            <span>
              <p className="font-md font-normal mb-5">Select Channel</p>
            </span>

            <style>{`
                    input[type="number"]::-webkit-outer-spin-button,
                    input[type="number"]::-webkit-inner-spin-button {
                      -webkit-appearance: none;
                      margin: 0;
                    }
                    input[type="number"] {
                      -moz-appearance: textfield;
                    }
                    .payment-option {
                      transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .payment-option:hover {
                      transform: scale(1.05);
                      box-shadow: 5px 5px 15px 3px #80dbdfff;
                    }
                    .payment-option:active {
                      transform: scale(0.98);
                      box-shadow: 4px 2px 4px #71B5B9;
                    }
                    .payment-option.selected {
                     transform: scale(1.05);
                    box-shadow: 5px 5px 15px 3px #80dbdfff;
                    }
                  `}</style>

            <div className=" flex grid-or-flex-container items-center justify-center flex-wrap">
              {networks
                .filter(
                  (network) => !(memoizedUser === null && network.id === 4)
                )
                .map((network) => (
                  <div>
                    <button
                      key={network.id}
                      onClick={() => selectNetwork(network.id)}
                      className={`payment-option ${
                        selectedOption === network.id ? "selected" : ""
                      }`}
                      styl
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "20px",
                        margin: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        style={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "20px",
                        }}
                        src={network.image}
                        alt="payment option"
                      />
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="block space-y-4 w-full items-end justify-between bg-white p-6 my-6 rounded-2xl border border-border-default md:w-full md:justify-between lg:w-full lg:justify-between">
            <div>
              {selectedNetwork !== 4 ? (
                <p className="mb-1 text-sm text-center">Your phone number</p>
              ) : (
                <p></p>
              )}
              {selectedNetwork !== 4 ? (
                <p
                  className="text-center font-semibold"
                  style={{ fontSize: "24px" }}
                >
                  <img
                    src="/ghana.svg"
                    alt=""
                    style={{
                      display: "inline-block",
                      verticalAlign: "middle",
                      marginRight: "8px",
                    }}
                  />
                  {mobileNumber}
                </p>
              ) : (
                // <Input
                //   type={"number"}
                //   placeholder={"020 000 0000"}
                //   icon={"ghana.svg"}
                //   className="flex bg-[#F5F5F7] input-md focus:outline-none text-black md:w-full lg:w-full"
                //   value={mobileNumber}
                //   disabled={memoizedUser}
                //   onChange={handleInputChange}
                // />
                <p></p>
              )}
            </div>
            <Button
              label={`Pay GHS ${amount}.00`}
              isDisabled={
                !network ||
                !isValidMobile ||
                (!mobileNumber && selectedNetwork !== 4)
              }
              onPress={placeBet}
              className="flex font-bold w-full md:full lg:full bg-primary text-white text-base md:justify-center md:items-center rounded-lg lg:justify-center lg:items-center"
              size="lg"
            >
              Pay GHS {amount}.00
            </Button>
            <div className="flex flex-wrap w-full h-auto justify-center items-center">
              {loading ? (
                <OrbitProgress
                  color="#000"
                  size="small"
                  text="loading"
                  textColor=""
                />
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleGamePayment;
