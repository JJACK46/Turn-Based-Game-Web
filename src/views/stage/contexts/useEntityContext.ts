import { useContext, useState } from "react";
import { StageContext, StageContextType } from "./StageContextProvider";
import { Entity, EntityDetails } from "@/models/entity";
import { Skill } from "@/models/skills";
import {
  isEntityHasEnoughMana,
  getDamageMadeBy,
  getUpdatedManaFromUsed,
} from "../helpers/entity";
import { useStageContext } from "./useStageContext";

export const useEntityContext = () => {
  const context = useContext(StageContext);
  if (!context) {
    throw new Error(
      "useEntityContext must be used within an StageContextProvider"
    );
  }
  const { increaseAction } = useStageContext();

  const [state, setState] = useState<StageContextType>(context);

  const setSelectSkill = (skill: Skill) => {
    setState((prevState) => ({
      ...prevState,
      selectedSkill: { ...skill },
    }));
  };

  const resetSelectSkill = () => {
    setState((prevState) => ({
      ...prevState,
      selectedSkill: null,
    }));
  };

  const setCurrentEntity = (entity: EntityDetails) => {
    setState((prevState) => ({
      ...prevState,
      currentEntityData: { ...entity },
    }));
  };

  const resetCurrentEntity = () => {
    setState((prevState) => ({
      ...prevState,
      currentEntityData: null,
    }));
  };

  const setTargetEntity = (entity: EntityDetails) => {
    setState((prevState) => ({
      ...prevState,
      targetEntityData: { ...entity },
    }));
  };

  const resetTargetEntity = () => {
    setState((prevState) => ({
      ...prevState,
      targetEntityData: null,
    }));
  };

  type UsingSkillData = {
    sourceEntityData: EntityDetails;
    targetEntityData: EntityDetails;
    sourceEntities: Entity[];
    targetEntities: Entity[];
    skill: Skill;
    isEnemyAction: boolean;
  };

  const usingSkillToTargetEntity = (prop: UsingSkillData) => {
    const {
      sourceEntityData,
      sourceEntities,
      targetEntities,
      targetEntityData,
      skill,
      isEnemyAction,
    } = prop;
    if (sourceEntityData && targetEntityData && skill) {
      if (
        isEntityHasEnoughMana({
          entity: sourceEntityData.entity,
          skill,
        })
      ) {
        if (skill.isAttackSkill) {
          const damageMade = getDamageMadeBy({
            entity: sourceEntityData.entity,
            skill,
          });
          const newTargetEntityData = { ...targetEntityData };
          newTargetEntityData.entity.healthPower -= damageMade;

          //update target data
          const newTargetFrontRow = [...targetEntities];
          newTargetFrontRow[targetEntityData.position] =
            newTargetEntityData.entity;

          //update source mana/energy
          const newSourceFrontRow = [...sourceEntities];
          newSourceFrontRow[sourceEntityData.position] = getUpdatedManaFromUsed(
            { entity: sourceEntityData.entity, skill }
          );

          //update calculated result
          setState((prevState) => ({
            ...prevState,
            totalHitDamage: prevState.totalHitDamage + damageMade,
            lastHitDamage: damageMade,
            playersFrontRow: isEnemyAction
              ? [...newTargetFrontRow]
              : [...newSourceFrontRow],
            enemiesFrontRow: isEnemyAction
              ? [...newSourceFrontRow]
              : [...newTargetFrontRow],
            targetEntityData: { ...newTargetEntityData },
          }));
          return true;
        }
        return false;
      } else {
        increaseAction(1);
        alert("not enough MP/EP");
        return false;
      }
    }
    return false;
  };

  return {
    ...state,
    setSelectSkill,
    resetSelectSkill,
    setCurrentEntity,
    resetCurrentEntity,
    setTargetEntity,
    resetTargetEntity,
    usingSkillToTargetEntity,
  };
};
