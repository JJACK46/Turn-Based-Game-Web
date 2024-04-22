import { TurnType, useGameStore } from "./gameStore";
import { isEntityInEntities } from "../helpers/entity";
import { useUIStore } from "./uiStore";
import { BASE_DELAY_SKILL } from "@/utils/constants";
import { Entity } from "@/classes/entity";

const {
  methodsMark: { markEntityTakenAction },
  methodsIndicator: {
    setCurrentEntity,
    setTargetEntity,
    setSelectSkill,
    usingSkillToTarget,
    usingSkillToSelf,
  },
  methodsGame: { decreaseAction },
} = useGameStore.getState();
const { setEntityPerforming } = useUIStore.getState();

const getMostAttackPowerEntityForBot = (
  entities: Entity[],
  entitiesTakenAction: Entity[]
): Entity | undefined => {
  if (entities.length === 0) return undefined;

  let maxATK = 0;
  let resultEntity: Entity | undefined = undefined;
  for (const entity of entities) {
    if (
      entity.attack.value > maxATK &&
      entity.isAlive &&
      !isEntityInEntities(entity, entitiesTakenAction)
    ) {
      maxATK = entity.attack.value;
      resultEntity = entity;
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
  const delay = (ms: number) =>
    new Promise((resolve) => {
      return setTimeout(resolve, ms);
    });

  //delay enemy action per an entity
  setTimeout(() => {
    if (turn === "enemy" && availableActions > 0) {
      const potentialEntity = getMostAttackPowerEntityForBot(
        sourceEntities,
        entitiesTakenAction
      );

      //if found source entity already
      if (potentialEntity && !entitiesTakenAction.includes(potentialEntity)) {
        setCurrentEntity(potentialEntity);
        if (!potentialEntity.isCanAction) {
          setTimeout(() => {
            markEntityTakenAction(potentialEntity);
            setCurrentEntity(null);
            decreaseAction(1);
          }, BASE_DELAY_SKILL * 0.4);
          return;
        }
        let success = false;
        const flag = {
          skilledToSelf: false,
        };

        //check condition for use skill
        while (!success) {
          if (
            potentialEntity.hasHealthLowerThan({ threshold: 0.6 }) &&
            potentialEntity.hasDefSkill &&
            !flag.skilledToSelf
          ) {
            //self algorithm not stable yet
            const bestDefSkill =
              potentialEntity.hasDefSkill.length > 0
                ? potentialEntity.hasDefSkill[0]
                : null;
            if (bestDefSkill) {
              setEntityPerforming(true);
              const selectedSkill = potentialEntity.skills.traitSkill;
              setSelectSkill(selectedSkill);
              success = usingSkillToSelf({
                skill: selectedSkill,
                sourceEntity: potentialEntity,
                sourceEntities,
                isEnemyAction: true,
              });
            }
            flag.skilledToSelf = true;
          } else {
            const listAttackAOE = potentialEntity.hasAttackAOE;
            const skillAOE = listAttackAOE[0];
            //check it has aoe
            if (
              listAttackAOE.length > 0 &&
              potentialEntity.allCapacity >= skillAOE.requiredTotalManaOrEnergy
            ) {
              setSelectSkill(skillAOE);
              //not best algorithm
              setTimeout(() => {
                const usingSkill = async () => {
                  for (let i = 0; i < skillAOE.repeat; i++) {
                    setEntityPerforming(true);
                    usingSkillToTarget({
                      skill: skillAOE,
                      sourceEntity: potentialEntity,
                      targetEntity: targetEntities[0], //any
                      targetEntities,
                      sourceEntities,
                      isEnemyAction: true,
                    });
                    await delay((BASE_DELAY_SKILL * 0.3) / skillAOE.repeat);
                  }
                };
                usingSkill();
              }, BASE_DELAY_SKILL);
              success = true;
            } else {
              //if single target
              //target algorithm
              let leastHP = Infinity;
              let targetEntity: Entity | null = null;
              const targetedEntitiesID: string[] = [];

              for (const target of targetEntities) {
                if (
                  target.health.value <= leastHP &&
                  target.isAlive &&
                  !targetedEntitiesID.includes(target.instanceId!)
                ) {
                  leastHP = target.health.value;
                  targetEntity = target;
                }
              }

              if (targetEntity) {
                targetedEntitiesID.push(targetEntity.instanceId!);
                const skill = potentialEntity.skills.normalHitSkill;
                setSelectSkill(skill);
                //set target
                setTimeout(() => {
                  setTargetEntity(targetEntity);
                }, BASE_DELAY_SKILL * 0.8);

                setTimeout(() => {
                  //default attack by first skill
                  setEntityPerforming(true);
                  success = usingSkillToTarget({
                    skill,
                    sourceEntity: potentialEntity,
                    targetEntity,
                    targetEntities,
                    sourceEntities,
                    isEnemyAction: true,
                  });
                }, BASE_DELAY_SKILL);
              }
            }
            //not found target
            success = true;
          }
        }
        //finally reset indicator
        setTimeout(() => {
          if (success) {
            setCurrentEntity(null);
            setTargetEntity(null);
            setSelectSkill(null);
            setEntityPerforming(false);
            markEntityTakenAction(potentialEntity);
            decreaseAction(1);
          }
        }, BASE_DELAY_SKILL * 1.4);
      }
    }
  }, BASE_DELAY_SKILL * 0.3);
};
