import { Player } from "./player.model";
import { Team } from "./team.model";

export interface PlayerCategory{
    idPlayerCategory: number,
    teamCategoryLeague: {
        idTeamCategoryLeague: number
    },
    player: Player,
    registrationDate: string,
    playerNumber: number
}

export interface PlayerCategoryDto{
    idPlayerCategory: number, 

    idTeamCategory: number,
    teamName: string,
    categoryName: string,
    minAge: number,
    maxAge: number,

    playerId: number,
    nickname: string,

    registration_date: string,
    player_number: number,
}