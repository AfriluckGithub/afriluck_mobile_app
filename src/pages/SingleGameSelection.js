import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./../output.css";
import { useEffect, useState } from "react";
import Modal from "../components/modal";
import Button from "../components/button";
//import { useSelector } from "react-redux";

const SingleGameSelection = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  // const user = useSelector((state) => state.user.user);

  const numbers = localStorage.getItem("numbers");
  const amount = localStorage.getItem("betAmount");
  const game = localStorage.getItem("game_picked");
  const type = localStorage.getItem("game_type");

  useEffect(() => {
    const calculatePermAmount = async () => {
      try {
        const requestBody = JSON.stringify({
          amount: Number(amount),
          selected_numbers: numbers,
          bet_type_code: 2,
          bet_type: game.toLowerCase(),
        });
        console.log(requestBody);

        const response = await fetch(
          "https://staging.afriluck.com/api/V1/app/bet-amount",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //Authorization: `Bearer ${user.token}`,
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
  }, [amount, numbers, total, game]);

  const openModal = () => {
    setOpen(true);
  };

  const back = () => {
    navigate("/single_game");
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handlePaymentScreen = () => {
    if (game === "Perm") {
      localStorage.setItem("betAmount", total);
    }
    navigate("/single_game_payment");
  };

  const handleClear = () => {
    openModal();
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
                  <p className="text-gray-400">{`${game} | GHS ${
                    game === "Perm" ? total : amount
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
            <div className="flex flex-wrap w-screen h-auto bg-gray-100 justify-center items-center absolute bottom-0 left-0 p-5">
              <Button
                label={"Place Bet"}
                disabled={false}
                onClick={handlePaymentScreen}
                className="font-bold rounded-lg h-16 bg-primary text-white w-full text-base"
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={open}
        onClose={closeModal}
        type={"failure"}
        title="Log out"
        subtitle="Are you sure you want to clear you selection?"
        buttonText="Yes"
        imageSrc="logout.svg"
        imgBg={"#FFF9F9"}
      />
    </div>
  );
};

export default SingleGameSelection;
