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

const SingleGameSelection = () => {
  //const [show, setShow] = useState(false);
  //const nodeRef = useRef(null);
  //const [betAmount, setBetAmount] = useState(0);
  const [selectedGame, setSelectedGame] = useState([]);

  // const games = [
  //   { id: 1, game: "Direct 1" },
  //   { id: 2, game: "Direct 2" },
  //   { id: 3, game: "Direct 3" },
  //   { id: 4, game: "Direct 4" },
  //   { id: 5, game: "Direct 5" },
  // ];

  const numbers = localStorage.getItem('numbers');
  const amount = localStorage.getItem('betAmount');
  const game = localStorage.getItem('game_picked');

  console.log(selectedGame);
  console.log(setSelectedGame);
  
  
  // const selectGame = (id) => {
  //   setSelectedGame(id);
  // };

  //const increment = () => setBetAmount(betAmount + 1);
  //const decrement = () => setBetAmount(betAmount > 0 ? betAmount - 1 : 0);

  const navigate = useNavigate();

  const back = () => {
    navigate("/single_game");
  };

  const handlePaymentScreen = () => {
    navigate("/single_game_payment");
  };

  return (
    // <>
    //     <div className="flex flex-col bg-gray-100 w-full h-screen p-5">
    //         <div className="bg-gray-100 h-16 w-full p-5 rounded-lg">
    //             <div className="flex flex-row gap-10 items-center">
    //                 <div onClick={back} className=""><FontAwesomeIcon icon={faChevronLeft} /></div>
    //                 <div className="font-normal text-md font-Poppins">Direct 1</div>
    //             </div>
    //         </div>
    //         <div className="flex bg-white h-18 w-full p-5 rounded-lg">
    //             <span className='font-semibold text-md mb-2 font-Poppins'>Previous Draw Results</span>
    //             <span className='font-normal text-md font-Poppins ml-auto'><FontAwesomeIcon onClick={() => setShow(!show)} icon={faChevronDown} /></span>
    //         </div>

    //         {show ?
    //             <div className='flex bg-white h-auto w-full p-5'>
    //                 <div className='flex flex-row bg-gray-100 w-full h-auto p-5 rounded-lg'>
    //                     <div className='flex flex-col w-auto'>
    //                         <p className='font-Poppins font-semibold text-sm'>Draw 147</p>
    //                         <p className='font-Poppins font-normal text-sm'>22/10/2024</p>
    //                     </div>
    //                     <div className='flex w-full h-full justify-center items-center'>
    //                         <p className='font-semibold text-sm ml-auto'>46 70 76 24 84 30</p>
    //                     </div>
    //                 </div>
    //             </div> :
    //             <div></div>}

    //         <div className="bg-white h-28 w-full p-5 mt-5 rounded-lg">
    //             <div className="flex flex-row">
    //                 <span className='font-normal text-gray-400 text-sm'>
    //                     <p className='font-Poppins'>
    //                         Please pick at least 1 number from 01 to 57 OR pick random combinations by pressing the Autofill button
    //                     </p>
    //                 </span>
    //             </div>
    //         </div>
    //     </div>
    //     <footer className="flex flex-col h-auto m-5 absolute bottom-auto left-0 right-0">
    //         <div className='flex flex-row gap-10 w-full bg-white rounded-lg p-5 '>
    //             <div className='flex flex-col flex-grow'>
    //                 <p className='font-normal text-sm font-Poppins text-gray-400'>Bet Amount</p>
    //                 <p className='flex flex-row font-bold text-xl'>
    //                     <button onClick={decrement} className='bg-gray-300 hover:bg-red-700 text-black h-10 w-10 rounded-xl font-normal mr-1 text-sm'>-</button>
    //                     <button className='bg-gray-300 hover:bg-red-700 text-black h-10 w-10 rounded-xl font-bold mr-1 text-xl'>{betAmount}</button>
    //                     <button onClick={increment} className='bg-gray-300 hover:bg-red-700 text-black h-10 w-10 rounded-xl font-normal text-sm'>+</button>
    //                 </p>
    //             </div>
    //             <div className='flex flex-col justify-center'>
    //                 <p className='font-normal text-sm text-gray-400'>Total Amount</p>
    //                 <p className='font-bold text-md text-xl'>GHS {`${betAmount}.00`}</p>
    //             </div>
    //         </div>
    //         <div className='flex flex-row w-auto mt-10'>
    //             <button onClick={handlePaymentScreen} className='bg-gray-200 text-gray-600 font-bold rounded-lg w-full h-16'>Confirm</button>
    //         </div>
    //     </footer>
    // </>
    <>
      <div className="flex flex-col bg-gray-100 w-full h-screen p-5">
        <div className="bg-gray-100 h-16 w-full p-5 rounded-lg">
          <div className="flex flex-row gap-10 items-center">
            <div onClick={back} className="">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className="text-md font-Poppins font-normal text-xl">
              Monday Special
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
        <div className="bg-white h-auto w-full p-5 rounded-lg mb-10 mt-10">
          <p className="text-black font-normal mb-5">Selections</p>
          <div className="flex flex-col w-full">
            <div style={{ backgroundColor: '#F6FCFD'}} className="flex flex-row w-full h-16 rounded-md p-5 items-center">
                <p style={{backgroundColor: '#3DB6BC'}} className="text-white font-normal rounded-lg w-12 h-auto p-2 justify-center items-center mr-5">01</p>
                <div className="flex flex-col w-full">
                     <p className="w-full font-normal text-xl">{numbers}</p>
                     <p className="text-gray-400">{`${game} | GHS ${amount}.00`}</p>
                </div>
                {/* <p className="flex rounded-full w-9 h-7 bg-gray-400 justify-center items-center"><FontAwesomeIcon icon={faX}  color="white"/></p> */}
            </div>
            <div style={{ backgroundColor: '#FFEFEF'}} className="flex w-auto h-16 mt-5 rounded-md justify-center items-center">
                <FontAwesomeIcon icon={faTrash}  color="red"/> <p className="ml-2 text-red font-semibold">Clear All</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex items-center bg-white h-28 p-5 m-5 rounded-lg absolute bottom-0 left-0 right-0">
        <div className="flex flex-row gap-10 w-full bg-white rounded-lg p-5">
        <button
        style={{backgroundColor: '#156064'}}
          onClick={handlePaymentScreen}
          className="text-white font-bold rounded-lg w-full h-16"
        >
          Place Bet
        </button>
        </div>
      </footer>
    </>
  );
};

export default SingleGameSelection;
