import { Category } from "./category.model";
import { Team } from "./team.model";

export interface TeamCategoryLeague{
    idTeamCategoryLeague: number,
    team: Team,
    categoryLeague: Category
}