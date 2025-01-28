import "../output.css";
import "../App.css";
import Game from "../components/game";
import { QueryClientProvider, QueryClient } from "react-query";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export default function Content({ subGames, subGames1, query }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Body subGames={subGames} subGames1={subGames1} query={query} />
    </QueryClientProvider>
  );
}

const Body = ({ title, image, subtitle, subGames, subGames1, query }) => {
  const [isVisibleAnopa, setIsVisibleAnopa] = useState(true);
  const [isVisibleMidday, setIsVisibleMidday] = useState(true);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      // Convert time to minutes for easier comparison
      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      const hideStart = 10 * 60; // 10:00 AM in minutes
      const hideEnd = 19 * 60 + 45; // 7:45 PM in minutes
      const hideStartMid = 13 * 60; // 1:00 PM in minutes
      const hideEndMid = 19 * 60 + 45; // 7:45 PM in minutes

      // Set visibility based on the time
      if (
        currentTimeInMinutes >= hideStart &&
        currentTimeInMinutes <= hideEnd
      ) {
        setIsVisibleAnopa(false); // Hide component
      } else {
        setIsVisibleAnopa(true); // Show component
      }

      if (
        currentTimeInMinutes >= hideStartMid &&
        currentTimeInMinutes <= hideEndMid
      ) {
        setIsVisibleMidday(false); // Hide component
      } else {
        setIsVisibleMidday(true); // Show component
      }
    };

    checkTime(); // Check immediately on mount
    const interval = setInterval(checkTime, 60 * 1000); // Re-check every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const filteredSubGames = subGames.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSubGames1 = subGames1.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="bg-white rounded-xl p-5 h-auto overflow-y-auto m-5 mb-10">
        <div className="w-full">
          <div className="flex justify-between items-center global-text-color text-md w-full">
            <p className="flex text-primary font-semibold">Anopa</p>
            <p className="flex text-black">10:00 AM</p>
          </div>
          <div className="text-right text-gray-800 font-inter font-semibold">
            <p></p>
          </div>
        </div>
        <div
          className={`flex flex-wrap flex-row justify-center items-center flex-grow`}
        >
          {isVisibleAnopa === true ? (
            filteredSubGames1.map((game, index) => (
              <Game
                key={index}
                image={game.imageUrl}
                title={subtitle}
                subtitle={game.name}
                type={"Anopa"}
              />
            ))
          ) : (
            <p className="text-rose-500">Game closed till 7:45 PM</p>
          )}
        </div>
        <hr className="m-5" />
        <div className="w-full">
          <div className="flex justify-between global-text-color text-md">
            <p className="text-primary font-semibold">Midday</p>
            <p className="text-black">1:30 PM</p>
          </div>
          <div className="text-right text-gray-800 font-inter font-semibold">
            <p></p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          {isVisibleMidday === true ? (
            filteredSubGames1.map((game, index) => (
              <Game
                key={index}
                image={game.imageUrl}
                title={subtitle}
                subtitle={game.name}
                type={"Midday"}
              />
            ))
          ) : (
            <p className="text-rose-500">Game closed till 7:45 PM</p>
          )}
        </div>
        <hr className="m-5" />
        <div className="flex flex-col">
          <div
            style={{ color: "#156064" }}
            className="flex justify-between global-text-color text-md"
          >
            <p className="text-primary font-semibold">Afriluck 6/57</p>
            <p className="text-black">7:00 PM</p>
          </div>
          <div className="text-right text-gray-800 font-inter font-semibold">
            <p></p>
          </div>
        </div>
        <div className="flex flex-wrap flex-row justify-center items-center">
          {filteredSubGames.map((game) => (
            <Game
              image={game.imageUrl}
              title={subtitle}
              subtitle={game.name}
              type={"6/57"}
            />
          ))}
        </div>
      </div>
    </>
  );
};
