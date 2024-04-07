import CardPlaceholder from "../components/CardPlaceholder";
import React, { useState } from "react";
import { Entity } from "../../../models/entity";
import Card from "../components/Card";
import { assignPlayer, assignSkill } from "../features/actions";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Skill } from "../../../models/skills";

interface Props {
  tutorial?: true;
  mapName: string;
  enemies: Entity[];
  players: Entity[];
}

const Stage: React.FC<Props> = (props) => {
  const [enemies, setEnemies] = useState<Entity[]>(props.enemies);
  const [players] = useState<Entity[]>(props.players);
  const selectedEnemy = useAppSelector((state) => state.actions.selectedEnemy);
  const selectedPlayer = useAppSelector(
    (state) => state.actions.selectedPlayer
  );
  const selectedSkill = useAppSelector((s) => s.actions.selectedSkill);
  const dispatch = useAppDispatch();

  const attackToEntity = (indexEntity: number, attackDamage: number) => {
    const tempEnemies: Entity[] = enemies.map((entity, index) => {
      if (index === indexEntity) {
        return {
          ...entity,
          healthPower: entity.healthPower - attackDamage,
        };
      }
      return entity;
    });
    setEnemies(tempEnemies);
  };

  const skillToEntity = (indexEntity: number, skill: Skill) => {
    const tempEnemies: Entity[] = enemies.map((entity, index) => {
      if (index === indexEntity) {
        if (skill)
          return {
            ...entity,
          };
      }
      return entity;
    });
    setEnemies(tempEnemies);
  };

  const gridEnemiesStyle = {
    gridTemplateColumns: `repeat(${enemies.length}, 1fr)`,
  };
  const gridPlayersStyle = {
    gridTemplateColumns: `repeat(${players.length}, 1fr)`,
  };

  return (
    <>
      <span className="py-1 justify-center bg-black flex">
        <div>
          {selectedEnemy?.entity.name}
          {selectedEnemy?.index}
        </div>
        <div className="mx-5">
          {selectedPlayer?.entity.name}
          {selectedPlayer?.index}
        </div>
      </span>
      <div rel="enemies-section" className="py-4 absolute top-10 w-full">
        <span
          className={`grid gap-4 justify-items-center`}
          style={gridEnemiesStyle}
        >
          {enemies.length > 0 ? (
            enemies.map((enemy, index) => (
              <button
                onClick={() => {
                  // dispatch(assignEnemy({ entity: enemy, index: index }));
                  attackToEntity(
                    index,
                    selectedPlayer?.entity.attackDamage ?? 0
                  );
                }}
              >
                <Card key={enemy.id + "-" + index} entity={enemy}></Card>
              </button>
            ))
          ) : (
            <CardPlaceholder></CardPlaceholder>
          )}
        </span>
      </div>
      <div rel="players-section" className="py-4 absolute bottom-20 w-full">
        <span
          className={`grid gap-4 justify-items-center`}
          style={gridPlayersStyle}
        >
          {players.length > 0 ? (
            players.map((player, index) => (
              <div className="flex">
                <button
                  onClick={() =>
                    dispatch(assignPlayer({ entity: player, index: index }))
                  }
                >
                  <Card key={player.id + "-" + index} entity={player}></Card>
                </button>
                <button
                  onClick={() =>
                    dispatch(
                      assignSkill(selectedPlayer?.entity.skills[0] ?? null)
                    )
                  }
                >
                  {selectedPlayer?.entity.skills[0].name}
                </button>
                <p>select skill :{selectedSkill?.name}</p>
              </div>
            ))
          ) : (
            <CardPlaceholder></CardPlaceholder>
          )}
        </span>
      </div>
      {/* <span className="py-4 justify-center bg-black flex fixed w-full bottom-0">
        <ul className="flex gap-4">
          <li>
            <button
              className="rounded-md p-2"
              style={{ background: "#122a33" }}
            >
              <FontAwesomeIcon icon={faBox} className="mr-2"></FontAwesomeIcon>
              <p>skill 1</p>
            </button>
          </li>
          <button onClick={() => dispatch(increment())}>Test</button>
        </ul>
      </span> */}
    </>
  );
};

export default Stage;
