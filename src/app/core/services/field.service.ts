import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FieldDto } from "../../shared/models/field.model";

@Injectable({providedIn: 'root'})
export class FieldService{
    private urlApi = environment.apiUrl + 'field/';
    constructor(
        private http: HttpClient
    ){}

    listFields(): Observable<FieldDto[]>{
        return this.http.get<FieldDto[]>(`${this.urlApi}list-fields`);
    }
}