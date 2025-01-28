import "../output.css";
import "../App.css";
import Game from "../components/game";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function Content({ subGames, subGames1, query }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Body subGames={subGames} subGames1={subGames1} query={query} />
    </QueryClientProvider>
  );
}

const Body = ({ title, image, subtitle, subGames, subGames1, query }) => {

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
        <div className={`flex flex-wrap flex-row justify-center items-center flex-grow`}>
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
