import { useState } from "react";
import { Link } from "react-router-dom";
import SettingPopup from "../../components/SettingPopup";
import HowToPopup from "../../components/HowToPopup";
import CreditPopup from "../../components/CreditPopup";

function Home() {
  const [setting, setSetting] = useState<boolean>(false);
  const [howto, setHowto] = useState<boolean>(false);
  const [credit, setCredit] = useState<boolean>(false);

  const handleSetting = () => {
    setSetting(true);
  };

  const handleHowto = () => {
    setHowto(true);
  };

  const handleCredit = () => {
    setCredit(true);
  };

  return (
    <div className="flex w-full min-h-screen bg-stone-500">
      <div className="w-full min-h-screen bg-black opacity-50"></div>

      <div className="absolute flex flex-col text-left items-start p-56 gap-5 z-0">
        <Link
          to="/Menu"
          className="font-mono font-extrabold text-7xl hover:italic  hover:text-red-600 hover:border-b-2"
        >
          START
        </Link>
        <button
          onClick={handleSetting}
          className="font-mono font-extrabold text-5xl hover:italic  hover:text-red-600 hover:border-b-2"
        >
          SETTING
        </button>
        <button
          onClick={handleHowto}
          className="font-mono font-extrabold text-5xl hover:italic  hover:text-red-600 hover:border-b-2"
        >
          HOW TO PLAY
        </button>
        <button
          onClick={handleCredit}
          className="font-mono font-extrabold text-5xl hover:italic  hover:text-red-600 hover:border-b-2"
        >
          CREDITS
        </button>
      </div>

      <SettingPopup variable={setting} setVariable={setSetting} />
      <HowToPopup variable={howto} setVariable={setHowto} />
      <CreditPopup variable={credit} setVariable={setCredit} />
    </div>
  );
}

export default Home;
