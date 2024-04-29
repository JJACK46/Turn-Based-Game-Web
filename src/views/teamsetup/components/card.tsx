import { Armor } from "@/classes/armor";
import { Entity } from "@/classes/entity";
import { Weapon } from "@/classes/weapon";
import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import React from "react";

interface Props {
  index: number;
  setSelectedEntity: React.Dispatch<React.SetStateAction<Entity>>;
  selectedEntity: Entity;
}

export default function Card(props: Props) {
  const { index, setSelectedEntity, selectedEntity } = props;
  return (
    <>
      <button
        key={index}
        onClick={() => setSelectedEntity(selectedEntity)}
        className="h-32 w-20"
      >
        <div
          className="select-none flex flex-col overflow-hidden justify-center items-center border rounded h-full
          bg-slate-800 hover:scale-105
          "
        >
          <img
            draggable={false}
            className="size-fit"
            src={`${BASE_URL_IMAGE_ENTITIES}/${selectedEntity.imageUrl}`}
            alt="no image"
            width={200}
          />
          <p className="capitalize text-center text-sm">
            {selectedEntity.trait}
          </p>
          <p className="capitalize text-center text-xs">
            {selectedEntity.levelExp}
          </p>
        </div>
      </button>
    </>
  );
}
