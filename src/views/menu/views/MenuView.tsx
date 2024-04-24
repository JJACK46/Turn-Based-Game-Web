import { useState } from "react";
import { Drawer } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiArrowLeft } from "@mdi/js";
import { InventoryView } from "./Inventory";
import { TroopsView } from "./Troops";
import { AchievementView } from "./Achievement";

export function MenuView() {
  const fieldData = [
    {
      title: "Navigation",
      bgUrl: "/images/menu/copilot_room.jpeg",
    },
    {
      title: "Troops",
      bgUrl: "/images/menu/basement_hall_warship.jpeg",
    },
    {
      title: "Inventory",
      bgUrl: "/images/menu/inventory.jpg",
    },
    {
      title: "Achievement",
      bgUrl: "/images/menu/achievement.jpg",
    },
    {
      title: "Codex",
      bgUrl: "/images/menu/data_bank.jpeg",
    },
  ];

  const [selectTopic, setSelectTopic] = useState<string | null>(null);
  const [hoveredTopic, setHoveredTopic] = useState<number>(-1);

  const handleClose = () => setSelectTopic(null);
  const navigate = useNavigate();

  function handleSelectMenu(title: string) {
    switch (title) {
      case "Navigation":
        navigate("/worlds");
        break;
      case "Codex":
        navigate("/codex");
        break;
      default:
        setSelectTopic(title);
        break;
    }
  }

  return (
    <>
      <div className="absolute border-b w-full flex justify-between bg-black/80 backdrop-blur-sm gap-3 p-3 text-xl">
        <div>Menu</div>
        <Link to={"/"}>
          <Icon path={mdiArrowLeft} size={1}></Icon>
        </Link>
      </div>
      <span className=" h-screen flex flex-row justify-evenly items-center overflow-hidden">
        {fieldData.map((data, index) => (
          <button
            key={data.title}
            onClick={() => handleSelectMenu(data.title)}
            onMouseEnter={() => setHoveredTopic(index)}
            onMouseLeave={() => setHoveredTopic(-1)}
            className="flex h-screen flex-row w-full items-center justify-center relative "
          >
            <div className="text-3xl drop-shadow">{data.title}</div>
            <img
              src={data.bgUrl}
              className={`-z-10 absolute inset-0 size-full object-cover ${
                hoveredTopic === index ? "border-b-4 opacity-100" : "opacity-50"
              }`}
            />
            <div
              className={`-z-10 absolute inset-0 ${
                hoveredTopic === index ? "bg-cyan-900/40" : ""
              }`}
            ></div>
          </button>
        ))}
        <Drawer
          open={selectTopic ? true : false}
          onClose={handleClose}
          position="left"
          className="size-full"
        >
          <Drawer.Header titleIcon={() => <></>} title={selectTopic ?? ""} />
          <Drawer.Items>
            {selectTopic === "Troops" && <TroopsView></TroopsView>}
            {selectTopic === "Inventory" && <InventoryView></InventoryView>}
            {selectTopic === "Achievement" && (
              <AchievementView></AchievementView>
            )}
          </Drawer.Items>
        </Drawer>
      </span>
    </>
  );
}
