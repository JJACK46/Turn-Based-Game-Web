import Card from "../Cards/Card";
import { useGameStore } from "../../stores/gameStore";

export default function EnemiesSection() {
  const {
    infoGame: { isGameStart },
    infoField: { enemiesFrontRow, enemiesBackRow },
  } = useGameStore();

  return (
    <div
      rel="enemies-section"
      className={`flex flex-col items-stretch justify-center w-4/5 h-2/5 duration-700
      ${isGameStart ? "" : "-translate-y-80"}
      `}
    >
      {enemiesBackRow && (
        <span className={`flex justify-evenly`}>
          {enemiesBackRow.length > 0 ? (
            enemiesBackRow.map((enemy, index) => {
              return <Card key={index} instance={enemy}></Card>;
            })
          ) : (
            <></>
          )}
        </span>
      )}
      <span className={`flex justify-evenly`}>
        {enemiesFrontRow.length > 0 ? (
          enemiesFrontRow.map((enemy, index) => {
            return <Card key={index} instance={enemy}></Card>;
          })
        ) : (
          <></>
        )}
      </span>
    </div>
  );
}
