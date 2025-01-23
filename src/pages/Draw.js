import React, { useEffect, useState } from "react";
import axios from "axios";
import MyBetSearchBar from "../components/myBetSearchbar";
import { useSelector } from "react-redux";
import { OrbitProgress } from "react-loading-indicators";

const Draw = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    try {
      var token = null;
      if (user) {
        token = user.token;
      }
      console.log(token);
      const getMyResults = async () => {
        setLoading(true);
        const res = await axios.get(
          "https://staging.afriluck.com/api/V1/app/draw-results",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        if (res.status === 200) {
          setResults(res.data.success);
        }
      };

      getMyResults();
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("Oops, nothing to display here. Kindly log-in");
    }
  }, [user]);
  return (
    <>
      <div className="flex flex-col bg-[#F7F7F7] h-screen w-screen">
        <div className="">
          <MyBetSearchBar />
        </div>
        <div className="flex flex-col w-full mt-5">
          {results.map((result, index) => (
            <div className="bg-white rounded-lg h-auto m-5 p-3">
              <div className="flex flex-row w-auto">
                <span className="flex flex-col items-start text-black mb-2 text-wrap w-full ml-5">
                  <div className="flex justify-between w-full">
                    <div className="font-normal">{result.date}</div>
                    <div className="">10:00 AM</div>
                  </div>
                  <div className="mt-2 text-primary text-lg font-semibold leading-loose">{result.result}</div>
                </span>
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

export default Draw;
