import { EntityType } from "@/classes/entity";
import { EntitiesData } from "@/data/entities";
import { TraitEnum, isBoss } from "@/data/enums/traits";
import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useState } from "react";

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

  const [selectedEntity, setSelectedEntity] = useState<EntityType | null>(null);
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
        {entities.map((entity) => (
          <button onClick={() => setSelectedEntity(entity)}>
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
        <div className="z-40 fixed inset-0 size-full flex justify-center items-center">
          <button
            onClick={() => setSelectedEntity(null)}
            className="fixed bg-white/10 size-full backdrop-blur"
          ></button>
          <div className="z-50 flex flex-col gap-2 bg-black rounded-xl overflow-hidden w-[380px]">
            <img
              draggable={false}
              src={`${BASE_URL_IMAGE_ENTITIES}/${selectedEntity.imageUrl}`}
              alt="no image"
            />
            <div className="capitalize text-center">
              {isBoss(selectedEntity.trait) && (
                <p className="text-2xl text-red-700">{selectedEntity.name}</p>
              )}
              <p
                className={` ${
                  isBoss(selectedEntity.trait) ? "text" : "text-xl"
                } `}
              >
                {selectedEntity.trait}
              </p>
            </div>
            <hr />
            <div className="text-left text-pretty px-5 pb-2 flex flex-row flex-wrap justify-around gap-5">
              <div className="flex flex-col">
                <p>Level: {selectedEntity.level}</p>
                <p>ATK: {selectedEntity.attackPower}</p>
                <p>DEF: {selectedEntity.defend}</p>
                <p>EV: {selectedEntity.evasion}</p>
                <p>MP: {selectedEntity.mana}</p>
                <p>EP: {selectedEntity.energy}</p>
              </div>
              <div className="flex flex-col">
                Skills
                <hr />
                <ul>
                  <li>{selectedEntity.normalHitSkill.name}</li>
                  <li>{selectedEntity.traitSkill.name}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}
