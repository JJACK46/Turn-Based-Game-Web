// import { useContext, useState } from "react";
// import { StageContext, TurnType } from "./StageContextProvider";
// import { Entity, EntityDetails } from "@/models/entity";
// import { useStageContext } from "./useStageContext";
// import { useEntityContext } from "./useEntityContext";

// export const useBotContext = () => {
//   const context = useContext(StageContext);
//   if (!context) {
//     throw new Error(
//       "useBotContext must be used within an StageContextProvider"
//     );
//   }

//   const { markEntityTakenAction, isEntityTakenAction, decreaseAction } =
//     useStageContext();
//   const {
//     setCurrentEntity,
//     setTargetEntity,
//     setSelectSkill,
//     resetCurrentEntity,
//     resetSelectSkill,
//     resetTargetEntity,
//     usingSkillToTargetEntity,
//   } = useEntityContext();

//   const [state] = useState(context);

//   const getMostAttackPowerEntityForBot = (
//     entities: Entity[]
//   ): EntityDetails | undefined => {
//     if (entities.length === 0) return undefined;

//     let maxATK = 0;
//     let resultEntity: EntityDetails | undefined = undefined;

//     for (let i = 0; i < entities.length; i++) {
//       const entity = entities[i];
//       if (entity.attackPower > maxATK && !isEntityTakenAction(entity)) {
//         maxATK = entity.attackPower;
//         resultEntity = { entity: entity, position: i, site: "front" };
//       }
//     }
//     return resultEntity;
//   };

//   const botAction = ({
//     turn,
//     availableActions,
//     sourceEntities,
//     entitiesTakenAction,
//   }: {
//     turn: TurnType;
//     availableActions: number;
//     entitiesTakenAction: Entity[];
//     sourceEntities: Entity[];
//   }) => {
//     if (turn === "enemy" && availableActions > 0 && state) {
//       const aliveEntities = sourceEntities.filter(
//         (entity) => entity.healthPower > 0
//       );

//       let potentialEntityData: EntityDetails | null = null;

//       const mostAtkEntity = getMostAttackPowerEntityForBot(aliveEntities);

//       if (mostAtkEntity) {
//         const index = sourceEntities.indexOf(mostAtkEntity.entity);
//         if (index > -1) {
//           potentialEntityData = {
//             entity: sourceEntities[index],
//             position: index,
//             site: "front",
//           };
//           markEntityTakenAction(potentialEntityData.entity);
//         }
//       }

//       if (
//         potentialEntityData &&
//         !entitiesTakenAction.includes(potentialEntityData.entity)
//       ) {
//         setCurrentEntity(potentialEntityData);

//         //target algorithm
//         let leastHP = 9999;
//         let targetEntityData: EntityDetails | null = null;
//         const targetedEntities: Entity[] = [];

//         for (const playerEntity of state.playersFrontRow) {
//           const index = state.playersFrontRow.indexOf(playerEntity);
//           const currentPlayerData: EntityDetails = {
//             entity: playerEntity,
//             position: index,
//             site: "front",
//           };

//           if (
//             playerEntity.healthPower <= leastHP &&
//             playerEntity.healthPower > 0 &&
//             !targetedEntities.includes(playerEntity)
//           ) {
//             leastHP = playerEntity.healthPower;
//             targetEntityData = currentPlayerData;
//           }
//         }

//         if (targetEntityData) {
//           targetedEntities.push(targetEntityData.entity);
//           //set target
//           setTimeout(() => {
//             setTargetEntity(targetEntityData);
//           }, 1000);

//           //use skill
//           setTimeout(() => {
//             const botSelectedSkill = potentialEntityData.entity.skills[0];
//             setSelectSkill(botSelectedSkill);
//             usingSkillToTargetEntity({
//               skill: botSelectedSkill,
//               targetEntities: state.playersFrontRow,
//               targetEntityData: targetEntityData,
//               sourceEntityData: potentialEntityData,
//               sourceEntities,
//               isEnemyAction: true,
//             });
//           }, 2000);

//           setTimeout(() => {
//             //reset
//             resetCurrentEntity();
//             resetTargetEntity();
//             resetSelectSkill();
//             decreaseAction(1);
//           }, 3000);
//         }
//       }
//       // }
//     }
//   };

//   return { ...state, botAction };
// };
