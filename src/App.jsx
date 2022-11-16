import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";
const axios = require("axios").default;

function App() {
  const { useAlan, translate, setTranslate } = useGlobalContext();
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
      <h1>Translator</h1>
      <h2>Try saying "translate" then your sentence</h2>
      <section className="translator">
        <div>
          <div>
            <p>From ({from}): </p>
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
            <textarea
              type="text"
              value={translate}
              onChange={(e) => {
                setTranslate(e.target.value);
              }}
              placeholder="Say 'translate' *your sentence*"
            />
          </div>
          <div>
            <p>To ({to}): </p>
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
            <textarea type="text" defaultValue={translateValue} />
          </div>
        </div>
        <button onClick={translateInput}>Translate</button>
      </section>
    </>
  );
}

export default App;
