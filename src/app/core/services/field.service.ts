import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Field, FieldDto } from "../../shared/models/field.model";

@Injectable({providedIn: 'root'})
export class FieldService{
    private urlApi = environment.apiUrl + 'field/';
    constructor(
        private http: HttpClient
    ){}

    listFields(): Observable<FieldDto[]>{
        return this.http.get<FieldDto[]>(`${this.urlApi}list-fields`);
    }

    getFieldById(idField: Number):Observable<Field>{
        return this.http.get<Field>(`${this.urlApi}get-field-byId/${idField}`);
    }

    saveField(field: Field):Observable<Field>{
        return this.http.post<Field>(`${this.urlApi}save-field`, field);
    }
}