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
  const [isVisibleEvening, setIsVisibleEvening] = useState(true);

  function isBetweenSaturdayAndSunday() {
    const now = new Date();
    const day = now.getDay();
    const start = new Date(now);
    start.setDate(now.getDate() - ((day === 0) ? 1 : (day < 6 ? day + 1 : 0)));
    start.setHours(19, 45, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    return now >= start && now <= end;
  }

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      const currentTimeInMinutes = currentHours * 60 + currentMinutes;
      const hideStart = 10 * 60;
      const hideEnd = 19 * 60 + 45;
      const hideStartMid = 13 * 60;
      const hideEndMid = 19 * 60 + 45;
      const hideStartEvening = 19 * 60;
      const hideEndMidEvening = 19 * 60 + 45;

      if (isBetweenSaturdayAndSunday()) {
          setIsVisibleAnopa(false);
          setIsVisibleMidday(false);
      }

      if (
        (currentTimeInMinutes >= hideStart &&
          currentTimeInMinutes <= hideEnd)
      ) {
        setIsVisibleAnopa(false);
      } else {
        setIsVisibleAnopa(true);
      }

      if (
        (currentTimeInMinutes >= hideStartMid &&
          currentTimeInMinutes <= hideEndMid)
      ) {
        setIsVisibleMidday(false);
      } else {
        setIsVisibleMidday(true);
      }

      if (
        currentTimeInMinutes >= hideStartEvening &&
        currentTimeInMinutes <= hideEndMidEvening
      ) {
        setIsVisibleEvening(false);
      } else {
        setIsVisibleEvening(true);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredSubGames = subGames.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSubGames1 = subGames1.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="bg-white rounded-xl p-5 h-auto flex-1 overflow-auto m-5 pb-20">
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
            <p className="text-rose-500">
              {isBetweenSaturdayAndSunday()? "Game closed till Sunday 7:45 PM": "Game closed till 7:45 PM"}
            </p>
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
            <p className="text-rose-500">
              {isBetweenSaturdayAndSunday()? "Game closed till Sunday 7:45 PM": "Game closed till 7:45 PM"}
            </p>
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
          {isVisibleEvening === true ? (
            filteredSubGames.map((game) => (
              <Game
                image={game.imageUrl}
                title={subtitle}
                subtitle={game.name}
                type={"6/57"}
              />
            ))
          ) : (
            <p className="text-rose-500">Game closed till 7:45 PM</p>
          )}
        </div>
      </div>
    </>
  );
};
