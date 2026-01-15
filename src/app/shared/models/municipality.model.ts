import { State } from "./state.model";

export interface Municipality{
    idMunicipality?: Number,
    idState: State,
    name: String,
    shortName: String
}