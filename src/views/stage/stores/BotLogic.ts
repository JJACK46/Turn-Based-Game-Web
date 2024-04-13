import { Entity, EntityDetails } from "@/classes/entity";
import { useGameStore } from "./GameStore";
import {
  isEntityHasLowHealthThan,
  isEntityInEntities,
} from "../helpers/entity";
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
  usingSkillToSelf,
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
  //delay enemy action per a entity
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

      //if found source entity already
      if (
        sourceEntityData &&
        !entitiesTakenAction.includes(sourceEntityData.entity)
      ) {
        let selectedSkill;
        let success = false;
        const flag = {
          skilledToSelf: false,
        };
        setCurrentEntity(sourceEntityData);
        const sourceEntityDef = sourceEntityData.entity.defendPower ?? 0;

        //check condition for use skill
        while (!success) {
          if (
            isEntityHasLowHealthThan({
              entity: sourceEntityData.entity,
              threshold: 0.6,
            }) &&
            sourceEntityDef > 0 &&
            !flag.skilledToSelf
          ) {
            //self algorithm
            selectedSkill = sourceEntityData.entity.skills[1];
            success = usingSkillToSelf({
              skill: selectedSkill,
              sourceEntityData,
              sourceEntities,
              isEnemyAction: true,
            });
            flag.skilledToSelf = true;
          } else {
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
              }, 1400);

              setTimeout(() => {
                //default attack by first skill
                selectedSkill = sourceEntityData.entity.skills[0];

                success = usingSkillToTargetEntity({
                  skill: selectedSkill,
                  sourceEntityData,
                  targetEntityData,
                  targetEntities: targetEntities,
                  sourceEntities,
                  isEnemyAction: true,
                });

                setSelectSkill(selectedSkill);
              }, 1800);
            }
            break;
          }
        }
        //finally reset indicator
        setTimeout(() => {
          if (success) decreaseAction(1);
          resetCurrentEntity();
          resetTargetEntity();
          resetSelectSkill();
        }, 2200);
      }
      //not found source entity
    }
  }, 500);
};