import { useContext, useState } from "react";
import { AppContext, AppContextSettingsType } from "./AppContextProvider";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  const [state, setState] = useState<AppContextSettingsType>(context);

  const setMasterVolume = (newValue: number) => {
    if (newValue < 0 || newValue > 100) {
      throw new Error("Invalid new volume");
    }
    setState((prevState) => ({
      ...prevState,
      volume: { ...prevState.volume, master: newValue },
    }));
  };

  return { ...state, setMasterVolume };
};
