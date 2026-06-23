import { Municipality } from "./municipality.model";

export interface Field{
    idField?: number,
    idMunicipality: Municipality,
    name: string,
    address: string,
    isActive: boolean
}

export interface FieldDto{
    idField: number,
    municipalityName: string,
    name: string,
    address: string,
    isActive: boolean
}