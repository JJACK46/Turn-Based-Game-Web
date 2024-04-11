import { Entity, EntityDetails } from "@/models/entity";
import { createContext, useEffect, useMemo, useState } from "react";
import { calculateTeamSpeed } from "../helpers/stage";
import { Skill } from "@/models/skills";
import _ from "lodash";

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
  userOverlay: {
    isActionOverlayOpen: boolean;
    isStageOverlayOpen: boolean;
    isInfoOverlayOpen: boolean;
    isTurnWarning: boolean;
    isActionWarning: boolean;
  };
  totalHitDamage: number;
  lastHitDamage: number;
  isGameStart: boolean;
  increaseAction: (n: number) => void;
  decreaseAction: (n: number) => void;
  setCurrentEntity: (ent: EntityDetails) => void;
  setEnemiesFrontRow: (entities: Entity[]) => void;
  setTargetEntity: (ent: EntityDetails) => void;
  setSelectSkill: (skill: Skill) => void;
  resetCurrentEntity: () => void;
  resetTargetEntity: () => void;
  resetSelectSkill: () => void;
  usingSkillToTargetEntity: (data: UsingSkillData) => boolean;
  openActionOverlay: () => void;
  closeActionOverlay: () => void;
  openInfoOverlay: () => void;
  closeInfoOverlay: () => void;
  setTurnWarning: (input:boolean) => void;
  setActionWarning: (input:boolean) => void;
  switchTurn: (currTurn: TurnType, availableActions: number) => void;
  calculateAvailableActions: (currTurn: TurnType) => void;
  botAction: ({
    turn,
    availableActions,
    sourceEntities,
    entitiesTakenAction,
  }: {
    turn: TurnType;
    availableActions: number;
    sourceEntities: Entity[];
    entitiesTakenAction: Entity[];
  }) => void;
  getAliveEntities: (ent: Entity[]) => Entity[];
  markEntityTakenAction: (ent: Entity) => void;
  getLastEntitiesTakenAction: () => Entity;
  resetEntitiesTakenAction: () => void;
  isEntityTakenAction: (ent: Entity) => boolean;
  startGame: () => void;
  endGame: () => void;
  getMostAttackPowerEntityForBot: (ent: Entity[]) => EntityDetails | undefined;
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

  const markEntityTakenAction = (entity: Entity) => {
    setState((prevState) => ({
      ...prevState,
      entitiesTakenAction: [...prevState.entitiesTakenAction, entity],
    }));
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
        lastHitDamage: 0,
        totalHitDamage: 0,
      }));
      resetEntitiesTakenAction();
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
          const damageMade = Math.round(
            Math.round(sourceEntityData.entity.attackPower ?? 0) *
            skill.emitValueMultiply
          );
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
            totalHitDamage: prevState.totalHitDamage + damageMade,
            lastHitDamage: damageMade,
            playersFrontRow: isEnemyAction
              ? [...newTargetFrontRow]
              : [...newSourceFrontRow],
            enemiesFrontRow: isEnemyAction
              ? [...newSourceFrontRow]
              : [...newTargetFrontRow],
            targetEntityData: { ...newTargetEntityData },
          }));
          return true;
        }
        return false;
      } else {
        increaseAction(1);
        alert("not enough MP/EP");
        return false;
      }
    }
    return false;
  };

  const getAliveEntities = (entities: Entity[]) => {
    return entities.filter((entity) => entity.healthPower > 0);
  };

  const getMostAttackPowerEntityForBot = (
    entities: Entity[]
  ): EntityDetails | undefined => {
    if (entities.length === 0) return undefined;

    let maxATK = 0;
    let resultEntity: EntityDetails | undefined = undefined;

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      if (entity.attackPower > maxATK && !isEntityTakenAction(entity)) {
        maxATK = entity.attackPower;
        resultEntity = { entity: entity, position: i, site: "front" };
      }
    }
    return resultEntity;
  };

  const botAction = ({
    turn,
    availableActions,
    sourceEntities,
    entitiesTakenAction,
  }: {
    turn: TurnType;
    availableActions: number;
    entitiesTakenAction: Entity[];
    sourceEntities: Entity[];
  }) => {
    if (turn === "enemy" && availableActions > 0) {
      const aliveEntities = sourceEntities.filter(
        (entity) => entity.healthPower > 0
      );

      let potentialEntityData: EntityDetails | null = null;

      const mostAtkEntity = getMostAttackPowerEntityForBot(aliveEntities);

      if (mostAtkEntity) {
        const index = sourceEntities.indexOf(mostAtkEntity.entity);
        if (index > -1) {
          potentialEntityData = {
            entity: sourceEntities[index],
            position: index,
            site: "front",
          };
          markEntityTakenAction(potentialEntityData.entity);
        }
      }

      if (
        potentialEntityData &&
        !entitiesTakenAction.includes(potentialEntityData.entity)
      ) {
        setCurrentEntity(potentialEntityData);

        //target algorithm
        let leastHP = 9999;
        let targetEntityData: EntityDetails | null = null;
        const targetedEntities: Entity[] = [];

        for (const playerEntity of state.playersFrontRow) {
          const index = state.playersFrontRow.indexOf(playerEntity);
          const currentPlayerData: EntityDetails = {
            entity: playerEntity,
            position: index,
            site: "front",
          };

          if (
            playerEntity.healthPower <= leastHP &&
            playerEntity.healthPower > 0 &&
            !targetedEntities.includes(playerEntity)
          ) {
            leastHP = playerEntity.healthPower;
            targetEntityData = currentPlayerData;
          }
        }

        if (targetEntityData) {
          targetedEntities.push(targetEntityData.entity);
          //set target
          setTimeout(() => {
            setTargetEntity(targetEntityData);
          }, 1000);


          //use skill
          setTimeout(() => {
            const botSelectedSkill = potentialEntityData.entity.skills[0];
            setSelectSkill(botSelectedSkill);
            usingSkillToTargetEntity({
              skill: botSelectedSkill,
              targetEntities: state.playersFrontRow,
              targetEntityData: targetEntityData,
              sourceEntityData: potentialEntityData,
              sourceEntities,
              isEnemyAction: true,
            });
          }, 2000);

          setTimeout(() => {
            //reset
            resetCurrentEntity();
            resetTargetEntity();
            resetSelectSkill();
            decreaseAction(1);
          }, 3000);
        }
      }
      // }
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

  const openInfoOverlay = () => {
    setState((prevState) => ({
      ...prevState,
      userOverlay: { ...prevState.userOverlay, isInfoOverlayOpen: true },
    }));
  };

  const closeInfoOverlay = () => {
    setState((prevState) => ({
      ...prevState,
      userOverlay: { ...prevState.userOverlay, isInfoOverlayOpen: false },
    }));
  };

  const setActionWarning = (input: boolean) => {
    setState((prevState) => ({
      ...prevState,
      userOverlay: { ...prevState.userOverlay, isActionWarning: input },
    }));
  };

  const setTurnWarning = (input: boolean) => {
    setState((prevState) => ({
      ...prevState,
      userOverlay: { ...prevState.userOverlay, isTurnWarning: input },
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

  const startGame = () => {
    setState((prevState) => ({
      ...prevState,
      isGameStart: true,
    }));
    botAction({
      turn: state.turn,
      availableActions: state.availableActions,
      sourceEntities: state.enemiesFrontRow,
      entitiesTakenAction: state.entitiesTakenAction,
    });
  };

  const endGame = () => {
    setState((prevState) => ({
      ...prevState,
      isGameStart: false,
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
      isInfoOverlayOpen: false,
      isTurnWarning: false,
      isActionWarning: false,
    },
    totalHitDamage: 0,
    lastHitDamage: 0,
    setTargetEntity,
    usingSkillToTargetEntity,
    openActionOverlay,
    closeActionOverlay,
    openInfoOverlay,
    closeInfoOverlay,
    setActionWarning,
    setTurnWarning,
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
    markEntityTakenAction,
    getLastEntitiesTakenAction,
    resetEntitiesTakenAction,
    isEntityTakenAction,
    isGameStart: false,
    startGame,
    endGame,
    getMostAttackPowerEntityForBot,
  };

  const [state, setState] = useState<StageContextType>(initialState);

  useEffect(() => {
    setTimeout(() => {
      switchTurn(state.turn, state.availableActions);
      calculateRemainEntities({
        players: state.playersFrontRow.concat(playersBackRow ?? []),
        enemies: state.enemiesFrontRow.concat(enemiesBackRow ?? []),
      });
    }, 2000);
  }, [state.availableActions]);

  useEffect(() => {

    if (state.turn === "enemy" && state.isGameStart) {
      botAction({
        turn: state.turn,
        availableActions: state.availableActions,
        sourceEntities: state.enemiesFrontRow,
        entitiesTakenAction: state.entitiesTakenAction,
      });
    }
  }, [state.availableActions]);

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
