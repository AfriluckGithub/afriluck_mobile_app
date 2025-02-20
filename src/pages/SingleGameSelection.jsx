import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { BsXCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./../output.css";
import { useEffect, useState } from "react";

import { Button } from "@heroui/button";
import { useSelector, useDispatch } from "react-redux";
import {
  addTransactionData,
  clearTransactionData,
} from "../store/transactionSlice";
import { BsArrowLeft } from "react-icons/bs";

const SingleGameSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const transaction =
    useSelector((state) => state.transaction?.transactions) || {};

  const numbers = String(transaction.numbers).length > 1? String(transaction.numbers).split(/( )/): transaction.numbers;
  const amount = transaction.betAmount;
  const game = transaction.game;
  const type = transaction.type;
  const typePicked = transaction.typePicked;
  const movedPastPayment = transaction.movedPastPayment;

  useEffect(() => {
    const calculatePermAmount = async () => {
      if (movedPastPayment) {
        setTotal(amount);
        return;
      }
      try {
        const requestBody = JSON.stringify({
          amount: Number(amount),
          selected_numbers: numbers,
          bet_type_code: game,
          bet_type: typePicked.toLowerCase(),
        });

        const response = await fetch(
          "https://app.afriluck.com/api/V1/app/bet-amount",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: requestBody,
          }
        );

        const json = await response.json();
        console.log(json);

        const total = Number(json.total);
        console.log(`Amount received from API => GHS ${total}`);

        setTotal(total);
      } catch (error) {
        console.log(error);
      }
    };
    calculatePermAmount();
  }, [amount, numbers, total, typePicked, movedPastPayment, game]);

  const back = () => {
    navigate("/single_game");
  };

  const handlePaymentScreen = () => {
    if (typePicked === "Perm") {
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
    <div className="h-screen flex flex-col bg-[#F7F7F7] w-screen  ">
      <div className="bg-white h-auto py-6 px-4 md:px-12 lg:px-48 border-b border-border-default ">
        <div className="flex cursor-pointer  items-center ml-2">
          <div
            onClick={back}
            className="flex items-center space-x-4 p-3 w-auto border-border-default border rounded-xl bg-bg-tertiary"
          >
            <BsArrowLeft />
            <p className="flex justify-start items-start text-black">{type}</p>
          </div>
          {/* <div className="text-xl font-Poppins w-full justify-center items-center">
            <p className="flex justify-center items-center text-black">
              {type}
            </p>
          </div> */}
        </div>
      </div>
      <div className="flex h-screen flex-col mx-4 md:mx-12 lg:mx-48 my-12 ">
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
                  <p className="w-full font-medium text-xl">{numbers}</p>
                  <p className="text-gray-400">{`${typePicked} | GHS ${
                    typePicked === "Perm" ? total : amount
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
                <Button
                  disabled={false}
                  onPress={handlePaymentScreen}
                  className="bg-primary text-white  "
                  size="lg"
                  variant="primary"
                >
                  Place Bet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGameSelection;
