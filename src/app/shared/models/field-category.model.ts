import { Category } from "./category.model";
import { Field } from "./field.model";

export interface FieldCategory {
    idFieldCategory?: number,
    idField: Pick<Field, 'idField'>,
    idCategoryLeague: Pick<Category, 'idCategoryLeague'>,
    startHour: string,
    endHour: string,
    matchDays: string,
    isActive: boolean
}

export interface FieldCategoryDto {
    idFieldCategory: number,
    
    idField: number,
    nameField: string,

    idCategoryLeage: number,
    categoryName: string,
    age: string,
    sex: string,

    startHour: string,
    endHour: string,
    matchDays: string
}

export interface FieldAvailabilityResultDto {
    code: number,
    message: string,
    fieldsOverSlap: string[]
}