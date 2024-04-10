import { useState } from "react";
import SettingPopup from "./components/SettingPopup";
// import HowToPopup from "./components/HowToPopup";
// import CreditPopup from "./components/CreditPopup";
import ButtonHome from "./components/ButtonHome";

function Home() {
  const [setting, setSetting] = useState<boolean>(false);
  // const [howTo, setHowTo] = useState<boolean>(false);
  // const [credit, setCredit] = useState<boolean>(false);

  const handleSetting = () => {
    setSetting(true);
  };

  // const handleHowTo = () => {
  //   setHowTo(true);
  // };

  // const handleCredit = () => {
  //   setCredit(true);
  // };

  return (
    <div className="flex flex-col w-full min-h-screen bg-stone-600">
      {/* <div className="w-full min-h-screen bg-black opacity-50"></div> */}

      <div className="flex flex-col items-start m-40 gap-5 z-0">
        <ButtonHome title="start" path="/Menu"></ButtonHome>
        <ButtonHome title="tutorial" path="/tutorial"></ButtonHome>
        <ButtonHome
          title="settings"
          path=""
          onClick={handleSetting}
        ></ButtonHome>
        <ButtonHome title="credits" path="/credits"></ButtonHome>
        {/* <Link
          to="/Menu"
          className="font-mono font-extrabold text-7xl hover:italic hover:text-red-600 hover:border-b-2"
        >
          START
        </Link> */}
        {/* <button
          onClick={handleSetting}
          className="font-mono font-extrabold text-5xl hover:italic  hover:text-red-600 hover:border-b-2"
        >
          SETTING
        </button>
        <button
          onClick={handleCredit}
          className="font-mono font-extrabold text-5xl hover:italic  hover:text-red-600 hover:border-b-2"
        >
          CREDITS
        </button> */}
      </div>

      <SettingPopup variable={setting} setVariable={setSetting} />
      {/* <HowToPopup variable={howTo} setVariable={setHowTo} /> */}
      {/* <CreditPopup variable={credit} setVariable={setCredit} /> */}
    </div>
  );
}

export default Home;
