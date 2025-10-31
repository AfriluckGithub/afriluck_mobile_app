import React, { useMemo, useState } from "react";
import Button from "./button";
import { useSelector } from "react-redux";
import { OrbitProgress } from "react-loading-indicators";
// import Input from "./input";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const TopUpPage = () => {
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  // const handleChange = (event) => {
  //   setNetwork(event.target.value);
  // };

  const back = () => {
    navigate(-1);
  };

  const deposit = async () => {
    console.log(`amount => ${amount} network => ${network}`);
    setLoading(true);
    try {
      if (amount === "" || network === "") {
        alert("Please fill all fields");
        setLoading(false);
        return;
      } else {
        const response = await fetch(
          "https://app-api.afriluck.com/api/V1/app/account/deposit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${memoizedUser.token}`,
            },
            body: JSON.stringify({
              amount: amount,
              channel: network,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
          setMessage(data.success);
          setAmount("");
          setLoading(false);
        } else {
          setMessage(data.error);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paymentOptions = [
    { id: 1, image: "/momo.png", onClick: () => setNetwork("MTN") },
    {
      id: 2,
      image: "/telecel.png",
      onClick: () => setNetwork("Vodafone"),
    },
    {
      id: 3,
      image: "/airtel-tigo.png",
      onClick: () => setNetwork("AirtelTigo"),
    },
    {
      id: 4,
      image: "/afriluck_logo.png",
      onClick: () => setNetwork("AirtelTigo"),
    },
  ];

  return (
    <div className="flex flex-col w-full h-screen bg-[#F7F7F7] p-6">
      <div className="flex cursor-pointer  items-center ml-2">
        <div
          onClick={back}
          className="flex items-center space-x-4 p-3 w-auto border-border-default border rounded-xl bg-bg-tertiary"
        >
          <BsArrowLeft />
          <p className="flex justify-start items-start text-black">Back</p>
        </div>
      </div>
      {/**Start of Content */}

      <div className="bg-white p-6 mt-6 h-auto justify-center items-center rounded-xl">
        <div className="">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Wallet Topup
          </h2>
        </div>
        <div className="flex flex-col items-center">
          {/* <Input
            label={"Amount"}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 mb-4"
            placeholder="0.00 GHS"
          /> */}

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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
              borderRadius: "8px",
              padding: "12px",
              width: "160px",
              height: "80px",
            }}
          >
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                let value = e.target.value;
                if (value.includes(".")) {
                  value = value.split(".")[0];
                }
                if (value !== "" && parseFloat(value) < 1) {
                  value = "1";
                }
                setAmount(value);
              }}
              onBlur={(e) => {
                if (e.target.value === "" || parseFloat(e.target.value) < 1) {
                  setAmount("1");
                } else {
                  setAmount(Math.floor(parseFloat(e.target.value)).toString());
                }
              }}
              className="text-center py-2 rounded-lg focus:ring focus:ring-blue-200"
              step="1"
              min="1"
              placeholder="1"
              style={{
                fontSize: 26,
                color: "black",
                width: `${Math.max(
                  40,
                  (amount || "1").toString().length * 18 + 5
                )}px`,
                maxWidth: "180px",
              }}
            />
            <p
              style={{
                fontSize: 14,
                color: "#717171",
                margin: 0,
                marginTop: 12,
              }}
            >
              GHS
            </p>
          </div>
          <p style={{ color: "#717171", marginTop: 0 }}>Current Balance</p>
        </div>
      </div>

      {/*Payment options sections*/}
      <hr style={{ color: "black", height: 20 }} />

      <div className=" flex grid-or-flex-container items-center justify-center flex-wrap">
        {paymentOptions.map((option) => (
          <div>
            <button
              key={option.id}
              onClick={() => {
                setSelectedOption(option.id);
                option.onClick();
              }}
              className={`payment-option ${
                selectedOption === option.id ? "selected" : ""
              }`}
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
                src={option.image}
                alt="payment option"
              />
            </button>
          </div>
        ))}
      </div>

      {/* <select
        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 mb-5 font-Poppins font-semibold"
        value={network}
        onChange={handleChange}
      >
        <option value="">Select a Network</option>
        <option value="MTN">MTN</option>
        <option value="Vodafone">Vodafone</option>
        <option value="AirtelTigo">AirtelTigo</option>
      </select> */}

      <div className="flex justify-center items-center w-full h-auto">
        {loading ? (
          <OrbitProgress
            color="#000"
            size="small"
            text="loading"
            textColor=""
          />
        ) : (
          <p
            className="mb-5 text-green-800 text-center text-wrap"
            style={{ padding: "10px" }}
          >
            {typeof message === "object" ? JSON.stringify(message) : message}
          </p>
        )}
      </div>
      <div className="flex">
        <Button
          label={"Top Up"}
          onClick={deposit}
          className="bg-primary text-white w-full font-medium h-16 rounded-xl"
          size="sm"
        >
          Top Up
        </Button>
      </div>

      {/**End of Content */}
    </div>
  );
};

export default TopUpPage;
