import React from "react";
import SearchBar from "../components/searchbar";
import Banner from "../components/banner";
import Content from "../components/content";

const Home = () => {
  return (
    <div>
      <SearchBar />
      <Banner image={"banner.png"} />
      <Content
        image={"game.png"}
        title={"Morning Draw"}
        subtitle={"Super Monday"}
      />
      {/* <Banner image={"banner1.png"} /> */}
      {/* <Content
        image={"afriluck_lg.png"}
        title={"Evening Draw"}
        subtitle={"Super Monday"}
      /> */}
    </div>
  );
};

export default Home;
