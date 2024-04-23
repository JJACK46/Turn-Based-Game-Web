import { useState } from "react";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import { BASE_URL_IMAGE_WEAPONS } from "@/utils/constants";
import { WeaponCard } from "../components/WeaponCard";

export function BasementView() {
  const fieldData = [
    {
      title: "Troops",
      bgUrl: "",
    },
    {
      title: "Inventory",
      bgUrl: "",
    },
    {
      title: "Achievement",
      bgUrl: "",
    },
  ];

  const [selectTopic, setSelectTopic] = useState<string | null>(null);

  const handleClose = () => setSelectTopic(null);

  return (
    <>
      <div className="absolute border-b w-full flex justify-between gap-3 p-3 text-xl">
        <div>Basement</div>
        <Link to={"/menu"}>
          <Icon path={mdiArrowLeft} size={1}></Icon>
        </Link>
      </div>
      <span className=" h-screen flex flex-row justify-evenly items-center overflow-y-hidden">
        {fieldData.map((data) => (
          <button
            onClick={() => setSelectTopic(data.title)}
            className="flex h-screen bg-black flex-row w-full items-center justify-center hover:border-b "
          >
            <div key={data.title}>{data.title}</div>
          </button>
        ))}
        <Drawer
          open={selectTopic ? true : false}
          onClose={handleClose}
          position="bottom"
          className="h-screen"
        >
          <DrawerHeader
            titleIcon={() => <></>}
            title={selectTopic ?? ""}
          ></DrawerHeader>
          <DrawerItems>
            <div className="grid grid-cols-8">
              <WeaponCard
                imgUrl={`${BASE_URL_IMAGE_WEAPONS}/swords/katana_sword.jpeg`}
                name="Katana"
              ></WeaponCard>
            </div>
          </DrawerItems>
        </Drawer>
      </span>
    </>
  );
}
