// import { Entity, EntityDetails } from "@/models/entity";
// import { createContext } from "react";
// import { Skill } from "@/models/skills";
// import { useStageContext } from "./useStageContext";

// export type TurnType = "player" | "enemy" | null;

// export interface StageContextType {
//   mapName: string;
//   enemiesFrontRow: Entity[];
//   enemiesBackRow?: Entity[];
//   playersFrontRow: Entity[];
//   playersBackRow?: Entity[];
//   remainEnemiesCount: number;
//   remainPlayersCount: number;
//   currentEntityData: EntityDetails | null;
//   targetEntityData: EntityDetails | null;
//   selectedSkill: Skill | null;
//   turn: TurnType;
//   availableActions: number;
//   maxActions: number;
//   roundCount: number;
//   speedEnemyTeam: number;
//   speedPlayerTeam: number;
//   entitiesTakenAction: Entity[];
//   userOverlay: {
//     isActionOverlayOpen: boolean;
//     isStageOverlayOpen: boolean;
//     isInfoOverlayOpen: boolean;
//     isTurnWarning: boolean;
//     isActionWarning: boolean;
//   };
//   totalHitDamage: number;
//   lastHitDamage: number;
//   isGameStart: boolean;
// }

// type CreateContextProviderProps = {
//   StageProps: {
//     mapName: string;
//     enemiesFrontRow: Entity[];
//     enemiesBackRow?: Entity[];
//     playersFrontRow: Entity[];
//     playersBackRow?: Entity[];
//   };
//   children: React.ReactNode;
// };

// export const StageContext = createContext<StageContextType>({
//   mapName: "",
//   enemiesFrontRow: [],
//   playersFrontRow: [],
//   remainEnemiesCount: 0,
//   remainPlayersCount: 0,
//   currentEntityData: null,
//   targetEntityData: null,
//   selectedSkill: null,
//   turn: null,
//   availableActions: 0,
//   maxActions: 0,
//   roundCount: 0,
//   speedEnemyTeam: 0,
//   speedPlayerTeam: 0,
//   entitiesTakenAction: [],
//   userOverlay: {
//     isActionOverlayOpen: false,
//     isStageOverlayOpen: false,
//     isInfoOverlayOpen: false,
//     isTurnWarning: false,
//     isActionWarning: false,
//   },
//   totalHitDamage: 0,
//   lastHitDamage: 0,
//   isGameStart: false,
// });

// const StageContextProvider = (props: CreateContextProviderProps) => {
//   const {
//     mapName,
//     enemiesFrontRow,
//     enemiesBackRow,
//     playersFrontRow,
//     playersBackRow,
//   } = props.StageProps;
//   const { getSetupStageDataBy } = useStageContext();
//   const setupStageData = getSetupStageDataBy({
//     players: playersFrontRow.concat(playersBackRow ?? []),
//     enemies: enemiesFrontRow.concat(enemiesBackRow ?? []),
//   });

//   const defaultValue: StageContextType = {
//     mapName,
//     enemiesFrontRow,
//     enemiesBackRow,
//     playersFrontRow,
//     playersBackRow,
//     remainEnemiesCount: 0,
//     currentEntityData: null,
//     targetEntityData: null,
//     selectedSkill: null,
//     turn: setupStageData.turn,
//     availableActions: setupStageData.availableActions,
//     maxActions: setupStageData.maxActions,
//     roundCount: 0,
//     speedEnemyTeam: setupStageData.speedEnemiesTeam,
//     speedPlayerTeam: setupStageData.speedPlayersTeam,
//     entitiesTakenAction: [],
//     userOverlay: {
//       isActionOverlayOpen: false,
//       isStageOverlayOpen: false,
//       isInfoOverlayOpen: false,
//       isTurnWarning: false,
//       isActionWarning: false,
//     },
//     totalHitDamage: 0,
//     lastHitDamage: 0,
//     remainPlayersCount: 0,
//     isGameStart: false,
//   };

//   // const [state] = useState(defaultValue);

//   return (
//     <StageContext.Provider value={defaultValue}>
//       {props.children}
//     </StageContext.Provider>
//   );
// };

// export default StageContextProvider;
