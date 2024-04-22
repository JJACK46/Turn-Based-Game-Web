import Card from "../Cards/Card";
import { useGameStore } from "../../stores/gameStore";
import { PositionEnum } from "@/data/enums/positions";

export default function EnemiesSection() {
  const {
    infoGame: { isGameStart },
    infoField: { enemies },
  } = useGameStore();

  const front = enemies.filter((ent) => ent.position === PositionEnum.FRONT);
  const back = enemies.filter((ent) => ent.position === PositionEnum.BACK);

  return (
    <div
      rel="enemies-section"
      className={`flex flex-col items-stretch justify-center w-4/5 h-2/5 duration-700
      ${isGameStart ? "" : "-translate-y-80"}
      `}
    >
      {back && (
        <span className={`flex justify-evenly`}>
          {back.length > 0 ? (
            back.map((enemy, index) => {
              return <Card key={index} instance={enemy}></Card>;
            })
          ) : (
            <></>
          )}
        </span>
      )}
      <span className={`flex justify-evenly`}>
        {front.length > 0 ? (
          front.map((enemy, index) => {
            return <Card key={index} instance={enemy}></Card>;
          })
        ) : (
          <></>
        )}
      </span>
    </div>
  );
}
