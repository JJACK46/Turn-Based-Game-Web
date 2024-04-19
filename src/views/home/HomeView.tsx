import { useState } from "react";
import SettingPopup from "./components/SettingPopup";
import ButtonHome from "./components/ButtonHome";
import ReactPlayer from "react-player";
// import useSound from "use-sound";
// import soundtrack from "@/assets/sounds/soundtracks/space-ambient-sci-fi.mp3";

function HomeView() {
  const [setting, setSetting] = useState<boolean>(false);
  const handleSetting = () => {
    setSetting(true);
  };

  // const [playLobbySoundtrack, { stop }] = useSound(soundtrack, {
  //   volume: 0.5,
  //   interrupt: true,
  // });

  return (
    <div
      className="flex flex-col w-full min-h-screen bg-black"
      // onMouseEnter={() => playLobbySoundtrack()}
      // onMouseOut={() => stop}
    >
      <div>
        <ReactPlayer
          className="absolute top-0 left-0"
          width="100%"
          height="100%"
          url="https://cdn.pixabay.com/video/2023/01/08/145732-787427525_large.mp4"
          loop={true}
          playing={true}
          controls={false}
          muted
        ></ReactPlayer>
      </div>
      <div className="flex flex-col items-start absolute top-32 left-32 gap-7 z-0">
        <div
          rel="Title"
          className="z-10 flex flex-row justify-center text-8xl text-red-600 uppercase drop-shadow hover:scale-105"
        >
          Project APRILX
        </div>

        <ButtonHome title="start" path="/menu"></ButtonHome>
        <ButtonHome
          title="tutorial"
          path="/tutorial"
          onClick={() => stop()}
        ></ButtonHome>
        <ButtonHome
          title="settings"
          path=""
          onClick={handleSetting}
        ></ButtonHome>
        <ButtonHome title="credits" path="/credits"></ButtonHome>
      </div>

      <SettingPopup variable={setting} setVariable={setSetting} />
      <footer className="absolute bottom-0 right-12">
        ver. {__APP_VERSION__}
      </footer>
    </div>
  );
}

export default HomeView;
