import CardInfo from "../Cards/CardInfo";
import { ActionWarning, TurnWarning } from "../Warning";
import { BASE_DELAY_SKILL, BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useGameStore } from "../../stores/gameStore";
import { useUIStore } from "../../stores/uiStore";
import { useEffect } from "react";

export default function UserOverlay() {
  const {
    infoGame: {
      turn,
      mapName,
      maxActions,
      availableActions,
      roundCount,
      speedEnemyTeam,
      speedPlayerTeam,
      isGameStart,
    },
    infoMarkedEntities,
    methodsGame: { startGame },
    infoDamage,
    infoIndicator: { currentEntity, targetEntity, selectedSkill },
    methodsIndicator: { resetCurrentEntity, setSelectSkill, resetSelectSkill },
    setInfoDamage,
  } = useGameStore();
  const uiLogic = useUIStore();
  const { blockedDamage, totalHitDamage, lastHitDamage, missed } = infoDamage;

  useEffect(() => {
    setTimeout(() => {
      setInfoDamage({
        totalHitDamage: 0,
        lastHitDamage: 0,
        blockedDamage: 0,
        missed: false,
      });
    }, BASE_DELAY_SKILL * 0.8);
  }, [setInfoDamage, totalHitDamage]);

  return (
    <>
      {!isGameStart && (
        <span
          rel="most top z-index"
          className="z-50 fixed h-full w-full bg-black/50 backdrop-blur inset-0 items-center justify-center flex"
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <h1 className="text-3xl uppercase">{mapName}</h1>
            <p className="text-xl uppercase">
              <q className="underline underline-offset-4">{turn}</q> start first
            </p>
            <div className="text-xs">
              <p>
                Player team speed: {speedPlayerTeam} / Enemy team speed:{" "}
                {speedEnemyTeam}
              </p>
            </div>
            <hr className="my-6 border w-screen" />
            <button
              className="rounded-lg p-2 text-2xl bg-orange-600 uppercase border-2 border-transparent hover:border-white"
              onClick={() => {
                startGame();
              }}
            >
              battle
            </button>
          </div>
        </span>
      )}
      <span
        className={`z-30 grid grid-cols-3 w-full transition-opacity duration-1000 ${
          isGameStart ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="select-none flex flex-col w-fit p-5 rounded-xl bg-black/50 border-red-500/50 border-2">
          <p>{mapName}</p>
          <p className="uppercase text-sm ">round: {roundCount}</p>
          <p className="uppercase text-xs">
            actions: {availableActions}/{maxActions}
          </p>
        </div>
        <div className="flex justify-center items-center size-full ">
          <p className="uppercase text-5xl select-none">{turn}'s turn</p>
        </div>
        <div className="select-none flex flex-col w-fit justify-center uppercase justify-self-end p-5 rounded-xl bg-black/50 border-cyan-500/50 border-2">
          <p className="text-sm">current: {currentEntity?.name}</p>
          <p className="text-sm">target: {targetEntity?.name}</p>
        </div>
      </span>
      <span
        className={`absolute bottom-5 left-20 w-36 p-2 border-white border h-52 rounded-lg duration-1000 transition-opacity
        ${isGameStart ? "opacity-100" : "opacity-0"}`}
      >
        <p className="uppercase">taken actions: </p>
        <hr />
        <ul className="flex flex-col items-start">
          {infoMarkedEntities.takenAction.map((e, index) => (
            <li key={index}>{e.name}</li>
          ))}
        </ul>
      </span>
      {uiLogic.isSkillOverlay && (
        <span className="z-40 fixed inset-0 flex items-end justify-end size-full">
          <button
            onClick={() => {
              uiLogic.setSkillOverlay(false);
              resetCurrentEntity();
            }}
            className="top-0 left-0 size-full"
          ></button>
          <div className="fixed flex p-10">
            <div className="flex justify-around h-40 rounded-3xl">
              <div className="flex gap-4 items-center">
                <div className="flex flex-row h-full bg-black/60 p-2 rounded-3xl">
                  <img
                    src={`${BASE_URL_IMAGE_ENTITIES}/${currentEntity?.imageUrl}`}
                    alt="no data"
                    className="h-full object-cover rounded-3xl"
                  />
                  <div className="flex flex-col h-full w-32 justify-center items-start p-5">
                    <p className="text-xl">{currentEntity?.name}</p>
                    <p className=" text-md">lvl.{currentEntity?.level}</p>
                    <p className="text-md">
                      ATK : {currentEntity?.attackPower}
                    </p>
                    <p className="text-md">DEF : {currentEntity?.defend}</p>
                    <p className="text-md">
                      HEAL : {currentEntity?.healingPower ?? 0}
                    </p>
                  </div>
                </div>
                {currentEntity?.allSkills.map((skill, index) => {
                  return (
                    <button
                      key={index}
                      className={`border-red-500 border-2 p-2 rounded-2xl w-40 h-full bg-black flex flex-col items-center justify-end 
                      ${
                        currentEntity.hasEnoughManaFor({ skill: skill })
                          ? ""
                          : "opacity-20"
                      }`}
                      onClick={() => {
                        if (currentEntity.hasEnoughManaFor({ skill: skill })) {
                          setSelectSkill(skill);
                          uiLogic.setSkillOverlay(false);
                        }
                      }}
                    >
                      <div>{skill.name}</div>
                      <div className="text-sm">
                        <ul className="flex flex-row gap-3">
                          {(skill.requiredEnergy > 0 ||
                            skill.requiredMana > 0) && (
                            <li>
                              {`${skill ? "EP:" : "MP:"}`}{" "}
                              {`${
                                skill.requiredEnergy > 0
                                  ? skill.requiredEnergy
                                  : skill.requiredMana
                              }`}
                            </li>
                          )}
                          <li>
                            {`DMG: ${currentEntity.calculateDamageMadeBy({
                              skill,
                            })}`}
                          </li>
                        </ul>
                      </div>
                    </button>
                  );
                })}
                <button className="border-red-500 border-2 rounded-2xl w-40 h-fit py-5 bg-black">
                  <div className="size-full">Use Item</div>
                </button>
              </div>
            </div>
          </div>
        </span>
      )}
      <span className="absolute top-32 right-8 flex flex-col z-10">
        {lastHitDamage > 0 && (
          <i className="font-medium text-lg">Hit Damage: {lastHitDamage}</i>
        )}
        {blockedDamage > 0 && !missed && (
          <i className="font-medium text-lg">Blocked Damage: {blockedDamage}</i>
        )}
        {totalHitDamage > 0 && !missed && (
          <i className="font-medium text-2xl ">
            Total Damage: {totalHitDamage}
          </i>
        )}
        {missed && <i className="font-medium text-lg ">Missed !</i>}
      </span>
      {selectedSkill && targetEntity && (
        <span className="absolute top-10 right-10 p-5 border-red-600 border-2 rounded-2xl z-10">
          <div className="flex flex-col size-full justify-center items-center  ">
            <p className="font-mono font-bold text-2xl text-red-600 uppercase">
              {`attacking`}
            </p>
          </div>
        </span>
      )}
      {selectedSkill && turn === "player" && (
        <>
          <button
            className="absolute right-10 bottom-10 p-10 border-2 bg-black/50 border-blue-500/50 rounded-2xl hover:border-red-700"
            onClick={() => {
              resetSelectSkill();
              resetCurrentEntity();
            }}
          >
            <p className="uppercase">{selectedSkill.name}</p>

            <hr className="my-2" />
            <p className="uppercase text-xs">cancel</p>
          </button>
        </>
      )}

      {uiLogic.isInfoOverlay && !uiLogic.isEntityPerforming && <CardInfo />}

      {uiLogic.isTurnWarning && <TurnWarning />}

      {uiLogic.isActionWarning && <ActionWarning />}
    </>
  );
}
