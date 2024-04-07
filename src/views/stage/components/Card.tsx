import React, { useState } from "react";
import Draggable from "react-draggable";
import { Entity } from "../../../models/entity";
import PopupDialog from "./PopupDialog";

interface Props {
  canDraggable?: true;
  entity: Entity;
}

const Card: React.FC<Props> = (props) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      {props.canDraggable && (
        <Draggable position={{ x: 0, y: 0 }}>
          <div className="p-1 w-40 rounded-md justify-center row-auto h-52 bg-gray-400 shadow-xl">
            <h1 className="text-black">{props.entity.name}</h1>
            <div></div>
          </div>
        </Draggable>
      )}
      {!props.canDraggable && (
        <div className=" w-40 rounded-md justify-center row-auto h-52 bg-gray-400 shadow-xl">
          <p>{props.entity.name}</p>
          <hr />
          <img src={props.entity.imageUrl} />
          <div
            rel="stats"
            className="grid grid-cols-2 justify-items-start px-2 text-sm bg-black"
          ></div>
          <div>
            <button
              onClick={() => setOpenDialog(true)}
              className="p-2 rounded-md bg-blue-500 mt-1 text-xs"
            >
              Actions
            </button>
            {openDialog && (
              <PopupDialog
                skills={props.entity.skills}
                closeModal={setOpenDialog}
              ></PopupDialog>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
