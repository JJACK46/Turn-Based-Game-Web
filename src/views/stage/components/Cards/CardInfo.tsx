import { Skill } from "@/classes/skills";
import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useGameStore } from "../../stores/gameStore";
import { useUIStore } from "../../stores/uiStore";

function CardInfo() {
  const { setInfoOverlay } = useUIStore();
  const {
    infoIndicator: { currentEntity: currentEntityData },
    methodsIndicator: { resetCurrentEntity },
  } = useGameStore();
  return (
    <span className="absolute inset-0 flex items-center justify-center size-full z-10">
      <button
        onClick={() => {
          setInfoOverlay(false);
          resetCurrentEntity();
        }}
        className="top-0 left-0 size-full bg-black opacity-40"
      ></button>
      <div className="absolute flex bg-black rounded-2xl border-2 border-white">
        <div className="flex flex-col p-8 gap-4 items-center">
          <div className="flex flex-row rounded-lg">
            <div className="size-52">
              <img
                className="object-cover"
                width={500}
                height={494}
                src={`${BASE_URL_IMAGE_ENTITIES}/${currentEntityData?.entity.imageUrl}`}
                alt="no image"
              />
            </div>
            <div className="flex flex-col text-center justify-center items-center">
              <div className="font-mono text-3xl font-bold">
                {currentEntityData?.entity.name}
                <p className="text-sm"> {currentEntityData?.trait}</p>
                <p className="fot-memo text-sm my-2 p-1 rounded-full bg-gray-700 uppercase">
                  {currentEntityData?.entity.status}
                </p>
              </div>
              <div className="flex justify-around flex-wrap">
                <p className="font-mono text-lg w-1/2">Level</p>
                <p className="font-mono text-lg w-1/2">
                  {currentEntityData?.entity.level}
                </p>
                <p className="font-mono text-lg w-1/2">Attack</p>
                <p className="font-mono text-lg w-1/2">
                  {currentEntityData?.entity.attackPower}
                </p>
                <p className="font-mono text-lg w-1/2">Defence</p>
                <p className="font-mono text-lg w-1/2">
                  {currentEntityData?.entity.defend ?? 0}
                </p>
                <p className="font-mono text-lg w-1/2">Speed</p>
                <p className="font-mono text-lg w-1/2">
                  {currentEntityData?.entity.speed}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-2 w-full">
            <h3 className="font-mono text-xl font-semibold">Skill</h3>
            <div className="flex flex-row gap-4">
              {currentEntityData?.allSkills.map(
                (skill: Skill, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center w-1/4 text-center py-3 border-2 border-red-600"
                  >
                    <h3>{skill.name}</h3>
                    <p>{skill.type}</p>
                    <p>{skill.emitValueMultiply}x</p>
                    {skill.comboAble && <p>{skill.comboWith?.toString()}</p>}
                    <p>MP/EP: {skill.requiredEnergy ?? skill.requiredMana}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}

export default CardInfo;
