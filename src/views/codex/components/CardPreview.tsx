import { Entity } from "@/classes/entity";
import { isBoss } from "@/data/enums/traits";
import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";

interface Props {
  selectedEntity: Entity;
  setSelectedEntity: React.Dispatch<Entity | null>;
}

export function CardPreview({ selectedEntity, setSelectedEntity }: Props) {
  return (
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
            className={` ${isBoss(selectedEntity.trait) ? "text" : "text-xl"} `}
          >
            {selectedEntity.trait}
          </p>
        </div>
        <hr />
        <div className="text-left text-pretty px-5 pb-2 flex flex-row flex-wrap justify-around gap-5">
          <div className="flex flex-col">
            <p>Level: {selectedEntity.levelExp.level}</p>
            <p>ATK: {selectedEntity.attack.value}</p>
            <p>DEF: {selectedEntity.defense.value}</p>
            <p>EV: {selectedEntity.evasion}</p>
            <p>MP: {selectedEntity.capacity?.mana?.max}</p>
            <p>EP: {selectedEntity.capacity?.energy?.max}</p>
          </div>
          <div className="flex flex-col">
            Skills
            <hr />
            <ul>
              <li>{selectedEntity.skills.normalHitSkill.name}</li>
              <li>{selectedEntity.skills.traitSkill.name}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
