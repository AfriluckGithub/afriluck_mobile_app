import React from "react";
import axios from "axios";

const Draw = () => {
  const url =
    "https://www.afriluck.com/_next/data/U6kswRUTB64ijWwaLQ6Ri/index.json";
  axios
    .get(url)
    .then((response) => {
      console.log("Data retrieved successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error.message);
    });
  return <></>;
};

export default Draw;
