import CardPlaceholder from "../components/CardPlaceholder";
import React, { useEffect, useState } from "react";
import { Entity } from "../../../models/entity";
import Card from "../components/Card";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { assignEntities } from "../features/stage";

interface Props {
  tutorial?: true;
  mapName: string;
  enemiesFrontRow: Entity[];
  enemiesBackRow?: Entity[];
  playersFrontRow: Entity[];
  playersBackRow?: Entity[];
}

const Stage: React.FC<Props> = (props) => {
  const stages = useAppSelector((s) => s.stage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function setupEntities() {
      dispatch(
        assignEntities({
          entities: props.playersFrontRow,
          position: "front",
          type: "player",
        })
      );
      dispatch(
        assignEntities({
          entities: props.enemiesFrontRow,
          position: "front",
          type: "enemy",
        })
      );
    }
    setupEntities();
  }, []);

  // const selectedEnemy = useAppSelector((state) => state.stage.selectedEnemy);
  // const selectedPlayer = useAppSelector((state) => state.stage.selectedPlayer);
  // const selectedSkill = useAppSelector((s) => s.stage.selectedSkill);

  // const [turn, setTurn] = useState<string>("Player");

  const [activeCard, setActiveCard] = useState<Entity | null>(null);

  return (
    <>
      <span className="bg-gray-900 flex fixed w-full bottom-0">
        <div className="flex flex-row justify-around items-center w-full min-h-screen h-screen">
          <div className="flex flex-col w-30 h-full gap-10 py-10 bg-black z-20">
            <button className="border-blue-500 border-2 m-5">BTN1</button>
            <button className="border-blue-500 border-2 m-5">BTN2</button>
            <button className="border-blue-500 border-2 m-5">BTN3</button>
            <button className="border-blue-500 border-2 m-5">BTN4</button>
            <button className="border-blue-500 border-2 m-5">BTN5</button>
          </div>

          <div className="flex flex-col justify-around items-center w-full min-h-screen h-screen">
            <div
              rel="enemies-section"
              className="p-10 flex flex-col items-stretch justify-center w-4/5 h-2/5 gap-3"
            >
              <span className={`flex justify-around`}>
                {stages.enemiesBackRow.length > 0 ? (
                  stages.enemiesBackRow.map((enemy, index) => {
                    const key = `${enemy.name}-${enemy.id}-${index}`;
                    return (
                      <Card
                        key={key}
                        index={index}
                        entity={enemy}
                        activeCard={activeCard}
                        setActiveDialog={setActiveCard}
                      ></Card>
                    );
                  })
                ) : (
                  <></>
                )}
              </span>
              <span className={`flex justify-around`}>
                {stages.enemiesFrontRow.length > 0 ? (
                  stages.enemiesFrontRow.map((enemy, index) => {
                    const key = `${enemy.name}-${enemy.id}-${index}`;
                    return (
                      <Card
                        key={key}
                        index={index}
                        entity={enemy}
                        activeCard={activeCard}
                        setActiveDialog={setActiveCard}
                      ></Card>
                    );
                  })
                ) : (
                  <CardPlaceholder></CardPlaceholder>
                )}
              </span>
            </div>
            <div className="grid grid-cols-3 w-full h-fit py-1 justify-around">
              <div className="flex flex-col w-fit items-start p-5 rounded-xl border-red-500 border-2">
                <p>{props.mapName}</p>
                <p>{"2/10"}</p>
                <p>{"ROUND X"}</p>
              </div>

              <div className="flex justify-center items-center size-full">
                <p className="rounded-xl p-5 w-full"></p>
              </div>

              <div className="flex flex-col w-fit items-end justify-center justify-self-end p-5 rounded-xl border-red-500 border-2">
                {/* <p>{turn}</p> */}
              </div>
            </div>
            <div
              rel="players-section"
              className="p-10 flex flex-col justify-center w-3/5 h-2/5 gap-4"
            >
              <span rel="front" className={`flex justify-around`}>
                {stages.playersFrontRow.length > 0 ? (
                  stages.playersFrontRow.map((player, index) => {
                    const key = `${player.name}-${player.id}-${index}`;
                    return (
                      <Card
                        key={key}
                        index={index}
                        entity={player}
                        activeCard={activeCard}
                        setActiveDialog={setActiveCard}
                      ></Card>
                    );
                  })
                ) : (
                  <CardPlaceholder></CardPlaceholder>
                )}
              </span>
              <span rel="back" className={`flex justify-around`}>
                {stages.playersBackRow.length > 0 ? (
                  stages.playersBackRow.map((player, index) => {
                    const key = `${player.name}-${player.id}-${index}`;
                    return (
                      <Card
                        key={key}
                        index={index}
                        entity={player}
                        activeCard={activeCard}
                        setActiveDialog={setActiveCard}
                      ></Card>
                    );
                  })
                ) : (
                  <></>
                )}
              </span>
            </div>
          </div>
        </div>
      </span>
    </>
  );
};

export default Stage;
