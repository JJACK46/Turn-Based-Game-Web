import { Entity, EntityInstance } from "@/classes/entity";
import { useGameStore } from "./GameStore";
import { isEntityInEntities } from "../helpers/entity";
import { TurnType } from "@/classes/turn";
import { SkillInstance } from "@/classes/skills";

const {
  methodsMark: { markEntityTakenAction },
  methodsIndicator: {
    setCurrentEntity,
    setTargetEntity,
    setSelectSkill,
    usingSkillToTargetEntity,
    usingSkillToSelf,
    resetCurrentEntity,
    resetSelectSkill,
    resetTargetEntity,
  },
  methodsGame: { decreaseAction },
} = useGameStore.getState();

const getMostAttackPowerEntityForBot = (
  entities: Entity[],
  entitiesTakenAction: Entity[]
): EntityInstance | undefined => {
  if (entities.length === 0) return undefined;

  let maxATK = 0;
  let resultEntity: EntityInstance | undefined = undefined;
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (
      entity.attackPower > maxATK &&
      !isEntityInEntities(entity, entitiesTakenAction)
    ) {
      maxATK = entity.attackPower;
      resultEntity = new EntityInstance({
        entity: entity,
        position: i,
        site: "front",
      });
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
  //delay enemy action per an entity
  setTimeout(() => {
    if (turn === "enemy" && availableActions > 0) {
      const aliveEntities = sourceEntities.filter(
        (entity) => entity.health > 0
      );

      let sourceEntity: EntityInstance | null = null;

      const mostAtkEntity = getMostAttackPowerEntityForBot(
        aliveEntities,
        entitiesTakenAction
      );

      if (mostAtkEntity) {
        const index = sourceEntities.indexOf(mostAtkEntity.entity);
        if (index > -1) {
          sourceEntity = new EntityInstance({
            entity: sourceEntities[index],
            position: index,
            site: "front",
          });
          markEntityTakenAction(sourceEntity.entity);
        }
      }

      //if found source entity already
      if (sourceEntity && !entitiesTakenAction.includes(sourceEntity.entity)) {
        let selectedSkill;
        let success = false;
        const flag = {
          skilledToSelf: false,
        };
        setCurrentEntity(sourceEntity);
        const sourceEntityDef = sourceEntity.entity.defendPower ?? 0;

        //check condition for use skill
        while (!success) {
          if (
            sourceEntity.hasHealthLowerThan({ threshold: 0.6 }) &&
            sourceEntityDef > 0 &&
            !flag.skilledToSelf
          ) {
            //self algorithm
            selectedSkill = sourceEntity.entity.skills[1];
            success = usingSkillToSelf({
              skillInstance: new SkillInstance({
                skill: selectedSkill,
                remainingRound: 0,
              }),
              sourceEntity,
              sourceEntities,
              isEnemyAction: true,
            });
            flag.skilledToSelf = true;
          } else {
            //target algorithm
            let leastHP = 9999;
            let targetEntityData: EntityInstance | null = null;
            const targetedEntities: Entity[] = [];

            for (const playerEntity of targetEntities) {
              const index = targetEntities.indexOf(playerEntity);
              const currentTarget = new EntityInstance({
                entity: playerEntity,
                position: index,
                site: "front",
              });
              if (
                playerEntity.health <= leastHP &&
                playerEntity.health > 0 &&
                !targetedEntities.includes(playerEntity)
              ) {
                leastHP = playerEntity.health;
                targetEntityData = currentTarget;
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
                selectedSkill = new SkillInstance({
                  skill: sourceEntity.entity.skills[0],
                  remainingRound: 0,
                });

                success = usingSkillToTargetEntity({
                  skillInstance: selectedSkill,
                  sourceEntity: sourceEntity,
                  targetEntity: targetEntityData,
                  targetEntities: targetEntities,
                  sourceEntities,
                  isEnemyAction: true,
                });

                setSelectSkill(selectedSkill);
              }, 1800);
            }
            //not found target
            success = true;
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
