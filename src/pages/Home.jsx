import React, { useState, Suspense, lazy, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { update } from "../store/userSlice";

const Banner = lazy(() => import("../components/banner"));
const Content = lazy(() => import("../components/content"));

const Home = () => {
  const [
    query,
    //setQuery
  ] = useState("");
  const location = useLocation();
  const { checkBalance } = location.state || {};
  const user = useSelector((state) => state.user?.user);
  const memoizedUser = useMemo(() => {
    return user ? { ...user } : null;
  }, [user]);
  const dispatch = useDispatch();

  console.log("User => ", memoizedUser);

  useEffect(() => {
      const getBalance = async () => {
        try {
          const response = await fetch(
            "https://app-api.afriluck.com/api/V1/app/account/balance",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${memoizedUser?.token}`,
              },
            }
          );
          const json = await response.json();
          if (response.status === 200) {
            console.log("Balance => ", json.balance);
            dispatch(update({ balance: json.balance }));
          } else if (response.status === 401) {
            console.log("Session expired, please login again");
          } else {
            console.log("Error fetching balance");
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      };
      getBalance();
  }, [checkBalance, dispatch, memoizedUser]);

  const subGames = [
    { id: 1, name: "Mega", imageUrl: "mega-logo.png" },
    { id: 2, name: "Direct", imageUrl: "direct-logo.png" },
    { id: 3, name: "Perm", imageUrl: "perm-logo.png" },
    { id: 4, name: "Banker", imageUrl: "banker-logo.png" },
  ];

  const subGames1 = [
    { id: 2, name: "Direct", imageUrl: "direct-logo.png" },
    { id: 3, name: "Perm", imageUrl: "perm-logo.png" },
    { id: 4, name: "Banker", imageUrl: "banker-logo.png" },
  ];

  return (
    <div className="min-h-screen flex flex-col mb-24">
      {/* <SearchBar query={query} setQuery={setQuery} /> */}
      <div className="flex items-center justify-center mt-28 mx-4 md:mx-12 xl:mx-48">
        <Suspense fallback={<div>Loading...</div>}>
          <Banner image={"banner-compressed.webp"} />
        </Suspense>
      </div>
      <div className="flex items-center justify-center mx-4 md:mx-12 xl:mx-48">
        <Suspense fallback={<div>Loading...</div>}>
          <Content
            query={query}
            subGames={subGames}
            subGames1={subGames1}
            image={"game.png"}
            title={"Morning Draw"}
            subtitle={"Super Monday"}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
