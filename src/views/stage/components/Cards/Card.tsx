import { useState } from "react";
import { EntityInstance } from "../../../../classes/entity";
import { convertNumberToPercentage, getColorByHp } from "../../helpers/styles";

import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useGameStore } from "../../stores/GameStore";
import { useUIStore } from "../../stores/UI_Store";
// import {
//   getDifferentDefendValue,
//   isEntityInEntities,
//   isEntityMainEP,
//   isEntityOverDefend,
// } from "../helpers/entity";
import { StatusEnum } from "@/data/status";
import { isEntityInEntities } from "../../helpers/entity";

const Card = (props: { instance: EntityInstance }) => {
  const { instance } = props;
  const {
    infoMarkedEntities,
    infoIndicator: {
      currentEntity: currentEntityData,
      targetEntity: targetEntityData,
      selectedSkill,
    },
    methodsIndicator: {
      setCurrentEntity,
      setTargetEntity,
      usingSkillToTargetEntity,
      resetCurrentEntity,
      resetSelectSkill,
      resetTargetEntity,
    },
    infoGame: { turn },
    infoField: { playersFrontRow, enemiesFrontRow },
    methodsGame: { decreaseAction },
    methodsMark: { markEntityTakenAction },
  } = useGameStore();
  const { setActionWarning, setTurnWarning, setSkillOverlay, setInfoOverlay } =
    useUIStore();

  const strCurrentHP = convertNumberToPercentage(
    instance.entity.health,
    instance.entity.maxHealth
  );
  const strCurrentMEP = convertNumberToPercentage(
    instance.entity.energy > -1 ? instance.entity.energy : instance.entity.mana,
    instance.entity.maxManaEnergyPower
  );

  const [isHoveredCard, setIsHoveredCard] = useState(false);
  const wasAction = () => {
    return isEntityInEntities(instance.entity, infoMarkedEntities.takenAction);
  };

  function handleColorActionCard() {
    if (currentEntityData?.entity === instance.entity) {
      return "0px 0px 40px 0px #0ff";
    }
    if (targetEntityData?.entity === instance.entity) {
      return "0px 0px 40px 0px red";
    }
    return "";
  }

  function handleSkill() {
    if (selectedSkill && currentEntityData) {
      const success = usingSkillToTargetEntity({
        skillInstance: selectedSkill,
        targetEntity: instance,
        sourceEntity: currentEntityData,
        targetEntities: enemiesFrontRow,
        sourceEntities: playersFrontRow,
        isEnemyAction: false,
      });
      setTimeout(() => {
        resetSelectSkill();
        resetCurrentEntity();
        resetTargetEntity();
      }, 700);
      if (success) {
        markEntityTakenAction(currentEntityData.entity);
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
          if (instance.entity.health > 0) {
            //when click on player card
            if (instance.entity.playable) {
              if (turn === "player") {
                if (!wasAction()) {
                  setCurrentEntity(instance);
                  setSkillOverlay(true);
                } else {
                  setActionWarning(true);
                }
              } else {
                setTurnWarning(true);
              }
            } else {
              //when click on enemy card
              if (currentEntityData) {
                //select player card already
                setTargetEntity(instance);
                handleSkill();
              } else {
                //not select player card yet
                setCurrentEntity(instance);
                setInfoOverlay(true);
              }
            }
          } else {
            if (turn === "player") {
              setCurrentEntity(instance);
            }
            setInfoOverlay(true);
          }
        }}
      >
        <div
          rel="card-wrapper"
          className={`p-2 rounded-lg transition ${
            instance.hasOverDefend() ? "bg-gray-600" : ""
          }`}
        >
          <div
            className="w-24 h-fit rounded-md items-center justify-around hover:scale-110 hover:w-28 border transition"
            style={{
              opacity: instance.entity.status === StatusEnum.INACTIVE ? 0.2 : 1,
              borderColor: wasAction() ? "gray" : "",
              boxShadow: handleColorActionCard(),
            }}
          >
            <p
              className={`border-white border-b w-full p-1 ${
                instance.entity.name.length > 10 ? "text-xs" : ""
              }`}
            >
              {instance.entity.name}
            </p>
            <img
              className="object-cover"
              width={500}
              height={494}
              src={`${BASE_URL_IMAGE_ENTITIES}/${instance.entity.imageUrl}`}
              alt="no image"
            />
            <div
              rel="stats"
              className="grid grid-cols-2 justify-items-start px-2 text-sm bg-black"
            ></div>
            <hr />
            <div className="w-full bg-gray-200 relative rounded-lg dark:bg-gray-700">
              <div
                rel="HP bar"
                className="text-xs font-medium text-blue-100 text-center p-0.5 leading-none "
                style={{
                  backgroundColor: getColorByHp(strCurrentHP),
                  width: strCurrentHP,
                }}
              >
                {strCurrentHP}
              </div>
              {instance.entity.maxManaEnergyPower > 0 && (
                <div
                  rel="MP/EP bar"
                  className=" text-xs font-medium text-blue-100 text-center leading-none rounded-es-lg rounded-ee-lg"
                  style={{
                    backgroundColor: instance.isUseEnergyPower()
                      ? "rgb(75, 30, 130)"
                      : "rgb(28, 85, 156)",
                    width: strCurrentMEP,
                  }}
                >
                  {strCurrentMEP}
                </div>
              )}
              {isHoveredCard && (
                <div className="text-xs text-left mx-2 ">
                  <p>
                    HP: {instance.entity.health} / {instance.entity.maxHealth}
                  </p>
                  <p>
                    {instance.entity.energy > 0 ? "EP" : "MP"}:{" "}
                    {instance.entity.energy > 0
                      ? instance.entity.energy
                      : instance.entity.mana}{" "}
                    / {instance.entity.maxManaEnergyPower}
                  </p>
                  {instance.entity.maxDefendPower && (
                    <p
                      className={`${
                        instance.getDifferentValueFromInitial({ stat: "def" }) >
                        0
                          ? "text-cyan-400"
                          : ""
                      }`}
                    >
                      {`DEF`}:{" "}
                      {`${instance.entity.defendPower ?? ""} ${
                        instance.getDifferentValueFromInitial({ stat: "def" }) >
                        0
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
        </div>
        <p className="text-xs">{instance.position}</p>
      </button>
    </>
  );
};

export default Card;
