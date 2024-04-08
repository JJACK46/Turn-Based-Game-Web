import { FC } from "react";
import { Entity } from "../../../models/entity";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { assignPlayer, assignSkill, skillToEntity } from "../features/stage";
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
  activeCard: Entity | null;
  setActiveDialog: React.Dispatch<React.SetStateAction<Entity | null>>;
  display :boolean;
  setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card: FC<Props> = (props) => {
  const stages = useAppSelector((s) => s.stage);
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        onClick={() => {
          //entity not dead
          if (props.entity.healthPower > 0) {
            //when click on player card
            if (props.entity.playable) {
              props.setActiveDialog(props.entity);
              props.setDisplay(true);
              dispatch(
                assignPlayer({ entity: props.entity, index: props.index })
              );
            } else {
              //when click on enemy card
              if (stages.selectedPlayer) {
                if (stages.selectedSkill) {
                  // alert(
                  //   `Use ${stages.selectedSkill.name} to ${props.entity.name}` //some alert
                  // );
                  dispatch(
                    skillToEntity({
                      indexTargetEntity: props.index,
                      sourceEntity: stages.selectedPlayer.entity,
                      skill: stages.selectedSkill,
                    })
                  );
                  props.setDisplay(false);
                  props.setActiveDialog(null)
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
              max={props.entity.healthPower}
            ></progress>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs">
              {props.entity.healthPower}
            </p>
          </div>
        </div>
      </button>
      {props.activeCard !== null && props.display && (
        <>
          <span className="absolute inset-0 flex items-end justify-end size-full z-10">
            <button
              onClick={() => {
                props.setActiveDialog(null);
                props.setDisplay(false);
              }}
              className="top-0 left-0 size-full"
            ></button>
            <div className="absolute flex p-10">
              <div className="flex justify-around h-40 rounded-3xl">
                <div className="flex gap-4">
                  <div className="flex flex-row h-full bg-slate-500 p-2 rounded-3xl">
                    <img
                      src={`src/assets/entities/${props.activeCard.imageUrl}`}
                      alt="no data"
                      className="h-full object-cover rounded-3xl"
                    />
                    <div className="flex flex-col h-full w-32 justify-center items-start p-5">
                      <p className="font-mono text-xl">{props.entity.name}</p>
                      <p className="font-mono text-md">lvl.{props.entity.level}</p>
                      <p className="font-mono text-md">ATK : {props.entity.attackPower}</p>
                      <p className="font-mono text-md">DEF : {props.entity.defendPower}</p>
                      <p className="font-mono text-md">HEAL : {props.entity.healingPower}</p>
                    </div>

                  </div>
                  {props.activeCard.skills.map((skill) => (
                    <button
                      key={skill.name}
                      className="border-red-500 border-2 rounded-2xl w-40 h-full bg-black"
                      onClick={() => {
                        dispatch(assignSkill(skill));
                        // alert(skill.name);  
                        props.setDisplay(false);
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

      {(props.activeCard?.name === props.entity.name) && props.activeCard !== null && !props.display && (
        <>
          <span className="absolute inset-0 flex top-0 left-full -translate-x-full -translate-y-0 w-2/12 h-1/6 p-10 z-10">
            <div className="flex flex-col size-full justify-center items-center border-red-600 border-2 rounded-2xl">
              <p className="font-mono font-bold text-2xl text-red-600">{`ATTACKING`}</p>
            </div>
          </span>
        </>
      )}

    </>
  );
};

export default Card;
