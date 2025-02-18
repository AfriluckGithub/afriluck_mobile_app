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

const Body = ({ title, image, subtitle, subGames, subGames1, query }) => {
  const [isVisibleAnopa, setIsVisibleAnopa] = useState(true);
  const [isVisibleMidday, setIsVisibleMidday] = useState(true);
  const [isVisibleEvening, setIsVisibleEvening] = useState(true);

  // Function to reset draw start times to the next day
  const resetDrawStartTimes = () => {
    const now = new Date();
    const resetTime = new Date();
    resetTime.setHours(19, 45, 0, 0); // 7:45 PM

    if (now > resetTime) {
      resetTime.setDate(resetTime.getDate() + 1); // Move to the next day
    }

    return resetTime;
  };

  // Draw start time for Anopa (10:00 AM), Midday (1:30 PM), and Evening (7:00 PM)
  const [anopaDrawStartTime, setAnopaDrawStartTime] = useState(() => {
    const resetTime = resetDrawStartTimes();
    resetTime.setHours(10, 0, 0, 0); // 10:00 AM
    return resetTime;
  });

  const [middayDrawStartTime, setMiddayDrawStartTime] = useState(() => {
    const resetTime = resetDrawStartTimes();
    resetTime.setHours(13, 30, 0, 0); // 1:30 PM
    return resetTime;
  });

  const [eveningDrawStartTime, setEveningDrawStartTime] = useState(() => {
    const resetTime = resetDrawStartTimes();
    resetTime.setHours(19, 0, 0, 0); // 7:00 PM
    return resetTime;
  });

  // Calculate time left for each draw
  const [anopaTimeLeft, setAnopaTimeLeft] = useState(
    calculateTimeLeft(anopaDrawStartTime)
  );
  const [middayTimeLeft, setMiddayTimeLeft] = useState(
    calculateTimeLeft(middayDrawStartTime)
  );
  const [eveningTimeLeft, setEveningTimeLeft] = useState(
    calculateTimeLeft(eveningDrawStartTime)
  );

  // Function to calculate time left
  function calculateTimeLeft(drawStartTime) {
    const now = new Date();
    const difference = drawStartTime - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  // Update countdown every second and reset draw times if necessary
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const resetTime = new Date();
      resetTime.setHours(19, 45, 0, 0); // 7:45 PM

      if (now > resetTime) {
        setAnopaDrawStartTime(() => {
          const newTime = new Date();
          newTime.setDate(newTime.getDate() + 1);
          newTime.setHours(10, 0, 0, 0); // 10:00 AM
          return newTime;
        });

        setMiddayDrawStartTime(() => {
          const newTime = new Date();
          newTime.setDate(newTime.getDate() + 1);
          newTime.setHours(13, 30, 0, 0); // 1:30 PM
          return newTime;
        });

        setEveningDrawStartTime(() => {
          const newTime = new Date();
          newTime.setDate(newTime.getDate() + 1);
          newTime.setHours(19, 0, 0, 0); // 7:00 PM
          return newTime;
        });
      }

      setAnopaTimeLeft(calculateTimeLeft(anopaDrawStartTime));
      setMiddayTimeLeft(calculateTimeLeft(middayDrawStartTime));
      setEveningTimeLeft(calculateTimeLeft(eveningDrawStartTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [anopaDrawStartTime, middayDrawStartTime, eveningDrawStartTime]);

  // Check if the draw has started
  const isAnopaDrawStarted = new Date() >= anopaDrawStartTime;
  const isMiddayDrawStarted = new Date() >= middayDrawStartTime;
  const isEveningDrawStarted = new Date() >= eveningDrawStartTime;

  // Check if the draw is within 1 hour of starting
  const isAnopaOneHourClose =
    !isAnopaDrawStarted &&
    anopaTimeLeft.hours === 0 &&
    anopaTimeLeft.minutes <= 60;
  const isMiddayOneHourClose =
    !isMiddayDrawStarted &&
    middayTimeLeft.hours === 0 &&
    middayTimeLeft.minutes <= 60;
  const isEveningOneHourClose =
    !isEveningDrawStarted &&
    eveningTimeLeft.hours === 0 &&
    eveningTimeLeft.minutes <= 60;

  // Filter games based on query
  const filteredSubGames = subGames.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredSubGames1 = subGames1.filter((game) =>
    game.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="space-y-6 h-auto flex-1 overflow-auto pb-20">
        {/* Anopa Section */}
        <div className="flex flex-col space-y-4 bg-bg-white rounded-xl border-border-default border">
          <div className="w-full">
            <div className="flex justify-between items-center text-md w-full">
              <p className="flex text-primary text-lg font-semibold px-6">
                Anopa
              </p>
              {isAnopaDrawStarted ? (
                <div className="flex bg-tertiary text-white px-6 py-3 rounded-tr-xl rounded-bl-xl">
                  Game closed till 7 :45 PM
                </div>
              ) : isAnopaOneHourClose ? (
                <div className="flex items-center space-x-2 bg-[#FFEDD0] text-black px-6 py-3 rounded-tr-xl rounded-bl-xl">
                  <BsClock color="#00000" />
                  <p className="flex text-sm font-medium">
                    {`${anopaTimeLeft.minutes}m ${anopaTimeLeft.seconds}s`}
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-2 bg-[#d0f8ff] text-primary px-6 py-3 rounded-tr-xl rounded-bl-xl">
                  <BsClock color="#156064" />
                  <p className="flex text-sm font-medium">
                    {` ${anopaDrawStartTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-between items-center gap-4 p-6 border-t border-border-default">
            {filteredSubGames1.map((game, index) => (
              <Game
                key={index}
                image={game.imageUrl}
                title={subtitle}
                subtitle={game.name}
                type={"Anopa"}
                disabled={isAnopaDrawStarted} // Disable button if draw has started
              />
            ))}
          </div>
        </div>

        {/* Midday Section */}
        <div className="flex flex-col space-y-4 bg-bg-white rounded-xl border-border-default border">
          <div className="w-full">
            <div className="flex justify-between items-center text-md w-full">
              <p className="flex text-primary text-lg font-semibold px-6">
                Midday
              </p>
              {isMiddayDrawStarted ? (
                <div className="flex bg-tertiary text-white px-6 py-3 rounded-tr-xl rounded-bl-xl">
                  Game closed till 7 :45 PM
                </div>
              ) : isMiddayOneHourClose ? (
                <div className="flex items-center space-x-2 bg-[#FFEDD0] text-black px-6 py-3 rounded-tr-xl rounded-bl-xl">
                  <BsClock color="#00000" />
                  <p className="flex text-sm font-medium">
                    {`${middayTimeLeft.minutes}m ${middayTimeLeft.seconds}s left`}
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-2 bg-[#d0f8ff] text-primary px-6 py-3 rounded-tr-xl rounded-bl-xl">
                  <BsClock color="#156064" />
                  <p className="flex text-sm font-medium">
                    {` ${middayDrawStartTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-between items-center gap-4 p-6 border-t border-border-default">
            {filteredSubGames1.map((game, index) => (
              <Game
                key={index}
                image={game.imageUrl}
                title={subtitle}
                subtitle={game.name}
                type={"Midday"}
                disabled={isMiddayDrawStarted} // Disable button if draw has started
              />
            ))}
          </div>
        </div>

        {/* Evening Section */}
        <div className="flex flex-col space-y-4 bg-bg-white rounded-xl border-border-default border">
          <div className="flex flex-col">
            <div
              style={{ color: "#156064" }}
              className="flex justify-between items-center text-md w-full"
            >
              <p className="flex text-primary text-lg font-semibold px-6">
                Afriluck 6/57
              </p>
              {isEveningDrawStarted ? (
                <div className="flex bg-tertiary text-white px-6 py-3 rounded-tr-xl rounded-bl-xl">
                  Game closed till 7 :45 PM
                </div>
              ) : isEveningOneHourClose ? (
                <div className="flex items-center space-x-2 bg-[#d0f8ff] text-primary px-6 py-3 rounded-tr-xl rounded-bl-xl">
                  <BsClock color="#156064" />
                  <p className="flex text-sm font-medium">
                    {`${eveningTimeLeft.minutes}m ${eveningTimeLeft.seconds}s`}
                  </p>
                </div>
              ) : (
                <div className="flex items-center space-x-2 bg-[#d0f8ff] text-primary px-6 py-3 rounded-tr-xl rounded-bl-xl">
                  <BsClock color="#156064" />
                  <p className="flex text-sm font-medium">
                    {` ${eveningDrawStartTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}
                  </p>
                </div>
              )}
            </div>
            <div className="text-right text-gray-800 font-inter font-semibold">
              <p></p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap justify-between items-center gap-4 p-6 border-t border-border-default">
            {filteredSubGames.map((game, index) => (
              <Game
                key={index}
                image={game.imageUrl}
                title={subtitle}
                subtitle={game.name}
                type={"6/57"}
                disabled={isEveningDrawStarted} // Disable button if draw has started
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
