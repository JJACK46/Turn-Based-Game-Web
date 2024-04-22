import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { getAliveEntities } from "@/views/stage/helpers/stage";
import { useGameStore } from "@/views/stage/stores/gameStore";
import { useUIStore } from "@/views/stage/stores/uiStore";

export function SkillOverlay() {
  const { setSkillOverlay } = useUIStore();
  const {
    infoField: { enemies },
    infoIndicator: { currentEntity },
    methodsIndicator: { setSelectSkill, setTargets },
  } = useGameStore();
  const aliveEntities = getAliveEntities(enemies);
  return (
    <span className="z-40 fixed inset-0 flex items-end justify-end size-full">
      <button
        onClick={() => {
          setSkillOverlay(false);
          setSelectSkill(null);
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
              <div className="flex flex-col h-full justify-center items-start p-5">
                <p className="text-xl">{currentEntity?.name}</p>
                <p className=" text-md">lvl.{currentEntity?.level}</p>
                <p className="text-md">ATK : {currentEntity?.attack.value}</p>
                <p className="text-md">DEF : {currentEntity?.defense.value}</p>
                <p className="text-md">
                  HEAL : {currentEntity?.heal?.value ?? 0}
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
                      setTargets(aliveEntities);
                      setSkillOverlay(false);
                    }
                  }}
                >
                  <p className="capitalize">{skill.name}</p>
                  <div className="text-xs">
                    <ul className="flex flex-row gap-3">
                      {(skill.requiredEnergy > 0 || skill.requiredMana > 0) && (
                        <li className="py-0.5 border rounded px-1">
                          {`${skill ? "EP:" : "MP:"}`}{" "}
                          {`${
                            skill.requiredEnergy > 0
                              ? skill.requiredEnergy
                              : skill.requiredMana
                          }`}
                        </li>
                      )}
                      {skill.isAttackSkill &&
                        currentEntity.calculateAmountMadeBy({
                          skill,
                        }) > 0 && (
                          <li className="py-0.5 border rounded px-1">
                            {`DMG: ${currentEntity.calculateAmountMadeBy({
                              skill,
                            })}`}
                          </li>
                        )}
                      {skill.isHealSkill && (
                        <li className="py-0.5 border rounded px-1">
                          {`HEAL: ${currentEntity.calculateAmountMadeBy({
                            skill,
                          })}`}
                        </li>
                      )}
                    </ul>
                  </div>
                  <p className="mt-2 text-xs py-0.5 border rounded px-1">
                    {`${skill.effectSkill?.name ?? skill.emitType}`}
                  </p>
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
  );
}
