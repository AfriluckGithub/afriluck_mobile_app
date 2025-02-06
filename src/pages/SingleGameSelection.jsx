import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./../output.css";
import { useEffect, useState } from "react";
import Button from "../components/button";
import { useSelector, useDispatch } from "react-redux";
import {
  addTransactionData,
  clearTransactionData,
} from "../store/transactionSlice";

const SingleGameSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  // const user = useSelector((state) => state.user.user);
  const transaction = useSelector((state) => state.transaction?.transactions) || {};

  const numbers = transaction.numbers;
  const amount = transaction.betAmount;
  const game = transaction.game;
  const type = transaction.type;
  const typePicked = transaction.typePicked;
  const movedPastPayment = transaction.movedPastPayment;

  useEffect(() => {
    const calculatePermAmount = async () => {
      if(movedPastPayment) {
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
        console.log(requestBody);

        const response = await fetch(
          "https://staging.afriluck.com/api/V1/app/bet-amount",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: requestBody,
          }
        );
        console.log(response);

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
  }, [amount, numbers, total, typePicked, movedPastPayment]);

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
          movedPastPayment: true 
        })
      );
    }
    navigate("/single_game_payment");
  };

  const handleClear = () => {
    dispatch(clearTransactionData());
    back();
  };

  return (
    <div className="bg-[#F7F7F7] h-screen w-screen flex">
      <div className="flex flex-col w-full p-5">
        <div className="h-16 w-full rounded-lg">
          <div className="flex flex-row w-full">
            <div onClick={back} className="">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className="text-xl font-Poppins w-full justify-center items-center">
              <p className="flex justify-center items-center text-black">
                {type}
              </p>
            </div>
          </div>
        </div>
        <div className="h-screen w-full p-5 rounded-2xl justify-between">
          <div className="bg-white h-auto p-2 pl-5 pt-5 rounded-t-lg">
            <p className="text-black font-normal mb-5">Selections</p>
          </div>
          <div className="h-auto flex flex-col justify-between">
            <div className="h-full flex flex-col w-full bg-white p-5">
              <div
                style={{ backgroundColor: "#F6FCFD" }}
                className="flex flex-row w-full h-auto rounded-md p-5 items-center"
              >
                <div className="flex flex-col w-full">
                  <p className="w-full font-normal text-xl">{numbers}</p>
                  <p className="text-gray-400">{`${typePicked} | GHS ${
                    typePicked === "Perm" ? total : amount
                  }.00`}</p>
                </div>
              </div>
              <div
                style={{ backgroundColor: "#FFEFEF" }}
                onClick={handleClear}
                className="flex w-auto h-16 mt-5 rounded-md justify-center items-center"
              >
                <FontAwesomeIcon icon={faTrash} color="red" />{" "}
                <p className="ml-2 text-red font-semibold">Clear All</p>
              </div>
            </div>
            <footer className="flex flex-wrap w-screen h-auto bg-gray-100 justify-center items-center absolute bottom-0 left-0 p-5">
              <Button
                label={"Place Bet"}
                disabled={false}
                onClick={handlePaymentScreen}
                className="font-bold rounded-lg h-16 bg-primary text-white w-full text-base"
              />
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGameSelection;
