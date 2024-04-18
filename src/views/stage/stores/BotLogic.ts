import { Entity } from "@/classes/entity";
import { useGameStore } from "./gameStore";
import { isEntityInEntities } from "../helpers/entity";
import { TurnType } from "@/data/types/turn";
import { useUIStore } from "./uiStore";
import { BASE_DELAY_SKILL } from "@/utils/constants";

const {
  methodsMark: { markEntityTakenAction },
  methodsIndicator: {
    setCurrentEntity,
    setTargetEntity,
    setSelectSkill,
    usingSkillToTarget,
    usingSkillToSelf,
    resetCurrentEntity,
    resetSelectSkill,
    resetTargetEntity,
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
      entity.isAlive &&
      entity.attackPower > maxATK &&
      !isEntityInEntities(entity, entitiesTakenAction)
    ) {
      maxATK = entity.attackPower;
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
      setEntityPerforming(true);
      const potentialEntity = getMostAttackPowerEntityForBot(
        sourceEntities,
        entitiesTakenAction
      );

      //if found source entity already
      if (potentialEntity && !entitiesTakenAction.includes(potentialEntity)) {
        let selectedSkill;
        let success = false;
        const flag = {
          skilledToSelf: false,
        };
        setCurrentEntity(potentialEntity);

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
              const selectedSkill = potentialEntity.traitSkill;

              setSelectSkill(selectedSkill);
              success = usingSkillToSelf({
                skill: selectedSkill,
                sourceEntity: potentialEntity,
                sourceEntities,
                isEnemyAction: true,
              });
              if (!success) setSelectSkill(null);
            }
            flag.skilledToSelf = true;
          } else {
            const listAttackAOE = potentialEntity.hasAttackAOE;
            const skillAOE = listAttackAOE[0];
            //check it has aoe
            if (
              listAttackAOE.length > 0 &&
              potentialEntity.MANERGY >= skillAOE.requiredTotalManaOrEnergy
            ) {
              //not best algorithm
              setTimeout(() => {
                const usingSkill = async () => {
                  for (let i = 0; i < skillAOE.repeat; i++) {
                    setSelectSkill(skillAOE);
                    usingSkillToTarget({
                      skill: skillAOE,
                      sourceEntity: potentialEntity,
                      targetEntity: targetEntities[0], //any
                      targetEntities: targetEntities,
                      sourceEntities,
                      isEnemyAction: true,
                    });
                    await delay((BASE_DELAY_SKILL * 0.3) / skillAOE.repeat);
                  }
                };
                usingSkill();
                setSelectSkill(null);
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
                  target.health <= leastHP &&
                  target.isAlive &&
                  !targetedEntitiesID.includes(target.instanceId)
                ) {
                  leastHP = target.health;
                  targetEntity = target;
                }
              }

              if (targetEntity) {
                targetedEntitiesID.push(targetEntity.instanceId);
                //set target
                setTimeout(() => {
                  setTargetEntity(targetEntity);
                }, BASE_DELAY_SKILL * 0.8);

                setTimeout(() => {
                  //default attack by first skill
                  selectedSkill = potentialEntity.normalHitSkill;
                  setSelectSkill(selectedSkill);
                  success = usingSkillToTarget({
                    skill: selectedSkill,
                    sourceEntity: potentialEntity,
                    targetEntity: targetEntity,
                    targetEntities: targetEntities,
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
            decreaseAction(1);
            markEntityTakenAction(potentialEntity);
            setEntityPerforming(false);
            resetCurrentEntity();
            resetTargetEntity();
            resetSelectSkill();
          }
        }, BASE_DELAY_SKILL * 1.8);
      }
      //not found source entity
    }
  }, BASE_DELAY_SKILL * 0.3);
};
