import { BASE_URL_IMAGE_WORLDS } from "@/utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useWorldStore } from "../store/worldStore";
import { listWorlds } from "@/data/worlds/worlds";
import { GNavbar } from "@/global/components/GNavbar";

function WorldSelection() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const { setSelectedWorld } = useWorldStore();

  return (
    <>
      <GNavbar title="Select the world" backTo="/menu"></GNavbar>
      <div className="flex flex-row gap-10 justify-evenly items-center h-screen p-20">
        {listWorlds.map((world, index) => (
          <Link
            to={`/worlds/${world.title}`}
            key={index}
            onClick={() =>
              setSelectedWorld({
                id: world.id ?? "",
                entities: world.entities,
                worldImgUrl: world.worldImgUrl,
                boss: world.boss,
                dropItems: world.dropItems,
                maps: world.maps,
                title: world.title,
                path: "",
                info: world.info,
              })
            }
            className={`text-lg w-40 h-56 hover:h-96 hover:w-96 
                ${
                  hoveredIndex !== index && hoveredIndex !== -1
                    ? "opacity-40"
                    : ""
                } ${
              hoveredIndex !== index && hoveredIndex !== -1
                ? "translate-y-28"
                : ""
            } ${
              hoveredIndex !== index && hoveredIndex !== -1 ? "scale-80" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(-1)}
          >
            <img
              className="object-cover w-full h-full rounded-lg"
              draggable={false}
              src={`${BASE_URL_IMAGE_WORLDS}/${world.worldImgUrl}`}
            ></img>
            <p className="mt-2 leading-relaxed">{world.title}</p>
            {hoveredIndex === index && (
              <p className="text-sm text-left text-gray-300 leading-relaxed">{world.info}</p>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}

export default WorldSelection;
