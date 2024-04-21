import Icon from "@mdi/react";
import {
  mdiHome,
  mdiFlag,
  mdiBagPersonal,
  mdiHistory,
  mdiArrowExpandRight,
} from "@mdi/js";
import { useState } from "react";

interface BtnData {
  text: string;
  icon: string;
  path: string;
}

const fieldData: BtnData[] = [
  { text: "Base", icon: mdiHome, path: "/" },
  { text: "Inv.", icon: mdiBagPersonal, path: "/" },
  { text: "History", icon: mdiHistory, path: "/" },
  { text: "Retreat", icon: mdiFlag, path: "/" },
];

export default function NavBarView() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={`flex flex-row min-h-full bg-transparent z-[100] absolute left-0 select-none
      `}
    >
      {!hovered && (
        <button
          className="absolute opacity-50 top-1/3 lg:hidden"
          onClick={() => {
            setHovered(true);
          }}
        >
          <Icon path={mdiArrowExpandRight} size={1}></Icon>
        </button>
      )}
      <div
        className={`flex flex-col gap-5 bg-black min-h-screen px-2 py-4 ${
          hovered ? "" : "-translate-x-[120%]"
        }`}
      >
        {fieldData.map((item, index) => (
          <button
            key={index}
            className="flex flex-col justify-center text-center items-center text-xs text-gray-400 hover:text-cyan-400 duration-0"
          >
            <Icon path={item.icon} size={1}></Icon>
            <p>{item.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
