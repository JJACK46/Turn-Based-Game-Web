import { Entity } from "@/classes/entity";
import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useState } from "react";

interface Props {
  entity: Entity;
}

export function EntityCard({ entity }: Props) {
  const [openModal, setOpenModal] = useState(false);

  function handleSaveEntity() {
    setOpenModal(false);
  }

  return (
    <>
      <button onClick={() => setOpenModal(true)}>
        <div className="border h-[512px] w-64 rounded-lg overflow-hidden hover:border-cyan-300">
          <img
            src={`${BASE_URL_IMAGE_ENTITIES}/${entity.imageUrl}`}
            alt=""
            draggable={false}
          />
          <div className="p-3 select-none leading-relaxed">
            <div>Level: {entity.level}</div>
            <h5 className="text-sm bg-red-500 rounded-full px-2 py-0.5 w-fit capitalize">
              {entity.trait}
            </h5>
            <h5 className="text-md">{entity.name}</h5>
            <div className="text-gray-300 text-sm justify-evenly flex flex-row gap-4">
              <div>
                Stats
                <hr />
                <ul>
                  <li>HP: {entity.health.value}</li>
                  <li>ATK: {entity.attack.value}</li>
                  <li>DEF: {entity.defense.value}</li>
                  <li>EP: {entity.capacity?.energy?.value ?? 0}</li>
                  <li>MP: {entity.capacity?.mana?.value ?? 0}</li>
                  <li>SPD: {entity.speed}</li>
                </ul>
              </div>
              <div>
                Skills
                <hr />
                <ul className="capitalize">
                  {entity.allSkills.map((skill, index) => (
                    <li key={index}>{skill.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </button>
      {openModal && (
        <span className="fixed size-full inset-0 flex justify-center items-center">
          <button
            onClick={handleSaveEntity}
            className="z-30 fixed indent-0 size-full bg-black/50 backdrop-blur"
          ></button>
          <div className="z-40 bg-slate-600 rounded-lg p-3 h-1/2 relative">
            <div className="flex flex-row justify-center gap-6">
              <img
                draggable={false}
                src={`${BASE_URL_IMAGE_ENTITIES}/super_soldier_rifle_1.jpeg`}
                className="object-cover w-52 "
                alt="entity name"
              />
              <div className="border border-dashed w-52 rounded flex justify-center items-center">
                weapons
              </div>
              <div className="border border-dashed w-52 rounded flex justify-center items-center">
                armor
              </div>
            </div>
            <div className="p-2 space-y-2 select-none">
              <div>stat</div>
            </div>
            <div className="flex flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setOpenModal(false)}
                className="bg-gray-500 p-0.5 text-gray-800 rounded-full w-fit px-2 text"
              >
                Cancel
              </button>
              <button className="bg-blue-500 p-0.5 rounded-full w-fit px-2 text">
                Confirm
              </button>
            </div>
          </div>
        </span>
      )}
    </>
  );
}
