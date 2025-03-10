import React, { useMemo, useState } from "react";
import Button from "./button";
import { useSelector } from "react-redux";
import { OrbitProgress } from "react-loading-indicators";
import Input from "./input";
import { useNavigate } from "react-router-dom";

const TopUpPage = () => {
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  const handleChange = (event) => {
    setNetwork(event.target.value);
  };

  const back = () => {
    navigate("/profile");
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
          "https://app.afriluck.com/api/V1/app/account/deposit",
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
  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div className="mt-20 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Wallet Topup
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center p-6 h-full">
        <Input
          label={"Amount"}
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 mb-4"
          placeholder="0.00 GHS"
        />

        <select
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 mb-5"
          value={network}
          onChange={handleChange}
        >
          <option value="">Select a Network</option>
          <option value="MTN">MTN</option>
          <option value="Vodafone">Vodafone</option>
          <option value="AirtelTigo">AirtelTigo</option>
        </select>
        <div className="flex justify-center items-center w-full h-auto">
          {loading ? (
            <OrbitProgress
              color="#000"
              size="small"
              text="loading"
              textColor=""
            />
          ) : (
            <p className="mb-5 text-green-800 text-center text-wrap">
              {message}
            </p>
          )}
        </div>
        <div className="flex justify-between mt-4 space-x-10">
          <Button
            label={"Back"}
            onClick={back}
            className="bg-danger-400 text-white w-32 font-medium h-16"
          >
            Cancel
          </Button>
          <Button
            label={"Top Up"}
            onClick={deposit}
            className="bg-secondary text-primary w-32 font-medium h-16"
            size="sm"
          >
            Top Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopUpPage;
