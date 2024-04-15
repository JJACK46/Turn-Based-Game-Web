import Card from "../Cards/Card";
import { useGameStore } from "../../stores/gameStore";

export default function PlayersSection() {
  const {
    infoGame: { isGameStart },
    infoField: { playersFrontRow, playersBackRow },
  } = useGameStore();

  return (
    <div
      rel="players-section"
      className={`flex flex-col items-stretch justify-center w-4/5 h-2/5 duration-1000
      ${isGameStart ? "" : "translate-y-80"}
      `}
    >
      {playersFrontRow && (
        <span rel="front" className={`flex justify-evenly`}>
          {playersFrontRow.length > 0 ? (
            playersFrontRow.map((player, index) => {
              return <Card key={index} instance={player}></Card>;
            })
          ) : (
            <></>
          )}
        </span>
      )}
      {playersBackRow && (
        <span rel="back" className={`flex justify-evenly`}>
          {playersBackRow.length > 0 ? (
            playersBackRow.map((player, index) => {
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
