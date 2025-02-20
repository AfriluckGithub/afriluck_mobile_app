import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import "./../output.css";
import { OrbitProgress } from "react-loading-indicators";
import Input from "../components/input";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@heroui/button";
import { useSelector, useDispatch } from "react-redux";
import { addTransactionData } from "../store/transactionSlice";
import { BsArrowLeft } from "react-icons/bs";

const SingleGamePayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedNetwork, setSelectedNetwork] = useState([]);
  const [network, setNetwork] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [isValidMobile, setIsValidMobile] = useState(false);

  //const numbers = localStorage.getItem("numbers");
  //const amount = localStorage.getItem("betAmount");
  //const game = localStorage.getItem("game");
  //const mobile = localStorage.getItem("mobileNumber");
  //const token = localStorage.getItem("token");
  //const game_type = localStorage.getItem("game_type");
  //const game_picked = localStorage.getItem("game_picked");

  //const user = useSelector((state) => state.user.user);
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
          position: "top",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
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
        "https://app.afriluck.com/api/V1/app/place-bet",
        requestBody
      );
      console.log(res.data);
      if (res.status === 200) {
        setLoading(false);

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
        moveToCheckPaymentStatuds();
      }
      console.error("Error:", res);
    } catch (error) {
      try {
        const errorMessage = error.response.data.error;
        //const channelMessage = errorMessage.channel;
        console.error("Error:", errorMessage);

        toast.error(errorMessage, {
          position: "top",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
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

  const back = () => {
    navigate("/single_game_selection");
  };

  const moveToCheckPaymentStatuds = () => {
    navigate("/single_game_status");
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
      <div className="h-screen flex flex-col bg-[#F7F7F7] w-screen  ">
        <div className="bg-white h-auto py-6 px-4 md:px-12 lg:px-48 border-b border-border-default ">
          <div className="flex cursor-pointer  items-center ml-2">
            <div
              onClick={back}
              className="flex items-center space-x-4 p-3 w-auto border-border-default border rounded-xl bg-bg-tertiary"
            >
              <BsArrowLeft />
              <p className="flex justify-center items-center text-black">
                Payment
              </p>
            </div>
            {/* <div className="font-normal w-full text-xl font-Poppins justify-center items-center">
              <p className="flex justify-center items-center text-black">
                Payment
              </p>
            </div> */}
          </div>
        </div>
        <div className="mx-4 md:mx-12 lg:mx-48 py-6">
          <div className=" bg-white border border-border-default rounded-2xl">
            <div className="flex flex-row justify-center items-center  w-full p-6 rounded-t-2xl">
              <span className="font-xs text-lg  text-black">
                <p>{game_type}</p>
                <p className="text-xs text-black">Draw 148</p>
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
            <div className="grid grid-cols-2 gap-4 md:flex flex-row  md:justify-between md:items-start md:space-x-6">
              {networks
                .filter(
                  (network) => !(memoizedUser === null && network.id === 4)
                )
                .map((network) => (
                  <div
                    key={network.id}
                    className="flex flex-col bg-gray-100 h-24 w-full p-2 mr-2 justify-center items-center rounded-xl mb-2 focus:outline-none ripple"
                    onClick={() => selectNetwork(network.id)}
                    style={{
                      border:
                        selectedNetwork === network.id
                          ? "2px solid #3DB6BC"
                          : "0px solid gray",
                      backgroundColor:
                        selectedNetwork === network.id ? "#F6FCFD" : "#F7F7F7",
                      fontWeight:
                        selectedNetwork === network.id ? "bold" : "normal",
                    }}
                  >
                    <img
                      className="flex mb-2 w-auto"
                      src={network.image}
                      alt={network.placeholder}
                    />
                    <p className="flex w-full justify-center items-center">
                      <p className="flex text-xs w-full justify-center items-center text-black">
                        {network.name}
                      </p>
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className="block space-y-4 md:flex w-full items-end justify-between bg-white p-6 my-6 rounded-2xl border border-border-default">
            <div>
              {selectedNetwork !== 4 ? (
                <p className="mb-1 text-sm">Enter phone number</p>
              ) : (
                <p></p>
              )}
              {selectedNetwork !== 4 ? (
                <Input
                  type={"number"}
                  placeholder={"020 000 0000"}
                  icon={"ghana.svg"}
                  className="bg-[#F5F5F7] w-full input-md focus:outline-none text-black"
                  value={mobileNumber}
                  onChange={handleInputChange}
                />
              ) : (
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
              className=" font-bold w-full md:w-auto bg-primary text-white text-base"
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
