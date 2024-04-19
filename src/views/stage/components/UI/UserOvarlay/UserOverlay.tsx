import CardInfo from "../../Cards/CardInfo";
import { ActionWarning, TurnWarning } from "./Warning";
import { BASE_DELAY_SKILL } from "@/utils/constants";
import { useGameStore } from "../../../stores/gameStore";
import { useUIStore } from "../../../stores/uiStore";
import { useEffect } from "react";
import { SkillOverlay } from "./Skill";
import { InfoDamageOverlay } from "./InfoDamage";
import { FlexSkillOverlay } from "./FlexSkill";

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
    methodsIndicator: { resetCurrentEntity, resetSelectSkill },
    setInfoDamage,
  } = useGameStore();
  const uiLogic = useUIStore();
  const { totalHitDamage } = infoDamage;

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
      {uiLogic.isSkillOverlay && <SkillOverlay />}
      <InfoDamageOverlay />
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
      {uiLogic.isEntityPerforming &&
        currentEntity?.traitSkill === selectedSkill &&
        currentEntity?.playable && <FlexSkillOverlay />}
      {uiLogic.isInfoOverlay && !uiLogic.isEntityPerforming && <CardInfo />}
      {uiLogic.isTurnWarning && <TurnWarning />}
      {uiLogic.isActionWarning && <ActionWarning />}
    </>
  );
}
