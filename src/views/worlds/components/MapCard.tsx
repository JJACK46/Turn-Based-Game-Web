import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";

export const MapCard = (props: {
  imageUrl: string;
  name: string;
  enemyLevels: number[];
  details: string;
  dropItems?: string[];
  boss?: true;
}) => {
  return (
    <button className="w-fit h-fit flex self-center">
      <div
        className={`overflow-hidden rounded-xl xl:scale-75 2xl:scale-100 h-96 w-32 p-3 flex flex-col gap-2 bg-black/70 text-left 
      border border-transparent hover:border-white ${
        props.boss ? "xl:scale-100 2xl:scale-125 w-72 h-full" : ""
      }
    `}
      >
        <img
          className={`-z-10 object-cover rounded-ss-lg rounded-se-lg 
          hover:scale-150 ${props.boss ? "hover:translate-y-10" : ""}`}
          src={
            props.imageUrl.length > 0
              ? `${props.imageUrl}`
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
              : `${props.enemyLevels[0]}-${props.enemyLevels[1]}`
          }`}
        </p>
        <p className="text-sm">Drop Items: {`${props.dropItems ?? "???"}`}</p>
        <hr />
        <p className="text-sm text-pretty indent-3 text-left">
          {props.details}
        </p>
      </div>
    </button>
  );
};
