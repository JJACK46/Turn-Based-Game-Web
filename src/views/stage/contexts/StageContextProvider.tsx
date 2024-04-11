import { Entity, EntityDetails } from "@/models/entity";
import { createContext, useEffect, useMemo, useState } from "react";
import { calculateTeamSpeed } from "../helpers/stage";
import { Skill } from "@/models/skills";
// import _ from "lodash";

type TurnType = "player" | "enemy" | null;

type UsingSkillData = {
  sourceEntityData: EntityDetails;
  targetEntityData: EntityDetails;
  sourceEntities: Entity[];
  targetEntities: Entity[];
  skill: Skill;
  isEnemyAction: boolean;
};

export interface StageContextType {
  mapName: string;
  enemiesFrontRow: Entity[];
  enemiesBackRow?: Entity[];
  playersFrontRow: Entity[];
  playersBackRow?: Entity[];
  remainEnemiesCount: number;
  remainPlayersCount: number;
  currentEntityData: EntityDetails | null;
  targetEntityData: EntityDetails | null;
  selectedSkill: Skill | null;
  turn: TurnType;
  availableActions: number;
  maxActions: number;
  roundCount: number;
  speedEnemyTeam: number;
  speedPlayerTeam: number;
  entitiesTakenAction: Entity[];
  userOverlay: { isActionOverlayOpen: boolean; isStageOverlayOpen: boolean };
  totalHitDamage: number;
  lastHitDamage: number;
  increaseAction: (n: number) => void;
  decreaseAction: (n: number) => void;
  setCurrentEntity: (ent: EntityDetails) => void;
  setEnemiesFrontRow: (entities: Entity[]) => void;
  setTargetEntity: (ent: EntityDetails) => void;
  setSelectSkill: (skill: Skill) => void;
  resetCurrentEntity: () => void;
  resetTargetEntity: () => void;
  resetSelectSkill: () => void;
  usingSkillToTargetEntity: (data: UsingSkillData) => void;
  openActionOverlay: () => void;
  closeActionOverlay: () => void;
  switchTurn: (currTurn: TurnType, availableActions: number) => void;
  calculateAvailableActions: (currTurn: TurnType) => void;
  botAction: ({
    turn,
    availableActions,
    sourceEntities,
  }: {
    turn: TurnType;
    availableActions: number;
    sourceEntities: Entity[];
  }) => void;
  getAliveEntities: (ent: Entity[]) => Entity[];
}

type CreateContextProviderProps = {
  StageProps: {
    mapName: string;
    enemiesFrontRow: Entity[];
    enemiesBackRow?: Entity[];
    playersFrontRow: Entity[];
    playersBackRow?: Entity[];
  };
  children: React.ReactNode;
};

export const StageContext = createContext<StageContextType | unknown | null>(
  null
);

const StageContextProvider = (props: CreateContextProviderProps) => {
  const {
    mapName,
    enemiesFrontRow,
    enemiesBackRow,
    playersFrontRow,
    playersBackRow,
  } = props.StageProps;

  const enemiesProps = enemiesFrontRow.concat(enemiesBackRow ?? []);
  const playersProps = playersFrontRow.concat(playersBackRow ?? []);

  const speedEnemyTeam = useMemo(
    () => calculateTeamSpeed(enemiesFrontRow.concat(enemiesBackRow ?? [])),
    [enemiesFrontRow, enemiesBackRow]
  );

  const speedPlayerTeam = useMemo(
    () => calculateTeamSpeed(playersFrontRow.concat(playersBackRow ?? [])),
    [playersFrontRow, playersBackRow]
  );

  const setSelectSkill = (skill: Skill) => {
    setState((prevState) => ({
      ...prevState,
      selectedSkill: { ...skill },
    }));
  };

  const resetSelectSkill = () => {
    setState((prevState) => ({
      ...prevState,
      selectedSkill: null,
    }));
  };

  const setCurrentEntity = (entity: EntityDetails) => {
    setState((prevState) => ({
      ...prevState,
      currentEntityData: { ...entity },
    }));
  };

  const resetCurrentEntity = () => {
    setState((prevState) => ({
      ...prevState,
      currentEntityData: null,
    }));
  };

  const setTargetEntity = (entity: EntityDetails) => {
    setState((prevState) => ({
      ...prevState,
      targetEntityData: { ...entity },
    }));
  };

  const resetTargetEntity = () => {
    setState((prevState) => ({
      ...prevState,
      targetEntityData: null,
    }));
  };

  const switchTurn = (turn: TurnType, availableActions: number) => {
    if (availableActions <= 0) {
      const newTurn: TurnType = turn === "enemy" ? "player" : "enemy";
      const entitiesCount =
        newTurn === "enemy"
          ? getAliveEntities(state.enemiesFrontRow.concat(enemiesBackRow ?? []))
              .length
          : getAliveEntities(state.playersFrontRow.concat(playersBackRow ?? []))
              .length;
      setState((prevState) => ({
        ...prevState,
        turn: newTurn,
        availableActions: entitiesCount,
        maxActions: entitiesCount,
      }));
    }
  };

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

  const calculateAvailableActions = (turn: TurnType) => {
    const entitiesCount =
      turn === "enemy"
        ? getAliveEntities(state.enemiesFrontRow.concat(enemiesBackRow ?? []))
            .length
        : getAliveEntities(state.playersFrontRow.concat(playersBackRow ?? []))
            .length;
    console.log(turn + "/" + entitiesCount);
    setState((prevState) => ({
      ...prevState,
      availableActions: entitiesCount,
    }));
  };

  const usingSkillToTargetEntity = (prop: UsingSkillData) => {
    const {
      sourceEntityData,
      sourceEntities,
      targetEntities,
      targetEntityData,
      skill,
      isEnemyAction,
    } = prop;
    if (sourceEntityData && targetEntityData && skill) {
      if (sourceEntityData.entity.manaPower >= skill.requiredMana) {
        if (skill.isAttackSkill) {
          const damageMade =
            Math.round(sourceEntityData.entity.attackPower ?? 0) *
            skill.emitValueMultiply;
          const newTargetEntityData = { ...targetEntityData };
          newTargetEntityData.entity.healthPower -= damageMade;

          //update target data
          const newTargetFrontRow = [...targetEntities];
          newTargetFrontRow[targetEntityData.position] =
            newTargetEntityData.entity;

          //update source mana/energy
          const newSourceFrontRow = [...sourceEntities];
          sourceEntityData.entity.manaPower -= skill.requiredMana;
          newSourceFrontRow[sourceEntityData.position] =
            sourceEntityData.entity;

          //update calculated result
          setState((prevState) => ({
            ...prevState,
            playersFrontRow: isEnemyAction
              ? [...newTargetFrontRow]
              : [...newSourceFrontRow],
            enemiesFrontRow: isEnemyAction
              ? [...newSourceFrontRow]
              : [...newTargetFrontRow],
            targetEntityData: { ...newTargetEntityData },
          }));
        }
      } else {
        increaseAction(1);
        alert("not enough MP/EP");
      }
    }
  };

  const getAliveEntities = (entities: Entity[]) => {
    return entities.filter((entity) => entity.healthPower > 0);
  };

  const botAction = ({
    turn,
    availableActions,
    sourceEntities,
  }: {
    turn: TurnType;
    availableActions: number;
    sourceEntities: Entity[];
  }) =>
    // enemiesBackRow?: Entity[]
    {
      if (turn === "enemy" && availableActions > 0) {
        const aliveEntitiesFrontRow = getAliveEntities(sourceEntities);

        // let aliveEntitiesBackRow;
        // if (enemiesBackRow) {
        //   aliveEntitiesBackRow = enemiesBackRow
        //     .filter((entity) => entity.healthPower > 0)
        // }

        for (let i = 0; i < aliveEntitiesFrontRow.length; i++) {
          const tempCurrentEntityData: EntityDetails = {
            entity: aliveEntitiesFrontRow[i],
            position: i,
            site: "front",
          };

          //set self to current entity action
          setTimeout(() => {
            setCurrentEntity(tempCurrentEntityData);
          }, 900);

          //target algorithm
          let leastHP = 9999;
          getAliveEntities(state.playersFrontRow).forEach((entity) => {
            if (entity.healthPower <= leastHP) {
              leastHP = entity.healthPower;
            }
          });
          const indexTargetEntity = state.playersFrontRow.findIndex(
            (entity) => entity.healthPower <= leastHP
          );
          const targetEntity = state.playersFrontRow[indexTargetEntity];
          const targetEntityData: EntityDetails = {
            entity: targetEntity,
            position: indexTargetEntity,
            site: "front",
          };
          //set target
          setTimeout(() => {
            setTargetEntity(targetEntityData);
          }, 1100);

          setTimeout(() => {
            //reset
            resetCurrentEntity();
            resetTargetEntity();
            resetSelectSkill();
            decreaseAction(1);
          }, 2100);

          //use skill
          setTimeout(() => {
            const botSelectedSkill = tempCurrentEntityData.entity.skills[0];
            setSelectSkill(botSelectedSkill);
            // console.log(state.enemiesFrontRow);
            usingSkillToTargetEntity({
              skill: botSelectedSkill,
              targetEntities: state.playersFrontRow,
              targetEntityData: targetEntityData,
              sourceEntityData: tempCurrentEntityData,
              sourceEntities: aliveEntitiesFrontRow,
              isEnemyAction: true,
            });
          }, 1600);
        }
      }
    };

  const setEnemiesFrontRow = (newEnemiesFrontRow: Entity[]) => {
    setState((prevState) => ({
      ...prevState,
      enemiesFrontRow: newEnemiesFrontRow,
      remainEnemiesCount: newEnemiesFrontRow.length,
    }));
  };

  const openActionOverlay = () => {
    setState((prevState) => ({
      ...prevState,
      userOverlay: { ...prevState.userOverlay, isActionOverlayOpen: true },
    }));
  };

  const closeActionOverlay = () => {
    setState((prevState) => ({
      ...prevState,
      userOverlay: { ...prevState.userOverlay, isActionOverlayOpen: false },
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

  const calculateInitialTurn = () => {
    if (speedEnemyTeam >= speedPlayerTeam) {
      return {
        turn: "enemy" as TurnType,
        availableActions: enemiesProps.length,
        maxActions: enemiesProps.length,
      };
    }
    return {
      turn: "player" as TurnType,
      availableActions: playersProps.length,
      maxActions: playersProps.length,
    };
  };

  const initialTurnData = calculateInitialTurn();

  const initialState: StageContextType = {
    mapName,
    enemiesFrontRow,
    enemiesBackRow,
    playersFrontRow,
    playersBackRow,
    remainEnemiesCount: enemiesProps.length,
    currentEntityData: null,
    targetEntityData: null,
    selectedSkill: null,
    turn: initialTurnData.turn,
    availableActions: initialTurnData.availableActions,
    maxActions: initialTurnData.maxActions,
    roundCount: 0,
    speedEnemyTeam,
    speedPlayerTeam,
    entitiesTakenAction: [],
    setCurrentEntity,
    setEnemiesFrontRow,
    userOverlay: {
      isActionOverlayOpen: false,
      isStageOverlayOpen: false,
    },
    totalHitDamage: 0,
    lastHitDamage: 0,
    setTargetEntity,
    usingSkillToTargetEntity,
    openActionOverlay,
    closeActionOverlay,
    setSelectSkill,
    resetCurrentEntity,
    resetTargetEntity,
    resetSelectSkill,
    increaseAction,
    decreaseAction,
    switchTurn,
    calculateAvailableActions,
    botAction,
    getAliveEntities,
    remainPlayersCount: playersProps.length,
  };

  const [state, setState] = useState<StageContextType>(initialState);

  useEffect(() => {
    setTimeout(() => {
      switchTurn(state.turn, state.availableActions);
      calculateRemainEntities({
        players: state.playersFrontRow.concat(playersBackRow ?? []),
        enemies: state.enemiesFrontRow.concat(enemiesBackRow ?? []),
      });
    }, 1000);
  }, [state.availableActions]);

  useEffect(() => {
    botAction({
      turn: state.turn,
      availableActions: state.availableActions,
      sourceEntities: state.enemiesFrontRow,
    });
  }, [state.turn]);

  useEffect(() => {
    if (state.remainEnemiesCount === 0) {
      alert("VICTORY");
    }
    if (state.remainPlayersCount === 0) {
      alert("DEFEAT");
    }
  }, [state.remainEnemiesCount, state.remainPlayersCount]);

  return (
    <StageContext.Provider value={state}>
      {props.children}
    </StageContext.Provider>
  );
};

export default StageContextProvider;
