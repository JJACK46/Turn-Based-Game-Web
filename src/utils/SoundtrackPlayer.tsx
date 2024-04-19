/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useSound from "use-sound";
import { useGameStore } from "@/views/stage/stores/gameStore";

export const SoundtrackPlayer = ({
  soundFilePath,
}: {
  soundFilePath: string;
  onPlay?: () => boolean;
}) => {
  const {
    infoGame: { isGameStart },
  } = useGameStore();

  const [play, { stop, duration }] = useSound(soundFilePath, {
    volume: 0.3,
    interrupt: true,
  });

  useEffect(() => {
    if (isGameStart) {
      play();
      if (duration === 0) {
        play();
      }
    } else {
      stop();
    }
  }, [isGameStart, duration]);

  return null;
};
