import { BASE_URL_IMAGE_WORLDS } from "@/utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

interface WorldData {
  title: string;
  path: string;
  info: string;
  urlImg: string;
}

const fieldData: WorldData[] = [
  {
    title: "Earth-AprilX: The Ravaged Homeworld",
    path: "",
    info: "In a distant future, humanity's insatiable thirst for power and resources has led to the cataclysmic transformation of Earth into a war-torn wasteland. Dubbed Earth-AprilX, this once-vibrant planet now bears the scars of endless conflict and environmental degradation, a grim testament to humanity's folly.",
    urlImg: "Earth-AprilX.jpeg",
  },
  {
    title: "Astralis Omega: The Robotics Empire",
    path: "",
    info: "In the far reaches of the galaxy, amidst the cold expanse of space, lies the mechanical domain of Astralis Omega. This empire, ruled by sentient machines of unparalleled intellect, harbors an insatiable thirst for power and dominance over all other forms of life.",
    urlImg: "Astralis_Omega.jpeg",
  },
  {
    title: "Gaia Realm: The Mysterious Magic",
    path: "",
    info: "In the vast expanse of the cosmos, nestled within a distant galaxy veiled by a tapestry of shimmering nebulas, lies the enigmatic Gaia Realm. This celestial body, unlike any other, is a planet teeming with mystical energies and ethereal wonders beyond mortal comprehension.",
    urlImg: "Gaia_Nova.jpeg",
  },
];

function Menu() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  return (
    <>
      <div className="absolute flex flex-col items-center size-full justify-center gap-5 bg-black">
        <h1 className=" text-7xl absolute top-20">Select the World</h1>
        <div className="flex flex-row gap-10 justify-evenly w-full p-20">
          {fieldData.map((item, index) => (
            <>
              <Link
                to={`/world/${item.title}`}
                key={index}
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
                  hoveredIndex !== index && hoveredIndex !== -1
                    ? "scale-80"
                    : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src={`${BASE_URL_IMAGE_WORLDS}/${item.urlImg}`}
                ></img>
                <p className="mt-2">{item.title}</p>
                {hoveredIndex === index && (
                  <p className="text-sm text-left">{item.info}</p>
                )}
              </Link>
            </>
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

export default Menu;
