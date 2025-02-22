import "../output.css";
import "../App.css";
import Game from "../components/game";
import { QueryClientProvider, QueryClient } from "react-query";
import { useEffect, useState } from "react";
import { BsClock } from "react-icons/bs";

const queryClient = new QueryClient();

export default function Content({ subGames, subGames1, query }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Body subGames={subGames} subGames1={subGames1} query={query} />
    </QueryClientProvider>
  );
}

const Body = ({ subGames, subGames1, query }) => {
  const [drawTimes, 
    //setDrawTimes
  ] = useState({
    Anopa: new Date().setHours(10, 0, 0, 0),
    Midday: new Date().setHours(13, 30, 0, 0),
    Afriluck: new Date().setHours(19, 0, 0, 0),
  });

  const calculateTimeLeft = (drawTime) => {
    const now = new Date();
    const difference = drawTime - now;
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  function isBetweenGameTime(startHour, startMinute, endHour, endMinute) {
    const now = new Date();
    
    // Define start and end times
    const startTime = new Date();
    startTime.setHours(startHour, startMinute, 0, 0); // 7:45 PM

    const endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0); // 10:00 AM (next day)

    // If current time is after startTime or before endTime, return true
    return now >= startTime || now < endTime;
}

  const [timeLeft, setTimeLeft] = useState({
    Anopa: calculateTimeLeft(drawTimes.Anopa),
    Midday: calculateTimeLeft(drawTimes.Midday),
    Afriluck: calculateTimeLeft(drawTimes.Afriluck),
  });

  useEffect(() => {
    const timer = setInterval(() => {     
      setTimeLeft({
        Anopa: calculateTimeLeft(drawTimes.Anopa),
        Midday: calculateTimeLeft(drawTimes.Midday),
        Afriluck: calculateTimeLeft(drawTimes.Afriluck),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [drawTimes]);

  const isDrawStarted = {
    Anopa: isBetweenGameTime(19, 45, 10, 0),
    Midday: isBetweenGameTime(19, 45, 13, 30),
    Afriluck: isBetweenGameTime(19, 45, 19, 0),
  };

  let gameSections = [
    {
      name: "Anopa",
      timeLeft: timeLeft.Anopa,
      started: false,
      games: subGames1,
    },
    {
      name: "Midday",
      timeLeft: timeLeft.Midday,
      started: false,
      games: subGames1,
    },
    {
      name: "Afriluck 6/57",
      timeLeft: timeLeft.Afriluck,
      started: isDrawStarted.Afriluck,
      games: subGames,
    },
  ];
  
  gameSections.sort((a, b) => !a.started - !b.started);

  return (
    <div className="space-y-6 h-auto flex-1 overflow-auto pb-20">
      {gameSections.map((section, index) => (
        <div
          key={index}
          className="flex flex-col space-y-4 bg-bg-white rounded-xl border-border-default border"
        >
          <div className="w-full flex justify-between items-center text-md">
            <p className="text-base md:text-lg text-primary  font-semibold px-6">
              {section.name}
            </p>
            {!section.started ? (
              <div className="flex bg-tertiary text-xs md:text-base text-white px-6 py-3 rounded-tr-xl rounded-bl-xl">
                Game closed till 7:45pm
              </div>
            ) : (
              <div className="flex items-center space-x-2 bg-[#d0f8ff] text-xs md:text-base text-primary px-6 py-3 rounded-tr-xl rounded-bl-xl">
                <BsClock color="#156064" />
                <p className="text-sm font-medium">
                  {`${section.timeLeft.hours}h ${section.timeLeft.minutes}m ${section.timeLeft.seconds}s`}
                </p>
              </div>
            )}
          </div>
          <div className="w-full grid grid-cols-2 gap-4 space-y-0 md:gap-6 lg:flex lg:space-x-8 justify-between items-center px-6 py-4 border-t border-border-default">
            {section.games.map((game, idx) => (
              <Game
                key={idx}
                image={game.imageUrl}
                subtitle={game.name}
                type={section.name}
                disabled={!section.started}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
