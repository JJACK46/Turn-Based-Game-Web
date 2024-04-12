import { useContext, useState } from "react";
import { StageContext, TurnType } from "./StageContextProvider";
import { Entity } from "@/models/entity";
import { getSpeedOfTeam, getAliveEntities } from "../helpers/stage";
import _ from "lodash";

export const useStageContext = () => {
  const context = useContext(StageContext);
  if (!context) {
    throw new Error(
      "useStageContext must be used within an StageContextProvider"
    );
  }

  const [state, setState] = useState(context);

  // const enemies = state.enemiesFrontRow.concat(state.enemiesBackRow ?? []);
  // const players = state.playersFrontRow.concat(state.playersBackRow ?? []);

  // const calculateSpeedEnemyTeam = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     speedEnemyTeam: getSpeedOfTeam(enemies),
  //   }));
  // };
  // const calculateSpeedPlayerTeam = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     speedEnemyTeam: getSpeedOfTeam(players),
  //   }));
  // };

  const increaseAction = (n: number) => {
    setState((prevState) => ({
      ...prevState,
      availableActions: prevState.availableActions + n,
    }));
  };
  const decreaseAction = (n: number) => {
    setState((prevState) => ({
      ...prevState,
      availableActions: prevState.availableActions - n,
    }));
  };

  const calculateRemainEntities = ({
    players,
    enemies,
  }: {
    players: Entity[];
    enemies: Entity[];
  }) => {
    const alivePlayersCount = getAliveEntities(players).length;
    const aliveEnemiesCount = getAliveEntities(enemies).length;
    setState((prevState) => ({
      ...prevState,
      remainPlayersCount: alivePlayersCount,
      remainEnemiesCount: aliveEnemiesCount,
    }));
  };

  const calculateAvailableActions = (turn: TurnType) => {
    const entitiesCount =
      turn === "enemy"
        ? getAliveEntities(
            state.enemiesFrontRow.concat(state.enemiesBackRow ?? [])
          ).length
        : getAliveEntities(
            state.playersFrontRow.concat(state.playersBackRow ?? [])
          ).length;
    setState((prevState) => ({
      ...prevState,
      availableActions: entitiesCount,
    }));
  };

  const switchTurn = (turn: TurnType, availableActions: number) => {
    if (availableActions <= 0) {
      const newTurn: TurnType = turn === "enemy" ? "player" : "enemy";
      const entitiesCount =
        newTurn === "enemy"
          ? getAliveEntities(
              state.enemiesFrontRow.concat(state.enemiesBackRow ?? [])
            ).length
          : getAliveEntities(
              state.playersFrontRow.concat(state.playersBackRow ?? [])
            ).length;
      setState((prevState) => ({
        ...prevState,
        turn: newTurn,
        availableActions: entitiesCount,
        maxActions: entitiesCount,
        lastHitDamage: 0,
        totalHitDamage: 0,
      }));
      resetEntitiesTakenAction();
    }
  };

  const isEntityTakenAction = (entity: Entity): boolean => {
    return state.entitiesTakenAction.some((ent) => _.isEqual(ent, entity));
  };

  const getLastEntitiesTakenAction = () => {
    return state.entitiesTakenAction[-1];
  };

  const resetEntitiesTakenAction = () => {
    setState((prevState) => ({
      ...prevState,
      entitiesTakenAction: [],
    }));
  };

  const markEntityTakenAction = (entity: Entity) => {
    setState((prevState) => ({
      ...prevState,
      entitiesTakenAction: [...prevState.entitiesTakenAction, entity],
    }));
  };

  const getSetupStageDataBy = ({
    enemies,
    players,
  }: {
    enemies: Entity[];
    players: Entity[];
  }) => {
    const speedEnemiesTeam = getSpeedOfTeam(enemies);
    const speedPlayersTeam = getSpeedOfTeam(players);
    if (getSpeedOfTeam(enemies) >= getSpeedOfTeam(players)) {
      return {
        turn: "enemy" as TurnType,
        availableActions: enemies.length,
        maxActions: enemies.length,
        speedEnemiesTeam: speedEnemiesTeam,
        speedPlayersTeam: speedPlayersTeam,
      };
    }
    return {
      turn: "player" as TurnType,
      availableActions: players.length,
      maxActions: players.length,
      speedEnemiesTeam: speedEnemiesTeam,
      speedPlayersTeam: speedPlayersTeam,
    };
  };

  return {
    ...state,
    increaseAction,
    decreaseAction,
    calculateRemainEntities,
    calculateAvailableActions,
    switchTurn,
    isEntityTakenAction,
    getLastEntitiesTakenAction,
    markEntityTakenAction,
    getSetupStageDataBy,
    // calculateSpeedEnemyTeam,
    // calculateSpeedPlayerTeam,
  };
};
