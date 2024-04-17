import { Entity, EntityInstance } from "@/classes/entity";
import { SkillInstance } from "@/classes/skills";
import { TurnType } from "@/data/types/turn";
import { create } from "zustand";
import { getAliveEntities, getSpeedOfTeam } from "../helpers/stage";
import { createUniqueID } from "@/utils/uniqueId";
import { PositionEnum } from "@/data/enums/positions";
// import { immer } from "zustand/middleware/immer";
import { produce } from "immer";

type InfoDamage = {
  totalHitDamage: number;
  lastHitDamage: number;
  blockedDamage: number;
  missed: boolean;
};

interface GameLogicType {
  infoGame: {
    mapName: string;
    remainEnemiesCount: number;
    remainPlayersCount: number;
    turn: TurnType;
    availableActions: number;
    maxActions: number;
    roundCount: number;
    isGameStart: boolean;
    cycleRound: number;
    speedEnemyTeam: number;
    speedPlayerTeam: number;
  };
  infoIndicator: {
    currentEntity: EntityInstance | null;
    targetEntity: EntityInstance | null;
    selectedSkill: SkillInstance | null;
  };
  infoMarkedEntities: {
    takenAction: EntityInstance[];
    downtimeSkill: EntityInstance[];
  };
  infoDamage: InfoDamage;
  methodsMark: {
    markEntityTakenAction: (e: EntityInstance) => void;
    resetEntitiesTakenAction: () => void;
  };
  methodsGame: {
    increaseAction: (n: number) => void;
    decreaseAction: (n: number) => void;
    switchTurn: () => void;
    startGame: () => void;
    endGame: () => void;
    setupGame: (props: {
      mapName: string;
      enemiesFrontRow: Entity[];
      enemiesBackRow?: Entity[];
      playersFrontRow: Entity[];
      playersBackRow?: Entity[];
    }) => void;
    increaseRound: () => void;
    updateCycleRound: () => void;
    resetCycleRound: () => void;
    calculateRemainEntities: (props: {
      players: EntityInstance[];
      enemies: EntityInstance[];
    }) => void;
  };
  infoField: {
    enemiesFrontRow: EntityInstance[];
    enemiesBackRow?: EntityInstance[];
    playersFrontRow: EntityInstance[];
    playersBackRow?: EntityInstance[];
  };
  methodsField: {
    setEntities: (props: {
      entities: EntityInstance[];
      isPlayer: boolean;
      position: PositionEnum;
    }) => void;
  };
  methodsIndicator: {
    setTargetStatus: (props: {
      targetEntity: EntityInstance;
      targetEntities: EntityInstance[];
      isPlayer: boolean;
    }) => void;
    setSelectSkill: (s: SkillInstance | null) => void;
    resetSelectSkill: () => void;
    setCurrentEntity: (e: EntityInstance) => void;
    resetCurrentEntity: () => void;
    setTargetEntity: (e: EntityInstance) => void;
    resetTargetEntity: () => void;
    usingSkillToTarget: (props: {
      skillInstance: SkillInstance;
      sourceEntity: EntityInstance;
      targetEntity: EntityInstance;
      sourceEntities: EntityInstance[];
      targetEntities: EntityInstance[];
      isEnemyAction: boolean;
    }) => boolean;
    usingSkillToSelf: (prop: {
      skillInstance: SkillInstance;
      sourceEntity: EntityInstance;
      sourceEntities: EntityInstance[];
      isEnemyAction: boolean;
    }) => boolean;
  };
  setInfoDamage: (props: InfoDamage) => void;
}

export const useGameStore = create<GameLogicType>((set) => ({
  infoField: {
    enemiesFrontRow: [],
    playersFrontRow: [],
  },
  infoGame: {
    isGameStart: false,
    mapName: "",
    cycleRound: 2,
    turn: null,
    maxActions: 0,
    availableActions: -1,
    roundCount: 1,
    speedEnemyTeam: 0,
    speedPlayerTeam: 0,
    remainEnemiesCount: 0,
    remainPlayersCount: 0,
  },
  infoDamage: {
    totalHitDamage: 0,
    lastHitDamage: 0,
    blockedDamage: 0,
    missed: false,
  },
  infoMarkedEntities: {
    takenAction: [],
    downtimeSkill: [],
  },
  methodsMark: {
    resetEntitiesTakenAction: () =>
      set((state) => ({
        ...state,
        infoMarkedEntities: {
          ...state.infoMarkedEntities,
          entitiesTakenAction: [],
        },
      })),
    markEntityTakenAction: (entity) =>
      set((state) => ({
        ...state,
        infoMarkedEntities: {
          ...state.infoMarkedEntities,
          takenAction: [...state.infoMarkedEntities.takenAction, entity],
        },
      })),
  },
  methodsField: {
    setEntities: ({ entities, isPlayer, position }) => {
      set((state) => {
        if (isPlayer) {
          if (position === "front") {
            return {
              ...state,
              infoField: {
                ...state.infoField,
                playersFrontRow: [...entities],
              },
            };
          }
          return {
            ...state,
            infoField: {
              ...state.infoField,
              playersBackRow: [...entities],
            },
          };
        } else {
          if (position === "front") {
            return {
              ...state,
              infoField: {
                ...state.infoField,
                enemiesFrontRow: [...entities],
              },
            };
          }
          return {
            ...state,
            infoField: { ...state.infoField, enemiesBackRow: [...entities] },
          };
        }
      });
    },
  },
  infoIndicator: {
    currentEntity: null,
    targetEntity: null,
    selectedSkill: null,
  },
  setInfoDamage(props) {
    set((state) => ({
      ...state,
      infoDamage: { ...props },
    }));
  },
  methodsIndicator: {
    setTargetStatus: (props) => {
      const { targetEntity, targetEntities, isPlayer } = props;
      const site = targetEntity.position;
      set((state) => {
        if (isPlayer) {
          if (site === "front") {
            return {
              ...state,
              infoField: {
                ...state.infoField,
                playersFrontRow: targetEntities,
              },
            };
          }
          return {
            ...state,
            infoField: { ...state.infoField, playersBackRow: targetEntities },
          };
        } else {
          if (site === "front") {
            return {
              ...state,
              infoField: {
                ...state.infoField,
                enemiesFrontRow: targetEntities,
              },
            };
          }
          return {
            ...state,
            infoField: { ...state.infoField, enemiesBackRow: targetEntities },
          };
        }
      });
    },
    setSelectSkill: (skill: SkillInstance | null) => {
      set((prevState) => ({
        ...prevState,
        infoIndicator: {
          ...prevState.infoIndicator,
          selectedSkill: skill,
        },
      }));
    },
    resetSelectSkill: () => {
      set((prevState) => ({
        ...prevState,
        infoIndicator: {
          ...prevState.infoIndicator,
          selectedSkill: null,
        },
      }));
    },
    setCurrentEntity: (entity: EntityInstance) => {
      set((prevState) => ({
        ...prevState,
        infoIndicator: {
          ...prevState.infoIndicator,
          currentEntity: entity,
        },
      }));
    },
    resetCurrentEntity: () => {
      set((prevState) => ({
        ...prevState,
        infoIndicator: {
          ...prevState.infoIndicator,
          currentEntity: null,
        },
      }));
    },
    setTargetEntity: (entity: EntityInstance) => {
      set((prevState) => ({
        ...prevState,
        infoIndicator: {
          ...prevState.infoIndicator,
          targetEntity: entity,
        },
      }));
    },
    resetTargetEntity: () => {
      set((prevState) => ({
        ...prevState,
        infoIndicator: {
          ...prevState.infoIndicator,
          targetEntity: null,
        },
      }));
    },
    usingSkillToTarget: (prop) => {
      const {
        sourceEntities,
        targetEntities,
        isEnemyAction,
        skillInstance,
        sourceEntity,
        targetEntity,
      } = prop;

      if (sourceEntity.hasEnoughManaFor({ skill: skillInstance.skill })) {
        let resultDamage = 0;
        let blockedDamage = 0;
        let damageMade = 0;
        let missed = false;
        let updatedTarget = targetEntity;
        let updatedTargetEntities = [...targetEntities]; // Create a shallow copy
        const updatedSourceEntities = [...sourceEntities]; // Create a shallow copy

        if (!skillInstance.isAttackAOE) {
          // Single target
          const {
            resultDamage: res,
            blockedDamage: blocked,
            damageMade: dmg,
            effectedTarget,
            missed: miss,
          } = skillInstance.effectToTarget({
            sourceEntity,
            targetEntity,
          });

          updatedTargetEntities[effectedTarget.index] = effectedTarget;

          updatedSourceEntities[sourceEntity.index] =
            sourceEntity.updateManaFromUse({
              skill: skillInstance.skill,
            });
          resultDamage = res;
          blockedDamage = blocked;
          damageMade = dmg;
          missed = miss;
          updatedTarget = effectedTarget;
        } else {
          // AOE target
          const { resultDamage: resAOE, effectedTargets } =
            skillInstance.effectToAOE({
              sourceEntity,
              targetEntities,
            });

          updatedTargetEntities = effectedTargets;

          updatedSourceEntities[sourceEntity.index] =
            sourceEntity.updateManaFromUse({
              skill: skillInstance.skill,
            });
          resultDamage = resAOE;
        }

        // Update state

        set(
          produce((state) => {
            state.infoDamage.totalHitDamage += resultDamage;
            state.infoDamage.lastHitDamage = damageMade;
            state.infoDamage.blockedDamage = blockedDamage;
            state.infoDamage.missed = missed;
            state.infoField.playersFrontRow = isEnemyAction
              ? [...updatedTargetEntities]
              : [...updatedSourceEntities];
            state.infoField.enemiesFrontRow = isEnemyAction
              ? [...updatedSourceEntities]
              : [...updatedTargetEntities];
            state.infoField.targetEntityData = updatedTarget;
          })
        );

        return true;
      } else {
        console.log("Not enough MP/EP");
        return false;
      }
    },

    usingSkillToSelf: (prop) => {
      const { sourceEntities, isEnemyAction, skillInstance, sourceEntity } =
        prop;

      if (skillInstance && sourceEntity) {
        if (
          sourceEntity.hasEnoughManaFor({
            skill: skillInstance.skill,
          })
        ) {
          const effectedSourceEntity = skillInstance.effectToSelf(sourceEntity);

          sourceEntities[sourceEntity.index] =
            effectedSourceEntity.updateManaFromUse({
              skill: skillInstance.skill,
            });

          set((state) => ({
            ...state,
            infoField: {
              ...state.infoField,
              playersFrontRow: isEnemyAction
                ? [...state.infoField.playersFrontRow]
                : [...sourceEntities],
              enemiesFrontRow: isEnemyAction
                ? [...sourceEntities]
                : [...state.infoField.playersFrontRow],
            },
          }));

          return true; // Skill was used successfully
        } else {
          console.log("not enough MP/EP");
          return false;
        }
      }
      return false; // Skill was not used
    },
  },
  methodsGame: {
    increaseRound: () => {
      set((state) => ({
        ...state,
        infoGame: {
          ...state.infoGame,
          roundCount: state.infoGame.roundCount + 1,
        },
      }));
    },
    updateCycleRound: () => {
      set((state) => ({
        ...state,
        infoGame: {
          ...state.infoGame,
          cycleRound: state.infoGame.cycleRound - 1,
        },
      }));
    },
    resetCycleRound: () => {
      set((state) => ({
        ...state,
        infoGame: { ...state.infoGame, cycleRound: 2 },
      }));
    },
    setupGame: (props) =>
      set((state) => {
        const {
          mapName,
          enemiesFrontRow,
          enemiesBackRow,
          playersFrontRow,
          playersBackRow,
        } = props;

        const enemies = [...enemiesFrontRow, ...(enemiesBackRow ?? [])];
        const players = [...playersFrontRow, ...(playersBackRow ?? [])];

        const createEntityInstances = (
          entities: Entity[],
          position: PositionEnum,
          playable: boolean
        ) =>
          entities.map(
            (ent, index) =>
              new EntityInstance({
                instanceId: createUniqueID({
                  name: ent.name,
                  id: ent.id,
                  index,
                  position,
                }),
                entity: ent,
                index: index,
                position,
                playable,
              })
          );

        const enemiesFrontRowInstance = createEntityInstances(
          enemiesFrontRow,
          PositionEnum.FRONT,
          false
        );
        const enemiesBackRowInstance = createEntityInstances(
          enemiesBackRow ?? [],
          PositionEnum.BACK,
          false
        );
        const playersFrontRowInstance = createEntityInstances(
          playersFrontRow,
          PositionEnum.FRONT,
          true
        );
        const playersBackRowInstance = createEntityInstances(
          playersBackRow ?? [],
          PositionEnum.BACK,
          true
        );

        const speedEnemyTeam = getSpeedOfTeam(enemies);
        const speedPlayerTeam = getSpeedOfTeam(players);
        const turn: TurnType =
          speedEnemyTeam >= speedPlayerTeam ? "enemy" : "player";
        const availableActions =
          turn === "enemy" ? enemies.length : players.length;

        return {
          ...state,
          infoGame: {
            ...state.infoGame,
            mapName,
            speedEnemyTeam,
            speedPlayerTeam,
            availableActions,
            maxActions: availableActions,
            remainEnemiesCount: enemies.length,
            remainPlayersCount: players.length,
            turn,
          },
          infoField: {
            enemiesFrontRow: enemiesFrontRowInstance,
            enemiesBackRow: enemiesBackRowInstance,
            playersFrontRow: playersFrontRowInstance,
            playersBackRow: playersBackRowInstance,
          },
        };
      }),
    startGame: () =>
      set((state) => ({
        ...state,
        infoGame: { ...state.infoGame, isGameStart: true },
      })),
    endGame: () =>
      set((state) => ({
        ...state,
        infoGame: { ...state.infoGame, isGameStart: false },
      })),
    increaseAction: (n: number) =>
      set((state) => ({
        ...state,
        infoGame: {
          ...state.infoGame,
          availableActions: state.infoGame.availableActions + n,
        },
      })),
    decreaseAction: (n: number) =>
      set((state) => ({
        ...state,
        infoGame: {
          ...state.infoGame,
          availableActions: state.infoGame.availableActions - n,
        },
      })),
    calculateRemainEntities: ({ players, enemies }) =>
      set((state) => ({
        ...state,
        infoGame: {
          ...state.infoGame,
          remainPlayersCount: getAliveEntities(players).length,
          remainEnemiesCount: getAliveEntities(enemies).length,
        },
      })),
    switchTurn: () => {
      set((state) => {
        const newTurn: TurnType =
          state.infoGame.turn === "enemy" ? "player" : "enemy";
        const remainEnemiesCount = getAliveEntities(
          state.infoField.enemiesFrontRow.concat(
            state.infoField.enemiesBackRow ?? []
          )
        ).length;
        const remainPlayersCount = getAliveEntities(
          state.infoField.playersFrontRow.concat(
            state.infoField.playersBackRow ?? []
          )
        ).length;
        const entitiesCount: number =
          newTurn === "enemy" ? remainEnemiesCount : remainPlayersCount;
        return {
          ...state,
          infoGame: {
            ...state.infoGame,
            remainEnemiesCount,
            remainPlayersCount,
            turn: newTurn,
            availableActions: entitiesCount,
            maxActions: entitiesCount,
          },
          infoDamage: {
            lastHitDamage: 0,
            totalHitDamage: 0,
            blockedDamage: 0,
            missed: false,
          },
          infoMarkedEntities: {
            ...state.infoMarkedEntities,
            takenAction: [],
          },
        };
      });
    },
  },
}));
