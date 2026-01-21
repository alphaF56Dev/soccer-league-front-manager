import { MemberType } from "./membertype.model";

export interface Member{
    idMember?: Number,
    memberType: MemberType,
    name: String,
    personalId: String,
    birthday: Date, 
    phone: String,
    sex: String,
    email: String,
    isActive: boolean,
    nationality: String
}