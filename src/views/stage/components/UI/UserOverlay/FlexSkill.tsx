import { BASE_DELAY_SKILL, BASE_URL_IMAGE_ENTITIES } from "@/utils/constants";
import { useGameStore } from "@/views/stage/stores/gameStore";
import { useUIStore } from "@/views/stage/stores/uiStore";
import { useEffect, useState } from "react";

export function FlexSkillOverlay() {
  const {
    infoIndicator: { currentEntity, selectedSkill },
  } = useGameStore();
  const { isEntityPerforming } = useUIStore();

  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const delay = () => {
    // if (currentEntity?.isBoss) {
    //   return BASE_DELAY_SKILL * 0.5;
    // }
    return BASE_DELAY_SKILL * 0.8;
  };

  useEffect(() => {
    setFadeIn(true);
    setTimeout(() => {
      setFadeIn(false);
      setFadeOut(true);
    }, delay());
  }, [isEntityPerforming]);

  function handleAnimation() {
    if (fadeIn) {
      return "";
    }
    if (fadeOut) {
      return "translate-x-[150%] blur";
    }
    return "-translate-x-[150%] blur";
  }

  function handleSkillName() {
    if (selectedSkill) {
      if (selectedSkill.name.length > 14) {
        return "text-7xl";
      }
      return "text-5xl";
    }
    return "text-5xl";
  }

  return (
    <span
      className={`z-40 fixed inset-0 flex flex-col items-center justify-center size-full 
    `}
    >
      <div className={`z-10 flex flex-row ease-in-out ${handleAnimation()}`}>
        <img
          draggable={false}
          src={`${BASE_URL_IMAGE_ENTITIES}/${currentEntity?.imageUrl}`}
          className="flex rounded object-fill 2xl:w-96 2xl:h-96 w-72 h-72"
        />
        <div className="flex text-center items-center justify-center flex-wrap w-[620px] bg-black rounded">
          <p className={` ${handleSkillName()}`}>{selectedSkill?.name}</p>
        </div>
      </div>
      <div className="fixed size-full bg-black/70"></div>
    </span>
  );
}
