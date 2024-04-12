import { Skill } from "@/models/skills";
import { BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useGameStore } from "../stores/GameStore";

function CardInfo() {
  // const { closeInfoOverlay } = useGameContext();
  const { resetCurrentEntity, currentEntityData } = useGameStore();
  return (
    <span className="absolute inset-0 flex items-center justify-center size-full z-10">
      <button
        onClick={() => {
          closeInfoOverlay();
          resetCurrentEntity();
        }}
        className="top-0 left-0 size-full bg-black opacity-40"
      ></button>
      <div className="absolute flex p-8 bg-black rounded-2xl border-2 border-white">
        <div className="flex flex-col gap-4 items-center">
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
            <div className="flex flex-col p-5 text-center gap-4">
              <h1 className="font-mono text-3xl font-bold">
                {currentEntityData?.entity.name}
              </h1>
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
                  {currentEntityData?.entity.defendPower ?? 0}
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
              {currentEntityData?.entity.skills.map((skill: Skill) => (
                <div className="flex flex-col justify-center items-center w-1/4 py-5 border-2 border-red-600">
                  <h3>{skill.name}</h3>
                  <p>{skill.type}</p>
                  <p>{skill.emitValueMultiply}x</p>
                  {skill.comboAble && <p>{skill.comboWith?.toString()}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}

export default CardInfo;
