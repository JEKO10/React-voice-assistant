import React, { useEffect, useState } from "react";
import useAlan from "./useAlan";
const axios = require("axios").default;

function App() {
  const [lang, setLang] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [translateValue, setTranslateValue] = useState("");
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");

  const fetchLanguages = async () => {
    axios
      .get("https://libretranslate.de/languages", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        setLang(res.data);
      });
  };

  const translate = () => {
    const params = new URLSearchParams();
    params.append("q", userInput);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    axios
      .post("https://libretranslate.de/translate", params, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data);
        setTranslateValue(res.data.translatedText);
      });
  };

  useAlan({ fetchLanguages });

  useEffect(() => {
    fetchLanguages();
  }, []);

  return (
    <>
      <div>
        From ({from}):
        <select
          onChange={(e) => {
            setFrom(e.target.value);
          }}
        >
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
          }}
        />
      </div>
      <div>
        To ({to}) :
        <select
          onChange={(e) => {
            setTo(e.target.value);
          }}
        >
          {lang.map((option) => {
            return (
              <option value={option.code} key={option.code}>
                {option.name}
              </option>
            );
          })}
        </select>
        <input type="text" defaultValue={translateValue} />
      </div>
      <button onClick={translate}>Translate</button>
    </>
  );
}

export default App;
