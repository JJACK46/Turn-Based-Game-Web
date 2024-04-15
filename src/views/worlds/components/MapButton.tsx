import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";

export const MapButton = (props: {
  imageUrl: string;
  name: string;
  enemyLevels: number[];
  details: string;
  dropItems?: string[];
}) => (
  <button>
    <div className="rounded-xl h-96 py-5 px-3 w-40 flex flex-col gap-4 bg-black/70 text-left hover:scale-125">
      <img
        className="object-cover"
        src={`${BASE_URL_IMAGE_ENTITIES}/robot_solider_2.jpeg`}
        alt=""
      />
      <p className="text-lg">{props.name}</p>
      <hr />
      <p className="text-sm">
        Enemies Levels: {`${props.enemyLevels[0]}-${props.enemyLevels[1]}`}
      </p>
      <p className="text-sm">Drop Items: {`${props.dropItems ?? "???"}`}</p>
      <hr />
      <p className="text-sm text-pretty indent-3 text-left">{props.details}</p>
    </div>
  </button>
);
