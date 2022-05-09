import React, { useEffect, useState } from "react";
import useAlan from "./useAlan";
const axios = require("axios").default;

function App() {
  const [lang, setLang] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [translateValue, setTranslateValue] = useState("");

  const fetchLanguages = async () => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        setLang(res.data);
      });
  };

  useAlan({ fetchLanguages });

  useEffect(() => {
    fetchLanguages();
  }, []);

  return (
    <>
      <div>
        From:
        <select>
          {lang.map((option) => {
            return (
              <option value={option.code} key={option.code}>
                {option.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          onChange={(e) => {
            setUserInput(e.target.value);
            console.log(userInput);
          }}
        />
      </div>
      <div>
        To:
        <select>
          {lang.map((option) => {
            return (
              <option value={option.code} key={option.code}>
                {option.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          onChange={(e) => {
            setTranslateValue(e.target.value);
            console.log(translateValue);
          }}
        />
      </div>
    </>
  );
}

export default App;
