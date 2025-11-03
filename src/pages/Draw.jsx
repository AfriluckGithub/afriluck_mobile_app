import React, { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
//import { useSelector } from "react-redux";
import { OrbitProgress } from "react-loading-indicators";
import { useSelector } from "react-redux";
import { Button } from "@heroui/button";

const Draw = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user?.user);
  const containerRef = useRef(null);

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
              Authorization: `Bearer ${memoizedUser?.token}`,
            },
          }
        );

        if (res.status === 200) {
          setLoading(false);
          setError("");
          setResults(res.data.success);
        }
      } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 401) {
          setError("Oops, nothing to display here. Kindly log-in");
        } else {
          setError("Oops, nothing to display here. Kindly log-in");
        }
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

  function hasScrolled(e) {
    const scrollTop = e.target.scrollTop;
    if (scrollTop > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }

  useEffect(() => {
   
    let scrollableElement = containerRef.current?.parentElement;

    while (scrollableElement) {
      const hasOverflow = window.getComputedStyle(scrollableElement).overflowY;
      if (hasOverflow === "auto" || hasOverflow === "scroll") {
        break;
      }
      scrollableElement = scrollableElement.parentElement;
    }

    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", hasScrolled);

      return () => {
        scrollableElement.removeEventListener("scroll", hasScrolled);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col bg-[#F7F7F7] mx-4 md:mx-12 lg:mx-48"
    >
      <Button
        className="to-top-btn bg-primary text-white"
        onClick={() => {
          let scrollableElement = containerRef.current?.parentElement;
          while (scrollableElement) {
            const hasOverflow =
              window.getComputedStyle(scrollableElement).overflowY;
            if (hasOverflow === "auto" || hasOverflow === "scroll") {
              scrollableElement.scrollTo({ top: 0, behavior: "smooth" });
              break;
            }
            scrollableElement = scrollableElement.parentElement;
          }
        }}
        style={{
          zIndex: 999,
          position: "absolute",
          right: 15,
          bottom: 100,
          transition: "all 0.5",
          display: showButton ? "flex" : "none",
        }}
      >
        <p>Back to Top</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          color="#ffffff"
          fill="none"
        >
          <path
            d="M12 5.5V19"
            stroke="#ffffff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11"
            stroke="#ffffff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </Button>
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
