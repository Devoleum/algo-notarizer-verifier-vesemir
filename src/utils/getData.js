import React from "react";

const getData = async (url) => {
  if (!url) return;
  console.log("fetching: ", url);
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export default getData;
