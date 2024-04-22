import Card from "../Cards/Card";
import { useGameStore } from "../../stores/gameStore";
import { PositionEnum } from "@/data/enums/positions";

export default function PlayersSection() {
  const {
    infoGame: { isGameStart },
    infoField: { players },
  } = useGameStore();

  const front = players.filter((ent) => ent.position === PositionEnum.FRONT);
  const back = players.filter((ent) => ent.position === PositionEnum.BACK);

  return (
    <div
      rel="players-section"
      className={`flex flex-col items-stretch justify-center w-4/5 h-2/5 duration-1000
      ${isGameStart ? "" : "translate-y-80"}
      `}
    >
      {front && (
        <span rel="front" className={`flex justify-evenly`}>
          {front.length > 0 ? (
            front.map((player, index) => {
              return <Card key={index} instance={player}></Card>;
            })
          ) : (
            <></>
          )}
        </span>
      )}
      {back && (
        <span rel="back" className={`flex justify-evenly`}>
          {back.length > 0 ? (
            back.map((player, index) => {
              return <Card key={index} instance={player}></Card>;
            })
          ) : (
            <></>
          )}
        </span>
      )}
    </div>
  );
}
