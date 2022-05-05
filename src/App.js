import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect } from "react";

function App() {
  const key =
    "6021b8d3aee085781766709cc7c80efe2e956eca572e1d8b807a3e2338fdd0dc/stage";

  useEffect(() => {
    alanBtn({
      key,
      onCommand: ({ command }) => {
        if (command === "testCommand") {
          alert("code");
        }
      },
    });
  }, []);

  return <></>;
}

export default App;
