import { Category } from "./category.model";
import { Field } from "./field.model";

export interface FieldCategory {
    idFieldCategory?: number,
    idField: Field,
    categoryLeague: Category,
    startHour: String,
    endHour: String,
    matchDays: String,
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