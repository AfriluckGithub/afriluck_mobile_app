import React, { useState } from "react";
import SearchBar from "../components/searchbar";
import Banner from "../components/banner";
import Content from "../components/content";

const Home = () => {
  const [query, setQuery] = useState("");

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
      <div className="mt-24 mx-4 md:mx-12 xl:mx-48">
        <Banner image={"banner.svg"} />
      </div>
      <div className="mx-4 md:mx-12 xl:mx-48">
        <Content
          query={query}
          subGames={subGames}
          subGames1={subGames1}
          image={"game.png"}
          title={"Morning Draw"}
          subtitle={"Super Monday"}
        />
      </div>
    </div>
  );
};

export default Home;
