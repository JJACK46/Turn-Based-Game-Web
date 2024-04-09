import CardPlaceholder from "../components/CardPlaceholder";
import React, { useEffect } from "react";
import { Entity } from "../../../models/entity";
import Card from "../components/Card";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  assignEntities,
  setCurrentEntity,
  initTurn,
  skillToEntity,
  switchTurn,
  resetTotalHitDamage,
  resetLastHitDamage,
} from "../features/stageReducer";

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

  function setupGame() {
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
    dispatch(
      initTurn({
        enemies: props.enemiesFrontRow.concat(props.enemiesBackRow ?? []),
        players: props.playersFrontRow.concat(props.playersBackRow ?? []),
      })
    );
  }
  useEffect(() => {
    setupGame();
  }, []);

  useEffect(() => {
    dispatch(switchTurn());
  }, [stages.availableActions]);

  useEffect(() => {
    if (stages.turn === "player") {
      return;
    }

    let i = 0;
    const intervalId = setInterval(() => {
      botAction(i);
      console.log("useEffect ", i)
      i++;
      if (i >= stages.availableActions) {
        clearInterval(intervalId);
        dispatch(resetTotalHitDamage());
      }
    }, 7000);
  }, [stages.turn]);

  useEffect(() => {
    if (stages.remainEnemiesCount === 0) {
      alert("VICTORY");
    }
  }, [stages.remainEnemiesCount]);

  function botAction(indexEntity: number) {
    if (stages.turn === "enemy" && stages.availableActions > 0) {
      setTimeout(() => {
        dispatch(resetTotalHitDamage());
        const aliveEntities = stages.enemiesFrontRow
          .filter((entity) => entity.healthPower > 0)
          .sort((a, b) => b.attackPower - a.attackPower);

        const tempCurrentEntity = aliveEntities[indexEntity];
        dispatch(
          setCurrentEntity({
            entity: tempCurrentEntity,
            index: stages.enemiesFrontRow.indexOf(tempCurrentEntity),
          })
        );
        let maxHP = 0;
        stages.playersFrontRow.forEach((entity) => {
          if (entity.healthPower > maxHP) {
            maxHP = entity.healthPower;
          }
        });
        console.log("in stage botAction\n")
        console.log(stages.playersFrontRow)
        
        const indexTargetEntity = stages.playersFrontRow.findIndex(
          (entity) => entity.healthPower === maxHP
        );

        setTimeout(() => {
          dispatch(
            skillToEntity({
              toEnemy: false,
              indexSourceEntity:
                stages.enemiesFrontRow.indexOf(tempCurrentEntity),
              sourceEntity: tempCurrentEntity,
              skill: tempCurrentEntity.skills[0],
              indexTargetEntity: indexTargetEntity,
              targetEntities: stages.playersFrontRow,
              sourceEntities: stages.enemiesFrontRow,
            })
          );
          // setTimeout(() => {
            dispatch(resetLastHitDamage());
            // dispatch(resetTotalHitDamage());
          // }, 5);
          // console.log("in dispatch stage botAction\n")
        }, 1000);
      }, 3000);
    }
  }

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
                    return <Card key={key} index={index} entity={enemy}></Card>;
                  })
                ) : (
                  <></>
                )}
              </span>
              <span className={`flex justify-around`}>
                {stages.enemiesFrontRow.length > 0 ? (
                  stages.enemiesFrontRow.map((enemy, index) => {
                    const key = `${enemy.name}-${enemy.id}-${index}`;
                    return <Card key={key} index={index} entity={enemy}></Card>;
                  })
                ) : (
                  <CardPlaceholder></CardPlaceholder>
                )}
              </span>
            </div>
            <div className="grid grid-cols-3 w-full">
              <div className="flex flex-col w-fit p-5 rounded-xl border-red-500 border-2">
                <p>{props.mapName}</p>
                <p className="uppercase text-sm ">round: {stages.round}</p>
                <p className="uppercase text-xs">
                  actions: {stages.availableActions}/{stages.maxActions}
                </p>
              </div>
              <div className="flex justify-center items-center size-full ">
                <p className="rounded-xl p-5 w-full">
                  {JSON.stringify(stages.stageData)}
                  <br />
                  remain enemies : {stages.remainEnemiesCount}
                  {/* <div>{JSON.stringify(stages.entitiesTakenAction)}</div> */}
                </p>
              </div>
              <div className="flex flex-col w-fit justify-center justify-self-end p-5 rounded-xl border-red-500 border-2">
                <p className="uppercase">turn: {stages.turn}</p>
                <p className="uppercase text-sm">
                  name: {stages.currentEntity?.entity.name}
                </p>
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
                      <Card key={key} index={index} entity={player}></Card>
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
                      <Card key={key} index={index} entity={player}></Card>
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
