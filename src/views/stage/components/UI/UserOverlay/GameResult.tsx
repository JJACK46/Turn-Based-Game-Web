import { Link } from "react-router-dom";
import { useGameStore } from "../../../stores/gameStore";

export function GameResultOverlay() {
  const {
    infoGame: { gameResult },
  } = useGameStore();

  return (
    <span
      className={`z-50 fixed inset-0 size-full bg-black/80 flex flex-col gap-8 justify-center items-center`}
    >
      <p className={`flex text-9xl uppercase`}>{gameResult}</p>
      <hr className="w-full" />
      <Link to={"/"} className="text-3xl rounded-lg border py-1 px-10">
        BACK
      </Link>
    </span>
  );
}
