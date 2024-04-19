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
  } = useGameStore();

  const [play, { stop }] = useSound(soundFilePath, {
    volume: 0.3,
    interrupt: true,
  });

  useEffect(() => {
    if (isEntityPerforming) {
      play();
    }

    // Optional: Stop the sound after a specific duration
    const timeout = setTimeout(() => {
      stop();
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEntityPerforming, totalHitDamage]);

  return null;
};
