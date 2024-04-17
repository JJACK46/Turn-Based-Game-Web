import { useState } from "react";
import { EntityInstance } from "../../../../classes/entity";
import { convertNumberToPercentage, getColorByHp } from "../../helpers/styles";

import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useUIStore } from "../../stores/uiStore";
import { isEntityInEntities } from "../../helpers/entity";
import atkSymbol from "@/assets/svgs/sword-symbol.svg";
import defSymbol from "@/assets/svgs/shield-symbol.svg";
import { useGameStore } from "../../stores/gameStore";

const Card = (props: { instance: EntityInstance }) => {
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
    infoField: { playersFrontRow, enemiesFrontRow },
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
    instance.HP,
    instance.entity.maxHealth
  );
  const strCurrentMP = convertNumberToPercentage(
    instance.MP,
    instance.entity.maxManaEnergyPower
  );

  const strCurrentEP = convertNumberToPercentage(
    instance.EP,
    instance.entity.maxManaEnergyPower
  );

  const [isHoveredCard, setIsHoveredCard] = useState(false);
  const wasAction = () => {
    return isEntityInEntities(instance, infoMarkedEntities.takenAction);
  };

  const [currentHP, setCurrentHP] = useState(instance.HP);

  function handleColorActionCard() {
    if (currentEntity?.entity === instance.entity) {
      return "0px 0px 40px 0px #0ff";
    }
    // if (targetEntity?.entity === instance.entity) {
    //   return "0px 0px 40px 0px red";
    // }
    if (instance.HP < currentHP) {
      setTimeout(() => {
        setCurrentHP(instance.HP);
      }, 1200);
      return "0px 0px 40px 0px red";
    }

    return "";
  }

  function handleSkill() {
    if (selectedSkill && currentEntity) {
      const success = usingSkillToTargetEntity({
        skillInstance: selectedSkill,
        targetEntity: instance,
        sourceEntity: currentEntity,
        targetEntities: enemiesFrontRow,
        sourceEntities: playersFrontRow,
        isEnemyAction: false,
      });
      setTimeout(() => {
        resetSelectSkill();
        resetCurrentEntity();
        resetTargetEntity();
        setEntityPerforming(false);
      }, 700);
      if (success) {
        markEntityTakenAction(currentEntity);
        decreaseAction(1);
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
                      if (targetEntity) {
                        setEntityPerforming(true);
                      }
                      setCurrentEntity(instance);
                      setSkillOverlay(true);
                    } else {
                      alert("wait entity performing!");
                      setTimeout(() => {
                        setEntityPerforming(false);
                      }, 800);
                    }
                  } else {
                    //use skill to friend
                    alert("pre use skill to friend");
                    // usingSkillToTargetEntity({
                    //   targetEntity: instance,
                    //   skillInstance: selectedSkill,
                    //   sourceEntity: currentEntity!,
                    //   sourceEntities: instance,
                    //   targetEntities: instance.selfRow,
                    //   isEnemyAction: false,
                    // });
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
              if (!isEntityPerforming) {
                if (currentEntity) {
                  //select player card already
                  setTargetEntity(instance);
                  setEntityPerforming(true);
                  handleSkill();
                } else {
                  //not select player card yet
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
          rel="card-wrapper"
          className={`p-2 rounded-lg transition ${
            instance.hasOverDefend ? "bg-gray-500" : ""
          }
          ${isHoveredCard ? "scale-110" : ""}`}
        >
          <div
            className={`w-24 h-fit rounded-md items-center justify-around hover:w-32 border transition 
            ${wasAction() ? "border-transparent" : ""}
             ${instance.isBoss ? "bg-black" : "bg-slate-800"}
            `}
            style={{
              opacity: !instance.isAlive ? 0.2 : 1,
              boxShadow: handleColorActionCard(),
            }}
          >
            {isHoveredCard && instance.hasActiveSkill && (
              <div className="flex flex-col justify-center items-center mt-2">
                {instance.activeSkills.map((s, index) => (
                  <p
                    key={index}
                    className="text-xs font-medium bg-cyan-500 w-fit rounded-full px-1"
                  >
                    {s.name}
                  </p>
                ))}
              </div>
            )}
            <p
              className={`border-white border-b w-full p-1 
              ${instance.entity.name.length > 10 ? "text-xs" : ""}
              ${instance.isBoss ? "text-red-600 font-medium" : ""}
              `}
            >
              {instance.entity.name}
            </p>
            <img
              className="object-cover"
              src={`${BASE_URL_IMAGE_ENTITIES}/${instance.entity.imageUrl}`}
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
                  className={`text-xs font-medium text-center rounded-es-lg leading-none bg-violet-900`}
                  style={{ width: strCurrentEP }}
                >
                  {strCurrentEP}
                </div>
                <div
                  rel="MANA bar"
                  className={`text-xs font-medium text-center rounded-ee-lg leading-none bg-blue-900`}
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
                  className={`text-xs font-medium text-center rounded-es-lg rounded-ee-lg leading-none bg-blue-900`}
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
                  className="text-xs font-medium text-center rounded-es-lg rounded-ee-lg leading-none bg-violet-900 "
                  style={{ width: strCurrentEP }}
                >
                  {strCurrentEP}
                </div>
              </div>
            )}
            {isHoveredCard && (
              <div className="text-xs text-left mx-2 ">
                <p>ATK: {instance.ATK}</p>
                <p>
                  HP: {instance.HP} / {instance.entity.maxHealth}
                </p>
                {instance.isUseHybrid && (
                  <p>
                    MEP: {instance.MANERGY} /{" "}
                    {instance.entity.maxManaEnergyPower * 2}
                  </p>
                )}
                {instance.isUseEnergy && !instance.isUseHybrid && (
                  <p>
                    EP: {instance.EP} / {instance.entity.maxManaEnergyPower}
                  </p>
                )}
                {instance.isUseMana && !instance.isUseHybrid && (
                  <p>
                    MP: {instance.MP} / {instance.entity.maxManaEnergyPower}
                  </p>
                )}
                {instance.evasion > 0 && <p>EV: {instance.evasion * 100}%</p>}
                {instance.entity.maxDefendPower && (
                  <p
                    className={`${
                      instance.getDifferentValueFromInitial({ stat: "def" }) > 0
                        ? "text-cyan-400"
                        : ""
                    }`}
                  >
                    {`DEF`}:{" "}
                    {`${instance.entity.defend ?? ""} ${
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
