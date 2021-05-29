import { useState, useEffect } from "react";

const useGetData = async (url) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    try {
      const res = await fetch(url);
      const resJson = await res.json();
      setResult(json);
      console.log("fetch get: ", result);
      return result;
    } catch (error) {
      if (error) {
        console.log("error is here: ", error);
      }
    }
  });

  return result;
};
