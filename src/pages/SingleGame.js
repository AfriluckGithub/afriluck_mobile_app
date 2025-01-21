import { useState, createContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./../output.css";

const SingleGame = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState([]);

  const [betAmount, setBetAmount] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [valuesArray, setValuesArray] = useState([]);
  const [val, setVal] = useState([]);

  const increment = () => setBetAmount(betAmount + 1);
  const decrement = () => setBetAmount(betAmount > 0 ? betAmount - 1 : 0);
  const type = localStorage.getItem("game_type");
  const type_picked = localStorage.getItem("game_picked");
  console.log("type => ", type);
  console.log("type picked => ", type_picked);

  const direct = [
    { id: 1, game: "Direct 1" },
    { id: 2, game: "Direct 2" },
    { id: 3, game: "Direct 3" },
    { id: 4, game: "Direct 4" },
    { id: 5, game: "Direct 5" },
    { id: 6, game: "Direct 6" },
  ];

  const perm = [
    { id: 1, game: "Perm 1" },
    { id: 2, game: "Perm 2" },
    { id: 3, game: "Perm 3" },
    { id: 4, game: "Perm 4" },
    { id: 5, game: "Perm 5" },
    { id: 6, game: "Perm 6" },
  ];

  const selectGame = (id) => {
    setSelectedGame(id);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const parts = value
      .split(/[-/ ]+/)
      .map((part) => part.trim())
      .filter((part) => part !== "");

    if (type_picked === "Mega") {
      if (parts.length < 0 || parts.length > 6) {
        setError("Input length should contain a maxium of six characters");
        return;
      } else {
        setDisabled(false);
      }
    } else if (type_picked === "Direct") {
      setDisabled(false);
    } else {
      setDisabled(false);
    }

    setVal(parts);
    setValuesArray((prevArray) => [...prevArray, ...parts]);
    setInputValue(value);
    setError("");
    console.log(parts);
    console.log("Disabled => ", disabled);
  };

  const handleAmountChange = (event) => {
    setBetAmount(event.target.value);
  };

  const back = () => {
    navigate("/");
  };

  const placeBet = () => {
    console.log("selected game => ", selectedGame);
    console.log("Val => ", val.length);
    
    const megaValidation =
      val.length >= 6 && type_picked === "Mega" && Number(betAmount) > 0;
      const directValidation =
      (val.length == selectedGame) && type_picked === "Direct" && Number(betAmount) > 0;
    if (megaValidation || directValidation) {
      localStorage.setItem("numbers", inputValue);
      localStorage.setItem("betAmount", betAmount);
      localStorage.setItem("game", selectedGame);
      navigate("/single_game_selection");
    }else{
      setError("Kindly verify if the you have selected an amoun or the numbers selected meets the required length.")
    }
  };

  const handlePaymentScreen = () => {
    navigate("/single_game_payment");
  };
  return (
    <>
      <div className="flex flex-col bg-gray-100 w-full h-screen p-5">
        <div className="bg-gray-100 h-16 w-full p-5 rounded-lg">
          <div className="flex flex-row gap-10 items-center">
            <div onClick={back} className="">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className="text-md font-Poppins font-normal text-xl">
              {type}
            </div>
          </div>
        </div>
        <div className="bg-white h-auto w-full p-5 rounded-lg flex flex-col justify-center items-center">
          <div className="flex flex-col justify-start items-start w-full mb-5">
            {/* <span className="font-semibold text-md mb-5 font-Poppins">
              Draw 148
            </span> */}
            {/* <span className="font-normal text-sm font-Poppins">
              Mon 17/10/2024 10:00
            </span> */}
          </div>
          {type_picked === "Direct" ? (
            <div className="grid grid-cols-3 justify-center items-center">
              {direct
                .filter(
                  (game) =>
                    !(
                      (type === "Anopa" || type === "Midday") &&
                      (game.id === 5 || game.id === 6)
                    )
                )
                .map((game) => (
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
                    <p className="text-black font-Poppins font-normal">
                      {game.game}
                    </p>
                  </div>
                ))}
            </div>
          ) : type_picked === "Perm" ? (
            <div className="grid grid-cols-3 justify-center items-center">
              {perm
                .filter(
                  (game) =>
                    !(
                      (type === "Anopa" || type === "Midday") &&
                      (game.id === 5 || game.id === 6)
                    )
                )
                .map((game) => (
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
                    <p className="text-black font-Poppins font-normal">
                      {game.game}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500 font-Poppins">
                {type_picked === "Mega" ? (
                  <p>
                    Kindly select 6 numbers between 1 & 57 seperated by a dash
                  </p>
                ) : (
                  <p>Kindly select a number between 1 & 57</p>
                )}
              </p>
            </div>
          )}
        </div>
        <div className="bg-white h-28 w-full p-5 rounded-lg mb-10 mt-10">
          <p>Selections</p>
          <div>
            <input
              value={inputValue}
              onChange={handleInputChange}
              className="h-14 w-full border-2 p-5 border-gray-300 rounded-md"
              placeholder={`${
                selectedGame == ""
                  ? `Please select a number`
                  : `Please pick ${selectedGame} numbers between 1 to 57`
              }`}
            />
            {error && <p className="text-rose-500">{error}</p>}
          </div>
        </div>
      </div>
      <footer className="flex items-center bg-white h-28 p-5 m-5 rounded-lg absolute bottom-0 left-0 right-0">
        <div className="flex flex-row gap-10 w-full bg-white rounded-lg p-5">
          <div className="flex flex-col flex-grow">
            <p className="font-normal text-sm font-Poppins text-gray-400">
              Bet Amount
            </p>
            <p className="flex flex-row font-bold text-xl">
              <button
                onClick={decrement}
                className="bg-gray-300 hover:bg-red-700 text-black h-10 w-10 rounded-xl font-normal mr-1 text-sm"
              >
                -
              </button>
              <button
                value={betAmount}
                onChange={handleAmountChange}
                className="bg-gray-300 hover:bg-red-700 text-black h-10 w-10 rounded-xl font-bold mr-1 text-xl"
              >
                {betAmount}
              </button>
              <button
                onClick={increment}
                className="bg-gray-300 hover:bg-red-700 text-black h-10 w-10 rounded-xl font-normal text-sm"
              >
                +
              </button>
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-normal text-sm text-gray-400">Total Amount</p>
            <p className="font-bold text-md text-xl">GHS {`${betAmount}.00`}</p>
          </div>
        </div>
      </footer>
      <div className="">
        <button
          disabled={disabled}
          style={{ backgroundColor: "#156064" }}
          onClick={placeBet}
          className="text-gray-200 font-bold rounded-lg w-full h-16"
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default SingleGame;
