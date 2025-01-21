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

const SingleGameSelection = () => {
  //const [show, setShow] = useState(false);
  //const nodeRef = useRef(null);
  //const [betAmount, setBetAmount] = useState(0);
  const [selectedGame, setSelectedGame] = useState([]);
  const [open, setOpen] = useState(false);

  // const games = [
  //   { id: 1, game: "Direct 1" },
  //   { id: 2, game: "Direct 2" },
  //   { id: 3, game: "Direct 3" },
  //   { id: 4, game: "Direct 4" },
  //   { id: 5, game: "Direct 5" },
  // ];

  const numbers = localStorage.getItem("numbers");
  const amount = localStorage.getItem("betAmount");
  const game = localStorage.getItem("game_picked");
  const type = localStorage.getItem("game_type");

  console.log(selectedGame);
  console.log(setSelectedGame);

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
      <div className="flex flex-col bg-gray-100 w-full h-screen p-5">
        <div className="h-16 w-full rounded-lg">
          <div className="flex flex-row w-auto ">
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
        {/* <div className="bg-white h-auto w-full p-5 rounded-lg flex flex-col justify-center items-center"> */}
        {/* <div className="flex flex-col justify-start items-start w-full mb-5">
            <span className="font-semibold text-md mb-5 font-Poppins">
              Draw 148
            </span>
            <span className="font-normal text-sm font-Poppins">
              Mon 17/10/2024 10:00
            </span>
          </div> */}
        {/* <div className="grid grid-cols-3 justify-center items-center">
            {games.map((game) => (
              <div
                key={game.id}
                className="flex bg-gray-100 h-32 w-32 justify-center items-center m-1 rounded-md"
                onClick={() => selectGame(game.id)}
                style={{
                  border:
                    selectedGame === game.id
                      ? "2px solid #156064"
                      : "0px solid gray",
                }}
              >
                <p className="text-black font-Poppins font-semibold">
                  {game.game}
                </p>
              </div>
            ))}
          </div> */}
        {/* </div> */}
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
              {/* <p className="flex rounded-full w-9 h-7 bg-gray-400 justify-center items-center"><FontAwesomeIcon icon={faX}  color="white"/></p> */}
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
        <div className="flex flex-row w-full h-auto bg-gray-100 absolute bottom-0 left-0 right-0 mt-10">
          <button
            style={{ backgroundColor: "#156064" }}
            onClick={handlePaymentScreen}
            className="text-white font-bold rounded-lg w-full h-16 mb-5 mr-5 ml-5"
          >
            Place Bet
          </button>
        </div>
      </div>
      <Modal
        isOpen={open}
        onClose={closeModal}
        onSuccess={() => {navigate("/single_game")}}
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
