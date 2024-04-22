import { Skill } from "@/classes/skills";
import { create } from "zustand";
import {
  findTargetIndex,
  getAliveEntities,
  getSpeedOfTeam,
} from "../helpers/stage";
import { PositionEnum } from "@/data/enums/positions";
import { immer } from "zustand/middleware/immer";
import { createEntitiesInstances } from "@/utils/createEntity";
import { Entity } from "@/classes/entity";

type InfoDamage = {
  totalHitDamage: number;
  lastHitDamage: number;
  blockedDamage: number;
  missed: boolean;
};

export type TurnType = "player" | "enemy" | null;

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
    updateRemainingEntities: () => void;
    startGame: () => void;
    endGame: () => void;
    setupGame: (props: {
      mapName: string;
      enemiesFrontRow: Entity[];
      enemiesBackRow?: Entity[];
      playersFrontRow: Entity[];
      playersBackRow?: Entity[];
      entitiesLevel: number[];
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
    enemies: Entity[];
    players: Entity[];
  };
  methodsField: {
    setEntities: (props: { entities: Entity[]; isPlayer: boolean }) => void;
  };
  methodsIndicator: {
    setSelectSkill: (s: Skill | null) => void;
    setCurrentEntity: (e: Entity | null) => void;
    setTargetEntity: (e: Entity | null) => void;
    setTargets: (entities: Entity[] | null) => void;
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
      enemies: [],
      players: [],
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
        set((state) => {
          state.infoMarkedEntities.takenAction = [];
        }),
      markEntityTakenAction: (entity) =>
        set((state) => {
          state.infoMarkedEntities.takenAction.push(entity);
        }),
    },
    methodsField: {
      setEntities: ({ entities, isPlayer }) => {
        if (isPlayer) {
          set((state) => {
            state.infoField.players = entities;
          });
        } else {
          set((state) => {
            state.infoField.enemies = entities;
          });
        }
        // set((state) => {
        //   if (isPlayer) {
        //     if (position === "front") {
        //       return {
        //         ...state,
        //         infoField: {
        //           ...state.infoField,
        //           playersFrontRow: [...entities],
        //         },
        //       };
        //     }
        //     return {
        //       ...state,
        //       infoField: {
        //         ...state.infoField,
        //         playersBackRow: [...entities],
        //       },
        //     };
        //   } else {
        //     if (position === "front") {
        //       return {
        //         ...state,
        //         infoField: {
        //           ...state.infoField,
        //           enemiesFrontRow: [...entities],
        //         },
        //       };
        //     }
        //     return {
        //       ...state,
        //       infoField: { ...state.infoField, enemiesBackRow: [...entities] },
        //     };
        //   }
        // });
      },
    },
    infoIndicator: {
      currentEntity: null,
      targetEntity: null,
      selectedSkill: null,
      targetEntities: null,
    },
    setInfoDamage(props) {
      set((state) => {
        state.infoDamage = props;
      });
    },
    methodsIndicator: {
      setTargets(entities) {
        set((state) => {
          state.infoIndicator.targetEntities = entities;
        });
      },
      setSelectSkill: (skill) => {
        set((state) => {
          state.infoIndicator.selectedSkill = skill;
        });
      },
      setCurrentEntity: (entity) => {
        set((state) => {
          state.infoIndicator.currentEntity = entity;
        });
      },
      setTargetEntity: (entity) => {
        set((state) => {
          state.infoIndicator.targetEntity = entity;
        });
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

        if (sourceEntity.hasEnoughManaFor({ skill })) {
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

              const targetId = findTargetIndex({
                entities: updatedTargetEntities,
                target: effectedTarget,
              });
              updatedTargetEntities[targetId] = effectedTarget;

              const sourceId = findTargetIndex({
                entities: updatedSourceEntities,
                target: sourceEntity,
              });
              updatedSourceEntities[sourceId] = sourceEntity.updateManaFromUse({
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

              const sourceId = findTargetIndex({
                entities: updatedSourceEntities,
                target: sourceEntity,
              });

              updatedSourceEntities[sourceId] = sourceEntity.updateManaFromUse({
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
                state.infoField.enemies = updatedSourceEntities;
                state.infoField.players = updatedTargetEntities;
              });
            } else {
              //player turn
              set((state) => {
                state.infoField.players = updatedSourceEntities;
                state.infoField.enemies = updatedTargetEntities;
              });
            }

            return true;
          }
          //buff skill
          if (targetEntity.playable) {
            const { effectedTarget } = skill.effectToTarget({
              sourceEntity,
              targetEntity,
            });
            const targetId = findTargetIndex({
              entities: updatedTargetEntities,
              target: effectedTarget,
            });

            updatedTargetEntities[targetId] = effectedTarget;

            const sourceId = findTargetIndex({
              entities: updatedSourceEntities,
              target: sourceEntity,
            });

            updatedSourceEntities[sourceId] = sourceEntity.updateManaFromUse({
              skill: skill,
            });
            if (isEnemyAction) {
              set((state) => {
                state.infoField.enemies = updatedTargetEntities;
                state.infoIndicator.targetEntity = effectedTarget;
              });
            } else {
              set((state) => {
                state.infoField.players = updatedTargetEntities;
                state.infoIndicator.targetEntity = effectedTarget;
              });
            }
            return true;
          }
          //use to enemy
          return false;
        } else {
          //not enough mana
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

            updatedEntities[sourceEntity.index!] =
              effectedSourceEntity.updateManaFromUse({
                skill: skill,
              });

            set((state) => {
              state.infoField.enemies = isEnemyAction
                ? updatedEntities
                : state.infoField.enemies;
              state.infoField.players = !isEnemyAction
                ? updatedEntities
                : state.infoField.players;
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
        // set((state) => ({
        //   ...state,
        //   infoGame: {
        //     ...state.infoGame,
        //     roundCount: state.infoGame.roundCount + 1,
        //   },
        // }));
        set((state) => {
          state.infoGame.roundCount++;
        });
      },
      updateCycleRound: () => {
        // set((state) => ({
        //   ...state,
        //   infoGame: {
        //     ...state.infoGame,
        //     cycleRound: state.infoGame.cycleRound - 1,
        //   },
        // }));
        set((state) => {
          state.infoGame.cycleRound--;
        });
      },
      resetCycleRound: () => {
        // set((state) => ({
        //   ...state,
        //   infoGame: { ...state.infoGame, cycleRound: 2 },
        // }));
        set((state) => {
          state.infoGame.cycleRound = 2;
        });
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
            entitiesLevel,
          } = props;

          const enemies = [...enemiesFrontRow, ...(enemiesBackRow ?? [])];
          const players = [...playersFrontRow, ...(playersBackRow ?? [])];

          const enemiesFrontRowInstance = createEntitiesInstances(
            enemiesFrontRow,
            PositionEnum.FRONT,
            false,
            entitiesLevel
          );
          const enemiesBackRowInstance = createEntitiesInstances(
            enemiesBackRow ?? [],
            PositionEnum.BACK,
            false,
            entitiesLevel
          );

          const playersFrontRowInstance = createEntitiesInstances(
            playersFrontRow,
            PositionEnum.FRONT,
            true
          );

          const playersBackRowInstance = createEntitiesInstances(
            playersBackRow ?? [],
            PositionEnum.BACK,
            true
          );
          const remainEnemiesCount = enemies.length;
          const remainPlayersCount = players.length;
          const speedEnemyTeam = getSpeedOfTeam(enemies);
          const speedPlayerTeam = getSpeedOfTeam(players);
          const turn: TurnType =
            speedEnemyTeam >= speedPlayerTeam ? "enemy" : "player";
          const availableActions =
            turn === "enemy" ? enemies.length : players.length;

          state.infoField.enemies = enemiesFrontRowInstance.concat(
            enemiesBackRowInstance
          );
          state.infoField.players = playersFrontRowInstance.concat(
            playersBackRowInstance
          );

          state.infoGame = {
            ...state.infoGame,
            mapName,
            speedEnemyTeam,
            speedPlayerTeam,
            availableActions,
            maxActions: availableActions,
            remainEnemiesCount,
            remainPlayersCount,
            turn,
          };

          return state;

          // return {
          //   ...state,
          //   infoGame: {
          //     ...state.infoGame,
          //     mapName,
          //     speedEnemyTeam,
          //     speedPlayerTeam,
          //     availableActions,
          //     maxActions: availableActions,
          //     remainEnemiesCount: enemies.length,
          //     remainPlayersCount: players.length,
          //     turn,
          //   },
          //   infoField: {
          //     enemiesFrontRow: enemiesFrontRowInstance,
          //     enemiesBackRow: enemiesBackRowInstance,
          //     playersFrontRow: playersFrontRowInstance,
          //     playersBackRow: playersBackRowInstance,
          //   },
          // };
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

          const remainEnemiesCount = state.infoGame.remainEnemiesCount;
          const remainPlayersCount = state.infoGame.remainPlayersCount;
          const entitiesCount: number =
            newTurn === "enemy" ? remainEnemiesCount : remainPlayersCount;

          state.infoGame.turn = newTurn;
          state.infoGame.availableActions = entitiesCount;
          state.infoGame.maxActions = entitiesCount;
          state.infoDamage = {
            lastHitDamage: 0,
            totalHitDamage: 0,
            blockedDamage: 0,
            missed: false,
          };
          state.infoMarkedEntities.takenAction = [];

          return state;
        });
      },
      updateRemainingEntities: () => {
        set((state) => {
          const remainEnemiesCount = getAliveEntities(
            state.infoField.enemies
          ).length;

          const remainPlayersCount = getAliveEntities(
            state.infoField.players
          ).length;

          state.infoGame.remainEnemiesCount = remainEnemiesCount;
          state.infoGame.remainPlayersCount = remainPlayersCount;

          // Return the updated state
          return state;
        });
      },
    },
  }))
);
