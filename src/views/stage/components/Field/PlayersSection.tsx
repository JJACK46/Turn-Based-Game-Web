import Card from "../Cards/Card";
import CardPlaceholder from "../Cards/CardPlaceholder";
import { useGameStore } from "../../stores/GameStore";
import { EntityInstance } from "@/classes/entity";

export default function PlayersSection() {
  const {
    infoField: { playersFrontRow, playersBackRow },
  } = useGameStore();

  return (
    <div
      rel="players-section"
      className="p-10 flex flex-col justify-center w-3/5 h-2/5 gap-4"
    >
      {playersFrontRow && (
        <span rel="front" className={`flex justify-around`}>
          {playersFrontRow.length > 0 ? (
            playersFrontRow.map((player, index) => {
              const key = `${player.name}-${player.id}-${index}`;
              return (
                <Card
                  key={key}
                  instance={
                    new EntityInstance({
                      entity: player,
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
      )}
      {playersBackRow && (
        <span rel="back" className={`flex justify-around`}>
          {playersBackRow.length > 0 ? (
            playersBackRow.map((player, index) => {
              const key = `${player.name}-${player.id}-${index}`;
              return (
                <Card
                  key={key}
                  instance={
                    new EntityInstance({
                      entity: player,
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
    </div>
  );
}
