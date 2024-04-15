import { EntityInstance } from "@/classes/entity";
import { useGameStore } from "./gameStore";
import { isEntityInEntities } from "../helpers/entity";
import { TurnType } from "@/data/types/turn";
import { SkillInstance } from "@/classes/skills";
import { useUIStore } from "./uiStore";

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
const { setEntityPerforming } = useUIStore.getState();

const getMostAttackPowerEntityForBot = (
  entities: EntityInstance[],
  entitiesTakenAction: EntityInstance[]
): EntityInstance | undefined => {
  if (entities.length === 0) return undefined;

  let maxATK = 0;
  let resultEntity: EntityInstance | undefined = undefined;
  for (const entity of entities) {
    if (
      entity.isAlive &&
      entity.ATK > maxATK &&
      !isEntityInEntities(entity, entitiesTakenAction)
    ) {
      maxATK = entity.ATK;
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
  sourceEntities: EntityInstance[];
  targetEntities: EntityInstance[];
  entitiesTakenAction: EntityInstance[];
}) => {
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
        const sourceEntityDef = potentialEntity.entity.defend ?? 0;

        //check condition for use skill
        while (!success) {
          if (
            potentialEntity.hasHealthLowerThan({ threshold: 0.6 }) &&
            sourceEntityDef > 0 &&
            potentialEntity.hasDefSkill &&
            !flag.skilledToSelf
          ) {
            //self algorithm not stable yet
            const bestSkill =
              potentialEntity.hasDefSkill.length > 0
                ? potentialEntity.hasDefSkill[0]
                : null;
            if (bestSkill) {
              const selectedSkill = new SkillInstance({
                skill: bestSkill!,
                remainingTurn: potentialEntity.traitSkill.duration ?? 0,
              });

              setSelectSkill(selectedSkill);
              success = usingSkillToSelf({
                skillInstance: selectedSkill,
                sourceEntity: potentialEntity,
                sourceEntities,
                isEnemyAction: true,
              });
              if (!success) setSelectSkill(null);
            }
            flag.skilledToSelf = true;
          } else {
            //target algorithm
            let leastHP = Infinity;
            let targetEntity: EntityInstance | null = null;
            const targetedEntitiesID: string[] = [];

            for (const target of targetEntities) {
              if (
                target.HP <= leastHP &&
                target.HP > 0 &&
                !targetedEntitiesID.includes(target.instanceId)
              ) {
                leastHP = target.entity.health;
                targetEntity = target;
              }
            }

            if (targetEntity) {
              targetedEntitiesID.push(targetEntity.instanceId);
              //set target
              setTimeout(() => {
                setTargetEntity(targetEntity);
              }, 1400);

              setTimeout(() => {
                //default attack by first skill
                selectedSkill = new SkillInstance({
                  skill: potentialEntity.normalHitSkill,
                  remainingTurn: 0,
                });
                setSelectSkill(selectedSkill);
                success = usingSkillToTargetEntity({
                  skillInstance: selectedSkill,
                  sourceEntity: potentialEntity,
                  targetEntity: targetEntity,
                  targetEntities: targetEntities,
                  sourceEntities,
                  isEnemyAction: true,
                });
              }, 1800);
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
        }, 2700);
      }
      //not found source entity
    }
  }, 500);
};
