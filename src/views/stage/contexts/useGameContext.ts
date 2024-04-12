// import { useContext, useState } from "react";
// import { StageContext, StageContextType } from "./StageContextProvider";

// export const useGameContext = () => {
//   const context = useContext(StageContext);
//   if (!context) {
//     throw new Error(
//       "useGameContext must be used within an StageContextProvider"
//     );
//   }

//   const [state, setState] = useState<StageContextType>(context);

//   const startGame = () => {
//     setState((prevState) => ({
//       ...prevState,
//       isGameStart: true,
//     }));
//   };

//   const endGame = () => {
//     setState((prevState) => ({
//       ...prevState,
//       isGameStart: false,
//     }));
//   };

//   const openActionOverlay = () => {
//     setState((prevState) => ({
//       ...prevState,
//       userOverlay: { ...prevState.userOverlay, isActionOverlayOpen: true },
//     }));
//   };

//   const closeActionOverlay = () => {
//     setState((prevState) => ({
//       ...prevState,
//       userOverlay: { ...prevState.userOverlay, isActionOverlayOpen: false },
//     }));
//   };

//   const openInfoOverlay = () => {
//     setState((prevState) => ({
//       ...prevState,
//       userOverlay: { ...prevState.userOverlay, isInfoOverlayOpen: true },
//     }));
//   };

//   const closeInfoOverlay = () => {
//     setState((prevState) => ({
//       ...prevState,
//       userOverlay: { ...prevState.userOverlay, isInfoOverlayOpen: false },
//     }));
//   };

//   const setActionWarning = (input: boolean) => {
//     setState((prevState) => ({
//       ...prevState,
//       userOverlay: { ...prevState.userOverlay, isActionWarning: input },
//     }));
//   };

//   const setTurnWarning = (input: boolean) => {
//     setState((prevState) => ({
//       ...prevState,
//       userOverlay: { ...prevState.userOverlay, isTurnWarning: input },
//     }));
//   };

//   return {
//     ...state,
//     startGame,
//     endGame,
//     openInfoOverlay,
//     openActionOverlay,
//     closeActionOverlay,
//     closeInfoOverlay,
//     setActionWarning,
//     setTurnWarning,
//   };
// };
