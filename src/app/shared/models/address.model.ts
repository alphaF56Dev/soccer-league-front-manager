import { Member } from "./member.model";
import { Municipality } from "./municipality.model";

export interface Address{
    idAddress?: Number,
    addressName: String,
    street: String,
    extNumber: String,
    intNumber?: String,
    suburb: String,
    zip: String,
    fullAddress: String,
    idMunicipality: Municipality,
    idMember: Member
}

export interface AddressDto{
    idAddress: Number,
    addressName: String,
    suburb: String,
    location: String
}