import React, { useContext, useState, useEffect, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [translate, setTranslate] = useState("");

  const useAlan = () => {
    const key =
      "6021b8d3aee085781766709cc7c80efe2e956eca572e1d8b807a3e2338fdd0dc/stage";

    const alanBtnInstance = useRef(null);

    useEffect(() => {
      if (!alanBtnInstance.current) {
        alanBtnInstance.current = alanBtn({
          key,
          onCommand: async (data) => {
            if (data.voice) setTranslate(data.voice);
          },
        });
      }
    }, [translate]);
  };

  return (
    <AppContext.Provider value={{ useAlan, translate, setTranslate }}>
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
