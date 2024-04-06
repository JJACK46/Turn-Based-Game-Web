import React from "react";
import Draggable from "react-draggable";
import { Entity } from "../../../models/entity";

interface Props {
  canDraggable?: true;
  entity: Entity;
}

const Card: React.FC<Props> = (property) => {
  return (
    <>
      {property.canDraggable && (
        <Draggable position={{ x: 0, y: 0 }}>
          <div className="p-1 w-40 rounded-md justify-center row-auto h-52 bg-gray-400 shadow-xl">
            <h1 className="text-black">{property.entity.name}</h1>
            <div></div>
          </div>
        </Draggable>
      )}
      {!property.canDraggable && (
        <div className=" w-40 rounded-md justify-center row-auto h-52 bg-gray-400 shadow-xl">
          <p>{property.entity.name}</p>
          <hr />
          <image href={property.entity.imageUrl}></image>
          <div
            rel="stats"
            className="grid grid-cols-2 justify-items-start px-2 text-sm "
          >
            <p>ATK: {property.entity.attackDamage}</p>
            <p>
              MP/EP: {property.entity.energyPower ?? property.entity.manaPower}
            </p>
            <p>HP: {property.entity.healthPower}</p>
            <p>DEF: {property.entity.defendValue}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
