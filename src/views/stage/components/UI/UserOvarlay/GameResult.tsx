import { Link } from "react-router-dom";
import { useGameStore } from "../../../stores/gameStore";

export function GameResultOverlay() {
  const {
    infoGame: { gameResult },
  } = useGameStore();

  return (
    <span
      className={`z-50 fixed inset-0 size-full bg-black/80 flex flex-col gap-10 justify-center items-center`}
    >
      <p className={`flex text-9xl uppercase`}>{gameResult}</p>
      <Link to={"/"} className="text-3xl rounded border py-0.5 px-2">
        BACK
      </Link>
    </span>
  );
}
