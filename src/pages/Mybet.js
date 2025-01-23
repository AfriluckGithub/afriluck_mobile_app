import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/myBetSearchbar";
import { OrbitProgress } from "react-loading-indicators";

const Mybet = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    try {
      const token = user.token;
      const getMyBets = async () => {
        setLoading(true);
        const res = await axios.get(
          "https://staging.afriluck.com/api/V1/app/draw-results",
          {
            headers: {
              Authorization: `Beaer ${token}`,
            },
          }
        );
        setLoading(false);
        if (res.status === 200) {
          setResults(res.data.success);
        }
      };

      getMyBets();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col bg-gray-100 h-screen w-screen">
        <div className="">
          <SearchBar />
        </div>
        <div className="flex flex-col w-full mt-5">
          {results.map((result) => (
            <div className="bg-white rounded-lg h-auto m-5 p-3">
              <div className="flex flex-row w-auto">
                <span>
                  <img src="afriluck_lg.png" />
                </span>
                <span className="flex flex-col items-start text-black mb-2 font-sans text-wrap w-full ml-5">
                  <div className="font-Poppins font-semibold">
                    {result.date}
                  </div>
                  <div className="text-gray-400">{result.result}</div>
                </span>
              </div>
              <hr />
              <div className="flex flex-row w-full justify-end items-end mt-2">
                <p className="text-sm text-gray-400">10:00 AM</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center items-center h-screen">
        {loading ? (
          <OrbitProgress
            color="#000"
            size="small"
            text="loading"
            textColor=""
          />
        ) : (
          <p></p>
        )}
        </div>
        {!user && (
          <p className="flex flex-wrap justify-center items-center p-5 text-center">
            Oops, you need to log-in to view your transactions.
          </p>
        )}
      </div>
    </>
  );
};

export default Mybet;
