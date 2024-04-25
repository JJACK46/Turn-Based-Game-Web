import { useState } from "react";
import { Drawer } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { InventoryView } from "./Inventory";
import { TroopsView } from "./Troops";
import { AchievementView } from "./Achievement";
import useSound from "use-sound";
import clickSFX from "/sounds/ui/click-button.mp3";
import { GNavbar } from "@/global/components/GNavbar";

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
  const [playBtnSound] = useSound(clickSFX, { volume: 0.3 });

  const handleClose = () => setSelectTopic(null);
  const navigate = useNavigate();

  function handleSelectMenu(title: string) {
    playBtnSound();
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
      <GNavbar title="Menu" backTo="/"></GNavbar>
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
