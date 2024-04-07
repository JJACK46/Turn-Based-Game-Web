import React from "react";
import Draggable from "react-draggable";
import { Entity } from "../../../models/entity";

interface Props {
  canDraggable?: true;
  entity: Entity;
}

const Card: React.FC<Props> = (props) => {
  // const [openDialog, setOpenDialog] = useState(false);

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
      {!props.canDraggable && (
        <div className=" w-20 rounded-md justify-center row-auto h-50 border shadow-xl">
          <p>{props.entity.name}</p>
          <hr />
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
          <div className="relative">
            <progress
              className="h-5"
              value={props.entity.healthPower}
              max={props.entity.healthPower}
            ></progress>
            <p className="absolute top-0 left-1/2">
              {props.entity.healthPower}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
