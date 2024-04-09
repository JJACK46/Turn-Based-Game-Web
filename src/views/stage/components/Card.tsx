import { FC, useState } from "react";
import { Entity } from "../../../models/entity";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  assignSkill,
  cancelSkill,
  closeActionOverlay,
  closeDisplay,
  markEntityTakenAction,
  openActionOverlay,
  openDisplay,
  resetCurrentEntity,
  setCurrentEntity,
  skillToEntity,
} from "../features/stageReducer";
import { convertNumberToPercentage, getColorByHp } from "../features/helper";
import _ from "lodash";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

interface Props {
  index: number;
  entity: Entity;
}

const Card: FC<Props> = (props) => {
  const stages = useAppSelector((s) => s.stage);
  const dispatch = useAppDispatch();

  const [maxHP] = useState(props.entity.healthPower);
  const [maxMP] = useState(props.entity.energyPower ?? props.entity.manaPower);
  const strCurrentHP = convertNumberToPercentage(
    props.entity.healthPower,
    maxHP
  );
  const [isHoveredCard, setIsHoveredCard] = useState(false);
  const wasAction = () =>
    stages.entitiesTakenAction.some((entity) =>
      _.isEqual(entity, props.entity)
    );

  return (
    <>
      <button
        onMouseEnter={() => setIsHoveredCard(true)}
        onMouseLeave={() => setIsHoveredCard(false)}
        onClick={() => {
          //entity not dead
          if (props.entity.healthPower > 0) {
            //when click on player card
            if (props.entity.playable) {
              if (stages.turn === "player") {
                if (!wasAction()) {
                  dispatch(
                    setCurrentEntity({
                      entity: props.entity,
                      index: props.index,
                    })
                  );
                  dispatch(openActionOverlay());
                  dispatch(openDisplay());
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
                  dispatch(
                    skillToEntity({
                      toEnemy: true,
                      indexSourceEntity: stages.currentEntity.index,
                      indexTargetEntity: props.index,
                      sourceEntity: stages.currentEntity.entity,
                      skill: stages.selectedSkill,
                      targetEntities: stages.enemiesFrontRow,
                      sourceEntities: stages.playersFrontRow,
                    })
                  );
                  dispatch(markEntityTakenAction(stages.currentEntity.entity));
                  dispatch(closeDisplay());
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
          className="flex flex-col w-24 h-fit rounded-md items-center justify-around hover:scale-110 border transition"
          style={{
            opacity: props.entity.healthPower <= 0 ? 0.2 : 1,
            borderColor: wasAction() ? "gray" : "",
            boxShadow:
              stages.currentEntity?.entity === props.entity
                ? "0px 0px 40px 0px #0ff"
                : "",
          }}
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
          <div className="w-full bg-gray-200 relative rounded-lg dark:bg-gray-700">
            <div
              className=" text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-md "
              style={{
                backgroundColor: getColorByHp(strCurrentHP),
                width: strCurrentHP,
              }}
            >
              {strCurrentHP}
            </div>
            {isHoveredCard && (
              <div className="text-xs text-left mx-2 ">
                <p>
                  HP: {props.entity.healthPower} / {maxHP}
                </p>
                <p>
                  {props.entity.energyPower ? "EP" : "MP"}:{" "}
                  {props.entity.energyPower ?? props.entity.manaPower} / {maxMP}
                </p>
              </div>
            )}
          </div>
        </div>
      </button>

      {stages.isActionOverlayOpen && (
        <>
          <span className="absolute inset-0 flex items-end justify-end size-full z-10">
            <button
              onClick={() => {
                dispatch(closeActionOverlay());
                dispatch(closeDisplay());
              }}
              className="top-0 left-0 size-full"
            ></button>
            <div className="absolute flex p-10">
              <div className="flex justify-around h-40 rounded-3xl">
                <div className="flex gap-4">
                  <div className="flex flex-row h-full bg-slate-500 p-2 rounded-3xl">
                    <img
                      src={`src/assets/entities/${stages.currentEntity?.entity.imageUrl}`}
                      alt="no data"
                      className="h-full object-cover rounded-3xl"
                    />
                    <div className="flex flex-col h-full w-32 justify-center items-start p-5">
                      <p className="font-mono text-xl">{props.entity.name}</p>
                      <p className="font-mono text-md">
                        lvl.{props.entity.level}
                      </p>
                      <p className="font-mono text-md">
                        ATK : {props.entity.attackPower}
                      </p>
                      <p className="font-mono text-md">
                        DEF : {props.entity.defendPower ?? 0}
                      </p>
                      <p className="font-mono text-md">
                        HEAL : {props.entity.healingPower ?? 0}
                      </p>
                    </div>
                  </div>
                  {stages.currentEntity?.entity.skills.map((skill) => (
                    <button
                      key={skill.name}
                      className="border-red-500 border-2 rounded-2xl w-40 h-full bg-black"
                      onClick={() => {
                        dispatch(assignSkill(skill));
                        dispatch(closeActionOverlay());
                        dispatch(closeDisplay());
                      }}
                    >
                      <div className="size-full">{skill.name}</div>
                    </button>
                  ))}
                  <button className="border-red-500 border-2 rounded-2xl w-40 h-full bg-black">
                    <div className="size-full">Use Item</div>
                  </button>
                </div>
              </div>
            </div>
          </span>
        </>
      )}

      {stages.lastHitDamage > 0 && (
        <span className="absolute top-32 right-10 p-2 border-red-600 border-2 rounded z-10">
          <p className="font-mono text-sm">
            Hits Damage: {stages.lastHitDamage}
          </p>
          <p className="font-mono text-xs">
            Total Damage: {stages.totalHitDamage}
          </p>
        </span>
      )}

      {stages.currentEntity?.entity.name === props.entity.name &&
        stages.isActionOverlayOpen !== null &&
        !stages.isDisplayOpen && (
          <>
            <span className="absolute top-10 right-10 p-5 border-red-600 border-2 rounded-2xl z-10">
              <div className="flex flex-col size-full justify-center items-center  ">
                <p className="font-mono font-bold text-2xl text-red-600 uppercase">
                  {`attacking`}
                </p>
              </div>
            </span>

            {stages.selectedSkill && (
              <button
                className="absolute right-10 bottom-10 p-10 border-2 border-blue-300 rounded-2xl hover:border-red-700"
                onClick={() => {
                  dispatch(cancelSkill());
                  dispatch(resetCurrentEntity());
                }}
              >
                <p className="uppercase">{stages.selectedSkill?.name}</p>
                <hr className="my-2" />
                <p className="uppercase text-xs">cancel</p>
              </button>
            )}
          </>
        )}
    </>
  );
};

export default Card;
