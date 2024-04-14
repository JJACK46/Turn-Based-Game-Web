import CardInfo from "../Cards/CardInfo";
import { ActionWarning, TurnWarning } from "../Warning";
import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useGameStore } from "../../stores/GameStore";
import { useUIStore } from "../../stores/UI_Store";
import { SkillInstance } from "@/classes/skills";

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
      remainEnemiesCount,
      remainPlayersCount,
    },
    infoMarkedEntities,
    methodsGame: { startGame },
    infoDamage,
    infoIndicator: { currentEntity, targetEntity, selectedSkill },
    methodsIndicator: { resetCurrentEntity, setSelectSkill, resetSelectSkill },
  } = useGameStore();
  const uiLogic = useUIStore();
  const { blockedDamage, totalHitDamage, lastHitDamage } = infoDamage;

  return (
    <>
      {!isGameStart && (
        <span
          rel="most top z-index"
          className="z-50 absolute h-full w-full bg-black/50 backdrop-blur top-0 left-0 items-center justify-center flex"
        >
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl uppercase">{mapName}</h1>
            <hr className="my-10 border w-screen" />
            <button
              className="rounded-lg p-2 text-2xl bg-orange-600 uppercase"
              onClick={() => {
                startGame();
              }}
            >
              battle
            </button>
          </div>
        </span>
      )}
      <span className="grid grid-cols-3 w-full">
        <div className="flex flex-col w-fit p-5 rounded-xl border-red-500 border-2">
          <p>{mapName}</p>
          <p className="uppercase text-sm ">round: {roundCount}</p>
          <p className="uppercase text-xs">
            actions: {availableActions}/{maxActions}
          </p>
        </div>
        <div className="flex justify-center items-center size-full ">
          <div className="rounded-xl p-2 w-full text-center">
            <p>SPD Players: {speedPlayerTeam}</p>
            <p>SPD Enemies: {speedEnemyTeam}</p>
            <p>remain players : {remainPlayersCount}</p>
            <p>remain enemies : {remainEnemiesCount}</p>
          </div>
        </div>
        <div className="flex flex-col w-fit justify-center uppercase justify-self-end p-5 rounded-xl border-red-500 border-2">
          <p>turn: {turn}</p>
          <hr />
          <p className=" text-sm">current: {currentEntity?.entity.name}</p>
          <p className=" text-sm">target: {targetEntity?.entity.name}</p>
        </div>
      </span>
      <span className="absolute bottom-0 left-14 w-36 p-2 border-white border h-52 rounded-lg">
        <p className="uppercase">taken actions: </p>
        <hr />
        <ul className="flex flex-col items-start">
          {infoMarkedEntities.takenAction.map((e, index) => (
            <li key={index}>{e.entity.name}</li>
          ))}
        </ul>
      </span>
      {uiLogic.isSkillOverlay && (
        <span className="absolute inset-0 flex items-end justify-end size-full z-10">
          <button
            onClick={() => {
              uiLogic.setSkillOverlay(false);
              resetCurrentEntity();
            }}
            className="top-0 left-0 size-full"
          ></button>
          <div className="absolute flex p-10">
            <div className="flex justify-around h-40 rounded-3xl">
              <div className="flex gap-4 items-center">
                <div className="flex flex-row h-full bg-slate-500 p-2 rounded-3xl">
                  <img
                    src={`${BASE_URL_IMAGE_ENTITIES}/${currentEntity?.entity.imageUrl}`}
                    alt="no data"
                    className="h-full object-cover rounded-3xl"
                  />
                  <div className="flex flex-col h-full w-32 justify-center items-start p-5">
                    <p className="font-mono text-xl">
                      {currentEntity?.entity.name}
                    </p>
                    <p className="font-mono text-md">
                      lvl.{currentEntity?.entity.level}
                    </p>
                    <p className="font-mono text-md">
                      ATK : {currentEntity?.entity.attackPower}
                    </p>
                    <p className="font-mono text-md">
                      DEF : {currentEntity?.entity.defend ?? 0}
                    </p>
                    <p className="font-mono text-md">
                      HEAL : {currentEntity?.entity.healingPower ?? 0}
                    </p>
                  </div>
                </div>
                {currentEntity?.entity.skills.map((skill, index) => {
                  const skillInstance = new SkillInstance({
                    skill,
                    remainingRound: 0,
                  });
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
                          setSelectSkill(skillInstance);
                          uiLogic.setSkillOverlay(false);
                        }
                      }}
                    >
                      <div>{skill.name}</div>
                      <div className="text-sm">
                        <ul className="flex flex-row gap-3">
                          {(skill.requiredEnergy || skill.requiredMana > 0) && (
                            <li>
                              {`${skill ? "EP:" : "MP:"}`}{" "}
                              {`${
                                skillInstance.isSkillRequiredEnergy
                                  ? skill.requiredEnergy
                                  : skill.requiredMana
                              }`}
                            </li>
                          )}
                          <li>
                            {`DMG: ${currentEntity.getDamageMadeBy(
                              skillInstance
                            )}`}
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
      {lastHitDamage > 0 && (
        <span className="absolute top-32 right-0 p-2 border-red-600 border-2 rounded z-10">
          <p className="font-mono text-sm">Hit Damage: {lastHitDamage}</p>
          <p className="font-mono text-xs">Damage Blocked: {blockedDamage}</p>
          <p className="font-mono text-xs">Total Damage: {totalHitDamage}</p>
        </span>
      )}
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
            className="absolute right-10 bottom-10 p-10 border-2 border-blue-300 rounded-2xl hover:border-red-700"
            onClick={() => {
              resetSelectSkill();
              resetCurrentEntity();
            }}
          >
            <p className="uppercase">{selectedSkill.skill.name}</p>

            <hr className="my-2" />
            <p className="uppercase text-xs">cancel</p>
          </button>
        </>
      )}

      {uiLogic.isInfoOverlay && <CardInfo />}

      {uiLogic.isTurnWarning && <TurnWarning />}

      {uiLogic.isActionWarning && <ActionWarning />}
    </>
  );
}
