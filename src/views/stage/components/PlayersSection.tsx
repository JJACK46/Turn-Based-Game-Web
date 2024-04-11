import { useContext } from "react";
import Card from "./Card";
import CardPlaceholder from "./CardPlaceholder";
import {
  StageContext,
  StageContextType,
} from "../contexts/StageContextProvider";

export default function PlayersSection() {
  const { playersFrontRow, playersBackRow } = useContext(
    StageContext
  ) as StageContextType;

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
                  position={index}
                  entity={player}
                  site="front"
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
                  position={index}
                  entity={player}
                  site="back"
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
