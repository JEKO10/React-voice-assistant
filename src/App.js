import { useState } from "react";
import useAlan from "./useAlan";

function App() {
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeather = async (location) => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=${location}&apiKey=b19cbd60c8e94a4d990a4ab78de5e958`
    );
    const data = await response.json();
    setWeatherData(data);
  };

  useAlan({ fetchWeather });

  return <></>;
}

export default App;
