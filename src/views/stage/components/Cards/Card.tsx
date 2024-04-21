import { useState } from "react";
import { Entity } from "../../../../classes/entity";
import { convertNumberToPercentage, getColorByHp } from "../../helpers/styles";

import { BASE_DELAY_SKILL, BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useUIStore } from "../../stores/uiStore";
import { isEntityInEntities } from "../../helpers/entity";
import atkSymbol from "@/assets/svgs/sword-symbol.svg";
import defSymbol from "@/assets/svgs/shield-symbol.svg";
import { useGameStore } from "../../stores/gameStore";
import { PositionEnum } from "@/data/enums/positions";

const Card = (props: { instance: Entity }) => {
  const { instance } = props;
  const {
    infoMarkedEntities,
    infoIndicator: { currentEntity, targetEntity, selectedSkill },
    methodsIndicator: {
      setCurrentEntity,
      setTargetEntity,
      usingSkillToTarget: usingSkillToTargetEntity,
      resetCurrentEntity,
      resetSelectSkill,
      resetTargetEntity,
    },
    infoGame: { turn },
    infoField: { playersFrontRow, enemiesFrontRow, playersBackRow },
    methodsGame: { decreaseAction },
    methodsMark: { markEntityTakenAction },
  } = useGameStore();
  const {
    setActionWarning,
    setTurnWarning,
    setSkillOverlay,
    setInfoOverlay,
    setEntityPerforming,
    isEntityPerforming,
  } = useUIStore();

  const strCurrentHP = convertNumberToPercentage(
    instance.health.value,
    instance.health.max
  );
  const strCurrentMP = convertNumberToPercentage(
    instance.capacity?.mana?.value ?? 0,
    instance.capacity?.mana?.max ?? 0
  );

  const strCurrentEP = convertNumberToPercentage(
    instance.capacity?.energy?.value ?? 0,
    instance.capacity?.energy?.max ?? 0
  );

  const [isHoveredCard, setIsHoveredCard] = useState(false);
  const wasAction = () => {
    return isEntityInEntities(instance, infoMarkedEntities.takenAction);
  };

  const [currentHP, setCurrentHP] = useState(instance.health.max);

  function handleActionStyle() {
    if (currentEntity === instance) {
      return "0px 0px 40px 0px #0ff";
    }
    if (targetEntity === instance) {
      return "0px 0px 40px 0px red";
    }
    return "";
  }

  function handleAttackedStyle() {
    if (instance.health.value < currentHP) {
      setTimeout(() => {
        setCurrentHP(instance.health.value);
      }, 150);
      return "opacity-75 scale-95";
    }
  }

  function handleSkill() {
    if (selectedSkill && currentEntity) {
      let success = false;
      setEntityPerforming(true);
      if (selectedSkill.isAttackSkill) {
        if (selectedSkill === currentEntity.skills.traitSkill) {
          setTimeout(() => {
            success = usingSkillToTargetEntity({
              skill: selectedSkill,
              targetEntity: instance,
              sourceEntity: currentEntity,
              targetEntities: enemiesFrontRow,
              sourceEntities: playersFrontRow,
              isEnemyAction: false,
            });

            if (success) {
              resetSelectSkill();
              resetCurrentEntity();
              resetTargetEntity();
              setEntityPerforming(false);
              markEntityTakenAction(currentEntity);
              decreaseAction(1);
            }
          }, BASE_DELAY_SKILL);
        } else {
          //normal attack
          setTimeout(() => {
            success = usingSkillToTargetEntity({
              skill: selectedSkill,
              targetEntity: instance,
              sourceEntity: currentEntity,
              targetEntities: enemiesFrontRow,
              sourceEntities: playersFrontRow,
              isEnemyAction: false,
            });
            if (success) {
              resetSelectSkill();
              resetCurrentEntity();
              resetTargetEntity();
              setEntityPerforming(false);
              markEntityTakenAction(currentEntity);
              decreaseAction(1);
            }
          }, 100);
        }
      } else {
        //buff team
        setTimeout(() => {
          success = usingSkillToTargetEntity({
            targetEntity: instance,
            skill: selectedSkill,
            sourceEntity: currentEntity!,
            sourceEntities:
              instance.position === PositionEnum.FRONT
                ? playersFrontRow
                : playersBackRow!,
            targetEntities:
              instance.position === PositionEnum.FRONT
                ? playersFrontRow
                : playersBackRow!,
            isEnemyAction: false,
          });
          if (success) {
            resetSelectSkill();
            resetCurrentEntity();
            resetTargetEntity();
            setEntityPerforming(false);
            markEntityTakenAction(currentEntity);
            decreaseAction(1);
          }
        }, 100);
      }
    }
  }

  return (
    <>
      <button
        onMouseEnter={() => setIsHoveredCard(true)}
        onMouseLeave={() => setIsHoveredCard(false)}
        onClick={() => {
          //entity not dead
          if (instance.isAlive) {
            //when click on player card
            if (instance.playable) {
              if (turn === "player") {
                if (!wasAction()) {
                  if (!selectedSkill) {
                    if (!isEntityPerforming) {
                      setCurrentEntity(instance);
                      setSkillOverlay(true);
                    } else {
                      alert("wait entity performing!");
                      setTimeout(() => {
                        setEntityPerforming(false);
                      }, BASE_DELAY_SKILL / 3);
                    }
                  } else {
                    //use skill to friend
                    if (!selectedSkill.isAttackSkill) {
                      handleSkill();
                    }
                  }
                } else {
                  setActionWarning(true);
                }
              } else {
                setTurnWarning(true);
              }
            } else {
              //when click on enemy card
              //prevent spam click
              if (!isEntityPerforming && turn === "player") {
                if (currentEntity) {
                  //select player card already (attacking)
                  setTargetEntity(instance);
                  setEntityPerforming(true);
                  handleSkill();
                } else {
                  //not select player card yet (open info)
                  setCurrentEntity(instance);
                  setInfoOverlay(true);
                }
              }
            }
          } else {
            if (turn === "player" && instance.playable) {
              setCurrentEntity(instance);
              setInfoOverlay(true);
            }
          }
        }}
      >
        <div
          rel="card-bg"
          className={`relative p-2 rounded-lg transition  ${
            instance.hasOverDefend ? "animate-shimmerBuffDef" : ""
          }
          ${handleAttackedStyle()} 
         `}
        >
          <div
            rel="card-warper"
            className={`z-10 absolute inset-0 rounded-lg ${
              !instance.isCanAction ? "animate-shimmerStun opacity-35" : ""
            } size-full`}
          ></div>
          <div
            rel="card"
            className={`w-24 h-fit rounded-md items-center hover:scale-110 hover:w-32 justify-around border transition overflow-hidden
            ${wasAction() ? "border-transparent" : ""}
             ${instance.isBoss ? "bg-black" : "bg-slate-800"}
            `}
            style={{
              opacity: !instance.isAlive ? 0.2 : 1,
              boxShadow: handleActionStyle(),
            }}
          >
            {isHoveredCard && instance.hasEffectedSkill && (
              <div className="flex flex-col justify-center items-center mt-2">
                {instance.effectedSkills?.map((s, index) => (
                  <p
                    key={index}
                    className={`only:text-xs italic capitalize font-medium ${
                      s.canAction ? "text-cyan-500" : "text-violet-700"
                    }  w-fit rounded-full px-1`}
                  >
                    {s.name}
                  </p>
                ))}
              </div>
            )}
            <p
              className={`border-white border-b w-full p-1 
              ${instance.name.length > 10 ? "text-xs" : ""}
              ${instance.isBoss ? "text-red-600 font-medium" : ""}
              `}
            >
              {instance.name}
            </p>
            <img
              className="object-cover"
              src={`${BASE_URL_IMAGE_ENTITIES}/${instance.imageUrl}`}
              alt="no image"
              draggable={false}
            />
            <hr />
            <div className="w-full relative bg-white/20 ">
              <div
                rel="HP bar"
                className="text-xs font-medium text-center"
                style={{
                  backgroundColor: getColorByHp(strCurrentHP),
                  width: strCurrentHP,
                }}
              >
                {strCurrentHP}
              </div>
            </div>
            {instance.isUseHybrid && (
              <div
                className={`w-full relative flex flex-row bg-white/20 overflow-hidden`}
              >
                <div
                  rel="EP bar"
                  className={`text-xs font-medium text-center rounded-es-md leading-none bg-violet-900`}
                  style={{ width: strCurrentEP }}
                >
                  {strCurrentEP}
                </div>
                <div
                  rel="MANA bar"
                  className={`text-xs font-medium text-center rounded-ee-md leading-none bg-blue-900`}
                  style={{ width: strCurrentMP }}
                >
                  {strCurrentMP}
                </div>
              </div>
            )}
            {instance.isUseMana && !instance.isUseHybrid && (
              <div className={`w-full relative bg-white/20 overflow-hidden`}>
                <div
                  rel="MP bar"
                  className={`text-xs font-medium text-center rounded-es-md rounded-ee-md leading-none bg-blue-900`}
                  style={{ width: strCurrentMP }}
                >
                  {strCurrentMP}
                </div>
              </div>
            )}
            {instance.isUseEnergy && !instance.isUseHybrid && (
              <div className="w-full relative overflow-hidden bg-white/20">
                <div
                  rel="EP bar"
                  className="text-xs font-medium text-center rounded-es-md rounded-ee-md leading-none bg-violet-900 "
                  style={{ width: strCurrentEP }}
                >
                  {strCurrentEP}
                </div>
              </div>
            )}
            {isHoveredCard && (
              <div className="text-xs text-left mx-2 ">
                <p>ATK: {instance.attack.value}</p>
                <p>
                  HP: {instance.health.value} / {instance.health.max}
                </p>
                {instance.isUseHybrid && <p>MEP: {instance.allCapacity}</p>}
                {instance.isUseEnergy && !instance.isUseHybrid && (
                  <p>
                    EP: {instance.capacity?.energy?.value} /{" "}
                    {instance.capacity?.energy?.max}
                  </p>
                )}
                {instance.isUseMana && !instance.isUseHybrid && (
                  <p>
                    MP: {instance.capacity?.mana?.value} /{" "}
                    {instance.capacity?.mana?.max}
                  </p>
                )}
                {instance.evasion > 0 && <p>EV: {instance.evasion * 100}%</p>}
                {instance.defend.value > 0 && (
                  <p
                    className={`${
                      instance.getDifferentValueFromInitial({ stat: "def" }) > 0
                        ? "text-cyan-400"
                        : ""
                    }`}
                  >
                    {`DEF`}:{" "}
                    {`${instance.defend.value} ${
                      instance.getDifferentValueFromInitial({ stat: "def" }) > 0
                        ? `(+${instance.getDifferentValueFromInitial({
                            stat: "def",
                          })})`
                        : ""
                    }`}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        {isHoveredCard && (
          <p className="text-xs p-2">Index: {instance.index}</p>
        )}
        {/* action symbol */}
        <div className="flex gap-2 justify-around">
          {selectedSkill?.isAttackSkill && currentEntity === instance && (
            <div className="flex flex-col justify-center items-center gap-1">
              <img src={atkSymbol} width={18} alt="attacking" />
              <p className="text-xs">{selectedSkill.name}</p>
            </div>
          )}
          {selectedSkill?.isDefendSkill && currentEntity === instance && (
            <div className="flex flex-col justify-center items-center gap-1">
              <img src={defSymbol} width={18} alt="defending" />
              <p className="text-xs">{selectedSkill.name}</p>
            </div>
          )}
        </div>
      </button>
    </>
  );
};

export default Card;
