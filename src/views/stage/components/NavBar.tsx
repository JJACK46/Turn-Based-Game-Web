import Icon from "@mdi/react";
import { mdiHome, mdiFlag, mdiBagPersonal, mdiHistory } from "@mdi/js";

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
  return (
    <div className="flex flex-col min-h-full gap-5 px-2 py-5 bg-black z-20">
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
  );
}
