import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Municipality } from "../../shared/models/municipality.model";

@Injectable({providedIn: 'root'})
export class MunicipalityService {
    private apiUrl = environment.apiUrl + 'municipality/';
    constructor(private http: HttpClient){}

    listMunicipalities(): Observable<Municipality[]>{
        return this.http.get<Municipality[]>(`${this.apiUrl}list-municipalities`);
    }

}