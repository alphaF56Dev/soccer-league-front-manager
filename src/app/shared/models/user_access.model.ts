export interface UserAccess{
    idUser?: Number,
    username: string,
    pw: string,
    isActive?: boolean,
    registrationDate?: Date,
    blockedOn?: Date
}