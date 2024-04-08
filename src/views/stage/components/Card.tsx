import React from "react";
import Draggable from "react-draggable";
import { Entity } from "../../../models/entity";

interface Props {
  canDraggable?: true;
  entity: Entity;
  openDialog: boolean
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  activeDialog: number
  setActiveDialog: React.Dispatch<React.SetStateAction<number>>
}

const Card: React.FC<Props> = (props) => {

  return (
    <>
      {props.canDraggable && (
        <Draggable position={{ x: 0, y: 0 }}>
          <div className=" w-40 rounded-md justify-center row-auto h-52 bg-gray-400 shadow-xl">
            <p>{props.entity.name}</p>
            <hr />
            <img src={`src/assets/entities/${props.entity.imageUrl}`} />
            <div
              rel="stats"
              className="grid grid-cols-2 justify-items-start px-2 text-sm bg-black"
            ></div>
            {props.entity.playable && <div></div>}
          </div>
        </Draggable>
      )}
      {/* h-36 */}
      {!props.canDraggable && (
        <div className=" w-20 rounded-md justify-center row-auto h-50 border shadow-xl">
          <p>{props.entity.name}</p>
          <hr />
        <button onClick={() => {
          props.setOpenDialog(true)
          props.setActiveDialog(props.entity.id)
        }} className="flex flex-col w-24 h-fit rounded-md items-center justify-around border shadow-xl">
          <p className="border-black border-b-2 w-full">{props.entity.name}</p>
          <img
            className="object-cover"
            width={500}
            height={494}
            src={`src/assets/entities/${props.entity.imageUrl}`}
            alt="no image"
          />
          <div
            rel="stats"
            className="grid grid-cols-2 justify-items-start px-2 text-sm bg-black"
          ></div>
          <hr />
          <div className="relative w-full h-5">
            <progress
              className="h-5 w-full"
              value={props.entity.healthPower}
              max={props.entity.healthPower}
            ></progress>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs">
              {props.entity.healthPower}
            </p>
          </div>
        </div>
      )}
    </>
      )
  )


export default Card
