import CardPlaceholder from "../components/CardPlaceholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Entity } from "../../../models/entity";
import Card from "../components/Card";
// import { useAppDispatch, useAppSelector } from "../../../app/hooks";
// import { increment } from "../features/actionsBarSlice";

interface Props {
  tutorial?: true;
  mapName: string;
  enemies: Entity[];
  players: Entity[];
}

const Stage: React.FC<Props> = (props) => {
  // const count = useAppSelector((state) => state.counter.value);
  // const dispatch = useAppDispatch();

  const gridEnemiesStyle = {
    gridTemplateColumns: `repeat(${props.enemies.length}, 1fr)`,
  };
  const gridPlayersStyle = {
    gridTemplateColumns: `repeat(${props.players.length}, 1fr)`,
  };

  return (
    <>
      <span className="py-1 justify-center bg-black flex">{props.mapName}</span>
      <div rel="enemies-section" className="py-4 absolute top-10 w-full">
        <span
          className={`grid gap-4 justify-items-center`}
          style={gridEnemiesStyle}
        >
          {props.enemies.length > 0 ? (
            props.enemies.map((enemy, index) => (
              <Card key={enemy.id + "-" + index} entity={enemy}></Card>
            ))
          ) : (
            <CardPlaceholder></CardPlaceholder>
          )}
        </span>
      </div>
      <div rel="players-section" className="py-4 absolute bottom-20 w-full">
        <span
          className={`grid  gap-4 justify-items-center`}
          style={gridPlayersStyle}
        >
          {props.players.length > 0 ? (
            props.players.map((player) => (
              <Card key={player.id} entity={player}></Card>
            ))
          ) : (
            <CardPlaceholder></CardPlaceholder>
          )}
        </span>
      </div>
      <span className="py-4 justify-center bg-black flex fixed w-full bottom-0">
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
          {/* <button onClick={() => dispatch(increment())}>Test</button> */}
        </ul>
      </span>
    </>
  );
};

export default Stage;
