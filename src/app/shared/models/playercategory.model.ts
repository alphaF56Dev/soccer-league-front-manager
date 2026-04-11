import { Player } from "./player.model";

export interface PlayerCategory{
    idPlayerCategory?: number,
    teamCategoryLeague: {
        idTeamCategoryLeague: number
    },
    player: Player,
    registrationDate?: string,
    playerNumber: number
}

export interface PlayerCategoryDto{
    idPlayerCategory: number, 

    idTeam: number,
    idTeamCategory: number,
    teamName: string,
    categoryName: string,
    minAge: number,
    maxAge: number,

    idMember: number,
    playerId: number,
    nickname: string,

    registration_date: string,
    player_number: number,
}