import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PositionCatalog } from "../../shared/models/position.model";

@Injectable({providedIn: 'root'})
export class PositionService{
    private apiUrl = environment.apiUrl + 'position-catalog/';
    constructor(private http: HttpClient){}

    listPositions(): Observable<PositionCatalog[]>{
        return this.http.get<PositionCatalog[]>(`${this.apiUrl}list-positionscatalog`);
    }

    savePosition(position: PositionCatalog){
        return this.http.post(`${this.apiUrl}save-positioncatalog`, position);
    }

    getPositionById(idPosition: Number): Observable<PositionCatalog>{
        return this.http.get<PositionCatalog>(`${this.apiUrl}get-positioncatalog-byId/${idPosition}`);
    }
}