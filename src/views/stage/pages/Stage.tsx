import CardPlaceholder from "../components/CardPlaceholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
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

  const [turn, setTurn] = useState<string>("Player")

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [activeDialog, setActiveDialog] = useState<number>(99);

  return (
    <div className="flex flex-row justify-around items-center w-full min-h-screen h-screen">
      <div className="flex flex-col w-30 h-full gap-10 py-10 bg-black z-20">
        <button className="border-blue-500 border-2 m-5">BTN1</button>
        <button className="border-blue-500 border-2 m-5">BTN2</button>
        <button className="border-blue-500 border-2 m-5">BTN3</button>
        <button className="border-blue-500 border-2 m-5">BTN4</button>
        <button className="border-blue-500 border-2 m-5">BTN5</button>
      </div>

      <div className="flex flex-col justify-around items-center w-full min-h-screen h-screen">
        <div rel="enemies-section" className="p-10 flex flex-col items-stretch justify-center w-4/5 h-2/5 gap-3">
          <span
            className={`flex justify-around`}
            style={gridEnemiesStyle}
          >
            {props.enemies.length > 0 ? (
              props.enemies.map((enemy, index) => (
                <Card key={enemy.id + "-" + index} entity={enemy} openDialog={openDialog} setOpenDialog={setOpenDialog} activeDialog={activeDialog} setActiveDialog={setActiveDialog}></Card>
              ))
            ) : (
              <CardPlaceholder></CardPlaceholder>
            )}
          </span>
          <span
            className={`flex justify-around`}
            style={gridEnemiesStyle}
          >
            {props.enemies.length > 0 ? (
              props.enemies.map((enemy, index) => (
                <Card key={enemy.id + "-" + index} entity={enemy} openDialog={openDialog} setOpenDialog={setOpenDialog} activeDialog={activeDialog} setActiveDialog={setActiveDialog}></Card>
              ))
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
            <p>{turn}</p>
          </div>
        </div>
        <div rel="players-section" className="p-10 flex flex-col justify-center w-3/5 h-2/5 gap-3">
          <span
            className={`flex justify-around`}
            style={gridPlayersStyle}
          >
            {props.players.length > 0 ? (
              props.players.map((player) => (
                <Card key={player.id} entity={player} openDialog={openDialog} setOpenDialog={setOpenDialog} activeDialog={activeDialog} setActiveDialog={setActiveDialog}></Card>
              ))
            ) : (
              <CardPlaceholder></CardPlaceholder>
            )}
          </span>
          <span
            className={`flex justify-around`}
            style={gridPlayersStyle}
          >
            {props.players.length > 0 ? (
              props.players.map((player) => (
                <Card key={player.id} entity={player} openDialog={openDialog} setOpenDialog={setOpenDialog} activeDialog={activeDialog} setActiveDialog={setActiveDialog}></Card>
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
      </div>
    </div>
  );
};

export default Stage;
