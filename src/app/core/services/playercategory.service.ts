import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PlayerCategory, PlayerCategoryDto } from "../../shared/models/playercategory.model";

@Injectable({providedIn: 'root'})
export class PlayerCategoryService{
    private apiUrl = environment.apiUrl + 'player-category/';

    constructor(
        private http: HttpClient
    ){}
    
    getTeamsByIdMember(idMember: Number): Observable<PlayerCategoryDto[]>{
        return this.http.get<PlayerCategoryDto[]>(`${this.apiUrl}list-teams-byIdMember/${idMember}`);
    }

    saveTeamToPlayer(playerTeam:PlayerCategory): Observable<string>{
        return this.http.post<string>(`${this.apiUrl}addPlayerToCategory`, playerTeam);
    }

    removeTeaamFromPlayer(idPlayerCategory: number){
        return this.http.delete(`${this.apiUrl}remove-byIdPlayerCetagory/${idPlayerCategory}`);  
    }
}