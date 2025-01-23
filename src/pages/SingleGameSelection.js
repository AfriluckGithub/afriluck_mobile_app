import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  //faBrain,
  faTrash,
  //faTrashAlt,
  //faTrashArrowUp,
  //faCancel,
  //faX,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
//import { CSSTransition } from "react-transition-group";
import "./../output.css";
import { useState } from "react";
import Modal from "../components/modal";
import axios from "axios";
import Button from "../components/button";

const SingleGameSelection = () => {
  //const [show, setShow] = useState(false);
  //const nodeRef = useRef(null);
  //const [betAmount, setBetAmount] = useState(0);
  const [selectedGame, setSelectedGame] = useState([]);
  const [open, setOpen] = useState(false);
  //const [total, setTotal] = useState(0);

  const numbers = localStorage.getItem("numbers");
  const amount = localStorage.getItem("betAmount");
  const game = localStorage.getItem("game_picked");
  const type = localStorage.getItem("game_type");

  console.log(selectedGame);
  console.log(setSelectedGame);

  const requestBody = {
    amount: amount,
    selected_numbers: numbers,
    bet_type_code: 2,
    bet_type: "perm",
  };
  console.log(requestBody);
  axios
    .post("https://staging.afriluck.com/api/V1/app/bet-amount", requestBody)
    .then((data) => {
      //localStorage.setItem("betAmount", data.total);
    })
    .catch((error) => {
      console.log(error);
    });

  if (game === "Perm") {
    //console.log("TOTAL: ", total);
  }

  // const selectGame = (id) => {
  //   setSelectedGame(id);
  // };

  //const increment = () => setBetAmount(betAmount + 1);
  //const decrement = () => setBetAmount(betAmount > 0 ? betAmount - 1 : 0);

  const navigate = useNavigate();

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
    navigate("/single_game_payment");
  };

  const handleClear = () => {
    //localStorage.setItem("numbers", "");
    //localStorage.setItem("betAmount", "");
    //localStorage.setItem("game", "");
    openModal();
  };

  return (
    <>
      <div className="flex flex-col bg-gray-100 w-full h-full p-5">
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
        <div className="bg-white h-auto w-full p-5 rounded-2xl">
          <p className="text-black font-normal mb-5">Selections</p>
          <div className="flex flex-col w-full">
            <div
              style={{ backgroundColor: "#F6FCFD" }}
              className="flex flex-row w-full h-16 rounded-md p-5 items-center"
            >
              <p
                style={{ backgroundColor: "#3DB6BC" }}
                className="text-white font-normal rounded-lg w-12 h-auto p-2 justify-center items-center mr-5"
              >
                01
              </p>
              <div className="flex flex-col w-full">
                <p className="w-full font-normal text-xl">{numbers}</p>
                <p className="text-gray-400">{`${game} | GHS ${amount}.00`}</p>
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
        </div>
        <div className="flex flex-wrap w-full h-auto bg-gray-100 absolute bottom-0 left-0 justify-center items-center">
          <Button
            label={"Place Bet"}
            disabled={false}
            onClick={handlePaymentScreen}
            className="font-bold rounded-lg h-16 bg-primary text-white w-11/12"
          />
        </div>
      </div>
      <Modal
        isOpen={open}
        onClose={closeModal}
        onSuccess={navigate("/single_game")}
        type={"failure"}
        title="Log out"
        subtitle="Are you sure you want to clear you selection?"
        buttonText="Yes"
        imageSrc="logout.svg"
        imgBg={"#FFF9F9"}
      />
    </>
  );
};

export default SingleGameSelection;
