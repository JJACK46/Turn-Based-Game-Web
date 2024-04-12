import { useState } from "react";
import { EntityDetails } from "../../../models/entity";
import { convertNumberToPercentage, getColorByHp } from "../helpers/styles";

import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useStageContext } from "../contexts/useStageContext";
import { useGameContext } from "../contexts/useGameContext";
import { useEntityContext } from "../contexts/useEntityContext";

const Card = (entityData: EntityDetails) => {
  const {
    openActionOverlay,
    openInfoOverlay,
    setActionWarning,
    setTurnWarning,
  } = useGameContext();
  const {
    setCurrentEntity,
    setTargetEntity,
    usingSkillToTargetEntity,
    resetSelectSkill,
    resetCurrentEntity,
    resetTargetEntity,
  } = useEntityContext();
  const {
    turn,
    entitiesTakenAction,
    enemiesFrontRow,
    playersFrontRow,
    selectedSkill,
    currentEntityData,
    targetEntityData,
    decreaseAction,
    markEntityTakenAction,
  } = useStageContext();

  const [maxHP] = useState(entityData.entity.healthPower);
  const [maxMP] = useState(
    entityData.entity.energyPower ?? entityData.entity.manaPower
  );
  const strCurrentHP = convertNumberToPercentage(
    entityData.entity.healthPower,
    maxHP
  );
  const strCurrentMP = convertNumberToPercentage(
    entityData.entity.energyPower ?? entityData.entity.manaPower,
    maxMP
  );

  const isEntityUseEP = () => {
    return entityData.entity.energyPower ? true : false;
  };
  const [isHoveredCard, setIsHoveredCard] = useState(false);
  const wasAction = () => {
    return entitiesTakenAction.includes(entityData.entity);
  };

  function handleColorActionCard() {
    if (currentEntityData?.entity === entityData.entity) {
      return "0px 0px 40px 0px #0ff";
    }
    if (targetEntityData?.entity === entityData.entity) {
      return "0px 0px 40px 0px red";
    }
    return "";
  }

  function handleSkill() {
    if (selectedSkill && currentEntityData) {
      usingSkillToTargetEntity({
        skill: selectedSkill,
        targetEntityData: entityData,
        targetEntities: enemiesFrontRow,
        sourceEntityData: currentEntityData,
        sourceEntities: playersFrontRow,
        isEnemyAction: false,
      });
      setTimeout(() => {
        resetSelectSkill();
        resetCurrentEntity();
        resetTargetEntity();
      }, 700);
      markEntityTakenAction(currentEntityData.entity);
      decreaseAction(1);
    }
  }

  return (
    <>
      <button
        onMouseEnter={() => setIsHoveredCard(true)}
        onMouseLeave={() => setIsHoveredCard(false)}
        onClick={() => {
          //entity not dead
          if (entityData.entity.healthPower > 0) {
            //when click on player card
            if (entityData.entity.playable) {
              if (turn === "player") {
                if (!wasAction()) {
                  setCurrentEntity(entityData);
                  openActionOverlay();
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
                setTargetEntity(entityData);
                handleSkill();
              } else {
                //not select player card yet
                setCurrentEntity(entityData);
                openInfoOverlay();
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
            opacity: entityData.entity.healthPower <= 0 ? 0.2 : 1,
            borderColor: wasAction() ? "gray" : "",
            boxShadow: handleColorActionCard(),
          }}
        >
          <p className="border-black border-b-2 w-full">
            {entityData.entity.name}
          </p>
          <img
            className="object-cover"
            width={500}
            height={494}
            src={`${BASE_URL_IMAGE_ENTITIES}/${entityData.entity.imageUrl}`}
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
              className=" text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-md "
              style={{
                backgroundColor: getColorByHp(strCurrentHP),
                width: strCurrentHP,
              }}
            >
              {strCurrentHP}
            </div>
            {maxMP > 0 && (
              <div
                rel="MP/EP bar"
                className=" text-xs font-medium text-blue-100 text-center leading-none rounded-md "
                style={{
                  backgroundColor: isEntityUseEP()
                    ? "rgb(75, 30, 130)"
                    : "rgb(28, 85, 156)",
                  width: strCurrentMP,
                }}
              >
                {strCurrentMP}
              </div>
            )}
            {isHoveredCard && (
              <div className="text-xs text-left mx-2 ">
                <p>
                  HP: {entityData.entity.healthPower} / {maxHP}
                </p>
                <p>
                  {entityData.entity.energyPower ? "EP" : "MP"}:{" "}
                  {entityData.entity.energyPower ?? entityData.entity.manaPower}{" "}
                  / {maxMP}
                </p>
              </div>
            )}
          </div>
        </div>
        <p>{entityData.position}</p>
      </button>
    </>
  );
};

export default Card;
