import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/myBetSearchbar";
import { OrbitProgress } from "react-loading-indicators";

const Mybet = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    try {
      var token = null;
      if (!user) {
        token = user.token;
      }
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
      setError("Oops, nothing to display here. Kindly log-in");
    }
  }, [user]);

  console.log("user => ", user);
  console.log("error => ", error);

  return (
    <>
      <div className="flex flex-col bg-[#F7F7F7] h-screen w-screen">
        <div className="">
          <SearchBar />
        </div>
        <div className="flex flex-col w-full mt-5">
          {results.map((result, index) => (
            <div className="bg-white rounded-lg h-auto m-5 p-3">
              <div className="flex flex-row w-auto">
                <span>
                  <img alt="afriluck" src="afriluck_lg.png" />
                </span>
                <span className="flex flex-col items-start text-black mb-2 font-sans text-wrap w-full ml-5">
                  <div className="font-semibold text-sm">
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
        <div className="flex justify-center items-center h-screen">
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
        {error && <p className="h-full text-wrap p-5 text-center">{error}</p>}
      </div>
    </>
  );
};

export default Mybet;
