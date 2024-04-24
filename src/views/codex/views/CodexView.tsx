import { EntitiesData } from "@/data/models/entities";
import { TraitEnum } from "@/data/enums/traits";
import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useState } from "react";
import { CardPreview } from "../components/CardPreview";
import { Entity } from "@/classes/entity";

export function CodexView() {
  const entities = EntitiesData;
  const humans = EntitiesData.filter(
    (entity) => entity.trait === TraitEnum.HUMAN
  );
  const demons = EntitiesData.filter(
    (entity) => entity.trait === TraitEnum.DEMON
  );
  const armedRobot = EntitiesData.filter(
    (entity) => entity.trait === TraitEnum.ARMED_ROBOT
  );
  const unarmedRobot = EntitiesData.filter(
    (entity) => entity.trait === TraitEnum.UNARMED_ROBOT
  );

  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  return (
    <span className="select-none bg-black/50 min-h-screen h-full px-20 py-10 w-screen flex flex-col">
      <div className="flex justify-center border rounded-lg p-5">
        <p className="text-3xl">Codex</p>
      </div>
      <div className="my-2">
        <p>Total humans: {humans.length}</p>
        <p>Total demons: {demons.length}</p>
        <p>Total robot: {armedRobot.concat(unarmedRobot).length}</p>
      </div>
      <span className=" grid grid-cols-10 gap-5 justify-evenly items-center">
        {entities.map((entity, index) => (
          <button key={index} onClick={() => setSelectedEntity(entity)}>
            <div
              className="select-none flex flex-col overflow-hidden justify-center items-center border rounded h-full 
          bg-slate-800 hover:scale-105
          "
            >
              <img
                draggable={false}
                className="size-fit"
                src={`${BASE_URL_IMAGE_ENTITIES}/${entity.imageUrl}`}
                alt="no image"
                width={250}
              />
              <p className="capitalize text-center">{entity.trait}</p>
            </div>
          </button>
        ))}
      </span>
      {selectedEntity && (
        <CardPreview
          selectedEntity={selectedEntity}
          setSelectedEntity={setSelectedEntity}
        ></CardPreview>
      )}
    </span>
  );
}
