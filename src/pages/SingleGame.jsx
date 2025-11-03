import { useCallback, useState } from "react";
import { Input } from "@heroui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTransactionData } from "../store/transactionSlice";
import { Button } from "@heroui/button";
import Subheader from "../components/subheader";
import LotteryNumberPicker from "../components/helpers/LotteryNumberPicker";

const SingleGame = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const type = localStorage.getItem("game_type");
  const type_picked = localStorage.getItem("game_picked");

  const [selectedGame, setSelectedGame] = useState(type_picked === "Perm" ? 1 : type_picked === "Direct" ? 1 : type_picked === "Banker" ? 1 : 1);

  const [betAmount, setBetAmount] = useState("");
  const [inputValue, setInputValue] = useState([]);
  const [error, setError] = useState("");
  const [disabled] = useState(true);
  const [valuesArray] = useState([]);

  console.log(disabled);
  console.log(valuesArray);

  const increment = () => {
    setBetAmount((prev) => {
      if (type_picked === "Mega") {
        const newAmount = Number(prev) + 5 > 20 ? 20 : Number(prev) + 5;
        return newAmount === 15 ? newAmount + 5 : newAmount;
      } else if (type_picked === "Direct") {
        return Number(prev) + 1 > 20 ? 20 : Number(prev) + 1;
      } else if (type_picked === "Banker") {
        return Number(prev) + 1 > 200000000 ? 200000000 : Number(prev) + 1;
      } else if (type_picked === "Perm") {
        const amt = Number(prev) + 1 > 20 ? 20 : Number(prev) + 1;
        return amt;
      }
      return Number(prev);
    });
  };

  const decrement = async (type) => {
    setBetAmount((prev) => {
      if (type_picked === "Mega") {
        const newAmount = Number(prev) - 5 > 20 ? 20 : Number(prev) - 5;
        return newAmount === 15
          ? Math.max(newAmount - 5, 0)
          : Math.max(newAmount, 0);
      } else if (type_picked === "Direct") {
        const newAmount = Number(prev) - 1 < 1 ? 1 : Number(prev) - 1;
        return newAmount;
      } else if (type_picked === "Banker") {
        return Number(prev) - 1 < 0 ? 0 : Number(prev) - 1;
      } else if (type_picked === "Perm") {
        const newAmount = Number(prev) - 1 < 1 ? 1 : Number(prev) - 1;
        return newAmount;
      }
      return Number(prev);
    });
  };

  const ranges = [
    { min: 3, max: 15, game: 2 },
    { min: 4, max: 10, game: 3 },
    { min: 5, max: 8, game: 4 },
    { min: 5, max: 8, game: 6 },
  ];

  const direct = [
    { id: 1, game: "Direct 1", imageUrl: "direct-1-logo.png" },
    { id: 2, game: "Direct 2", imageUrl: "direct-2-logo.png" },
    { id: 3, game: "Direct 3", imageUrl: "direct-3-logo.png" },
    { id: 4, game: "Direct 4", imageUrl: "direct-4-logo.png" },
    //{ id: 5, game: "Direct 5", imageUrl: "direct-5-logo.png" },
    { id: 6, game: "Direct 6", imageUrl: "direct-6-logo.png" },
  ];

  const perm = [
    { id: 1, game: "Perm 2", imageUrl: "perm-2-logo.png" },
    { id: 2, game: "Perm 3", imageUrl: "perm-3-logo.png" },
    { id: 3, game: "Perm 4", imageUrl: "perm-4-logo.png" },
    //{ id: 4, game: "Perm 5", imageUrl: "perm-5-logo.png" },
    { id: 5, game: "Perm 6", imageUrl: "perm-6-logo.png" },
  ];

  const numberFieldOptions = [
    { value: 3, label: "3 Numbers" },
    { value: 4, label: "4 Numbers" },
    { value: 5, label: "5 Numbers" },
    { value: 6, label: "6 Numbers" },
    { value: 7, label: "7 Numbers" },
    { value: 8, label: "8 Numbers" },
    { value: 9, label: "9 Numbers" },
    { value: 10, label: "10 Numbers" },
    { value: 11, label: "11 Numbers" },
    { value: 12, label: "12 Numbers" },
    { value: 13, label: "13 Numbers" },
    { value: 14, label: "14 Numbers" },
    { value: 15, label: "15 Numbers" },
  ];

  const selectGame = (id) => {
    setInputValue([]);
    setSelectedGame(id);
    if (type_picked === "Perm") {
      let numFields = 15;
      switch (id) {
        case 1: // Perm 2
          numFields = 15;
          break;
        case 2: // Perm 3
          numFields = 10;
          break;
        case 3: // Perm 4
          numFields = 8;
          break;
        case 5: // Perm 6
          numFields = 8;
          break;
        default:
          numFields = 15;
      }
      setNumOfFields(numFields);
    } else if (type_picked === "Direct") {
      setNumOfFields(id);
    }
  };

  const handleChange = useCallback((numbers) => {
    setInputValue(numbers);
    console.log("Numbers picked " + numbers);
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const numericValue = parseInt(value, 10);
    console.log("Value : ", numericValue);

    if (type_picked === "Mega") {
      if (!value || [5, 10, 20].includes(numericValue)) {
        setBetAmount(value === "" ? "" : numericValue);
        setError("");
      } else {
        setBetAmount(value);
        setError("Allowed values for Mega are 5, 10, or 20.");
      }
    } else if (type_picked === "Direct") {
      if (
        !value ||
        Array.from({ length: 20 }, (_, i) => i + 1).includes(numericValue)
      ) {
        setBetAmount(value === "" ? "" : numericValue);
        setError("");
      } else {
        setBetAmount(value);
        setError("Allowed values for Direct are 1 to 20");
      }
    } else if (type_picked === "Perm") {
      if (
        !value ||
        Array.from({ length: 20 }, (_, i) => i + 1).includes(numericValue)
      ) {
        setBetAmount(value === "" ? "" : numericValue);
        setError("");
      } else {
        setBetAmount(value);
        setError("Allowed values for Perm are 1 to 20");
      }
    } else {
      const value = e.target.value.replace(/[^0-9]/g, "");
      setBetAmount(value === "" ? "" : parseInt(value, 10));
    }
  };

  const determineGame = (selectedGame, type) => {
    if (type === "Direct") {
      return Number(selectedGame);
    } else if (type === "Perm") {
      return Number(selectedGame) + 1;
    } else if (type === "Mega") {
      return 1;
    } else if (type === "Banker") {
      return 2;
    }
  };

  function isValidValue(values) {
    const gameNumber = type_picked === "Perm" ? Number(selectedGame) + 1 : Number(selectedGame);
    const current = ranges.filter(
      (range) => range.game === gameNumber
    );
    if (current.length === 0) {
      return false;
    }
    let currentRange = current[0];
    console.log(current);
    console.log(currentRange);
    let validNumbers = values.filter((value) => {
      let number = parseInt(value);

      return !(isNaN(number) || number < 1 || number > 57);
    });
    console.log(validNumbers);

    // let isRangeValid = current.some(
    //   (range) =>
    //     validNumbers.length >= range.min && validNumbers.length <= range.max
    // );
    return (
      validNumbers.length >= currentRange.min &&
      validNumbers.length <= currentRange.max
    );
  }

  function getRange(value) {
    return ranges.filter((range) => range.game === Number(selectedGame));
  }

  function hasRepeatedNumbers(arr) {
    const seen = new Set();
    for (let num of arr) {
      if (seen.has(num)) {
        console.log("Has repeated numbers");

        return true;
      }
      seen.add(num);
    }
    return false;
  }

  const placeBet = () => {
    let val = inputValue;
    console.log("Val", val);
    console.log(" Val Length => ", val.length);
    // Filter to only valid numbers
    let validInputs = val.filter(item => item !== "" && !isNaN(item) && item >= 1 && item <= 57);
    const repeatedNumbers = hasRepeatedNumbers(validInputs);
    if (error !== "") {
      return;
    }
    if (repeatedNumbers) {
      setError(`Repeated numbers are not allowed`);
      return;
    }

    if (type_picked === "Mega" && inputValue.length < 6) {
      setError("Kindly select 6 numbers between 1 & 57");
      return;
    }

    if (type_picked === "Direct" && val.every((item) => item === "")) {
      setError("Kindly select a number between 1 & 57");
      return;
    }

    if (type_picked === "Banker" && val.every((item) => item === "")) {
      setError("Kindly select a number between 1 & 57");
      return;
    }

    console.log("Input Length => ", inputValue.length);

    const permValidation = isValidValue(val);
    const range = getRange(val.length);

    const megaValidation =
      val.length >= 6 &&
      type_picked === "Mega" &&
      Number(betAmount) > 0 &&
      !val.some((item) => Number(item) > 57);
    const directValidation =
      val.filter(item => item !== "").length === selectedGame &&
      type_picked === "Direct" &&
      //val.length > 0 &&
      Number(betAmount) > 0 &&
      !val.some((item) => Number(item) > 57);

    const bankerValidation =
      val.length === 1 &&
      type_picked === "Banker" &&
      //val.length > 0 &&
      Number(betAmount) > 0 &&
      !val.some((item) => Number(item) > 57);

    console.log("repeated => ", inputValue);

    if (
      megaValidation ||
      directValidation ||
      bankerValidation ||
      permValidation
    ) {
      const transaction = {
        numbers: inputValue,
        betAmount: betAmount,
        game: determineGame(selectedGame, type_picked),
        type: type,
        typePicked: type_picked,
        movedPastPayment: false,
      };

      dispatch(addTransactionData(transaction));
      navigate("/single_game_selection");
    } else {
      if (!permValidation && type_picked === "Perm") {
        const gameNumber = Number(selectedGame) + 1;
        const currentRange = ranges.find(r => r.game === gameNumber);
        setError(
          `Selected Perm numbers has to be between ${currentRange ? currentRange.min : 3} and ${currentRange ? currentRange.max : 15} numbers`
        );
      } else if (repeatedNumbers) {
        setError(`Repeated numbers are not allowed`);
      } else {
        setError(
          "Kindly verify if the game, amount or numbers selected meets the required length."
        );
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#F7F7F7] w-screen scroll-smooth overflow-y-auto pb-20">
        <div className="bg-white h-auto py-6 px-4 md:px-12 lg:px-48 border-b border-border-default">
          <Subheader title="Select Numbers" />
        </div>
        <div className="flex flex-col mx-4 md:mx-12 lg:mx-48 md:mt-20 lg:mt-20 mt-16 space-y-8 md:space-y-12">
          <div className="bg-white h-auto  border border-border-default rounded-2xl flex flex-col justify-center items-center mt-6">
            <div className="flex items-start w-full px-6 py-4 bg-[#DEF5EE] rounded-t-2xl ">
              <p className="text-primary font-medium text-lg">
                {type_picked} Selection for {type}
              </p>
            </div>
            {type_picked === "Direct" ? (
              <div className="justify-center items-center w-auto grid grid-cols-2 gap-2 space-x-1 p-5">
                {direct
                  .filter(
                    (game) =>
                      !(
                        ((type === "Anopa" || type === "Midday") &&
                          (game.id === 5 || game.id === 6)) ||
                        (type === "6/57" && game.id === 5)
                      )
                  )
                  .map((game) => (
                    <div
                      key={game.id}
                      className="flex flex-row h-28 w-28 rounded-lg"
                      onClick={() => selectGame(game.id)}
                      style={{
                        border:
                          selectedGame === game.id
                            ? "3px solid #3DB6BC"
                            : "1px solid #EEEFF3",
                        backgroundColor:
                          selectedGame === game.id ? "#F6FCFD" : "#FEFFFF",
                        fontWeight:
                          selectedGame === game.id ? "bold" : "normal",
                      }}
                    >
                      <p className="flex flex-col text-black font-Poppins w-full justify-center items-center p-2">
                        <img
                          alt="logo"
                          src={game.imageUrl}
                          loading="eager"
                          decoding="async"
                          className="h-10 w-16"
                        />
                        {/* {game.game} */}
                      </p>
                    </div>
                  ))}
              </div>
            ) : type_picked === "Perm" ? (
              <div className="flex flex-col justify-center items-center w-full space-y-4 p-5">
                <div className="flex justify-center items-center space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="font-semibold text-teal-600 text-lg">
                    Select Number of Fields:
                  </label>
                  <div className="relative">
                    <select
                      value={numOfFields || ""}
                      onChange={(e) => setNumOfFields(Number(e.target.value))}
                      className="appearance-none bg-white border-2 border-teal-400 rounded-lg px-4 py-3 pr-8 text-black font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 min-w-40 shadow-sm hover:shadow-md"
                    >
                      <option value="" disabled>Select Fields</option>
                      {getNumberFieldOptions().map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Game Cards */}
                <div className="grid grid-cols-2 gap-2 space-x-1">
                  {perm
                    .filter(
                      (game) =>
                        !(
                          (type === "Anopa" || type === "Midday") &&
                          game.id === 4
                        ) ||
                        (type === "6/57" && game.id === 4)
                    )
                    .map((game) => (
                      <div
                        key={game.id}
                        className="flex flex-row h-28 w-28 rounded-lg"
                        onClick={() => selectGame(game.id)}
                        style={{
                          border:
                            selectedGame === game.id
                              ? "3px solid #3DB6BC"
                              : "1px solid #EEEFF3",
                          backgroundColor:
                            selectedGame === game.id ? "#F6FCFD" : "#FEFFFF",
                          fontWeight:
                            selectedGame === game.id ? "bold" : "normal",
                        }}
                      >
                        <p className="flex text-black font-Poppins justify-center items-center w-full">
                          <img
                            alt="logo"
                            src={game.imageUrl}
                            className="h-10 w-16"
                          />
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500 font-Poppins">
                  {type_picked === "Mega" ? (
                    <p className=" text-2xl font-medium px-4">
                      Kindly select 6 numbers between 1 & 57
                    </p>
                  ) : (
                    <p className=" text-2xl font-medium px-4">
                      Kindly select a number between 1 & 57
                    </p>
                  )}
                </p>
              </div>
            )}
          </div>
          <div className="bg-white border border-border-default  w-full  rounded-xl mt-5">
            <div className="px-6 py-4 border-b border-border-default">
              <p className="text-black">Selections</p>
            </div>

            <div className="block md:flex items-center px-4 py-4 w-full">
              <div className="flex flex-col flex-wrap w-full justify-center items-center">
                <div style={{ padding: 20 }}>
                  <LotteryNumberPicker
                    poolSize={57}
                    minPicks={
                      type_picked === "Mega"
                        ? 6
                        : type_picked === "Perm"
                        ? Number(selectedGame) + 1 === 2
                          ? 3
                          : Number(selectedGame) + 1 === 3
                          ? 4
                          : Number(selectedGame) + 1 === 4
                          ? 5
                          : Number(selectedGame) + 1 === 6
                          ? 7
                          : selectedGame
                        : selectedGame
                    }
                    picksCount={
                      type_picked === "Mega"
                        ? 6
                        : type_picked === "Perm"
                        ? Number(selectedGame) + 1 === 2
                          ? 15
                          : Number(selectedGame) + 1 === 3
                          ? 10
                          : Number(selectedGame) + 1 === 4
                          ? 8
                          : Number(selectedGame) + 1 === 6
                          ? 8
                          : selectedGame
                        : selectedGame
                    }
                    sorted={true}
                    onChange={handleChange}
                    disabled={[]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Start of bet area*/}

        <div className="flex  w-full justify-center items-center ">
          <div className="block flex-col space-y-4 md:flex w-screen h-auto items-center bg-white border border-border-default rounded-xl p-6 mx-4 md:mx-12 lg:mx-48 my-6">
            <p className="font-normal font-semibold text-base font-Poppins text-black">
              Bet Amounts
            </p>
            <div className="flex justify-start items-start items-center flex-col flex-wrap  w-full  space-y-2">
              <p className="flex flex-row font-bold text-sm space-x-2">
                <button
                  onClick={decrement}
                  className="flex justify-center items-center px-6 py-2 border border-border-default bg-bg-tertiary hover:bg-red-700 text-black h-auto w-10 rounded-xl  text-sm"
                >
                  -
                </button>
                <button
                  value={betAmount}
                  onChange={handleAmountChange}
                  className="flex justify-center items-center px-10 py-4 border border-border-default bg-bg-tertiary hover:bg-red-700 h-auto rounded-xl"
                >
                  <div className="flex flex-row items-end space-x-1">
                    <span className="text-3xl font-semibold text-black">
                      {betAmount}
                    </span>
                    <span className="text-sm font-normal text-gray-500 pb-2">
                      GHS
                    </span>
                  </div>
                </button>
                <button
                  onClick={increment}
                  className="flex justify-center items-center px-6 py-2 border border-border-default bg-bg-tertiary hover:bg-red-700 text-black h-auto w-10 rounded-xl font-normal text-sm"
                >
                  +
                </button>
              </p>
            </div>
            <div className="flex flex-col items-center w-full space-y-4">
              {/* <div className="flex flex-col justify-center items-start flex-1 space-y-4">
                <p className="font-normal h-auto w-auto text-base text-black">
                  Total Amount
                </p>
                <div className="flex items-center font-bold h-auto w-auto text-2xl text-black space-x-3">
                  <span className="text-teal-600 font-medium">GHS</span>
                  <Input
                    onChange={handleAmountChange}
                    value={betAmount}
                    type="number"
                    inputMode="numeric"
                    size=""
                    className="w-24 font-bold text-xl text-black border-medium border-solid"
                    placeholder="0"
                  />
                </div>
              </div> */}
              <Button
                color="primary"
                onPress={placeBet}
                isDisabled={!betAmount || !inputValue || error !== ""}
                size="lg"
                className="px-10 py-4 h-14 text-lg font-semibold rounded-lg"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
        {/*End of bet area*/}
      </div>
    </>
  );
};

export default SingleGame;
