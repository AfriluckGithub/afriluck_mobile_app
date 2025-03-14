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

  function calculateTimeLeft(drawTime) {
    const now = new Date();
    const dayOfWeek = now.getDay();
    let targetTime = new Date();

    // Determine if the next game starts the next day
    const isNextDay = now.getHours() > drawTime.startHour || 
                      (now.getHours() === drawTime.startHour && now.getMinutes() >= drawTime.startMinute);

    if (isNextDay) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    // Special case for Sunday (next start is Monday at 7:45 PM)
    if (dayOfWeek === 0 && now.getHours() >= 17 && now.getMinutes() >= 30) {
        // targetTime.setDate(targetTime.getDate() + 1);
        targetTime.setHours(drawTime.startHour, drawTime.startMinute, 0, 0);
        //targetTime.setHours(19, 45, 0, 0);
    } else {
        targetTime.setHours(drawTime.startHour, drawTime.startMinute, 0, 0);
    }

    const difference = targetTime - now;
    return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}


  function isGameActive(startHour, startMinute, endHour, endMinute) {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const dayOfWeek = now.getDay();

    if (dayOfWeek === 0) {
      endHour = 17;
      endMinute = 30;
    }
    if (
      currentHours > startHour ||
      (currentHours === startHour && currentMinutes >= startMinute) ||
      currentHours < endHour ||
      (currentHours === endHour && currentMinutes < endMinute)
    ) {
      return false;
    }

    return true;
  }

  const drawTimes = {
    Anopa: { startHour: 10, startMinute: 0, endHour: 19, endMinute: 0 },
    Midday: { startHour: 13, startMinute: 30, endHour: 19, endMinute: 0 },
    Afriluck: { startHour: 19, startMinute: 45, endHour: 19, endMinute: 0 },
  };

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
  }, [drawTimes.Afriluck, drawTimes.Anopa, drawTimes.Midday]);


  let gameSections = [
    {
      name: "Anopa",
      timeLeft: timeLeft.Anopa,
      started: isGameActive(19, 45, 10, 0),
      games: subGames1,
    },
    {
      name: "Midday",
      timeLeft: timeLeft.Midday,
      started: isGameActive(19, 45, 13, 30),
      games: subGames1,
    },
    {
      name: "Afriluck 6/57",
      timeLeft: timeLeft.Afriluck,
      started: isGameActive(19, 45, 19, 0),
      games: subGames,
    },
  ];

  gameSections.sort((a, b) => a.started - b.started);

  return (
    <div className="space-y-6 h-auto flex-1 overflow-auto pb-20">
      {gameSections.map((section, index) => (
        <div
          key={index}
          className="flex flex-col flex-wrap space-y-4 bg-bg-white rounded-xl border-border-default border"
        >
          <div className="w-full flex justify-between items-center text-md">
            <p className="text-base md:text-lg text-primary  font-semibold px-6">
              {section.name}
            </p>
            {section.started ? (
              <div className="flex bg-tertiary text-xs md:text-base text-white px-6 py-3 rounded-tr-xl rounded-bl-xl">
                Game closed till 7:45pm
              </div>
            ) : (
              <div className="flex items-center space-x-2 bg-[#d0f8ff] text-xs md:text-base text-primary px-6 py-3 rounded-tr-xl rounded-bl-xl lg:w-40 md:w-40 sm:w-40">
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
                disabled={section.started}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
