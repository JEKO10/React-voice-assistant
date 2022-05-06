import { useEffect, useRef, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

export default function useAlan({ fetchTranslate }) {
  const [translate, setTranslate] = useState("");

  const key =
    "6021b8d3aee085781766709cc7c80efe2e956eca572e1d8b807a3e2338fdd0dc/stage";

  const alanBtnInstance = useRef(null);

  useEffect(() => {
    if (!alanBtnInstance.current) {
      alanBtnInstance.current = alanBtn({
        key,
        onCommand: async (data) => {
          if (data.location) console.log(data.location);
          setTranslate(data.location);
        },
      });
    }

    console.log(translate);
  }, [translate]);

  return null;
}
