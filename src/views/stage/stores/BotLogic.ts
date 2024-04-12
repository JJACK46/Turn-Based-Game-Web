import { Entity, EntityDetails } from "@/models/entity";
import { TurnType } from "@/models/turn";
import { useGameStore } from "./GameStore";
import { isEntityInEntities } from "../helpers/entity";

const gameLogic = useGameStore.getState();

const getMostAttackPowerEntityForBot = (
  entities: Entity[]
): EntityDetails | undefined => {
  if (entities.length === 0) return undefined;

  let maxATK = 0;
  let resultEntity: EntityDetails | undefined = undefined;

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    if (
      entity.attackPower > maxATK &&
      !isEntityInEntities(entity, gameLogic.entitiesTakenAction)
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
  entitiesTakenAction,
}: {
  turn: TurnType;
  availableActions: number;
  entitiesTakenAction: Entity[];
  sourceEntities: Entity[];
}) => {
  if (turn === "enemy" && availableActions > 0) {
    const aliveEntities = sourceEntities.filter(
      (entity) => entity.healthPower > 0
    );

    let potentialEntityData: EntityDetails | null = null;

    const mostAtkEntity = getMostAttackPowerEntityForBot(aliveEntities);

    if (mostAtkEntity) {
      const index = sourceEntities.indexOf(mostAtkEntity.entity);
      if (index > -1) {
        potentialEntityData = {
          entity: sourceEntities[index],
          position: index,
          site: "front",
        };
        // markEntityTakenAction(potentialEntityData.entity);
      }
    }

    if (
      potentialEntityData &&
      !entitiesTakenAction.includes(potentialEntityData.entity)
    ) {
      gameLogic.setCurrentEntity(potentialEntityData);

      //target algorithm
      let leastHP = 9999;
      let targetEntityData: EntityDetails | null = null;
      const targetedEntities: Entity[] = [];

      for (const playerEntity of gameLogic.playersFrontRow) {
        const index = gameLogic.playersFrontRow.indexOf(playerEntity);
        const currentPlayerData: EntityDetails = {
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
          targetEntityData = currentPlayerData;
        }
      }

      if (targetEntityData) {
        targetedEntities.push(targetEntityData.entity);
        //set target
        setTimeout(() => {
          gameLogic.setTargetEntity(targetEntityData);
        }, 1000);

        //use skill
        setTimeout(() => {
          const botSelectedSkill = potentialEntityData.entity.skills[0];
          gameLogic.setSelectSkill(botSelectedSkill);
          gameLogic.usingSkillToTargetEntity({
            targetEntities: gameLogic.playersFrontRow,
            sourceEntities,
            isEnemyAction: true,
          });
        }, 2000);

        setTimeout(() => {
          //reset
          gameLogic.resetCurrentEntity();
          gameLogic.resetTargetEntity();
          gameLogic.resetSelectSkill();
          gameLogic.decreaseAction(1);
        }, 3000);
      }
    }
    // }
  }
};
