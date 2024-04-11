import { useContext } from "react";
import Card from "./Card";
import CardPlaceholder from "./CardPlaceholder";
import {
  StageContext,
  StageContextType,
} from "../contexts/StageContextProvider";

export default function EnemiesSection() {
  const { enemiesFrontRow, enemiesBackRow } = useContext(
    StageContext
  ) as StageContextType;

  return (
    <div
      rel="enemies-section"
      className="p-10 flex flex-col items-stretch justify-center w-4/5 h-2/5 gap-3"
    >
      {enemiesBackRow && (
        <span className={`flex justify-around`}>
          {enemiesBackRow.length > 0 ? (
            enemiesBackRow.map((enemy, index) => {
              const key = `${enemy.name}-${enemy.id}-${index}`;
              return (
                <Card
                  key={key}
                  position={index}
                  entity={enemy}
                  site="back"
                ></Card>
              );
            })
          ) : (
            <CardPlaceholder></CardPlaceholder>
          )}
        </span>
      )}
      <span className={`flex justify-around`}>
        {enemiesFrontRow.length > 0 ? (
          enemiesFrontRow.map((enemy, index) => {
            const key = `${enemy.name}-${enemy.id}-${index}`;
            return (
              <Card
                key={key}
                position={index}
                entity={enemy}
                site="front"
              ></Card>
            );
          })
        ) : (
          <CardPlaceholder></CardPlaceholder>
        )}
      </span>
    </div>
  );
}
