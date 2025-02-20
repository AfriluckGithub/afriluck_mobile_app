import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
//import SearchBar from "../components/myBetSearchbar";
import { OrbitProgress } from "react-loading-indicators";
import { useSelector } from "react-redux";

const Mybet = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //const user = useSelector((state) => state.user.user);
  const user = useSelector((state) => state.user?.user);

  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);

  useEffect(() => {
    try {
      var token = null;
      if (memoizedUser) {
        token = memoizedUser.token;
      }
      const getMyBets = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            "https://staging.afriluck.com/api/V1/app/my-bets",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setLoading(false);
          console.log(res);

          if (res.status === 200) {
            setResults(res.data.success);
          }
        } catch (e) {
          setError("Oops, nothing to display here. Kindly log-in");
          setLoading(false);
          console.log(e);
        }
      };
      getMyBets();
    } catch (error) {
      try {
        setLoading(false);
        console.log(error);
        setError("Oops, nothing to display here. Kindly log-in");
      } catch (error) {
        console.log(error);
      }
    }
  }, [memoizedUser]);

  return (
    <>
      <div className="flex flex-col bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48">
        {/* <div className="">
          <SearchBar />
        </div> */}
        {(error || results.length===0) && <p className="h-full text-wrap p-5 text-center text-black">{error}</p>}
        <div className="flex flex-col w-full my-32 ">
          {results.map((result) => (
            <div className="bg-white rounded-xl h-auto w-full p-6 my-6 border border-border-default ">
              <div className="flex flex-row w-auto space-x-4 pb-4">
                <span>
                  <img alt="afriluck" src="afriluck_lg.png" />
                </span>
                <div className="flex flex-col items-start font-semibold text-gray-600 space-y-1 font-sans text-wrap w-full ">
                  <div className="flex flex-row text-base">
                    <div className="mr-2 font-medium font-Poppins">
                      {result.draw_code},
                    </div>
                    <div className="font-Poppins">{result.date}</div>
                  </div>
                  <div className="text-gray-400 font-Poppins ">
                    {result.selected_numbers}
                  </div>
                </div>
              </div>
              <hr />
              <div className="mt-2">
                <div class="flex justify-between w-full">
                  <div className="flex flex-row">
                    <div className="mr-2">
                      <img alt="share" src={"share.svg"} />{" "}
                    </div>
                    <div> Share</div>
                  </div>
                  <span>{result.time}</span>
                </div>
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
      </div>
    </>
  );
};

export default Mybet;
