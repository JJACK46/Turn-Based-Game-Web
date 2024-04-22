import { useState } from "react";
import { convertNumberToPercentage, getColorByHp } from "../../helpers/styles";
import { BASE_DELAY_SKILL, BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useUIStore } from "../../stores/uiStore";
import { isEntityInEntities } from "../../helpers/entity";
import atkSymbol from "@/assets/svgs/sword-symbol.svg";
import defSymbol from "@/assets/svgs/shield-symbol.svg";
import { useGameStore } from "../../stores/gameStore";
import { CardOverlayFX } from "./CardOverlayFX";
import { CardBackgroundFX } from "./CardBackgroundFX";
import { Entity } from "@/classes/entity";

const Card = (props: { instance: Entity }) => {
  const { instance } = props;
  const {
    infoMarkedEntities,
    infoIndicator: { currentEntity, selectedSkill, targetEntities },
    methodsIndicator: {
      setCurrentEntity,
      usingSkillToTarget,
      setTargets,
      setSelectSkill,
    },
    infoGame: { turn },
    infoField: { players, enemies },
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

  function handleActionStyle() {
    if (currentEntity === instance) {
      return "0px 0px 40px 0px #0ff";
    }
    if (targetEntities?.includes(instance)) {
      return "0px 0px 40px 0px red";
    }
    return "";
  }

  function handleSkill() {
    if (selectedSkill && currentEntity) {
      let success = false;
      setEntityPerforming(true);
      if (selectedSkill.isAttackSkill) {
        if (selectedSkill === currentEntity.skills.traitSkill) {
          setTimeout(() => {
            success = usingSkillToTarget({
              skill: selectedSkill,
              targetEntity: instance,
              sourceEntity: currentEntity,
              targetEntities: enemies,
              sourceEntities: players,
              isEnemyAction: false,
            });

            if (success) {
              setSelectSkill(null);
              setCurrentEntity(null);
              setTargets(null);
              setEntityPerforming(false);
              markEntityTakenAction(currentEntity);
              decreaseAction(1);
            } else {
              setEntityPerforming(false);
            }
          }, BASE_DELAY_SKILL);
        } else {
          //normal attack
          setTimeout(() => {
            success = usingSkillToTarget({
              skill: selectedSkill,
              targetEntity: instance,
              sourceEntity: currentEntity,
              targetEntities: enemies,
              sourceEntities: players,
              isEnemyAction: false,
            });
            if (success) {
              setSelectSkill(null);
              setCurrentEntity(null);
              setTargets(null);
              setEntityPerforming(false);
              markEntityTakenAction(currentEntity);
              decreaseAction(1);
            } else {
              setEntityPerforming(false);
            }
          }, 100);
        }
      } else {
        //buff team
        setTimeout(() => {
          success = usingSkillToTarget({
            targetEntity: instance,
            skill: selectedSkill,
            sourceEntity: currentEntity!,
            sourceEntities: players,
            targetEntities: players,
            isEnemyAction: false,
          });
          if (success) {
            setSelectSkill(null);
            setCurrentEntity(null);
            setTargets(null);
            setEntityPerforming(false);
            markEntityTakenAction(currentEntity);
            decreaseAction(1);
          } else {
            setEntityPerforming(false);
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
                  // setTargetEntity(instance);
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
        <CardBackgroundFX entity={instance}>
          <CardOverlayFX entity={instance} />
          <div
            className={`w-24 h-fit rounded-md items-center justify-around border transition overflow-hidden
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
                      s.isNegative ? "text-red-800" : "text-cyan-500"
                    }  w-fit rounded-full px-1`}
                  >
                    {s.name}: {s.duration}
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
            <div className="w-full relative bg-white/20">
              <div
                rel="HP bar"
                className="text-xs font-medium text-center h-4 overflow-hidden"
                style={{
                  backgroundColor: getColorByHp(strCurrentHP),
                  width: strCurrentHP,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center w-full">
                  <p>{strCurrentHP}</p>
                </div>
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
                  className={`text-xs font-medium text-center rounded-es-md rounded-ee-md leading-none bg-blue-900 h-4`}
                  style={{ width: strCurrentMP }}
                >
                  <div className="absolute inset-0 flex items-center justify-center w-full">
                    <p>{strCurrentMP}</p>
                  </div>
                </div>
              </div>
            )}
            {instance.isUseEnergy && !instance.isUseHybrid && (
              <div className="w-full relative overflow-hidden bg-white/20">
                <div
                  rel="EP bar"
                  className="text-xs font-medium text-center rounded-es-md rounded-ee-md leading-none bg-violet-900 h-4"
                  style={{ width: strCurrentEP }}
                >
                  <div className="absolute inset-0 flex items-center justify-center w-full">
                    <p>{strCurrentEP}</p>
                  </div>
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
                {instance.defense.value > 0 && (
                  <p
                    className={`${
                      instance.getDifferentValueFromInitial({ stat: "def" }) > 0
                        ? "text-cyan-400"
                        : ""
                    }`}
                  >
                    {`DEF`}:{" "}
                    {`${instance.defense.value} ${
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
        </CardBackgroundFX>
        {/* {isHoveredCard && <p className="text-xs">Index: {instance.index}</p>} */}
        {isHoveredCard && <p className="text-xs">Level: {instance.level}</p>}
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
