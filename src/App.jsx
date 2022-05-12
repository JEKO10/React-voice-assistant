import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";
const axios = require("axios").default;

function App() {
  const { useAlan, translate } = useGlobalContext();

  const [lang, setLang] = useState([]);
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

  const translateInput = () => {
    const params = new URLSearchParams();
    params.append("q", translate);
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
        From ({from}):{" "}
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
        <input type="text" defaultValue={translate} />
      </div>
      <div>
        To ({to}):{" "}
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
      <button onClick={translateInput}>Translate</button>
    </>
  );
}

export default App;
