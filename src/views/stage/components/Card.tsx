import { FC, useState } from "react";
import { Entity } from "../../../models/entity";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  assignSkill,
  closeActionOverlay,
  decreaseActions,
  markEntityTakenAction,
  openActionOverlay,
  setCurrentEntity,
  skillToEntity,
} from "../features/stageReducer";

interface Props {
  index: number;
  entity: Entity;
}

const Card: FC<Props> = (props) => {
  const stages = useAppSelector((s) => s.stage);
  const dispatch = useAppDispatch();

  const [maxHP] = useState(props.entity.healthPower);

  return (
    <>
      <button
        onClick={() => {
          //entity not dead
          if (props.entity.healthPower > 0) {
            //when click on player card
            if (props.entity.playable) {
              if (stages.turn === "player") {
                if (!stages.entitiesTakenAction.includes(props.entity)) {
                  dispatch(
                    setCurrentEntity({
                      entity: props.entity,
                      index: props.index,
                    })
                  );
                  dispatch(openActionOverlay());
                } else {
                  alert("this entity was taken action"); //+ show some info
                }
              } else {
                alert("is not your turn");
              }
            } else {
              //when click on enemy card
              if (stages.currentEntity) {
                if (stages.selectedSkill) {
                  alert(
                    `Use ${stages.selectedSkill.name} to ${props.entity.name}` //some alert
                  );
                  dispatch(
                    skillToEntity({
                      toEnemy: true,
                      indexTargetEntity: props.index,
                      sourceEntity: stages.currentEntity.entity,
                      skill: stages.selectedSkill,
                    })
                  );
                  dispatch(markEntityTakenAction(stages.currentEntity.entity));
                  dispatch(decreaseActions(1));
                }
              } else {
                //view info enemy's card
                alert("some info \n" + JSON.stringify(props.entity));
              }
            }
          } else {
            alert("this entity was dead");
          }
        }}
      >
        <div
          className="flex flex-col w-24 h-fit rounded-md items-center justify-around border shadow-xl hover:scale-110 transition"
          style={{ opacity: props.entity.healthPower <= 0 ? 0.2 : 1 }}
        >
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
              max={maxHP}
            ></progress>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs">
              {props.entity.healthPower}
            </p>
          </div>
        </div>
      </button>

      {stages.actionOverlay && (
        <>
          <span className="absolute inset-0 flex items-end justify-end size-full z-10">
            <button
              onClick={() => {
                dispatch(closeActionOverlay());
              }}
              className="top-0 left-0 size-full "
            ></button>
            <div className="absolute flex rounded-ss p-2">
              <div className="flex justify-around bg-red-400 h-40">
                <img
                  src={`src/assets/entities/${stages.currentEntity?.entity.imageUrl}`}
                  alt="no data"
                  className="h-full object-cover"
                />
                <p className="flex flex-wrap w-40">
                  {JSON.stringify(props.entity)}
                </p>

                <div className="flex gap-4">
                  {stages.currentEntity?.entity.skills.map((skill) => (
                    <button
                      key={skill.name}
                      className="border-red-500 border-2 w-40 h-full bg-black"
                      onClick={() => {
                        dispatch(assignSkill(skill));
                        alert(skill.name); //some effect
                      }}
                    >
                      <div className="size-full">{skill.name}</div>
                    </button>
                  ))}
                  <button className="border-red-500 border-2 w-40 h-full bg-black">
                    <div className="size-full">Use Item</div>
                  </button>
                </div>
              </div>
            </div>
          </span>
        </>
      )}
    </>
  );
};

export default Card;
