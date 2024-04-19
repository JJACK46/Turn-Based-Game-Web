import { BASE_URL_IMAGE_WORLDS } from "@/utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useWorldStore } from "../store/worldStore";
import { listWorlds } from "@/data/worlds/worlds";

function WorldSelection() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const { setSelectedWorld } = useWorldStore();

  return (
    <>
      <div className="absolute flex flex-col items-center size-full justify-center gap-5 bg-black">
        <h1 className=" text-7xl absolute top-20">Select the World</h1>
        <div className="flex flex-row gap-10 justify-evenly w-full p-20">
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
              <p className="mt-2">{world.title}</p>
              {hoveredIndex === index && (
                <p className="text-sm text-left">{world.info}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
      <Link
        to="/"
        className="absolute top-5 left-5 py-2 px-10 rounded-md border-white border-2 hover:border-cyan-500 hover:text-cyan-500"
      >
        {"<"}
      </Link>
    </>
  );
}

export default WorldSelection;
