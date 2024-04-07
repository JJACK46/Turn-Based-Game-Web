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
        </button>
      )}
      {props.openDialog && props.entity.id == props.activeDialog && (
        <div className='absolute inset-0 flex items-center justify-center z-10'>
          <button onClick={() => {
            props.setOpenDialog(false)
            props.setActiveDialog(99)
          }} className='top-0 left-0 size-full'></button>
          <div className="absolute top-full left-full -translate-x-full -translate-y-full flex justify-around w-2/3 h-36">
            <button className="border-red-500 border-2 w-1/6 h-full bg-black">
              <div className="size-full">
                KUY 1
              </div>
            </button>

            <button className="border-red-500 border-2 w-1/6 h-full bg-black">
              <div className="size-full">
                KUY 2
              </div>
            </button>

            <button className="border-red-500 border-2 w-1/6 h-full bg-black">
              <div className="size-full">
                KUY 3
              </div>
            </button>

            <button className="border-red-500 border-2 w-1/6 h-full bg-black">
              <div className="size-full">
                KUY 4
              </div>
            </button>

            <button className="border-red-500 border-2 w-1/6 h-full bg-black">
              <div className="size-full">
                {props.entity.id}
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
