import { Member } from "./member.model"

export interface Team{
    idTeam?: Number,
    name: String,
    registrationDate: String, 
    isActive: Boolean,
    member: Member
}

export interface TeamDto{
    idTeam: Number,
    name: String,
    registrationDate: String,
    isActive: Boolean,

    idMember: Number,
    memberName: String,
    personalId: String,
    birthday: String,
    phoneNumber: String,
    sex: String,
    email: String,
    memberIsActive: String, 
    nationality: String
}

export interface TeamCategoryDto{
    idCategoryLeague: number, 
    name: string,
    isActive: boolean,
    minAge: number,
    maxAge: number, 
    duration: number,
    sex: string,
    checked: boolean
}