import { useContext, useState } from "react";
import { EntityDetails } from "../../../models/entity";
import { convertNumberToPercentage, getColorByHp } from "../helpers/styles";
import _ from "lodash";
import {
  StageContext,
  StageContextType,
} from "../contexts/StageContextProvider";

const Card = (entityData: EntityDetails) => {
  const {
    currentEntityData,
    targetEntityData,
    entitiesTakenAction,
    turn,
    setTargetEntity,
    usingSkillToTargetEntity,
    setCurrentEntity,
    openActionOverlay,
    decreaseAction,
    resetSelectSkill,
    resetCurrentEntity,
    resetTargetEntity,
    selectedSkill,
    getAliveEntities,
    enemiesFrontRow,
    playersFrontRow,
  } = useContext(StageContext) as StageContextType;

  const [maxHP] = useState(entityData.entity.healthPower);
  const [maxMP] = useState(
    entityData.entity.energyPower ?? entityData.entity.manaPower
  );
  const strCurrentHP = convertNumberToPercentage(
    entityData.entity.healthPower,
    maxHP
  );
  const strCurrentMP = convertNumberToPercentage(
    entityData.entity.manaPower,
    maxMP
  );
  const [isHoveredCard, setIsHoveredCard] = useState(false);
  const wasAction = () =>
    entitiesTakenAction.some((entity) => _.isEqual(entity, entityData.entity));

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
        sourceEntities: getAliveEntities(playersFrontRow),
        isEnemyAction: false,
      });
      setTimeout(() => {
        resetSelectSkill();
        resetCurrentEntity();
        resetTargetEntity();
      }, 700);
      decreaseAction(1);
    }
    // dispatch(setSelectSkill(null));
    // dispatch(markEntityTakenAction(entityStore.currentEntity!.entity));
    // dispatch(closeDisplay());
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
                  // dispatch(
                  //   setCurrentEntity({
                  //     entity: props.entity,
                  //     position: props.position,
                  //     site: props.site,
                  //   })
                  // );
                  // dispatch(openActionOverlay());
                  // dispatch(openDisplay());
                } else {
                  alert("this entity was taken action"); //+ show some info
                }
              } else {
                alert("is not your turn");
              }
            } else {
              //when click on enemy card
              setTargetEntity(entityData);
              if (currentEntityData) {
                //select player card already
                handleSkill();
              } else {
                //not select player card yet
                //view info enemy's card
                alert("some info \n" + JSON.stringify(entityData.entity));
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
            src={`src/assets/entities/${entityData.entity.imageUrl}`}
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
                  backgroundColor: "rgb(28, 85, 156)",
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
      </button>

      {/* {lastHitDamage > 0 && (
        <span className="absolute top-32 right-10 p-2 border-red-600 border-2 rounded z-10">
          <p className="font-mono text-sm">
            Hits Damage: {lastHitDamage}
          </p>
          <p className="font-mono text-xs">
            Total Damage: {totalHitDamage}
          </p>
        </span>
      )} */}

      {/* {selectedSkill && (
        
      )} */}
    </>
  );
};

export default Card;
