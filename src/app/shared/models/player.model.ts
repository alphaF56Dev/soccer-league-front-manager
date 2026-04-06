import { Member } from "./member.model";
import { PositionCatalog } from "./position.model";

export interface Player{
    idPlayer?: number,
    position: PositionCatalog,
    member: Member,
    nickname: String
}

export interface PlayerDto{
    idPlayer: number, 
    nickname: string,

    idMember: Number, 
    name: string,
    personalId: string,
    birthday: string, 
    phoneNumber: string,
    sex: string,
    email: string, 
    isActive: boolean,
    nationality: string, 

    idPositionCatalog: Number,
    positionName: String,
    positionCode: String,
    description: String 
}