/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useSound from "use-sound";
import { useUIStore } from "@/views/stage/stores/uiStore";
import { useGameStore } from "@/views/stage/stores/gameStore";

export const SFXPlayer = ({
  soundFilePath,
}: {
  soundFilePath: string;
  onPlay?: () => boolean;
}) => {
  const { isEntityPerforming } = useUIStore();
  const {
    infoDamage: { totalHitDamage },
    infoIndicator: { currentEntity },
  } = useGameStore();

  const [play] = useSound(soundFilePath, {
    volume: 0.3,
    interrupt: true,
  });

  useEffect(() => {
    if (isEntityPerforming) {
      play();
    }

    // Optional: Stop the sound after a specific duration
    // const timeout = setTimeout(() => {
    //   stop();
    // }, 3000);

    // return () => {
    //   clearTimeout(timeout);
    // };
  }, [isEntityPerforming, totalHitDamage]);

  useEffect(() => {
    // if (currentEntity?.selectedSound) {
    if (currentEntity?.selectedSoundPath) {
      play();
    }
    // }
  }, [currentEntity]);

  return null;
};
