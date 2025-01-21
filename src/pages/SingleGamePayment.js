import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./../output.css";
import { OrbitProgress } from "react-loading-indicators";

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
  const mobile = localStorage.getItem("mobileNumber");
  //const token = localStorage.getItem("token");
  const game_type = localStorage.getItem("game_type");
  const game_picked = localStorage.getItem("game_picked");

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

    const headers = {
      Authorization: `Bearer 21|2lw6aPgfmVjcldjbHgC6a3nBOG7gJk0Mv3BGVy0G1cbc0614`,
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(
        "https://staging.afriluck.com/api/V1/app/place-bet",
        requestBody,
        { headers }
      );
      console.log(res.data);
      if (res.status === 200) {
        setLoading(false);
        setDisabled(true);
        moveToCheckPaymentStatuds();
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setDisabled(true);
    }
  };

  useEffect(() => {
    if (mobile !== "") {
      setMobileNumber(mobile);
    }
  }, [mobile]);

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
      id: 1, name: "MTN Momo", 
      image: "logo-pay-mtn-momo.png", 
      desc: "mtn" 
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
          <div className="flex flex-row gap-10 items-center mb-10">
            <div onClick={back} className="">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className="font-normal text-xl font-Poppins">Payment</div>
          </div>
        </div>
        <div className="flex bg-white h-18 w-full p-5 rounded-tl-lg rounded-tr-lg mt-12">
          <span className="font-normal text-lg mb-2">{game_type}</span>
          {/* <span className="font-normal text-sm font-Poppins ml-auto">
            Mon 22/10/2024
          </span> */}
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
          <span className="flex flex-row flex-auto">
            {networks.map((network) => (
              <div
                key={network.id}
                className="flex flex-col bg-gray-100 h-20 w-auto p-5 mr-2 justify-center items-center rounded-lg"
                onClick={() => selectNetwork(network.id)}
                style={{
                  border:
                    selectedNetwork === network.id
                      ? "2px solid #3DB6BC"
                      : "0px solid gray",
                }}
              >
                <img className="mb-3" src={network.image} alt="mtn" />
                <p className="text-xs">{network.name}</p>
              </div>
            ))}
          </span>
          <div className="mt-10">
            <p className="mb-5">Enter phone number</p>
            <div className="flex flex-row bg-gray-100 w-full h-14 rounded-lg p-4 items-center">
              <img alt="gh_flag" className="h-10 w-10 mr-5" src="ghflag.png" />
              <input
                value={mobileNumber}
                onChange={handleInputChange}
                disabled={disabled}
                placeholder="E.g 0554588483"
                className="bg-gray-100 w-full h-14 focus:border-0 p-5 font-semibold"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full h-auto justify-center items-center">
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
        </div>
      </div>
      <footer className="flex flex-col h-28 absolute bottom-auto left-0 right-0">
        <div className="flex flex-row w-auto ml-5 mr-5">
          <button
            onClick={placeBet}
            style={{ backgroundColor: "#156064" }}
            className="text-white font-semibold rounded-lg w-full h-16 text-xl"
          >
            Pay {`GHS ${amount}.00`}
          </button>
        </div>
      </footer>
    </>
  );
};

export default SingleGamePayment;
