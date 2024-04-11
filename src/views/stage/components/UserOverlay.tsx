import { useContext } from "react";
import {
  StageContext,
  StageContextType,
} from "../contexts/StageContextProvider";

export default function UserOverlay() {
  const {
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
    userOverlay,
    selectedSkill,
    setSelectSkill,
    resetSelectSkill,
    closeActionOverlay,
    resetCurrentEntity,
  } = useContext(StageContext) as StageContextType;
  return (
    <>
      <div className="grid grid-cols-3 w-full">
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
            <p>remain enemies : {remainEnemiesCount}</p>
          </div>
        </div>
        <div className="flex flex-col w-fit justify-center uppercase justify-self-end p-5 rounded-xl border-red-500 border-2">
          <p>turn: {turn}</p>
          <hr />
          <p className=" text-sm">current: {currentEntityData?.entity.name}</p>
          <p className=" text-sm">target: {targetEntityData?.entity.name}</p>
        </div>
      </div>
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
                    src={`src/assets/entities/${currentEntityData?.entity.imageUrl}`}
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
                          MP: {skill.requiredEnergy ?? skill.requiredMana}
                        </li>
                        <li>
                          {`DMG: ${Math.round(
                            Math.round(
                              currentEntityData?.entity.attackPower ?? 0
                            ) * skill.emitValueMultiply
                          )}`}
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
    </>
  );
}
