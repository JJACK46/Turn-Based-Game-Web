import CardInfo from "./CardInfo";
import { ActionWarning, TurnWarning } from "./Warning";
import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { getDamageMadeBy, isSkillUseEP } from "../helpers/entity";
import { useGameStore } from "../stores/GameStore";

export default function UserOverlay() {
  // const { closeActionOverlay } = useGameContext();
  const {
    selectedSkill,
    mapName,
    availableActions,
    maxActions,
    roundCount,
    speedEnemyTeam,
    speedPlayerTeam,
    remainEnemiesCount,
    turn,
    currentEntityData,
    targetEntityData,
    remainPlayersCount,
    lastHitDamage,
    totalHitDamage,
    entitiesTakenAction,
    isGameStart,
    resetCurrentEntity,
    setSelectSkill,
    resetSelectSkill,
  } = useGameStore();

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
              onClick={() => {}}
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
          <p className=" text-sm">current: {currentEntityData?.entity.name}</p>
          <p className=" text-sm">target: {targetEntityData?.entity.name}</p>
        </div>
      </span>
      <span className="absolute bottom-0 left-14 w-36 p-2 border-white border h-52 rounded-lg">
        <p className="uppercase">taken actions: </p>
        <hr />
        <ul className="flex flex-col items-start">
          {entitiesTakenAction.map((entity, index) => (
            <li key={index}>{entity.name}</li>
          ))}
        </ul>
      </span>
      {userOverlay.isActionOverlayOpen && (
        <span className="absolute inset-0 flex items-end justify-end size-full z-10">
          <button
            onClick={() => {
              closeActionOverlay();
              resetCurrentEntity();
            }}
            className="top-0 left-0 size-full"
          ></button>
          <div className="absolute flex p-10">
            <div className="flex justify-around h-40 rounded-3xl">
              <div className="flex gap-4 items-center">
                <div className="flex flex-row h-full bg-slate-500 p-2 rounded-3xl">
                  <img
                    src={`${BASE_URL_IMAGE_ENTITIES}/${currentEntityData?.entity.imageUrl}`}
                    alt="no data"
                    className="h-full object-cover rounded-3xl"
                  />
                  <div className="flex flex-col h-full w-32 justify-center items-start p-5">
                    <p className="font-mono text-xl">
                      {currentEntityData?.entity.name}
                    </p>
                    <p className="font-mono text-md">
                      lvl.{currentEntityData?.entity.level}
                    </p>
                    <p className="font-mono text-md">
                      ATK : {currentEntityData?.entity.attackPower}
                    </p>
                    <p className="font-mono text-md">
                      DEF : {currentEntityData?.entity.defendPower ?? 0}
                    </p>
                    <p className="font-mono text-md">
                      HEAL : {currentEntityData?.entity.healingPower ?? 0}
                    </p>
                  </div>
                </div>
                {currentEntityData?.entity.skills.map((skill, index) => (
                  <button
                    key={index}
                    className="border-red-500 border-2 p-2 rounded-2xl w-40 h-full bg-black flex flex-col items-center justify-end"
                    onClick={() => {
                      setSelectSkill(skill);
                      closeActionOverlay();
                    }}
                  >
                    <div>{skill.name}</div>
                    <div className="text-sm">
                      <ul className="flex flex-row gap-3">
                        <li>
                          {`${isSkillUseEP(skill) ? "EP:" : "MP:"}`}{" "}
                          {skill.requiredEnergy ?? skill.requiredMana}
                        </li>
                        <li>
                          {`DMG: ${getDamageMadeBy({
                            entity: currentEntityData.entity,
                            skill: skill,
                          })}`}
                        </li>
                      </ul>
                    </div>
                  </button>
                ))}
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
          <p className="font-mono text-sm">Last Hits Damage: {lastHitDamage}</p>
          <p className="font-mono text-xs">Total Damage: {totalHitDamage}</p>
        </span>
      )}
      {selectedSkill && targetEntityData && (
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
            <p className="uppercase">{selectedSkill?.name}</p>

            <hr className="my-2" />
            <p className="uppercase text-xs">cancel</p>
          </button>
        </>
      )}

      {userOverlay.isInfoOverlayOpen && <CardInfo />}

      {userOverlay.isTurnWarning && <TurnWarning />}

      {userOverlay.isActionWarning && <ActionWarning />}
    </>
  );
}
