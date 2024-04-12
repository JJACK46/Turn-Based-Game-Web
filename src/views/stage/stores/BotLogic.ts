import { Entity, EntityDetails } from "@/classes/entity";
import { useGameStore } from "./GameStore";
import { isEntityInEntities } from "../helpers/entity";
import { TurnType } from "@/classes/turn";

const {
  markEntityTakenAction,
  setCurrentEntity,
  setTargetEntity,
  setSelectSkill,
  usingSkillToTargetEntity,
  resetCurrentEntity,
  resetTargetEntity,
  resetSelectSkill,
  decreaseAction,
} = useGameStore.getState();

const getMostAttackPowerEntityForBot = (
  entities: Entity[],
  entitiesTakenAction: Entity[]
): EntityDetails | undefined => {
  if (entities.length === 0) return undefined;

  let maxATK = 0;
  let resultEntity: EntityDetails | undefined = undefined;
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (
      entity.attackPower > maxATK &&
      !isEntityInEntities(entity, entitiesTakenAction)
    ) {
      maxATK = entity.attackPower;
      resultEntity = { entity: entity, position: i, site: "front" };
    }
  }
  return resultEntity;
};

export const botAction = ({
  turn,
  availableActions,
  sourceEntities,
  targetEntities,
  entitiesTakenAction,
}: {
  turn: TurnType;
  availableActions: number;
  sourceEntities: Entity[];
  targetEntities: Entity[];
  entitiesTakenAction: Entity[];
}) => {
  setTimeout(() => {
    if (turn === "enemy" && availableActions > 0) {
      const aliveEntities = sourceEntities.filter(
        (entity) => entity.healthPower > 0
      );

      let sourceEntityData: EntityDetails | null = null;

      const mostAtkEntity = getMostAttackPowerEntityForBot(
        aliveEntities,
        entitiesTakenAction
      );

      if (mostAtkEntity) {
        const index = sourceEntities.indexOf(mostAtkEntity.entity);
        if (index > -1) {
          sourceEntityData = {
            entity: sourceEntities[index],
            position: index,
            site: "front",
          };
          markEntityTakenAction(sourceEntityData.entity);
        }
      }

      if (
        sourceEntityData &&
        !entitiesTakenAction.includes(sourceEntityData.entity)
      ) {
        setCurrentEntity(sourceEntityData);

        //target algorithm
        let leastHP = 9999;
        let targetEntityData: EntityDetails | null = null;
        const targetedEntities: Entity[] = [];

        for (const playerEntity of targetEntities) {
          const index = targetEntities.indexOf(playerEntity);
          const currentTargetData: EntityDetails = {
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
            targetEntityData = currentTargetData;
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
            const botSelectedSkill = sourceEntityData.entity.skills[0];
            setSelectSkill(botSelectedSkill);
            const success = usingSkillToTargetEntity({
              skill: botSelectedSkill,
              sourceEntityData,
              targetEntityData,
              targetEntities: targetEntities,
              sourceEntities,
              isEnemyAction: true,
            });
            if (success) decreaseAction(1);
          }, 2000);

          setTimeout(() => {
            //reset
            resetCurrentEntity();
            resetTargetEntity();
            resetSelectSkill();
          }, 2500);
        }
      }
    }
  }, 500);
};
