import { Team } from "../../models/team";
import { players } from "../players";

export const UserTeams: Team[] = [{ name: "default", entities: [...players] }];

export const TutorialTeams: Team[] = [{ name: "tutorial", entities: [] }];
