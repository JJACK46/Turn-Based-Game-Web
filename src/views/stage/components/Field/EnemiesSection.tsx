import Card from "../Cards/Card";
import CardPlaceholder from "../Cards/CardPlaceholder";
import { useGameStore } from "../../stores/GameStore";
import { EntityInstance } from "@/classes/entity";

export default function EnemiesSection() {
  const {
    infoField: { enemiesFrontRow, enemiesBackRow },
  } = useGameStore();

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
                  instance={
                    new EntityInstance({
                      entity: enemy,
                      position: index,
                      site: "back",
                    })
                  }
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
                instance={
                  new EntityInstance({
                    entity: enemy,
                    position: index,
                    site: "front",
                  })
                }
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
