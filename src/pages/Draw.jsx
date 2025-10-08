import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
//import { useSelector } from "react-redux";
import { OrbitProgress } from "react-loading-indicators";
import { useSelector } from "react-redux";

const Draw = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user?.user);

  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  useEffect(() => {
    const fetchDrawResults = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://app-api.afriluck.com/api/V1/app/draw-results",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${memoizedUser?.token}`
            },
          }
        );

        if (res.status === 200) {
          setLoading(false);
          setError("");
          setResults(res.data.success);
        }
      } catch (e) {
        setLoading(false);
        setError("Oops, nothing to display here. Kindly log-in");
      } finally {
        setLoading(false);
      }
    };

    fetchDrawResults();
  }, [memoizedUser?.token]);

  const groupedResults = useMemo(() => {
    return results.reduce((acc, result) => {
      const date = new Date(result.date).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(result);
      return acc;
    }, {});
  }, [results]);

  return (
    <div className="flex flex-col bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48">
      {error && (
        <p className="h-full text-wrap p-5 text-center text-black">{error}</p>
      )}
      <div className="flex flex-col w-full my-32">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <OrbitProgress color="#000" size="small" text="Loading" />
          </div>
        ) : (
          Object.entries(groupedResults).map(([day, draws]) => (
            <div key={day} className="mb-6">
              <h2 className="font-Poppins text-lg font-normal text-white px-6 py-2 bg-[#156064] rounded-md">
                {day}
              </h2>
              {draws.map((result, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl h-auto w-full p-6 my-3 border border-border-default"
                >
                  <div className="flex flex-row w-auto space-x-4 pb-4">
                    <span>
                      <img alt="afriluck" src="afriluck_lg.png" />
                    </span>
                    <span className="flex flex-col items-start font-semibold text-gray-600 space-y-1 font-sans text-wrap w-full">
                      <div className="flex flex-row text-base">
                        <div className="mr-2 font-medium font-Poppins">
                          {result.draw},
                        </div>
                        <div className="font-Poppins font-normal">
                          {result.draw_time}
                        </div>
                      </div>
                      <div className="text-gray-400 font-normal font-Poppins text-lg">
                        {result.result}
                      </div>
                    </span>
                  </div>
                  {/* <hr />
                  <div className="mt-4 flex justify-start w-full">
                    <span>{result.date}</span>
                  </div> */}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Draw;
