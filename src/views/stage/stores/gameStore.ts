import { EntityType, Entity } from "@/classes/entity";
import { Skill } from "@/classes/skills";
import { create } from "zustand";
import { getAliveEntities, getSpeedOfTeam } from "../helpers/stage";
import { PositionEnum } from "@/data/enums/positions";
import { immer } from "zustand/middleware/immer";
// import { produce } from "immer";
import { createEntityInstances } from "@/utils/createEntity";

type InfoDamage = {
  totalHitDamage: number;
  lastHitDamage: number;
  blockedDamage: number;
  missed: boolean;
};

type TurnType = "player" | "enemy" | null;

type GameResultType = "victory" | "defeat" | null;

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
    gameResult: GameResultType;
  };
  infoIndicator: {
    currentEntity: Entity | null;
    targetEntity: Entity | null;
    targetEntities: Entity[] | null;
    selectedSkill: Skill | null;
  };
  infoMarkedEntities: {
    takenAction: Entity[];
    downtimeSkill: Entity[];
  };
  infoDamage: InfoDamage;
  methodsMark: {
    markEntityTakenAction: (e: Entity) => void;
    resetEntitiesTakenAction: () => void;
  };
  methodsGame: {
    increaseAction: (n: number) => void;
    decreaseAction: (n: number) => void;
    switchTurn: () => void;
    updateRemainingEntity: (turn: TurnType) => void;
    startGame: () => void;
    endGame: () => void;
    setupGame: (props: {
      mapName: string;
      enemiesFrontRow: EntityType[];
      enemiesBackRow?: EntityType[];
      playersFrontRow: EntityType[];
      playersBackRow?: EntityType[];
    }) => void;
    increaseRound: () => void;
    updateCycleRound: () => void;
    resetCycleRound: () => void;
    calculateRemainEntities: (props: {
      players: Entity[];
      enemies: Entity[];
    }) => void;
    setGameResult: (p: GameResultType) => void;
  };
  infoField: {
    enemiesFrontRow: Entity[];
    enemiesBackRow?: Entity[];
    playersFrontRow: Entity[];
    playersBackRow?: Entity[];
  };
  methodsField: {
    setEntities: (props: {
      entities: Entity[];
      isPlayer: boolean;
      position: PositionEnum;
    }) => void;
  };
  methodsIndicator: {
    setTargetStatus: (props: {
      targetEntity: Entity;
      targetEntities: Entity[];
      isPlayer: boolean;
    }) => void;
    setSelectSkill: (s: Skill | null) => void;
    resetSelectSkill: () => void;
    setCurrentEntity: (e: Entity) => void;
    resetCurrentEntity: () => void;
    setTargetEntity: (e: Entity) => void;
    resetTargetEntity: () => void;
    usingSkillToTarget: (props: {
      skill: Skill;
      sourceEntity: Entity;
      targetEntity: Entity;
      sourceEntities: Entity[];
      targetEntities: Entity[];
      isEnemyAction: boolean;
    }) => boolean;
    usingSkillToSelf: (prop: {
      skill: Skill;
      sourceEntity: Entity;
      sourceEntities: Entity[];
      isEnemyAction: boolean;
    }) => boolean;
  };
  setInfoDamage: (props: InfoDamage) => void;
}

export const useGameStore = create<GameLogicType>()(
  immer((set) => ({
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
      gameResult: null,
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
      targetEntities: null,
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
      setSelectSkill: (skill: Skill | null) => {
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
      setCurrentEntity: (entity: Entity) => {
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
      setTargetEntity: (entity: Entity) => {
        set((state) => {
          state.infoIndicator.targetEntity = entity;
        });
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
          skill,
          sourceEntity,
          targetEntity,
        } = prop;

        if (sourceEntity.hasEnoughManaFor({ skill: skill })) {
          let resultDamage = 0;
          let blockedDamage = 0;
          let damageMade = 0;
          let missed = false;
          let updatedTarget = targetEntity;
          let updatedTargetEntities = [...targetEntities]; // Create a shallow copy
          const updatedSourceEntities = [...sourceEntities]; // Create a shallow copy

          if (skill.isAttackSkill) {
            if (!skill.isAttackAOE) {
              // Single target
              const {
                resultDamage: res,
                blockedDamage: blocked,
                damageMade: dmg,
                effectedTarget,
                missed: miss,
              } = skill.effectToTarget({
                sourceEntity,
                targetEntity,
              });

              updatedTargetEntities[effectedTarget.index] = effectedTarget;

              updatedSourceEntities[sourceEntity.index] =
                sourceEntity.updateManaFromUse({
                  skill: skill,
                });
              resultDamage = res;
              blockedDamage = blocked;
              damageMade = dmg;
              missed = miss;
              updatedTarget = effectedTarget;
            } else {
              // AOE target
              const { resultDamage: resAOE, effectedTargets } =
                skill.effectToAOE({
                  sourceEntity,
                  targetEntities,
                });

              updatedTargetEntities = effectedTargets;

              updatedSourceEntities[sourceEntity.index] =
                sourceEntity.updateManaFromUse({
                  skill: skill,
                });
              resultDamage = resAOE;
            }
            // Update state (immer)
            set((state) => {
              state.infoDamage.totalHitDamage += resultDamage;
              state.infoDamage.lastHitDamage = damageMade;
              state.infoDamage.blockedDamage = blockedDamage;
              state.infoDamage.missed = missed;
              state.infoIndicator.targetEntity = updatedTarget;
            });
            if (isEnemyAction) {
              set((state) => {
                state.infoField.enemiesFrontRow = updatedSourceEntities;
                state.infoField.playersFrontRow = updatedTargetEntities;
              });
            } else {
              //player turn
              set((state) => {
                state.infoField.playersFrontRow = updatedSourceEntities;
                state.infoField.enemiesFrontRow = updatedTargetEntities;
              });
            }

            return true;
          }
          //buff skill
          console.log("test");
          const { effectedTarget } = skill.effectToTarget({
            sourceEntity,
            targetEntity,
          });
          updatedTargetEntities[effectedTarget.index] = effectedTarget;

          updatedSourceEntities[sourceEntity.index] =
            sourceEntity.updateManaFromUse({
              skill: skill,
            });
          if (isEnemyAction) {
            set((state) => {
              state.infoField.enemiesFrontRow = updatedSourceEntities;
              state.infoIndicator.targetEntity = updatedTarget;
            });
          } else {
            set((state) => {
              state.infoField.playersFrontRow = updatedSourceEntities;
            });
          }
          return true;
        } else {
          console.log("Not enough MP/EP");
          return false;
        }
      },

      usingSkillToSelf: (prop) => {
        const { sourceEntities, isEnemyAction, skill, sourceEntity } = prop;
        const updatedEntities = [...sourceEntities];
        if (skill && sourceEntity) {
          if (
            sourceEntity.hasEnoughManaFor({
              skill: skill,
            })
          ) {
            const effectedSourceEntity = skill.effectToSelf(sourceEntity);

            updatedEntities[sourceEntity.index] =
              effectedSourceEntity.updateManaFromUse({
                skill: skill,
              });

            set((state) => {
              state.infoField.enemiesFrontRow = isEnemyAction
                ? updatedEntities
                : state.infoField.enemiesFrontRow;
              state.infoField.playersFrontRow = !isEnemyAction
                ? updatedEntities
                : state.infoField.playersFrontRow;
            });

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
      setGameResult: (newValue) => {
        set((state) => {
          state.infoGame.gameResult = newValue;
        });
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
      updateRemainingEntity: (newTurn) => {
        set((state) => {
          // Count the number of remaining alive entities for enemies
          const remainEnemiesCount = getAliveEntities(
            state.infoField.enemiesFrontRow.concat(
              state.infoField.enemiesBackRow ?? []
            )
          ).length;

          // Count the number of remaining alive entities for players
          const remainPlayersCount = getAliveEntities(
            state.infoField.playersFrontRow.concat(
              state.infoField.playersBackRow ?? []
            )
          ).length;

          // Update the state with the new remaining entity counts and turn
          state.infoGame.remainEnemiesCount = remainEnemiesCount;
          state.infoGame.remainPlayersCount = remainPlayersCount;
          state.infoGame.turn = newTurn;

          // Return the updated state
          return state;
        });
      },
    },
  }))
);
