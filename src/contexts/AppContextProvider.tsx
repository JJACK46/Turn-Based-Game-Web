// import { createContext } from "react";

// export interface AppContextSettingsType {
//   font: string;
//   volume: {
//     master: number;
//     sfx: number;
//     music: number;
//   };
// }

// const defaultSettings: AppContextSettingsType = {
//   font: "",
//   volume: {
//     master: 1,
//     sfx: 1,
//     music: 1,
//   },
// };

// export const AppContext =
//   createContext<AppContextSettingsType>(defaultSettings);

// export const AppContextProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   return (
//     <AppContext.Provider value={defaultSettings}>
//       {children}
//     </AppContext.Provider>
//   );
// };
