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

  const [show, setShow] = useState(false);
 
  useEffect(() => {
    setTimeout(() => {
        setShow(true);
    }, 1000)
  },[show])

  const filteredSubGames = subGames.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSubGames1 = subGames1.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="bg-white rounded-xl p-5 h-auto overflow-y-auto m-5 mb-10">
        <div className="grid grid-cols-2 gap-2">
          <div className="global-text-color font-semibold text-md w-full">
            <p className="flex w-full text-primary">Anopa</p>
          </div>
          <div className="text-right text-gray-800 font-inter font-semibold">
            <p></p>
          </div>
        </div>
        <div className={`flex flex-wrap flex-row justify-center items-center flex-grow ${show ? "visible" : ""}`}>
          {filteredSubGames1.map((game, index) => (
            <Game
              key={index}
              image={game.imageUrl}
              title={subtitle}
              subtitle={game.name}
              type={"Anopa"}
            />
          ))}
        </div>
        <hr className="m-5" />
        <div className="grid grid-cols-2 gap-2">
          <div className="global-text-color font-semibold text-md">
            <p className="text-primary">Midday</p>
          </div>
          <div className="text-right text-gray-800 font-inter font-semibold">
            <p></p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          {filteredSubGames1.map((game, index) => (
            <Game
              key={index}
              image={game.imageUrl}
              title={subtitle}
              subtitle={game.name}
              type={"Midday"}
            />
          ))}
        </div>
        <hr className="m-5" />
        <div className="flex flex-col">
          <div
            style={{ color: "#156064" }}
            className="global-text-color font-semibold text-md"
          >
            <p className="text-primary">Afriluck 6/57</p>
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
