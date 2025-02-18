import { useNavigate } from "react-router-dom";

const Game = ({ title, image, subtitle, type, disabled }) => {
  const navigate = useNavigate();

  const handleCurrentGame = (e) => {
    if (!disabled) {
      localStorage.setItem("game_picked", subtitle);
      localStorage.setItem("game_type", type);
      console.log(type);
      navigate("/single_game");
    }
  };

  return (
    <div
      onClick={handleCurrentGame}
      className="flex flex-col cursor-pointer bg-white border-border-default border rounded-xl w-full h-24  md:h-32 xl:h-48 justify-center items-center "
    >
      <div className="w-full h-[60%]  md:h-[60%] xl:h-[70%]">
        <img
          alt="logo"
          className="w-full h-full object-fill rounded-t-xl"
          src={image}
        />
      </div>
      <div className="flex w-full justify-between items-center h-[40%] md:h-[40%] xl:h-[30%] px-2 md:px-6">
        <p className="text-center text-sm font-semibold text-black">
          {subtitle}
        </p>
        <button
          type="button"
          className={`py-1 px-1 md:py-2 md:px-2 font-medium text-xs md:text-sm text-white rounded-lg ${
            disabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#156064] hover:bg-[#156064]"
          }`}
          onClick={handleCurrentGame}
          disabled={disabled}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default Game;
