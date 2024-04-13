import { useState } from "react";
import { EntityDetails } from "../../../classes/entity";
import { convertNumberToPercentage, getColorByHp } from "../helpers/styles";

import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useGameStore } from "../stores/GameStore";
import { useUIStore } from "../stores/UI_Store";
import {
  getDifferentDefendValue,
  isEntityInEntities,
  isEntityMainEP,
  isEntityOverDefend,
} from "../helpers/entity";
import { StatusEnum } from "@/data/status";

const Card = (thisCard: EntityDetails) => {
  const {
    setCurrentEntity,
    setTargetEntity,
    usingSkillToTargetEntity,
    resetSelectSkill,
    resetCurrentEntity,
    resetTargetEntity,
    turn,
    entitiesTakenAction,
    enemiesFrontRow,
    playersFrontRow,
    selectedSkill,
    currentEntityData,
    targetEntityData,
    decreaseAction,
    markEntityTakenAction,
  } = useGameStore();
  const { setActionWarning, setTurnWarning, setSkillOverlay, setInfoOverlay } =
    useUIStore();

  const strCurrentHP = convertNumberToPercentage(
    thisCard.entity.healthPower,
    thisCard.entity.maxHealthPower
  );
  const strCurrentMEP = convertNumberToPercentage(
    thisCard.entity.energyPower > -1
      ? thisCard.entity.energyPower
      : thisCard.entity.manaPower,
    thisCard.entity.maxManaEnergyPower
  );

  const [isHoveredCard, setIsHoveredCard] = useState(false);
  const wasAction = () => {
    return isEntityInEntities(thisCard.entity, entitiesTakenAction);
  };

  function handleColorActionCard() {
    if (currentEntityData?.entity === thisCard.entity) {
      return "0px 0px 40px 0px #0ff";
    }
    if (targetEntityData?.entity === thisCard.entity) {
      return "0px 0px 40px 0px red";
    }
    return "";
  }

  function handleSkill() {
    if (selectedSkill && currentEntityData) {
      const success = usingSkillToTargetEntity({
        skill: selectedSkill,
        targetEntityData: thisCard,
        sourceEntityData: currentEntityData,
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
          if (thisCard.entity.healthPower > 0) {
            //when click on player card
            if (thisCard.entity.playable) {
              if (turn === "player") {
                if (!wasAction()) {
                  setCurrentEntity(thisCard);
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
                setTargetEntity(thisCard);
                handleSkill();
              } else {
                //not select player card yet
                setCurrentEntity(thisCard);
                setInfoOverlay(true);
              }
            }
          } else {
            if (turn === "player") {
              setCurrentEntity(thisCard);
            }
            setInfoOverlay(true);
          }
        }}
      >
        <div
          rel="card-wrapper"
          className={`p-2 rounded-lg ${
            isEntityOverDefend(thisCard.entity) ? "bg-gray-600" : ""
          }`}
        >
          <div
            className="w-24 h-fit rounded-md items-center justify-around hover:scale-110 hover:w-28 border transition"
            style={{
              opacity: thisCard.entity.status === StatusEnum.INACTIVE ? 0.2 : 1,
              borderColor: wasAction() ? "gray" : "",
              boxShadow: handleColorActionCard(),
            }}
          >
            <p
              className={`border-white border-b w-full p-1 ${
                thisCard.entity.name.length > 10 ? "text-xs" : ""
              }`}
            >
              {thisCard.entity.name}
            </p>
            <img
              className="object-cover"
              width={500}
              height={494}
              src={`${BASE_URL_IMAGE_ENTITIES}/${thisCard.entity.imageUrl}`}
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
              {thisCard.entity.maxManaEnergyPower > 0 && (
                <div
                  rel="MP/EP bar"
                  className=" text-xs font-medium text-blue-100 text-center leading-none rounded-es-lg rounded-ee-lg"
                  style={{
                    backgroundColor: isEntityMainEP(thisCard.entity)
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
                    HP: {thisCard.entity.healthPower} /{" "}
                    {thisCard.entity.maxHealthPower}
                  </p>
                  <p>
                    {thisCard.entity.energyPower > 0 ? "EP" : "MP"}:{" "}
                    {thisCard.entity.energyPower > 0
                      ? thisCard.entity.energyPower
                      : thisCard.entity.manaPower}{" "}
                    / {thisCard.entity.maxManaEnergyPower}
                  </p>
                  {thisCard.entity.maxDefendPower && (
                    <p
                      className={`${
                        getDifferentDefendValue(thisCard.entity) > 0
                          ? "text-cyan-400"
                          : ""
                      }`}
                    >
                      {`DEF`}:{" "}
                      {`${thisCard.entity.defendPower ?? ""} ${
                        getDifferentDefendValue(thisCard.entity) > 0
                          ? `(+${getDifferentDefendValue(thisCard.entity)})`
                          : ""
                      }`}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="text-xs">{thisCard.position}</p>
      </button>
    </>
  );
};

export default Card;
