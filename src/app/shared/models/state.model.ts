import { Country } from "./country.model";

export interface State{
    id_state?: number,
    idCountry: Country,
    name: String,
    code: String,
    shortName: String
}