import { useNavigate } from "react-router-dom";

const Game = ({ title, image, subtitle, type }) => {
  const navigate = useNavigate();

  const handleCurrentGame = (e) => {
    localStorage.setItem("game_picked", subtitle);
    localStorage.setItem("game_type", type);
    console.log(type);
    //localStorage.setItem("", "");
    navigate("/single_game");
  };

  return (
    <div
      onClick={handleCurrentGame}
      className="flex flex-col cursor-pointer  bg-white border-border-default border rounded-xl  w-full h-48 justify-center items-center hover:bg-green-100 focus:bg-green-100"
    >
      <div className="w-full h-[70%] ">
        <img
          alt="logo"
          className="w-full h-full object-fill  rounded-t-xl"
          src={image}
        />
      </div>
      <div className="flex w-full justify-between items-center  h-[30%] px-6  ">
        <p className="text-center text-sm font-semibold text-black">
          {subtitle}
        </p>
        <button
          type="button"
          className="  py-2 px-2 bg-[#156064] font-medium text-sm text-white rounded-lg hover:bg-[#156064]"
          onClick={handleCurrentGame}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default Game;
