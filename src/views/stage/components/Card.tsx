import React from "react";
import Draggable from "react-draggable";
import { Status } from "../../../models/status";

interface Property {
  player?: true;
  imageUrl: string;
  hp: number;
  mp: number;
  ep?: number;
  atk: number;
  trait: string;
  status: Status;
  evasion: number;
  def?: number;
  restoreMp: number;
}

const Card: React.FC<Property> = (property) => {
  return (
    <>
      {property.player && (
        <Draggable position={{ x: 0, y: 0 }}>
          <div className="p-1 w-40 rounded-md justify-center row-auto h-52 bg-slate-400 shadow-xl">
            <div className="">{property.imageUrl}</div>
          </div>
        </Draggable>
      )}
      {!property.player && (
        <div className="p-1 w-40 rounded-md justify-center row-auto h-52 bg-slate-400 shadow-xl">
          <div className="">{property.imageUrl}</div>
        </div>
      )}
    </>
  );
};

export default Card;
