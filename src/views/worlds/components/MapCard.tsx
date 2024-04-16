import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { Link } from "react-router-dom";
import { useWorldStore } from "../store/worldStore";
import { MapData } from "@/data/worlds/types/map";

export const MapCard = (props: MapData) => {
  const { setSelectedMap } = useWorldStore();
  return (
    <Link
      to={`/stage`}
      onClick={() => setSelectedMap(props)}
      className="w-fit h-fit flex self-center"
    >
      <div
        className={`overflow-hidden rounded-xl xl:scale-75 2xl:scale-100 h-96 w-32 p-3 flex flex-col gap-2 bg-black/70 text-left 
      border border-transparent hover:border-white ${
        props.boss ? "xl:scale-105 2xl:scale-125 w-72 h-full" : ""
      }
    `}
      >
        <img
          className={`-z-10 object-cover rounded-ss-lg rounded-se-lg 
           ${props.boss ? "hover:translate-y-10 hover:scale-150" : ""}`}
          src={
            props.cardImageUrl.length > 0
              ? `${props.cardImageUrl}`
              : `${BASE_URL_IMAGE_ENTITIES}/robot_soldier_1.jpeg`
          }
        />
        <p className="text-lg">{props.name}</p>
        <hr />
        <p className="text-sm">
          Enemies Levels:{" "}
          {`${
            props.boss
              ? `???`
              : `${props.entitiesLevel[0]}-${props.entitiesLevel[1]}`
          }`}
        </p>
        <p className="text-sm">Drop Items: {`${props.dropItems ?? "???"}`}</p>
        <hr />
        <p className="text-sm text-pretty indent-3 text-left">
          {props.details}
        </p>
      </div>
    </Link>
  );
};
