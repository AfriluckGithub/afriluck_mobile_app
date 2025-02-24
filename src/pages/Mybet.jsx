import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { useSelector } from "react-redux";

const Mybet = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user?.user);

  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  useEffect(() => {
    
    const getMyBets = async () => {
      setLoading(true);
      try {
        const token = memoizedUser?.token || null;
        const res = await axios.get(
          "https://app.afriluck.com/api/V1/app/my-bets",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);

        console.log(res.data);
        
        
        if (res.status === 200) {
          setResults(res.data.success);
        } else if (res.status === 401) {
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      }
    };
    
    if (memoizedUser) {
      getMyBets();
    }
  }, [memoizedUser]);

  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.date]) {
      acc[result.date] = [];
    }
    acc[result.date].push(result);
    return acc;
  }, {});

  

  return (
    <div className="flex flex-col bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48">
      {!memoizedUser && (
        <p className="flex justify-center items-center h-screen w-screen text-wrap text-center text-black">
          {"Please log in to see your ticket info"}
        </p>
      )}
      
      <div className="flex flex-col w-full my-32">
        {Object.keys(groupedResults).map((date) => (
          <div key={date}>
            <div className="font-Poppins text-lg font-normal text-white px-6 py-2 bg-[#156064] rounded-md">
            {date}
            </div>
            {groupedResults[date].map((result, index) => (
              <div key={index} className="bg-white rounded-xl h-auto w-full p-6 my-6 border border-border-default">
                <div className="flex flex-row w-auto space-x-4 pb-4">
                  <span>
                    <img alt="afriluck" src="afriluck_lg.png" />
                  </span>
                  <div className="flex flex-col items-start font-semibold text-gray-600 space-y-1 font-sans text-wrap w-full">
                    <div className="flex flex-row text-base">
                      <div className="mr-2 font-medium font-Poppins">
                        {result.draw_code},
                      </div>
                      <div className="font-Poppins">{result.date}</div>
                    </div>
                    <div className="text-gray-400 font-Poppins">
                      {result.selected_numbers}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="mt-2">
                  <div className="flex justify-between w-full">
                    <div className="flex flex-row">
                      <div className="mr-2">
                        <img alt="share" src={"share.svg"} />
                      </div>
                      <div>Share</div>
                    </div>
                    <span>{result.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {loading && (
          <div className="flex justify-center items-center h-screen">
            <OrbitProgress color="#000" size="small" text="loading" textColor="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Mybet;
