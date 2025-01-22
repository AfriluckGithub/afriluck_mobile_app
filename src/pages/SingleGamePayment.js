import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./../output.css";
import { OrbitProgress } from "react-loading-indicators";
import Input from "../components/input";
import { ToastContainer, toast } from "react-toastify";

const SingleGamePayment = () => {
  const navigate = useNavigate();
  const [selectedNetwork, setSelectedNetwork] = useState([]);
  const [network, setNetwork] = useState("");
  const [mobileNumber, setMobileNumber] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const numbers = localStorage.getItem("numbers");
  const amount = localStorage.getItem("betAmount");
  //const game = localStorage.getItem("game");
  //const mobile = localStorage.getItem("mobileNumber");
  //const token = localStorage.getItem("token");
  const game_type = localStorage.getItem("game_type");
  const game_picked = localStorage.getItem("game_picked");

  console.log(disabled);

  const placeBet = async () => {
    setLoading(true);
    setDisabled(true);
    const formattedNumber = `233${Number(mobileNumber)}`;
    const requestBody = {
      msisdn: formattedNumber,
      total_amount: Number(amount),
      bet_type_code: 2,
      bet_type: game_picked.toString().toLowerCase(),
      game: game_type.toString().toLowerCase(),
      selected_numbers: numbers,
      channel: network,
      discounted_amount: "",
      use_wallet: false,
      medium: "ussd",
    };

    console.log(requestBody);

    try {
      const res = await axios.post(
        "https://staging.afriluck.com/api/V1/app/place-bet",
        requestBody
        // { headers }
      );
      console.log(res.data);
      if (res.status === 200) {
        setLoading(false);
        setDisabled(true);
        moveToCheckPaymentStatuds();
      }
      console.error("Error:", res);
    } catch (error) {
      const errorMessage = error.response.data.error;
      console.error("Error:", errorMessage);

      toast.error(errorMessage, {position: "top", 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored"});
      setLoading(false);
      setDisabled(true);
    }
  };

  // useEffect(() => {
  //   if (mobile !== "") {
  //     setMobileNumber(mobile);
  //   }
  // }, [mobile]);

  const selectNetwork = (id) => {
    const selectedNetwork = networks.find((network) => network.id === id);
    setNetwork(selectedNetwork.desc);
    setSelectedNetwork(id);
  };

  const handleInputChange = (event) => {
    setMobileNumber(event.target.value);
    localStorage.setItem("mobileNumber", mobileNumber);
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
      image: "logo-pay-mtn-momo.png",
      desc: "mtn",
    },
    {
      id: 2,
      name: "Telecel Cash",
      image: "logo-service-telecelbroadband.png",
      desc: "telecel",
    },
    {
      id: 3,
      name: "AT Money",
      image: "logo-service-airteltigo.png",
      desc: "airteltigo",
    },
  ];

  return (
    <>
      <div className="flex flex-col bg-gray-100 w-full h-screen p-5">
        <div className="bg-gray-100 h-16 w-full p-5 rounded-lg">
          <div className="flex flex-row w-auto items-center">
            <div onClick={back}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className="font-normal w-full text-xl font-Poppins justify-center items-center">
              <p className="flex justify-center items-center text-black">
                Payment
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center bg-white h-18 w-full p-5 rounded-tl-lg rounded-tr-lg mt-3">
          <span className="font-xs text-lg mb-2 text-black">
            <p>{game_type}</p>
            <p className="text-xs text-black">Draw 148</p>
          </span>
          <span className="font-normal text-sm font-Poppins ml-auto text-black">
            Mon 22/10/2024
          </span>
        </div>
        <div
          className="bg-white h-auto w-full rounded-bl-lg rounded-br-lg"
          style={{ backgroundColor: "#E4F5F6" }}
        >
          <div className="flex flex-col text-gray-800 justify-center items-center p-3">
            <p className="font-Poppins text-sm mb-2">
              <p>You will be charged</p>
            </p>
            <p className="font-bold text-xl">{`GHS ${amount}.00`}</p>
          </div>
        </div>
        <div className="flex flex-col bg-white h-auto w-full p-5 rounded-lg mt-5">
          <span>
            <p className="font-md font-normal mb-5">Select Channel</p>
          </span>
          <div className="flex flex-row flex-auto">
            {networks.map((network) => (
              <div
                key={network.id}
                className="flex flex-col bg-gray-100 h-24 w-24 p-2 mr-2 justify-center items-center rounded-lg"
                onClick={() => selectNetwork(network.id)}
                style={{
                  border:
                    selectedNetwork === network.id
                      ? "2px solid #3DB6BC"
                      : "0px solid gray",
                }}
              >
                <img
                  className="flex mb-2 w-auto"
                  src={network.image}
                  alt="network"
                />
                <p className="flex w-full justify-center items-center">
                  <p className="flex text-xs w-full justify-center items-center text-black">
                    {network.name}
                  </p>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <p className="mb-5">Enter phone number</p>
            <div>
              <Input
                type={"number"}
                placeholder={"020 000 0000"}
                icon={"ghana.svg"}
                className="bg-[#F5F5F7] input-md focus:outline-none text-black"
                value={mobileNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full h-auto justify-center items-center m-5">
          {loading ? (
            <OrbitProgress
              color="#000"
              size="small"
              text="loading"
              textColor=""
            />
          ) : (
            ""
          )}
          <ToastContainer />
        </div>
      </div>
      <div className="bg-gray-100 flex flex-row w-auto absolute bottom-auto left-0 right-0">
        <button
          onClick={placeBet}
          style={{ backgroundColor: "#156064" }}
          className="text-white font-semibold rounded-lg w-full h-16 text-md ml-5 mr-5 mb-5"
        >
          Pay {`GHS ${amount}.00`}
        </button>
      </div>
    </>
  );
};

export default SingleGamePayment;
