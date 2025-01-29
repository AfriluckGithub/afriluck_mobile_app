import React, { useState } from "react";
import SearchBar from "../components/searchbar";
import Banner from "../components/banner";
import Content from "../components/content";

const Home = () => {
  const [query, setQuery] = useState("");

  const subGames = [
    { id: 1, name: "Mega", imageUrl: "" },
    { id: 2, name: "Direct", imageUrl: "" },
    { id: 3, name: "Perm", imageUrl: "" },
    { id: 4, name: "Banker", imageUrl: "" },
  ];

  const subGames1 = [
    { id: 2, name: "Direct", imageUrl: "" },
    { id: 3, name: "Perm", imageUrl: "" },
    { id: 4, name: "Banker", imageUrl: "" },
  ];

  return (
    <div className="h-[150vh]">
      <SearchBar query={query} setQuery={setQuery} />
      <Banner image={"banner.png"} />
      <Content
        query={query}
        subGames={subGames}
        subGames1={subGames1}
        image={"game.png"}
        title={"Morning Draw"}
        subtitle={"Super Monday"}
      />
    </div>
  );
};

export default Home;
